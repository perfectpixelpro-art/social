import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getYouTubeAuthUrl, youtubeStatus, youtubeAnalytics, youtubeDisconnect } from "../controllers/youtube.controller.js";

const router = express.Router();

// Authenticated client endpoints (mounted under /api/auth/youtube)
router.get("/url", requireAuth, getYouTubeAuthUrl);
router.get("/status", requireAuth, youtubeStatus);
router.get("/analytics", requireAuth, youtubeAnalytics);
router.post("/disconnect", requireAuth, youtubeDisconnect);

export default router;
