import Stripe from "stripe";

// Lazy singleton — created on first use (AFTER dotenv has loaded the env vars).
let _stripe = null;

export default function getStripe() {
  if (_stripe) return _stripe;

  // Prefer an explicit STRIPE_SECRET_KEY; otherwise fall back to the
  // test/live keys based on NODE_ENV (test in dev, live in production).
  const secretKey =
    process.env.STRIPE_SECRET_KEY ||
    (process.env.NODE_ENV === "production"
      ? process.env.STRIPE_SECRET_KEY_LIVE
      : process.env.STRIPE_SECRET_KEY_TEST);

  if (!secretKey) {
    throw new Error("Stripe secret key is not set — add STRIPE_SECRET_KEY to your .env");
  }

  _stripe = new Stripe(secretKey);
  return _stripe;
}
