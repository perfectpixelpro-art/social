import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getMetaAuthUrl, metaStatus, metaDisconnect } from "../controllers/meta.controller.js";

const router = express.Router();

// Authenticated client endpoints (mounted under /api/auth/meta)
router.get("/url", requireAuth, getMetaAuthUrl);
router.get("/status", requireAuth, metaStatus);
router.post("/disconnect", requireAuth, metaDisconnect);

export default router;
