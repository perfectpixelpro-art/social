import mongoose from "mongoose";

// Captured when someone starts checkout. If they don't convert, we email them.
const cartLeadSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    name: { type: String, default: "" },
    plan: { type: String, default: "" },
    service: { type: String, default: "" },
    recovered: { type: Boolean, default: false }, // they completed a subscription
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("CartLead", cartLeadSchema);
