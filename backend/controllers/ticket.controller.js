import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { fileToUrl } from "../utils/upload.js";
import { notify } from "../utils/notify.js";
import { sendRawEmail } from "../utils/email.js";

// Resolve who handles a client: their manager (name+email), else any admin.
const handlerFor = async (clientId) => {
  const client = await User.findById(clientId).select("assignedManager");
  if (client?.assignedManager) {
    const m = await User.findById(client.assignedManager).select("name email");
    if (m) return m;
  }
  return User.findOne({ role: "admin" }).select("name email");
};

// Build attachment objects from uploaded files (multer .array → req.files) — Cloudinary or local.
const attachmentsFrom = async (files = []) => {
  return Promise.all((files || []).map(async (f) => {
    let fileType = "file";
    if (f.mimetype.startsWith("image/")) fileType = "image";
    else if (f.mimetype.startsWith("video/")) fileType = "video";
    return { fileUrl: await fileToUrl(f), fileName: f.originalname, fileType };
  }));
};

// Staff access guard: admin → any client; manager → only assigned clients.
const staffCanAccess = async (req, ticket) => {
  if (req.user.role === "admin") return true;
  const client = await User.findById(ticket.client).select("assignedManager");
  return !!client && String(client.assignedManager) === String(req.user.id);
};

/* ── CLIENT: create a ticket ── (multipart with optional files) */
export const createTicket = async (req, res) => {
  try {
    const { subject, category, priority, description } = req.body;
    if (!subject || !subject.trim()) return res.status(400).json({ success: false, error: "Subject is required" });

    const user = await User.findById(req.user.id).select("name email");
    const ticket = await Ticket.create({
      ticketNo: `TKT-${Date.now().toString().slice(-6)}`,
      client: req.user.id,
      clientName: user?.name || "",
      subject: subject.trim(),
      category: category || "",
      priority: priority || "Medium",
      description: description || "",
      attachments: await attachmentsFrom(req.files),
      status: "open",
    });

    // Surface the new ticket in chat + notify + email the client and their handler.
    try {
      const handler = await handlerFor(req.user.id);
      // 1) Drop a note in the client's chat thread.
      await Message.create({
        client: req.user.id,
        sender: "client",
        senderName: user?.name || "",
        text: `🎫 New support ticket ${ticket.ticketNo}: "${ticket.subject}"`,
        readByClient: true,
      });
      // 2) In-app notifications.
      if (handler) notify(handler._id, { type: "message", title: `New ticket from ${user?.name || "a client"}`, body: ticket.subject, link: "/admin/tickets" });
      notify(req.user.id, { type: "message", title: "Ticket received", body: `We've logged ${ticket.ticketNo}. We'll be in touch.`, link: "/dashboard/tickets" });
      // 3) Emails to client + handler (best-effort).
      const cBody = `<p>Hi ${user?.name || "there"},</p><p>We've received your support ticket <b>${ticket.ticketNo}</b> — "${ticket.subject}". Our team will get back to you shortly.</p>`;
      if (user?.email) sendRawEmail(user.email, `Ticket received · ${ticket.ticketNo}`, cBody, user.name);
      if (handler?.email) {
        const hBody = `<p>Hi ${handler.name || "there"},</p><p>${user?.name || "A client"} raised a new ticket <b>${ticket.ticketNo}</b>:</p><p><b>${ticket.subject}</b><br>${ticket.description || ""}</p>`;
        sendRawEmail(handler.email, `New ticket · ${ticket.ticketNo}`, hBody, handler.name);
      }
    } catch (e) { console.warn("ticket notify/email failed:", e.message); }

    res.status(201).json({ success: true, data: ticket });
  } catch (err) {
    console.error("createTicket error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── CLIENT: list my tickets ── */
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ client: req.user.id }).sort({ updatedAt: -1 });
    res.json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── CLIENT: get one of my tickets ── */
export const getMyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, client: req.user.id });
    if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });
    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── CLIENT: reply to my own ticket ── (multipart) */
