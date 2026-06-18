import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  handleWebhook,
  createCheckoutSession,
  createPortalSession,
  getMySubscription,
  getStore,
  createAddonCheckout,
  confirmAddon,
} from "../controllers/stripe.controller.js";

const router = express.Router();

// Webhook needs the RAW body for signature verification.
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

// The JSON endpoints below get their own express.json() because this whole
// router is mounted BEFORE the global express.json() (so the webhook stays raw).
router.post("/create-checkout-session", express.json(), createCheckoutSession);
router.post("/create-portal-session", express.json(), requireAuth, createPortalSession);
router.get("/subscription", requireAuth, getMySubscription);
// Storefront one-time add-ons
router.get("/store", requireAuth, getStore);
router.post("/addon-checkout", express.json(), requireAuth, createAddonCheckout);
router.post("/addon-confirm", express.json(), requireAuth, confirmAddon);

export default router;
