import Message from "../models/message.model.js";
import User from "../models/user.model.js";

/* ── CLIENT: my conversation with admin ── */
export const getMyMessages = async (req, res) => {
  try {
    const clientId = req.user.id;
    const messages = await Message.find({ client: clientId }).sort({ createdAt: 1 });
    // mark admin → client messages as read
    await Message.updateMany({ client: clientId, sender: "admin", readByClient: false }, { readByClient: true });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const sendMessageAsClient = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ success: false, error: "Message cannot be empty" });
    const msg = await Message.create({ client: req.user.id, sender: "client", text: text.trim(), readByClient: true });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── ADMIN: list every client conversation ── */
export const getConversations = async (req, res) => {
  try {
    // Any non-admin account is a client (covers older accounts with no role set)
    const clients = await User.find({ role: { $ne: "admin" } }).select("name email").lean();

    const convos = await Promise.all(
      clients.map(async (c) => {
        const last = await Message.findOne({ client: c._id }).sort({ createdAt: -1 }).lean();
        const unread = await Message.countDocuments({ client: c._id, sender: "client", readByAdmin: false });
        return {
          clientId: c._id,
          name: c.name,
          email: c.email,
          lastMessage: last ? last.text : "",
          lastAt: last ? last.createdAt : null,
          unread,
        };
      })
    );

    // sort: most recent message first, clients with no messages last
    convos.sort((a, b) => {
      if (!a.lastAt && !b.lastAt) return 0;
      if (!a.lastAt) return 1;
      if (!b.lastAt) return -1;
      return new Date(b.lastAt) - new Date(a.lastAt);
    });

    res.json({ success: true, data: convos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── ADMIN: one client's thread ── */
export const getClientMessages = async (req, res) => {
  try {
    const { clientId } = req.params;
    const messages = await Message.find({ client: clientId }).sort({ createdAt: 1 });
    await Message.updateMany({ client: clientId, sender: "client", readByAdmin: false }, { readByAdmin: true });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const sendMessageAsAdmin = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ success: false, error: "Message cannot be empty" });
    const msg = await Message.create({ client: clientId, sender: "admin", text: text.trim(), readByAdmin: true });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
