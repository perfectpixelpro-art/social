import mongoose from "mongoose";

// One template per automation key (admin-editable). html may include {{name}} token.
const emailTemplateSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // newsletter | trial | cart | plan_expiry
    name: { type: String, default: "" },
    subject: { type: String, default: "" },
    html: { type: String, default: "" },
    enabled: { type: Boolean, default: true },
    updatedByName: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("EmailTemplate", emailTemplateSchema);
