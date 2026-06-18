// Maps your plan names to Stripe recurring Price IDs (set in .env).
// Create 3 monthly recurring Prices in the Stripe Dashboard (or via API),
// then put their price IDs in .env as STRIPE_PRICE_STARTER / _GROWTH / _PRO.
export const planToPriceId = () => ({
  Starter: process.env.STRIPE_PRICE_STARTER,
  Growth: process.env.STRIPE_PRICE_GROWTH,
  Pro: process.env.STRIPE_PRICE_PRO,
});

// Reverse lookup: given a Stripe price id, return the plan name.
export const priceIdToPlan = (priceId) => {
  const map = planToPriceId();
  return Object.keys(map).find((k) => map[k] === priceId) || "";
};

// Add-on key → Stripe recurring Price ID. Keys match the frontend addon keys.
export const addonToPriceId = () => ({
  video: process.env.STRIPE_PRICE_ADDON_VIDEO,    // Extra Video  ($25/ea)
  graphic: process.env.STRIPE_PRICE_ADDON_GRAPHIC, // Extra Graphic ($15/ea)
  page: process.env.STRIPE_PRICE_ADDON_PAGE,       // Extra Page    ($59/ea)
});

export const ADDON_LABELS = { video: "Extra Videos", graphic: "Extra Graphics", page: "Extra Pages" };

// Given a Stripe price id, return the addon key (or "").
export const priceIdToAddon = (priceId) => {
  const map = addonToPriceId();
  return Object.keys(map).find((k) => map[k] === priceId) || "";
};
