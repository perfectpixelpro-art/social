import express from "express";
import { requireAuth, requireStaff } from "../middleware/auth.middleware.js";
import { uploadTicketFiles } from "../middleware/ticketUpload.js";
import {
  createTicket, getMyTickets, getMyTicket, replyAsClient,
  listTickets, getTicketStaff, replyAsStaff, updateStatus,
} from "../controllers/ticket.controller.js";

const router = express.Router();

// multer wrapper that tolerates plain-JSON requests (no files) too
const withFiles = (req, res, next) =>
  uploadTicketFiles(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    next();
  });

// ── Client side ──
router.get("/me", requireAuth, getMyTickets);
router.post("/me", requireAuth, withFiles, createTicket);
router.get("/me/:id", requireAuth, getMyTicket);
router.post("/me/:id/reply", requireAuth, withFiles, replyAsClient);

// ── Staff side (admin or manager — scoped in controllers) ──
router.get("/", requireStaff, listTickets);
router.get("/:id", requireStaff, getTicketStaff);
router.post("/:id/reply", requireStaff, withFiles, replyAsStaff);
router.put("/:id/status", requireStaff, updateStatus);

export default router;
