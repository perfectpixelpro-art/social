import express from "express";
import { requireAuth, requireStaff } from "../middleware/auth.middleware.js";
import { uploadPostMedia } from "../middleware/mediaUpload.js";
import {
  createPost, listPosts, deletePost, getAnalytics, getSummary, decideApproval, submitPostFeedback,
  staffCreatePost, staffListPosts, staffDeletePost, staffAnalytics, staffOverview,
} from "../controllers/scheduler.controller.js";

const router = express.Router();

const withMedia = (req, res, next) =>
  uploadPostMedia(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    next();
  });

// ── Client ──
router.get("/posts", requireAuth, listPosts);
router.post("/posts", requireAuth, withMedia, createPost);
router.delete("/posts/:id", requireAuth, deletePost);
router.put("/posts/:id/approval", requireAuth, decideApproval);
router.post("/posts/:id/feedback", requireAuth, submitPostFeedback);
router.get("/analytics", requireAuth, getAnalytics);
router.get("/summary", requireAuth, getSummary);

// ── Staff (manager/admin) — compose for a client, scoped ──
router.get("/staff/overview", requireStaff, staffOverview);
router.get("/staff/posts", requireStaff, staffListPosts);
router.post("/staff/posts", requireStaff, withMedia, staffCreatePost);
router.delete("/staff/posts/:id", requireStaff, staffDeletePost);
router.get("/staff/analytics", requireStaff, staffAnalytics);

export default router;
