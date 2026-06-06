import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "" },
    cover: { type: String, default: "" },
    body: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
