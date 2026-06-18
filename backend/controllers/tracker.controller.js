import Tracker from "../models/tracker.model.js";
import User from "../models/user.model.js";
import { planDeliverables, planToTier, currentPeriod } from "../config/deliverables.js";

// Build addon tracker items from a client's purchased add-ons.
const addonItems = (addons = []) =>
  addons.filter((a) => a.qty > 0).map((a) => ({ key: `addon_${a.key}`, label: a.label, total: a.qty, done: 0, check: false, addon: true }));

// Find (or create from the plan template) the current-period tracker for a client.
// Also keeps add-on items in sync with the client's current purchases.
async function ensureTracker(clientId) {
  const period = currentPeriod();
  const client = await User.findById(clientId).select("plan service addons isFreeTrial");
  let tracker = await Tracker.findOne({ client: clientId, period });

  if (!tracker) {
    const service = client?.service || "marketing";
    const tier = client?.isFreeTrial ? "Trial" : planToTier(client?.plan);
    tracker = await Tracker.create({
      client: clientId, period, service, plan: tier,
      items: [...planDeliverables(service, tier), ...addonItems(client?.addons)],
    });
    return tracker;
  }

  // If the client's purchased service/plan is known and differs from the tracker,
  // and no manager has manually overridden it, follow the purchase.
  const userTier = client?.isFreeTrial ? "Trial" : (client?.plan ? planToTier(client.plan) : "");
  if (!tracker.manual && !client?.isFreeTrial && client?.service && (tracker.service !== client.service || (userTier && tracker.plan !== userTier))) {
    tracker.service = client.service;
    tracker.plan = userTier || tracker.plan;
    tracker.items = [...planDeliverables(tracker.service, tracker.plan), ...addonItems(client?.addons)];
    await tracker.save();
    return tracker;
  }

  // Sync add-on items into an existing tracker (add new ones, update totals) without losing progress.
  const wanted = addonItems(client?.addons);
  let changed = false;
  for (const w of wanted) {
    const existing = tracker.items.find((i) => i.key === w.key);
    if (!existing) { tracker.items.push(w); changed = true; }
    else if (existing.total !== w.total) { existing.total = w.total; changed = true; }
  }
  if (changed) await tracker.save();
  return tracker;
}

// Staff guard: admin → any; manager → assigned clients only.
async function staffCanAccess(req, clientId) {
  if (req.user.role === "admin") return true;
  const c = await User.findById(clientId).select("assignedManager");
  return !!c && String(c.assignedManager) === String(req.user.id);
}

/* ── GET /api/tracker/me ── (client) */
export const getMyTracker = async (req, res) => {
  try {
    const tracker = await ensureTracker(req.user.id);
    res.json({ success: true, data: tracker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/tracker/staff/:clientId ── (manager/admin) */
export const getStaffTracker = async (req, res) => {
  try {
    if (!(await staffCanAccess(req, req.params.clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const tracker = await ensureTracker(req.params.clientId);
    res.json({ success: true, data: tracker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── PUT /api/tracker/staff/:clientId/item ── (manager/admin)
   Body: { key, delta } or { key, done } — updates a deliverable's progress. */
export const updateItem = async (req, res) => {
  try {
    if (!(await staffCanAccess(req, req.params.clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const { key, delta, done } = req.body;
    const tracker = await ensureTracker(req.params.clientId);
    const item = tracker.items.find((i) => i.key === key);
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });

    let next = item.done;
    if (typeof done === "number") next = done;
    else if (typeof delta === "number") next = item.done + delta;
    item.done = Math.max(0, Math.min(item.total, next));

    const staff = await User.findById(req.user.id).select("name");
    tracker.updatedByName = staff?.name || "";
    tracker.manual = true;
    await tracker.save();
    res.json({ success: true, data: tracker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/tracker/staff/:clientId/reset ── (manager/admin)
   Set the tracker's service + tier and regenerate items from the template.
   Body: { service, tier } (both optional; falls back to existing/plan). */
export const resetTracker = async (req, res) => {
  try {
    if (!(await staffCanAccess(req, req.params.clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const period = currentPeriod();
    const existing = await Tracker.findOne({ client: req.params.clientId, period });
    const client = await User.findById(req.params.clientId).select("plan service addons");
    const service = req.body.service || existing?.service || client?.service || "marketing";
    const tier = req.body.tier || existing?.plan || planToTier(client?.plan);
    const tracker = await Tracker.findOneAndUpdate(
      { client: req.params.clientId, period },
      { service, plan: tier, manual: true, items: [...planDeliverables(service, tier), ...addonItems(client?.addons)] },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: tracker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
