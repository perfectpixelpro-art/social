import express from "express";
import { getBlogs, getBlogBySlug, createBlog } from "../controllers/blogController.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBlogs);              // public
router.get("/:slug", getBlogBySlug);   // public
router.post("/", requireAdmin, createBlog); // admin-only

export default router;
