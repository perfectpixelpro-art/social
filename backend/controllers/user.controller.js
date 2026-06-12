import User from "../models/user.model.js";

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  mobile: u.mobile || "",
  company: u.company || "",
  website: u.website || "",
  avatar: u.avatar || "",
  role: u.role,
});

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
    const base = process.env.SERVER_URL || "http://localhost:5001";
    const url = `${base}/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: url }, { new: true });
    res.json({ success: true, data: publicUser(user), message: "Photo updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
