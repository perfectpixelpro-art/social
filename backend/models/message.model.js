import mongoose from "mongoose";

// Each message belongs to ONE client's conversation with admin.
// `client` identifies the conversation; `sender` says who wrote it.
const messageSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    sender: { type: String, enum: ["client", "admin"], required: true },
    text: { type: String, required: true, trim: true },
    readByAdmin: { type: Boolean, default: false },
    readByClient: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
