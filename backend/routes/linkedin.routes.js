import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getLinkedInAuthUrl, linkedinStatus, linkedinDisconnect } from "../controllers/linkedin.controller.js";

const router = express.Router();

// Authenticated client endpoints (mounted under /api/auth/linkedin)
router.get("/url", requireAuth, getLinkedInAuthUrl);
router.get("/status", requireAuth, linkedinStatus);
router.post("/disconnect", requireAuth, linkedinDisconnect);

export default router;
