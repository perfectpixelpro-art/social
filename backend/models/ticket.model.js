import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  { fileUrl: String, fileName: String, fileType: String }, // fileType: image | video | file
  { _id: false }
);

const replySchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["client", "staff"], required: true },
    senderName: { type: String, default: "" },
    senderRole: { type: String, default: "" }, // client | admin | manager
    text: { type: String, default: "" },
    attachments: [attachmentSchema],
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    ticketNo: { type: String, unique: true, index: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    clientName: { type: String, default: "" },
    subject: { type: String, required: true, trim: true },
    category: { type: String, default: "" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    description: { type: String, default: "" },
    attachments: [attachmentSchema], // initial attachments from the client
    // open = new | in_progress | resolved | closed
    status: { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open", index: true },
    replies: [replySchema],
    // which staff member last changed the status / resolved it
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    handledByName: { type: String, default: "" },
    handledByRole: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
