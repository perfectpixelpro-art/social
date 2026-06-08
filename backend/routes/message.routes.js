import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import {
  getMyMessages,
  sendMessageAsClient,
  getConversations,
  getClientMessages,
  sendMessageAsAdmin,
} from "../controllers/message.controller.js";

const router = express.Router();

// Client side (any authenticated user → their own thread with admin)
router.get("/me", requireAuth, getMyMessages);
router.post("/me", requireAuth, sendMessageAsClient);

// Admin side
router.get("/conversations", requireAdmin, getConversations);
router.get("/:clientId", requireAdmin, getClientMessages);
router.post("/:clientId", requireAdmin, sendMessageAsAdmin);

export default router;
