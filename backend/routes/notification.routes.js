import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { listNotifications, markAllRead, dismissNotification, broadcast } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", requireAuth, listNotifications);
router.put("/read", requireAuth, markAllRead);
router.delete("/:id", requireAuth, dismissNotification);
router.post("/broadcast", requireAdmin, broadcast);

export default router;
