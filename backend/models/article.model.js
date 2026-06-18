import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "General" },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    authorName: { type: String, default: "" },
    authorRole: { type: String, default: "" }, // admin | writer
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
