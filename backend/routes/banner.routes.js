import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { uploadBannerImage } from "../middleware/bannerUpload.js";
import { getActiveBanners, listBanners, createBanner, toggleBanner, deleteBanner } from "../controllers/banner.controller.js";

const router = express.Router();

const withImage = (req, res, next) =>
  uploadBannerImage(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    next();
  });

router.get("/active", requireAuth, getActiveBanners);
router.get("/", requireAdmin, listBanners);
router.post("/", requireAdmin, withImage, createBanner);
router.put("/:id", requireAdmin, toggleBanner);
router.delete("/:id", requireAdmin, deleteBanner);

export default router;
