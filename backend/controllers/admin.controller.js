import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const publicStaff = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

// POST /api/admin/managers — create a manager account (+ optionally assign clients)
export const createManager = async (req, res) => {
  try {
    const { name, email, password, clientIds } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Name, email, and password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, error: "Password must be at least 8 characters" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ success: false, error: "An account with that email already exists" });

    const hashed = await bcrypt.hash(password, 12);
    const manager = await User.create({ name, email, password: hashed, role: "manager", isVerified: true });

    if (Array.isArray(clientIds) && clientIds.length) {
      await User.updateMany({ _id: { $in: clientIds }, role: "client" }, { assignedManager: manager._id });
    }
    res.status(201).json({ success: true, data: publicStaff(manager) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/admin/managers — list managers with their assigned clients
export const listManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" }).select("name email").lean();
    const withClients = await Promise.all(
      managers.map(async (m) => {
        const clients = await User.find({ role: "client", assignedManager: m._id }).select("name email").lean();
        return { ...publicStaff(m), clientCount: clients.length, clients: clients.map((c) => ({ id: c._id, name: c.name, email: c.email })) };
      })
    );
    res.json({ success: true, data: withClients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/admin/managers/:id/password — reset a manager's password
export const resetManagerPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, error: "Password must be at least 8 characters" });
    }
    const hashed = await bcrypt.hash(password, 12);
    const m = await User.findOneAndUpdate({ _id: req.params.id, role: "manager" }, { password: hashed }, { new: true });
    if (!m) return res.status(404).json({ success: false, error: "Manager not found" });
    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/admin/managers/:id — remove access (unassign clients first)
export const deleteManager = async (req, res) => {
  try {
    const m = await User.findOne({ _id: req.params.id, role: "manager" });
    if (!m) return res.status(404).json({ success: false, error: "Manager not found" });
    await User.updateMany({ assignedManager: m._id }, { assignedManager: null });
    await User.deleteOne({ _id: m._id });
    res.json({ success: true, message: "Manager removed" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/admin/clients — list all clients with their assigned manager
export const listClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" })
      .select("name email assignedManager")
      .populate("assignedManager", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: clients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/admin/clients/:clientId/assign  { managerId | null }
export const assignClient = async (req, res) => {
  try {
    const { managerId } = req.body;
    if (managerId) {
      const mgr = await User.findOne({ _id: managerId, role: "manager" });
      if (!mgr) return res.status(400).json({ success: false, error: "Manager not found" });
    }
    const client = await User.findOneAndUpdate(
      { _id: req.params.clientId, role: "client" },
      { assignedManager: managerId || null },
      { new: true }
    ).populate("assignedManager", "name email");
    if (!client) return res.status(404).json({ success: false, error: "Client not found" });
    res.json({ success: true, data: client });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
