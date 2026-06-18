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
    role: { type: String, enum: ["client", "admin", "manager", "writer"], default: "client" },
    isFreeTrial: { type: Boolean, default: false },
    tourSeen: { type: Boolean, default: false }, // first-login product tour completed
    // ── Onboarding profile ──
    onboarded: { type: Boolean, default: false },
    logoUrl: { type: String, default: "" },
    driveLink: { type: String, default: "" },
    socials: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    // for clients: which manager handles them (null = handled by admin)
    assignedManager: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    isVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date },

    // ── Stripe subscription billing ──
    stripeCustomerId: { type: String, default: "" },
    subscriptionId: { type: String, default: "" },
    // none | active | trialing | past_due | canceled | incomplete | unpaid
    subscriptionStatus: { type: String, default: "none" },
    plan: { type: String, default: "" }, // Starter | Growth | Pro
    service: { type: String, default: "" }, // marketing | video | website (purchased service)
    currentPeriodEnd: { type: Date, default: null },
    // purchased add-ons (extra videos/graphics/pages) with quantities
    addons: { type: [{ key: String, label: String, qty: Number }], default: [] },
    // one-time addon checkout sessions already applied (idempotency)
    processedAddonSessions: { type: [String], default: [] },

    // ── Connected social accounts ──
    youtube: {
      connected: { type: Boolean, default: false },
      channelId: { type: String, default: "" },
      channelTitle: { type: String, default: "" },
      thumbnail: { type: String, default: "" },
      accessToken: { type: String, default: "" },
      refreshToken: { type: String, default: "" },
      expiryDate: { type: Number, default: 0 },
    },
    facebook: {
      connected: { type: Boolean, default: false },
      userId: { type: String, default: "" },
      name: { type: String, default: "" },
      thumbnail: { type: String, default: "" },
      accessToken: { type: String, default: "" }, // long-lived user token
      expiryDate: { type: Number, default: 0 },
      pageId: { type: String, default: "" },
      pageName: { type: String, default: "" },
      pageAccessToken: { type: String, default: "" },
    },
    instagram: {
      connected: { type: Boolean, default: false },
      igId: { type: String, default: "" },
      username: { type: String, default: "" },
      name: { type: String, default: "" },
      thumbnail: { type: String, default: "" },
    },
    linkedin: {
      connected: { type: Boolean, default: false },
      memberId: { type: String, default: "" },
      name: { type: String, default: "" },
      thumbnail: { type: String, default: "" },
      accessToken: { type: String, default: "" },
      expiryDate: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
