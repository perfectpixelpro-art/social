import express from "express";
import { requireAuth, requireStaff } from "../middleware/auth.middleware.js";
import { uploadChatFile } from "../middleware/chatUpload.js";
import {
  getMyMessages,
  sendMessageAsClient,
  getConversations,
  getClientMessages,
  sendMessageAsAdmin,
  scheduleMeetingAsClient,
  scheduleMeetingAsAdmin,
} from "../controllers/message.controller.js";

const router = express.Router();

// multer wrapper that tolerates plain-JSON requests (no file) too
const withFile = (req, res, next) =>
  uploadChatFile(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    next();
  });

// Client side (any authenticated user → their own thread with admin)
router.get("/me", requireAuth, getMyMessages);
router.post("/me", requireAuth, withFile, sendMessageAsClient);
router.post("/me/meeting", requireAuth, scheduleMeetingAsClient);

// Staff side (admin or manager — scoped in controllers)
router.get("/conversations", requireStaff, getConversations);
router.post("/:clientId/meeting", requireStaff, scheduleMeetingAsAdmin);
router.get("/:clientId", requireStaff, getClientMessages);
router.post("/:clientId", requireStaff, withFile, sendMessageAsAdmin);

export default router;
