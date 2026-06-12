import express from "express";
import { subscribe, getSubscribers } from "../controllers/subscriberController.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", subscribe);                   // public: subscribe
router.get("/", requireAdmin, getSubscribers); // admin-only: view subscribers

export default router;
