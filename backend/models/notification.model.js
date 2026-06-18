import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, // recipient
    type: { type: String, default: "general" }, // general | message | meeting | approval | feedback | plan_expiry | post
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    link: { type: String, default: "" }, // dashboard path to open
    cta: { type: String, default: "" }, // button label: Learn more | Buy now | Avail now | Get started
    read: { type: Boolean, default: false },
    dedupeKey: { type: String, default: "" }, // prevents duplicate plan-expiry notifications
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
