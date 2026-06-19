import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { createZoomMeeting } from "../utils/zoom.js";
import { sendMeetingEmail, sendMeetingReminderEmail } from "../utils/email.js";
import { notify, clientHandlerId } from "../utils/notify.js";
import { fileToUrl } from "../utils/upload.js";

// Worker: email a 15-minute reminder before each meeting (runs every minute).
export async function runMeetingReminders() {
  const now = Date.now();
  const soon = new Date(now + 15 * 60 * 1000);
  const msgs = await Message.find({
    "meeting.startTime": { $gt: new Date(now), $lte: soon },
    "meeting.reminderSent": { $ne: true },
  });
  for (const msg of msgs) {
    try {
      const client = await User.findById(msg.client).select("name email assignedManager");
      const recipients = [];
      if (client?.email) recipients.push({ email: client.email, name: client.name });
      if (client?.assignedManager) {
        const mgr = await User.findById(client.assignedManager).select("name email");
        if (mgr?.email) recipients.push({ email: mgr.email, name: mgr.name });
      }
      await Promise.all(recipients.map((r) => sendMeetingReminderEmail(r.email, r.name, msg.meeting)));
      notify(msg.client, { type: "meeting", title: "Meeting in 15 minutes ⏰", body: msg.meeting?.topic || "", link: "/dashboard/meetings" });
      msg.meeting.reminderSent = true;
      await msg.save();
    } catch (e) { console.warn("meeting reminder failed:", e.message); }
  }
}

/* ── Meetings tab: list + notes/media ── */

// Map a meeting message → a flat meeting object for the Meetings tab.
const toMeeting = (m) => ({
  msgId: m._id,
  ...(m.meeting?.toObject ? m.meeting.toObject() : m.meeting),
});

// CLIENT: list my meetings
export const listMyMeetings = async (req, res) => {
  try {
    const msgs = await Message.find({ client: req.user.id, "meeting.startTime": { $ne: null } }).sort({ "meeting.startTime": -1 });
    res.json({ success: true, data: msgs.map(toMeeting) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// STAFF: list a client's meetings
export const listClientMeetings = async (req, res) => {
  try {
    if (!(await staffCanAccessClient(req, req.params.clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const msgs = await Message.find({ client: req.params.clientId, "meeting.startTime": { $ne: null } }).sort({ "meeting.startTime": -1 });
    res.json({ success: true, data: msgs.map(toMeeting) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update meeting notes + attach media (client owner OR staff with access).
export const updateMeetingNotes = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.msgId);
    if (!msg || !msg.meeting) return res.status(404).json({ success: false, error: "Meeting not found" });
    const isOwner = String(msg.client) === String(req.user.id);
    const isStaff = req.user.role === "admin" || (req.user.role === "manager" && await staffCanAccessClient(req, msg.client));
    if (!isOwner && !isStaff) return res.status(403).json({ success: false, error: "Not allowed" });

    if (typeof req.body.notes === "string") msg.meeting.notes = req.body.notes;
    for (const f of req.files || []) {
      const url = await fileToUrl(f);
      const type = f.mimetype.startsWith("video/") ? "video" : f.mimetype.startsWith("image/") ? "image" : "file";
      msg.meeting.noteMedia.push({ url, name: f.originalname, type });
    }
    await msg.save();
    res.json({ success: true, data: toMeeting(msg) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// helper: staff access to a client (admin any; manager assigned only)
const staffCanAccessClient = async (req, clientId) => {
  if (req.user.role === "admin") return true;
  const c = await User.findById(clientId).select("assignedManager");
  return !!c && String(c.assignedManager) === String(req.user.id);
};

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
    const handler = await clientHandlerId(req.user.id);
    if (handler) notify(handler, { type: "meeting", title: "Client scheduled a Zoom meeting", body: msg.meeting?.topic || "", link: "/admin/chat" });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const scheduleMeetingAsAdmin = async (req, res) => {
  try {
    if (!(await staffCanAccess(req, req.params.clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const msg = await scheduleMeeting({ clientId: req.params.clientId, sender: "admin", body: req.body });
    notify(req.params.clientId, { type: "meeting", title: "A Zoom meeting was scheduled", body: msg.meeting?.topic || "", link: "/dashboard/chat" });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Build attachment fields from an uploaded file (if any) — Cloudinary or local.
const attachmentFrom = async (file) => {
  if (!file) return {};
  let fileType = "file";
  if (file.mimetype.startsWith("image/")) fileType = "image";
  else if (file.mimetype.startsWith("video/")) fileType = "video";
  const fileUrl = await fileToUrl(file);
  return { fileUrl, fileName: file.originalname, fileType };
};

/* ── CLIENT: my conversation with admin ── */
export const getMyMessages = async (req, res) => {
  try {
    const clientId = req.user.id;
    const messages = await Message.find({ client: clientId }).sort({ createdAt: 1 });
    // mark admin → client messages as read
    await Message.updateMany({ client: clientId, sender: "admin", readByClient: false }, { readByClient: true });
    // Who handles this client (their manager, else the admin team)?
    const me = await User.findById(clientId).select("assignedManager").populate("assignedManager", "name avatar");
    let handler = "Admin team", handlerAvatar = "";
    if (me?.assignedManager) {
      handler = me.assignedManager.name; handlerAvatar = me.assignedManager.avatar || "";
    } else {
      const admin = await User.findOne({ role: "admin" }).select("name avatar");
      if (admin) { handler = admin.name || "Admin team"; handlerAvatar = admin.avatar || ""; }
    }
    res.json({ success: true, data: messages, handler, handlerAvatar });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const sendMessageAsClient = async (req, res) => {
  try {
    const { text } = req.body;
    const att = await attachmentFrom(req.file);
    if ((!text || !text.trim()) && !att.fileUrl) {
      return res.status(400).json({ success: false, error: "Message cannot be empty" });
    }
    const msg = await Message.create({ client: req.user.id, sender: "client", text: (text || "").trim(), ...att, readByClient: true });
    // notify the client's handler (manager or admin)
    const me = await User.findById(req.user.id).select("name");
    const handler = await clientHandlerId(req.user.id);
    if (handler) notify(handler, { type: "message", title: `New message from ${me?.name || "a client"}`, body: (text || "Attachment").slice(0, 80), link: "/admin/chat" });
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
    const clients = await User.find(filter).select("name email avatar assignedManager").populate("assignedManager", "name").lean();

    const convos = await Promise.all(
      clients.map(async (c) => {
        const last = await Message.findOne({ client: c._id }).sort({ createdAt: -1 }).lean();
        const unread = await Message.countDocuments({ client: c._id, sender: "client", readByAdmin: false });
        return {
          clientId: c._id,
          name: c.name,
          email: c.email,
          avatar: c.avatar || "",
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
    const att = await attachmentFrom(req.file);
    if ((!text || !text.trim()) && !att.fileUrl) {
      return res.status(400).json({ success: false, error: "Message cannot be empty" });
    }
    const staff = await User.findById(req.user.id).select("name");
    const msg = await Message.create({ client: clientId, sender: "admin", senderName: staff?.name || "Support", text: (text || "").trim(), ...att, readByAdmin: true });
    notify(clientId, { type: "message", title: `New message from ${staff?.name || "your team"}`, body: (text || "Attachment").slice(0, 80), link: "/dashboard/chat" });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
