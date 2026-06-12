import express from "express";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { createManager, listManagers, resetManagerPassword, deleteManager, listClients, assignClient } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/managers", requireAdmin, createManager);
router.get("/managers", requireAdmin, listManagers);
router.put("/managers/:id/password", requireAdmin, resetManagerPassword);
router.delete("/managers/:id", requireAdmin, deleteManager);
router.get("/clients", requireAdmin, listClients);
router.put("/clients/:clientId/assign", requireAdmin, assignClient);

export default router;
