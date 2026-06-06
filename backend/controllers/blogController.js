import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: 1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, error: "Blog not found." });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
