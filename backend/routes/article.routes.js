import express from "express";
import { requireAuth, requireArticleAuthor } from "../middleware/auth.middleware.js";
import { uploadArticleCover } from "../middleware/articleUpload.js";
import { listArticles, getArticle, createArticle, deleteArticle } from "../controllers/article.controller.js";

const router = express.Router();

const withCover = (req, res, next) =>
  uploadArticleCover(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    next();
  });

// Anyone logged in (client / manager / writer / admin) can read articles.
router.get("/", requireAuth, listArticles);
router.get("/:id", requireAuth, getArticle);

// Only admins and writers can create / delete.
router.post("/", requireArticleAuthor, withCover, createArticle);
router.delete("/:id", requireArticleAuthor, deleteArticle);

export default router;
