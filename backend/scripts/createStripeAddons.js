// One-off: create the 3 add-on monthly Prices in Stripe and print their IDs.
// Run: node scripts/createStripeAddons.js
import dotenv from "dotenv";
import getStripe from "../config/stripe.js";

dotenv.config();

const ADDONS = [
  { name: "Add-on — Extra Video", amount: 2500, key: "STRIPE_PRICE_ADDON_VIDEO" },
  { name: "Add-on — Extra Graphic", amount: 1500, key: "STRIPE_PRICE_ADDON_GRAPHIC" },
  { name: "Add-on — Extra Page", amount: 5900, key: "STRIPE_PRICE_ADDON_PAGE" },
];

const run = async () => {
  const stripe = getStripe();
  const out = [];
  for (const a of ADDONS) {
    const product = await stripe.products.create({ name: a.name });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: a.amount,
      currency: "usd",
      recurring: { interval: "month" },
    });
    out.push(`${a.key}=${price.id}`);
    console.log(`✅ ${a.name}  →  ${price.id}`);
  }
  console.log("\n── Add these to backend/.env ──\n");
  console.log(out.join("\n"));
  process.exit(0);
};

run().catch((e) => { console.error("Error:", e.message); process.exit(1); });
