import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getMe, updateMe, updateAvatar } from "../controllers/user.controller.js";
import { uploadAvatar } from "../middleware/upload.js";

const router = express.Router();

router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateMe);
router.post("/me/avatar", requireAuth, (req, res) => {
  uploadAvatar(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    updateAvatar(req, res);
  });
});

export default router;
