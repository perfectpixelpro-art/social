import Article from "../models/article.model.js";
import User from "../models/user.model.js";
import { fileToUrl } from "../utils/upload.js";

const coverFrom = (file) => fileToUrl(file); // Cloudinary or local (async)

/* ── GET /api/articles ── (any authenticated user) */
export const listArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ success: true, data: articles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/articles/:id ── (any authenticated user) */
export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, error: "Article not found" });
    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/articles ── (admin or writer) — multipart, optional cover */
export const createArticle = async (req, res) => {
  try {
    const { title, category, excerpt, content } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ success: false, error: "Title is required" });
    const author = await User.findById(req.user.id).select("name role");
    const article = await Article.create({
      title: title.trim(),
      category: category || "General",
      excerpt: excerpt || "",
      content: content || "",
      coverImage: await coverFrom(req.file),
      author: req.user.id,
      authorName: author?.name || "",
      authorRole: author?.role || req.user.role,
    });
    res.status(201).json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── DELETE /api/articles/:id ── (admin, or the writer who authored it) */
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, error: "Article not found" });
    if (req.user.role !== "admin" && String(article.author) !== String(req.user.id)) {
      return res.status(403).json({ success: false, error: "Not allowed" });
    }
    await article.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
