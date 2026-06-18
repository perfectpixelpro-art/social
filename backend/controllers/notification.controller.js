import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { notify } from "../utils/notify.js";

/* ── GET /api/notifications ── (any auth) — current user's notifications */
export const listNotifications = async (req, res) => {
  try {
    const items = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(50);
    const unread = await Notification.countDocuments({ user: req.user.id, read: false });
    res.json({ success: true, data: { items, unread } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── PUT /api/notifications/read ── mark all read */
export const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, read: false }, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── DELETE /api/notifications/:id ── dismiss (cross button) */
export const dismissNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/notifications/broadcast ── (admin) — send a general notification to all clients */
export const broadcast = async (req, res) => {
  try {
    const { title, body, link, cta } = req.body;
    if (!title) return res.status(400).json({ success: false, error: "Title is required" });
    const clients = await User.find({ role: "client" }).select("_id");
    await Promise.all(clients.map((c) => notify(c._id, { type: "general", title, body, link: link || "", cta: link ? (cta || "Learn more") : "" })));
    res.json({ success: true, sent: clients.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ── Plan-expiry reminders: run periodically; creates 15/7/3/1-day notices (deduped) ──
export async function runExpiryCheck() {
  try {
    const now = Date.now();
    const clients = await User.find({ role: "client", currentPeriodEnd: { $gt: new Date() }, subscriptionStatus: { $in: ["active", "trialing"] } })
      .select("_id currentPeriodEnd plan");
    for (const c of clients) {
      const daysLeft = Math.ceil((new Date(c.currentPeriodEnd).getTime() - now) / 86400000);
      if (![15, 7, 3, 1].includes(daysLeft)) continue;
      const periodTag = new Date(c.currentPeriodEnd).toISOString().slice(0, 10);
      await notify(c._id, {
        type: "plan_expiry",
        title: `Your plan expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`,
        body: "Renew to keep your content scheduling and analytics active.",
        link: "/dashboard/store",
        dedupeKey: `expiry_${c._id}_${periodTag}_${daysLeft}`,
      });
    }
  } catch (e) {
    console.warn("expiry check failed:", e.message);
  }
}
