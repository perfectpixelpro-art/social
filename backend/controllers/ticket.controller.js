import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";
import { fileToUrl } from "../utils/upload.js";

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

    const user = await User.findById(req.user.id).select("name");
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
    const populated = await ticket.populate("handledBy", "name role");
    res.json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
