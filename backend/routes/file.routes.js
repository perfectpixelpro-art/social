import express from "express";
import { requireAuth, requireStaff } from "../middleware/auth.middleware.js";
import { memoryUpload } from "../middleware/memoryUpload.js";
import { uploadFile, uploadFileForClient, getMyFiles, getAllFiles } from "../controllers/file.controller.js";

const router = express.Router();

const withFile = (req, res, next) =>
  memoryUpload(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    next();
  });

// Client: upload + view own files
router.post("/", requireAuth, withFile, uploadFile);
router.get("/me", requireAuth, getMyFiles);

// Staff: view files (scoped) + upload to a specific client
router.get("/all", requireStaff, getAllFiles);
router.post("/admin/:clientId", requireStaff, withFile, uploadFileForClient);

export default router;
