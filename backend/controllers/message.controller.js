import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { createZoomMeeting } from "../utils/zoom.js";
import { sendMeetingEmail } from "../utils/email.js";

// Shared: create a Zoom meeting and post it as a chat message
const scheduleMeeting = async ({ clientId, sender, body }) => {
  const { topic, startTime, duration } = body;
  if (!startTime) throw new Error("Please choose a date and time");
  const zoom = await createZoomMeeting({ topic, startTime, duration: Number(duration) || 30 });
  const meeting = {
    topic: zoom.topic,
    startTime: zoom.startTime,
    duration: zoom.duration,
    joinUrl: zoom.joinUrl,
    meetingId: zoom.meetingId,
  };
  const msg = await Message.create({
    client: clientId,
    sender,
    text: "",
    meeting,
    ...(sender === "admin" ? { readByAdmin: true } : { readByClient: true }),
  });

  // Email the client + their assigned manager (or admin if no manager).
  // Admin does NOT get the email when a manager handles the client.
  try {
    const client = await User.findById(clientId).select("name email assignedManager");
    const recipients = [];
    if (client?.email) recipients.push({ email: client.email, name: client.name });

    if (client?.assignedManager) {
      const mgr = await User.findById(client.assignedManager).select("name email");
      if (mgr?.email) recipients.push({ email: mgr.email, name: mgr.name });
    } else {
      const admin = await User.findOne({ role: "admin" }).select("name email");
      if (admin?.email) recipients.push({ email: admin.email, name: admin.name });
    }
    await Promise.all(recipients.map((r) => sendMeetingEmail(r.email, r.name, meeting)));
  } catch (e) {
    console.error("Meeting email failed:", e.message);
  }

  return msg;
};

export const scheduleMeetingAsClient = async (req, res) => {
  try {
    const msg = await scheduleMeeting({ clientId: req.user.id, sender: "client", body: req.body });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const scheduleMeetingAsAdmin = async (req, res) => {
  try {
    if (!(await staffCanAccess(req, req.params.clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const msg = await scheduleMeeting({ clientId: req.params.clientId, sender: "admin", body: req.body });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Build attachment fields from an uploaded file (if any)
const attachmentFrom = (file) => {
  if (!file) return {};
  const base = process.env.SERVER_URL || "http://localhost:5001";
  let fileType = "file";
  if (file.mimetype.startsWith("image/")) fileType = "image";
  else if (file.mimetype.startsWith("video/")) fileType = "video";
  return { fileUrl: `${base}/uploads/${file.filename}`, fileName: file.originalname, fileType };
};

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
    const att = attachmentFrom(req.file);
    if ((!text || !text.trim()) && !att.fileUrl) {
      return res.status(400).json({ success: false, error: "Message cannot be empty" });
    }
    const msg = await Message.create({ client: req.user.id, sender: "client", text: (text || "").trim(), ...att, readByClient: true });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Staff access guard: admin → any client; manager → only assigned clients
const staffCanAccess = async (req, clientId) => {
  if (req.user.role === "admin") return true;
  const client = await User.findById(clientId).select("assignedManager");
  return !!client && String(client.assignedManager) === String(req.user.id);
};

/* ── STAFF: list client conversations (scoped by role) ── */
export const getConversations = async (req, res) => {
  try {
    const filter = { role: "client" };
    if (req.user.role === "manager") filter.assignedManager = req.user.id;
    const clients = await User.find(filter).select("name email assignedManager").populate("assignedManager", "name").lean();

    const convos = await Promise.all(
      clients.map(async (c) => {
        const last = await Message.findOne({ client: c._id }).sort({ createdAt: -1 }).lean();
        const unread = await Message.countDocuments({ client: c._id, sender: "client", readByAdmin: false });
        return {
          clientId: c._id,
          name: c.name,
          email: c.email,
          handler: c.assignedManager ? c.assignedManager.name : "Admin",
          lastMessage: last ? (last.text || (last.meeting ? "📅 Meeting" : last.fileUrl ? "📎 Attachment" : "")) : "",
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
    if (!(await staffCanAccess(req, clientId))) return res.status(403).json({ success: false, error: "Not your client" });
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
    if (!(await staffCanAccess(req, clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const { text } = req.body;
    const att = attachmentFrom(req.file);
    if ((!text || !text.trim()) && !att.fileUrl) {
      return res.status(400).json({ success: false, error: "Message cannot be empty" });
    }
    const staff = await User.findById(req.user.id).select("name");
    const msg = await Message.create({ client: clientId, sender: "admin", senderName: staff?.name || "Support", text: (text || "").trim(), ...att, readByAdmin: true });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
