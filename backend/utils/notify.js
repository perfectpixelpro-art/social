import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

// Create a notification for a recipient (best-effort; never throws).
export async function notify(userId, { type = "general", title, body = "", link = "", cta = "", dedupeKey = "" }) {
  try {
    if (!userId || !title) return;
    if (dedupeKey) {
      const exists = await Notification.findOne({ user: userId, dedupeKey });
      if (exists) return;
    }
    await Notification.create({ user: userId, type, title, body, link, cta, dedupeKey });
  } catch (e) {
    console.warn("notify failed:", e.message);
  }
}

// Resolve who handles a client: their assigned manager, else any admin.
export async function clientHandlerId(clientId) {
  const client = await User.findById(clientId).select("assignedManager");
  if (client?.assignedManager) return client.assignedManager;
  const admin = await User.findOne({ role: "admin" }).select("_id");
  return admin?._id || null;
}
