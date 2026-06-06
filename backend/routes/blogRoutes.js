import express from "express";
import { getBlogs, getBlogBySlug, createBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", createBlog);

export default router;
