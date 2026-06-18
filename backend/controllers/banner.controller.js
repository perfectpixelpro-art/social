import Banner from "../models/banner.model.js";
import User from "../models/user.model.js";
import { fileToUrl } from "../utils/upload.js";

const imgUrl = (file) => fileToUrl(file); // Cloudinary or local (async)

/* ── GET /api/banners/active ── (any authenticated user) */
export const getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ active: true }).sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, data: banners });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/banners ── (admin) */
export const listBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({ success: true, data: banners });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/banners ── (admin) — multipart image */
export const createBanner = async (req, res) => {
  try {
    const { title, body, link, active } = req.body;
    if (!req.file && !title) return res.status(400).json({ success: false, error: "Add an image or title" });
    const admin = await User.findById(req.user.id).select("name");
    const banner = await Banner.create({
      title: title || "",
      body: body || "",
      link: link || "",
      imageUrl: await imgUrl(req.file),
      active: active === "false" ? false : true,
      createdByName: admin?.name || "",
    });
    res.status(201).json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── PUT /api/banners/:id ── (admin) — toggle active */
export const toggleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ success: false, error: "Banner not found" });
    banner.active = !banner.active;
    await banner.save();
    res.json({ success: true, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── DELETE /api/banners/:id ── (admin) */
export const deleteBanner = async (req, res) => {
  try {
    const b = await Banner.findByIdAndDelete(req.params.id);
    if (!b) return res.status(404).json({ success: false, error: "Banner not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
