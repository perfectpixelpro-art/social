import jwt from "jsonwebtoken";
import getStripe from "../config/stripe.js";
import { planToPriceId, priceIdToPlan, addonToPriceId, priceIdToAddon, ADDON_LABELS } from "../config/stripePlans.js";
import User from "../models/user.model.js";

// One-time storefront add-on catalog per service (price in USD).
const ADDON_CATALOG = {
  marketing: [
    { key: "video", label: "Extra Videos", price: 25, hint: "1 video = $25" },
    { key: "graphic", label: "Extra Graphics", price: 15, hint: "1 graphic = $15" },
  ],
  video: [{ key: "video", label: "Extra Videos", price: 25, hint: "1 video = $25" }],
  website: [{ key: "page", label: "Extra Pages", price: 59, hint: "1 page = $59" }],
};
const addonInfo = (service, key) => (ADDON_CATALOG[service] || ADDON_CATALOG.marketing).find((a) => a.key === key);

/* ── GET /api/stripe/store ── (client) — add-ons available for the client's service */
export const getStore = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("service");
    const service = user?.service || "marketing";
    res.json({ success: true, data: { service, addons: ADDON_CATALOG[service] || ADDON_CATALOG.marketing } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/stripe/addon-checkout ── (client) — ONE-TIME payment for add-ons */
export const createAddonCheckout = async (req, res) => {
  try {
    const stripe = getStripe();
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: "Account not found" });
    const service = user.service || "marketing";
    const items = (req.body.addons || []).filter((a) => a.qty > 0);
    if (!items.length) return res.status(400).json({ success: false, error: "No add-ons selected" });

    const line_items = [];
    for (const it of items) {
      const info = addonInfo(service, it.key);
      if (!info) continue;
      line_items.push({
        price_data: { currency: "usd", product_data: { name: info.label }, unit_amount: Math.round(info.price * 100) },
        quantity: Math.max(1, Math.min(100, Number(it.qty) || 1)),
      });
    }
    if (!line_items.length) return res.status(400).json({ success: false, error: "Invalid add-ons" });

    const customerId = await getOrCreateCustomer(user);
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // one-time, NOT recurring
      customer: customerId,
      line_items,
      metadata: { userId: user._id.toString(), addons: JSON.stringify(items) },
      success_url: `${CLIENT_URL()}/dashboard/store?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL()}/dashboard/store?canceled=1`,
    });
    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("addon-checkout error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/stripe/addon-confirm ── (client) — verify session & add to account */
export const confirmAddon = async (req, res) => {
  try {
    const stripe = getStripe();
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ success: false, error: "sessionId required" });
    const user = await User.findById(req.user.id);
    if (user.processedAddonSessions.includes(sessionId)) return res.json({ success: true, already: true });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.userId !== user._id.toString()) return res.status(403).json({ success: false, error: "Not your session" });
    if (session.payment_status !== "paid") return res.status(400).json({ success: false, error: "Payment not completed" });

    const service = user.service || "marketing";
    const bought = JSON.parse(session.metadata.addons || "[]");
    for (const b of bought) {
      const info = addonInfo(service, b.key);
      if (!info) continue;
      const existing = user.addons.find((a) => a.key === b.key);
      if (existing) existing.qty += Number(b.qty) || 0;
      else user.addons.push({ key: b.key, label: info.label, qty: Number(b.qty) || 0 });
    }
    user.processedAddonSessions.push(sessionId);
    await user.save();
    res.json({ success: true, addons: user.addons });
  } catch (err) {
    console.error("addon-confirm error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Extract purchased add-ons (key/label/qty) from a Stripe subscription's line items.
function extractAddons(subscription) {
  const items = subscription.items?.data || [];
  const out = [];
  for (const it of items) {
    const key = priceIdToAddon(it.price?.id);
    if (key) out.push({ key, label: ADDON_LABELS[key] || key, qty: it.quantity || 1 });
  }
  return out;
}

// Build Stripe line_items from the base plan + chosen add-ons.
function buildLineItems(plan, addons) {
  const basePriceId = planToPriceId()[plan];
  if (!basePriceId) throw new Error(`No Stripe price configured for plan "${plan}"`);

  const items = [{ price: basePriceId, quantity: 1 }];
  const addonMap = addonToPriceId();
  for (const a of addons || []) {
    const priceId = addonMap[a.key];
    const qty = Math.max(1, Math.min(100, Number(a.qty) || 0));
    if (priceId && qty > 0) items.push({ price: priceId, quantity: qty });
  }
  return items;
}

const CLIENT_URL = () => process.env.CLIENT_URL || "http://localhost:5173";

// Optional auth: returns the userId if a valid access token is present, else null.
function optionalUserId(req) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return null;
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).sub;
  } catch {
    return null;
  }
}

// Find-or-create a Stripe customer for a user, persist the id.
async function getOrCreateCustomer(user) {
  const stripe = getStripe();
  if (user.stripeCustomerId) return user.stripeCustomerId;
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user._id.toString() },
  });
  user.stripeCustomerId = customer.id;
  await user.save();
  return customer.id;
}

/* ── POST /api/stripe/create-checkout-session ──
   Pay-first funnel. Works for:
   • Logged-in users → links to their account, success → dashboard.
   • Guests → pays with their email, success → signup (email prefilled). */
