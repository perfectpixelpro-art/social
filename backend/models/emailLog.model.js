import mongoose from "mongoose";

// Dedup log so recurring/threshold automation emails aren't sent twice.
const emailLogSchema = new mongoose.Schema(
  { dedupeKey: { type: String, required: true, unique: true } },
  { timestamps: true }
);

export default mongoose.model("EmailLog", emailLogSchema);
