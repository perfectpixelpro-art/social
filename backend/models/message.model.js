import mongoose from "mongoose";

// Media attached to meeting notes (image / video / file).
// Defined as an explicit sub-schema so it becomes a proper DocumentArray —
// an inline [{...}] nested inside the `meeting` object gets mis-parsed by
// Mongoose as a string array, which breaks saving objects.
const noteMediaSchema = new mongoose.Schema(
  { url: String, name: String, type: String },
  { _id: false }
);

// Each message belongs to ONE client's conversation with admin.
// `client` identifies the conversation; `sender` says who wrote it.
const messageSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    sender: { type: String, enum: ["client", "admin"], required: true },
    senderName: { type: String, default: "" }, // staff member's name (or client name)
    text: { type: String, default: "", trim: true },
    // optional file attachment
    fileUrl: { type: String, default: "" },
    fileName: { type: String, default: "" },
    fileType: { type: String, default: "" }, // "image" | "video" | "file"
    // optional Zoom meeting
    meeting: {
      topic: String,
      startTime: Date,
      duration: Number,
      joinUrl: String,
      meetingId: String,
      notes: { type: String, default: "" },
      noteMedia: { type: [noteMediaSchema], default: [] }, // images/videos attached to notes
      reminderSent: { type: Boolean, default: false },
    },
    readByAdmin: { type: Boolean, default: false },
    readByClient: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
