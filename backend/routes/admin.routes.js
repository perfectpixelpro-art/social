import express from "express";
import { requireAdmin, requireStaff } from "../middleware/auth.middleware.js";
import { createManager, listManagers, resetManagerPassword, deleteManager, listClients, assignClient, getOverview } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/overview", requireAdmin, getOverview);

// Admin-only: creating/removing manager accounts.
router.post("/managers", requireAdmin, createManager);
router.put("/managers/:id/password", requireAdmin, resetManagerPassword);
router.delete("/managers/:id", requireAdmin, deleteManager);

// Staff (admin OR manager): viewing the roster + assigning clients to managers.
router.get("/managers", requireStaff, listManagers);
router.get("/clients", requireStaff, listClients);
router.put("/clients/:clientId/assign", requireStaff, assignClient);

export default router;