export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const { email, plan, addons } = req.body;
    const service = ["marketing", "video", "website"].includes(req.body.service) ? req.body.service : "";
    if (!plan) return res.status(400).json({ success: false, error: "Plan is required" });

    let lineItems;
    try {
      lineItems = buildLineItems(plan, addons);
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }

    const userId = optionalUserId(req);
    const base = {
      mode: "subscription",
      line_items: lineItems,
      allow_promotion_codes: true,
      cancel_url: `${CLIENT_URL()}/checkout?plan=${encodeURIComponent(plan)}`,
    };

    let session;
    if (userId) {
      // ── Logged-in user ──
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, error: "Account not found" });
      const customerId = await getOrCreateCustomer(user);
      session = await stripe.checkout.sessions.create({
        ...base,
        customer: customerId,
        client_reference_id: user._id.toString(),
        metadata: { userId: user._id.toString(), plan, service },
        subscription_data: { metadata: { userId: user._id.toString(), plan, service } },
        success_url: `${CLIENT_URL()}/dashboard/profile?subscribed=1`,
      });
    } else {
      // ── Guest (not signed up yet) ──
      if (!email) return res.status(400).json({ success: false, error: "Email is required" });
      session = await stripe.checkout.sessions.create({
        ...base,
        customer_email: email.toLowerCase(),
        metadata: { plan, service, guestEmail: email.toLowerCase() },
        subscription_data: { metadata: { plan, service, guestEmail: email.toLowerCase() } },
        success_url: `${CLIENT_URL()}/signup?paid=1&plan=${encodeURIComponent(plan)}&email=${encodeURIComponent(email)}`,
      });
    }

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Link an existing Stripe customer/subscription (created during guest checkout)
// to a newly-registered user by email. Auto-verifies if they have paid.
export async function linkStripeSubscriptionByEmail(user) {
  const stripe = getStripe();
  const customers = await stripe.customers.list({ email: user.email, limit: 1 });
  if (!customers.data.length) return false;

  const customer = customers.data[0];
  user.stripeCustomerId = customer.id;

  const subs = await stripe.subscriptions.list({ customer: customer.id, status: "all", limit: 1 });
  if (subs.data.length) {
    const sub = subs.data[0];
    user.subscriptionId = sub.id;
    user.subscriptionStatus = sub.status;
    user.plan = sub.metadata?.plan || priceIdToPlan(sub.items.data[0]?.price?.id) || "";
    user.currentPeriodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
    user.addons = extractAddons(sub);
    if (sub.metadata?.service) user.service = sub.metadata.service;
    // They completed payment for this email → let them log in without the email step.
    if (["active", "trialing"].includes(sub.status)) user.isVerified = true;
  }
  await user.save();
  return true;
}

/* ── POST /api/stripe/create-portal-session ── (auth required)
   Opens the Stripe Customer Portal so a logged-in user can manage,
   upgrade, or cancel their autopay subscription. */
export const createPortalSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const user = await User.findById(req.user.id);
    if (!user?.stripeCustomerId) {
      return res.status(400).json({ success: false, error: "No subscription found for this account" });
    }
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${CLIENT_URL()}/dashboard/profile`,
    });
    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("create-portal-session error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/stripe/subscription ── (auth required)
   Returns the current user's subscription snapshot for the dashboard. */
export const getMySubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "plan subscriptionStatus currentPeriodEnd stripeCustomerId"
    );
    res.json({
      success: true,
      data: {
        plan: user.plan || "",
        status: user.subscriptionStatus || "none",
        currentPeriodEnd: user.currentPeriodEnd || null,
        hasCustomer: !!user.stripeCustomerId,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Helper: update a user's subscription fields from a Stripe subscription object.
async function syncSubscriptionToUser(subscription) {
  const userId = subscription.metadata?.userId;
  const priceId = subscription.items?.data?.[0]?.price?.id;
  const update = {
    subscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    plan: subscription.metadata?.plan || priceIdToPlan(priceId) || "",
    currentPeriodEnd: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000)
      : null,
    addons: extractAddons(subscription),
  };
  if (subscription.metadata?.service) update.service = subscription.metadata.service;
  if (userId) {
    await User.findByIdAndUpdate(userId, update);
  } else if (subscription.customer) {
    await User.findOneAndUpdate({ stripeCustomerId: subscription.customer }, update);
  }
}

/* ── POST /api/stripe/webhook ── (raw body) */
export const handleWebhook = async (req, res) => {
  const stripe = getStripe();
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error("❌ Stripe webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("✅ checkout.session.completed:", session.id);
        // Retrieve the subscription to get status/period, then sync to the user.
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          // ensure metadata.userId is present (from client_reference_id fallback)
          if (!subscription.metadata?.userId && session.client_reference_id) {
            subscription.metadata = { ...subscription.metadata, userId: session.client_reference_id };
          }
          await syncSubscriptionToUser(subscription);
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object;
        console.log("✅ invoice.paid:", invoice.id);
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
          await syncSubscriptionToUser(subscription);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("⚠️  invoice.payment_failed:", invoice.id);
        if (invoice.customer) {
          await User.findOneAndUpdate(
            { stripeCustomerId: invoice.customer },
            { subscriptionStatus: "past_due" }
          );
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log("🔁 customer.subscription.updated:", subscription.id, "status:", subscription.status);
        await syncSubscriptionToUser(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("🗑️  customer.subscription.deleted:", subscription.id);
        await User.findOneAndUpdate(
          { stripeCustomerId: subscription.customer },
          { subscriptionStatus: "canceled", plan: "", subscriptionId: "" }
        );
        break;
      }

      default:
        console.log("ℹ️  Unhandled Stripe event:", event.type);
    }
  } catch (err) {
    console.error("Webhook handler error:", err.message);
    // still 200 so Stripe doesn't retry forever on our internal errors
  }

  res.json({ received: true });
};