export const replyAsClient = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, client: req.user.id });
    if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });
    const { text } = req.body;
    const attachments = await attachmentsFrom(req.files);
    if ((!text || !text.trim()) && !attachments.length) {
      return res.status(400).json({ success: false, error: "Reply cannot be empty" });
    }
    const user = await User.findById(req.user.id).select("name");
    ticket.replies.push({ sender: "client", senderName: user?.name || "", senderRole: "client", text: (text || "").trim(), attachments });
    await ticket.save();
    res.status(201).json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── STAFF: list tickets (scoped by role) ── */
export const listTickets = async (req, res) => {
  try {
    let clientFilter = {};
    if (req.user.role === "manager") {
      const myClients = await User.find({ assignedManager: req.user.id }).select("_id");
      clientFilter = { client: { $in: myClients.map((c) => c._id) } };
    }
    const tickets = await Ticket.find(clientFilter)
      .sort({ updatedAt: -1 })
      .populate("client", "name email")
      .populate("handledBy", "name role");
    res.json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── STAFF: get one ticket ── */
export const getTicketStaff = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("client", "name email").populate("handledBy", "name role");
    if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });
    if (!(await staffCanAccess(req, ticket))) return res.status(403).json({ success: false, error: "Not your client" });
    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── STAFF: reply to a ticket ── (multipart) */
export const replyAsStaff = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });
    if (!(await staffCanAccess(req, ticket))) return res.status(403).json({ success: false, error: "Not your client" });

    const { text } = req.body;
    const attachments = await attachmentsFrom(req.files);
    if ((!text || !text.trim()) && !attachments.length) {
      return res.status(400).json({ success: false, error: "Reply cannot be empty" });
    }
    const staff = await User.findById(req.user.id).select("name role");
    ticket.replies.push({ sender: "staff", senderName: staff?.name || "", senderRole: staff?.role || req.user.role, text: (text || "").trim(), attachments });
    // first staff reply on a brand-new ticket → mark in progress
    if (ticket.status === "open") {
      ticket.status = "in_progress";
      ticket.handledBy = req.user.id;
      ticket.handledByName = staff?.name || "";
      ticket.handledByRole = staff?.role || req.user.role;
    }
    await ticket.save();
    const populated = await ticket.populate("handledBy", "name role");
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── STAFF: change status (in_progress | resolved | closed) ── */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["open", "in_progress", "resolved", "closed"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, error: "Ticket not found" });
    if (!(await staffCanAccess(req, ticket))) return res.status(403).json({ success: false, error: "Not your client" });

    const staff = await User.findById(req.user.id).select("name role");
    ticket.status = status;
    ticket.handledBy = req.user.id;
    ticket.handledByName = staff?.name || "";
    ticket.handledByRole = staff?.role || req.user.role;
    await ticket.save();

    // Tell the client when their ticket is resolved/closed (chat + notify + email).
    if (status === "resolved" || status === "closed") {
      try {
        const client = await User.findById(ticket.client).select("name email");
        const word = status === "resolved" ? "resolved" : "closed";
        await Message.create({
          client: ticket.client,
          sender: "admin",
          senderName: staff?.name || "Support",
          text: `🎫 Your ticket ${ticket.ticketNo} ("${ticket.subject}") has been ${word}.`,
          readByClient: false,
        });
        notify(ticket.client, { type: "message", title: `Ticket ${word}`, body: `${ticket.ticketNo}: ${ticket.subject}`, link: "/dashboard/tickets" });
        if (client?.email) {
          const body = `<p>Hi ${client.name || "there"},</p><p>Your support ticket <b>${ticket.ticketNo}</b> — "${ticket.subject}" has been <b>${word}</b>. Reply in your dashboard if you need anything else.</p>`;
          sendRawEmail(client.email, `Ticket ${word} · ${ticket.ticketNo}`, body, client.name);
        }
      } catch (e) { console.warn("ticket status notify failed:", e.message); }
    }

    const populated = await ticket.populate("handledBy", "name role");
    res.json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
