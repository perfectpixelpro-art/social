import express from "express";
import { requireAuth, requireStaff } from "../middleware/auth.middleware.js";
import { getMyTracker, getStaffTracker, updateItem, resetTracker } from "../controllers/tracker.controller.js";

const router = express.Router();

router.get("/me", requireAuth, getMyTracker);
router.get("/staff/:clientId", requireStaff, getStaffTracker);
router.put("/staff/:clientId/item", requireStaff, updateItem);
router.post("/staff/:clientId/reset", requireStaff, resetTracker);

export default router;
