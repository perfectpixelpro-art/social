// One-off: create the 3 monthly subscription Prices in Stripe (test mode in dev)
// and print their Price IDs. Run: node scripts/createStripePrices.js
import dotenv from "dotenv";
import getStripe from "../config/stripe.js";

dotenv.config();

const PLANS = [
  { name: "The Social 99 — Starter", amount: 9900, key: "STRIPE_PRICE_STARTER" },
  { name: "The Social 99 — Growth", amount: 19900, key: "STRIPE_PRICE_GROWTH" },
  { name: "The Social 99 — Pro", amount: 29900, key: "STRIPE_PRICE_PRO" },
];

const run = async () => {
  const stripe = getStripe();
  console.log("Creating products + monthly prices...\n");
  const out = [];
  for (const p of PLANS) {
    const product = await stripe.products.create({ name: p.name });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.amount,
      currency: "usd",
      recurring: { interval: "month" },
    });
    out.push(`${p.key}=${price.id}`);
    console.log(`✅ ${p.name}  →  ${price.id}`);
  }
  console.log("\n── Add/replace these lines in your backend/.env ──\n");
  console.log(out.join("\n"));
  process.exit(0);
};

run().catch((e) => { console.error("Error:", e.message); process.exit(1); });
