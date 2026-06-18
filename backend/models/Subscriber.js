import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    lastNewsletterAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Subscriber", subscriberSchema);
