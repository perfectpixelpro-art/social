import EmailTemplate from "../models/emailTemplate.model.js";
import EmailLog from "../models/emailLog.model.js";
import CartLead from "../models/cartLead.model.js";
import Subscriber from "../models/Subscriber.js";
import User from "../models/user.model.js";
import { sendRawEmail, defaultTemplates } from "../utils/email.js";

const KEYS = ["newsletter", "trial", "cart", "plan_expiry", "custom"];

/* ── ADMIN: send a custom one-off email to specific recipient(s) ── */
export const sendCustomEmail = async (req, res) => {
  try {
    const { to, subject, html, saveAsTemplate } = req.body;
    if (!to || !subject || !html) return res.status(400).json({ success: false, error: "Recipients, subject and HTML are required" });
    const recipients = String(to).split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
    if (!recipients.length) return res.status(400).json({ success: false, error: "No valid recipients" });
    if (saveAsTemplate) {
      const admin = await User.findById(req.user.id).select("name");
      await EmailTemplate.findOneAndUpdate({ key: "custom" }, { key: "custom", name: "Custom", subject, html, enabled: true, updatedByName: admin?.name || "" }, { upsert: true });
    }
    let sent = 0;
    for (const r of recipients) { try { await sendRawEmail(r, subject, html, ""); sent++; } catch (e) { console.warn("custom send:", e.message); } }
    res.json({ success: true, sent });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

// Resolve the active template for a key (saved one, else built-in default).
async function templateFor(key) {
  const t = await EmailTemplate.findOne({ key });
  if (t && t.enabled && t.html) return { subject: t.subject, html: t.html, enabled: t.enabled };
  const d = defaultTemplates[key];
  return d ? { subject: d.subject, html: d.html, enabled: t ? t.enabled : true } : null;
}

// dedupe helper
async function once(dedupeKey, fn) {
  if (await EmailLog.findOne({ dedupeKey })) return false;
  await EmailLog.create({ dedupeKey });
  await fn();
  return true;
}

/* ── ADMIN: list/get/save templates ── */
export const listTemplates = async (req, res) => {
  try {
    const saved = await EmailTemplate.find();
    const byKey = Object.fromEntries(saved.map((t) => [t.key, t]));
    const data = KEYS.map((key) => {
      const t = byKey[key];
      const d = defaultTemplates[key];
      return {
        key,
        name: t?.name || d?.name || key,
        subject: t?.subject || d?.subject || "",
        html: t?.html || d?.html || "",
        enabled: t ? t.enabled : true,
        customized: !!t,
      };
    });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

export const saveTemplate = async (req, res) => {
  try {
    const { key } = req.params;
    if (!KEYS.includes(key)) return res.status(400).json({ success: false, error: "Invalid template key" });
    const { subject, html, enabled, name } = req.body;
    const admin = await User.findById(req.user.id).select("name");
    const t = await EmailTemplate.findOneAndUpdate(
      { key },
      { key, subject, html, name: name || defaultTemplates[key]?.name || key, enabled: enabled !== false, updatedByName: admin?.name || "" },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: t });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

export const sendTestEmail = async (req, res) => {
  try {
    const { key } = req.params;
    const { to } = req.body;
    if (!to) return res.status(400).json({ success: false, error: "Recipient email required" });
    const tpl = await templateFor(key);
    if (!tpl) return res.status(404).json({ success: false, error: "Template not found" });
    await sendRawEmail(to, `[TEST] ${tpl.subject}`, tpl.html, "there");
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

/* ── PUBLIC: capture a cart (called from checkout) ── */
export const recordCart = async (req, res) => {
  try {
    const { email, name, plan, service } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email required" });
    await CartLead.findOneAndUpdate(
      { email: email.toLowerCase(), recovered: false, emailSent: false },
      { email: email.toLowerCase(), name: name || "", plan: plan || "", service: service || "" },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

// ───────────────── AUTOMATION RUNNERS (called on an interval) ─────────────────

// 1) Newsletter — every 15 days per subscriber
export async function runNewsletters() {
  const tpl = await templateFor("newsletter");
  if (!tpl?.enabled) return;
  const cutoff = new Date(Date.now() - 15 * 86400000);
  const subs = await Subscriber.find({ $or: [{ lastNewsletterAt: null }, { lastNewsletterAt: { $lte: cutoff } }] }).limit(200);
  for (const s of subs) {
    const baseline = s.lastNewsletterAt || s.createdAt;
    if (new Date(baseline) > cutoff) continue; // not yet 15 days
    try { await sendRawEmail(s.email, tpl.subject, tpl.html, ""); s.lastNewsletterAt = new Date(); await s.save(); }
    catch (e) { console.warn("newsletter send:", e.message); }
  }
}

// 2) Free trial — one email per day for 7 days
export async function runTrialDrip() {
  const tpl = await templateFor("trial");
  if (!tpl?.enabled) return;
  const now = Date.now();
  const users = await User.find({ isFreeTrial: true }).select("name email createdAt");
  for (const u of users) {
    const ageDays = Math.floor((now - new Date(u.createdAt).getTime()) / 86400000);
    for (let d = 1; d <= Math.min(ageDays, 7); d++) {
      await once(`trial_${u._id}_${d}`, () => sendRawEmail(u.email, tpl.subject, tpl.html, u.name)).catch(() => {});
    }
  }
}

// 3) Abandoned cart — email leads >1h old that haven't converted
export async function runCartReminders() {
  const tpl = await templateFor("cart");
  if (!tpl?.enabled) return;
  const cutoff = new Date(Date.now() - 60 * 60000);
  const leads = await CartLead.find({ recovered: false, emailSent: false, createdAt: { $lte: cutoff } }).limit(100);
  for (const lead of leads) {
    // recovered if a user with this email now has an active subscription
    const u = await User.findOne({ email: lead.email }).select("subscriptionStatus name");
    if (u && ["active", "trialing"].includes(u.subscriptionStatus)) { lead.recovered = true; await lead.save(); continue; }
    try { await sendRawEmail(lead.email, tpl.subject, tpl.html, lead.name || u?.name || ""); lead.emailSent = true; await lead.save(); }
    catch (e) { console.warn("cart send:", e.message); }
  }
}

// 4) Plan expiry — 15 / 7 / 1 days before currentPeriodEnd
export async function runPlanExpiryEmails() {
  const tpl = await templateFor("plan_expiry");
  if (!tpl?.enabled) return;
  const now = Date.now();
  const users = await User.find({ role: "client", subscriptionStatus: { $in: ["active", "trialing"] }, currentPeriodEnd: { $gt: new Date() } })
    .select("name email currentPeriodEnd");
  for (const u of users) {
    const daysLeft = Math.ceil((new Date(u.currentPeriodEnd).getTime() - now) / 86400000);
    if (![15, 7, 1].includes(daysLeft)) continue;
    const tag = new Date(u.currentPeriodEnd).toISOString().slice(0, 10);
    await once(`planmail_${u._id}_${tag}_${daysLeft}`, () => sendRawEmail(u.email, tpl.subject, tpl.html, u.name)).catch(() => {});
  }
}

export async function runAllEmailAutomations() {
  await Promise.allSettled([runNewsletters(), runTrialDrip(), runCartReminders(), runPlanExpiryEmails()]);
}
