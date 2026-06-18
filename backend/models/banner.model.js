import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    link: { type: String, default: "" }, // optional CTA link
    active: { type: Boolean, default: true },
    createdByName: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
