import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    key: String,
    label: String,
    total: { type: Number, default: 1 },
    done: { type: Number, default: 0 },
    check: { type: Boolean, default: false },
  },
  { _id: false }
);

const trackerSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    service: { type: String, default: "marketing" }, // marketing | video | website
    plan: { type: String, default: "" }, // tier: Basic | Standard | Premium
    period: { type: String, default: "" }, // YYYY-MM
    items: [itemSchema],
    manual: { type: Boolean, default: false }, // true once staff sets/edits it → stops auto-following the plan
    updatedByName: { type: String, default: "" },
  },
  { timestamps: true }
);

trackerSchema.index({ client: 1, period: 1 }, { unique: true });

export default mongoose.model("Tracker", trackerSchema);
