import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, trim: true },
    company: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },
    avatar: { type: String, default: "" },
    driveFolders: {
      root: String,
      logos: String,
      brandGuide: String,
      productImages: String,
      other: String,
    },
    password: { type: String, required: true }, // stored as bcrypt hash
    role: { type: String, enum: ["client", "admin", "manager"], default: "client" },
    // for clients: which manager handles them (null = handled by admin)
    assignedManager: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    isVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
