import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createContact);            // public: submit a contact form
router.get("/", requireAdmin, getContacts); // admin-only: view submissions

export default router;
