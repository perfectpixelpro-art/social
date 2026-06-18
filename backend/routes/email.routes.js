import express from "express";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { listTemplates, saveTemplate, sendTestEmail, recordCart, sendCustomEmail } from "../controllers/email.controller.js";

const router = express.Router();

// Public: capture an abandoned-cart lead from checkout
router.post("/cart", recordCart);

// Admin: manage automation templates
router.get("/templates", requireAdmin, listTemplates);
router.put("/templates/:key", requireAdmin, saveTemplate);
router.post("/templates/:key/test", requireAdmin, sendTestEmail);
router.post("/send-custom", requireAdmin, sendCustomEmail);

export default router;
