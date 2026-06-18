import User from "../models/user.model.js";
import { fileToUrl } from "../utils/upload.js";

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  mobile: u.mobile || "",
  company: u.company || "",
  website: u.website || "",
  avatar: u.avatar || "",
  role: u.role,
  tourSeen: !!u.tourSeen,
  onboarded: !!u.onboarded,
  logoUrl: u.logoUrl || "",
  driveLink: u.driveLink || "",
  socials: u.socials || { instagram: "", facebook: "", linkedin: "", youtube: "" },
});

// POST /api/users/me/tour — mark the first-login tour as completed
export const markTourSeen = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { tourSeen: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/users/me/onboarding — save onboarding form + mark onboarded
export const saveOnboarding = async (req, res) => {
  try {
    const { mobile, website, logoUrl, driveLink, socials } = req.body;
    const update = {
      onboarded: true,
      ...(mobile !== undefined ? { mobile } : {}),
      ...(website !== undefined ? { website } : {}),
      ...(logoUrl !== undefined ? { logoUrl } : {}),
      ...(driveLink !== undefined ? { driveLink } : {}),
      ...(socials ? { socials: {
        instagram: socials.instagram || "", facebook: socials.facebook || "",
        linkedin: socials.linkedin || "", youtube: socials.youtube || "",
      } } : {}),
    };
    const u = await User.findByIdAndUpdate(req.user.id, update, { new: true });
    res.json({ success: true, data: publicUser(u) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/users/me — current user's profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: publicUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/users/me — update editable profile fields
export const updateMe = async (req, res) => {
  try {
    const { name, mobile, company, website } = req.body;
    const update = {};
    if (typeof name === "string" && name.trim()) update.name = name.trim();
    if (typeof mobile === "string") update.mobile = mobile.trim();
    if (typeof company === "string") update.company = company.trim();
    if (typeof website === "string") update.website = website.trim();
    // email and password are intentionally not editable here

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: publicUser(user), message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/users/me/avatar — upload a profile picture
export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: "No image uploaded" });
    const url = await fileToUrl(req.file);
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: url }, { new: true });
    res.json({ success: true, data: publicUser(user), message: "Photo updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
