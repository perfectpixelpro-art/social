import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    fileId: { type: String, required: true },     // Google Drive file id
    fileName: { type: String, required: true },
    folderType: { type: String, enum: ["logo", "brand", "product", "other"], default: "other" },
    webViewLink: { type: String, default: "" },
    mimeType: { type: String, default: "" },
    uploadedBy: { type: String, enum: ["client", "admin"], default: "client" },
  },
  { timestamps: { createdAt: "uploadedAt", updatedAt: true } }
);

export default mongoose.model("File", fileSchema);
