import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  { url: String, type: String, name: String }, // type: image | video
  { _id: false }
);

const scheduledPostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, // the client the post belongs to
    // who composed it
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    createdByName: { type: String, default: "" },
    createdByRole: { type: String, default: "client" }, // client | manager | admin
    // one post can target several platforms
    platforms: { type: [String], default: ["facebook"] }, // facebook | instagram | linkedin | youtube
    caption: { type: String, default: "" },
    media: { type: [mediaSchema], default: [] },
    ytPrivacy: { type: String, enum: ["public", "unlisted", "private"], default: "unlisted" }, // YouTube visibility
    scheduledAt: { type: Date, required: true },

    // approval workflow
    requiresApproval: { type: Boolean, default: false },
    approvalStatus: { type: String, enum: ["not_required", "pending", "approved", "rejected"], default: "not_required" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    approvedByName: { type: String, default: "" },

    // publish state
    status: { type: String, enum: ["pending", "published", "failed"], default: "pending", index: true },
    platformPostId: { type: String, default: "" },
    error: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("ScheduledPost", scheduledPostSchema);
