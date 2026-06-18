import fs from "fs";
import path from "path";
import ScheduledPost from "../models/scheduledPost.model.js";
import User from "../models/user.model.js";
import { google } from "googleapis";
import { Readable } from "stream";
import { fileToUrl, urlToBuffer } from "../utils/upload.js";
import { notify, clientHandlerId } from "../utils/notify.js";

const GRAPH = "https://graph.facebook.com/v21.0";

// Map a stored media URL (…/uploads/<file>) back to its local disk path.
const localPathFromUrl = (url = "") => {
  const i = url.indexOf("/uploads/");
  return i === -1 ? null : path.join("uploads", url.slice(i + "/uploads/".length));
};

const mediaFrom = async (files = []) =>
  Promise.all((files || []).map(async (f) => ({
    url: await fileToUrl(f),
    type: f.mimetype.startsWith("video/") ? "video" : "image",
    name: f.originalname,
  })));

/* ── POST /api/scheduler/posts ── (client) — multipart with media[] */
export const createPost = async (req, res) => {
  try {
    let { caption, scheduledAt, platforms, requiresApproval } = req.body;
    // platforms can arrive as JSON string, comma list, or array
    if (typeof platforms === "string") {
      try { platforms = JSON.parse(platforms); } catch { platforms = platforms.split(",").map((s) => s.trim()).filter(Boolean); }
    }
    if (!Array.isArray(platforms) || !platforms.length) platforms = ["facebook"];
    const media = await mediaFrom(req.files);
    if ((!caption || !caption.trim()) && !media.length) {
      return res.status(400).json({ success: false, error: "Add a caption or media." });
    }
    const when = scheduledAt ? new Date(scheduledAt) : new Date();
    if (isNaN(when.getTime())) return res.status(400).json({ success: false, error: "Invalid date/time." });

    const needsApproval = requiresApproval === "true" || requiresApproval === true;
    const ytPrivacy = ["public", "unlisted", "private"].includes(req.body.ytPrivacy) ? req.body.ytPrivacy : "unlisted";
    const me = await User.findById(req.user.id).select("name");
    const post = await ScheduledPost.create({
      user: req.user.id,
      createdBy: req.user.id,
      createdByName: me?.name || "",
      createdByRole: "client",
      platforms,
      caption: caption || "",
      media,
      ytPrivacy,
      scheduledAt: when,
      requiresApproval: needsApproval,
      approvalStatus: needsApproval ? "pending" : "not_required",
    });
    res.json({ success: true, data: post });
  } catch (err) {
    console.error("createPost error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/scheduler/posts ── (client) */
export const listPosts = async (req, res) => {
  try {
    const posts = await ScheduledPost.find({ user: req.user.id }).sort({ scheduledAt: 1 }).limit(300);
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── DELETE /api/scheduler/posts/:id ── (client) */
export const deletePost = async (req, res) => {
  try {
    const post = await ScheduledPost.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ success: false, error: "Post not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Swap our localhost media URL for a publicly reachable one (Instagram fetches it).
function publicMediaUrl(url = "") {
  const base = process.env.MEDIA_BASE_URL;
  const server = process.env.SERVER_URL || "http://localhost:5001";
  return base ? url.replace(server, base) : url;
}

// Publish to Instagram (2-step: create media container → publish). Requires an image.
async function publishToInstagram(post, user) {
  const igId = user.instagram?.igId;
  const token = user.facebook?.pageAccessToken || user.facebook?.accessToken;
  if (!igId || !token) return { ok: false, error: "Instagram not connected" };
  const image = (post.media || []).find((m) => m.type === "image");
  if (!image) return { ok: false, error: "Instagram requires an image" };

  const imageUrl = publicMediaUrl(image.url);
  if (imageUrl.includes("localhost")) return { ok: false, error: "Set MEDIA_BASE_URL to a public URL for Instagram" };

  // 1) create media container
  const createBody = new URLSearchParams({ image_url: imageUrl, access_token: token });
  if (post.caption) createBody.set("caption", post.caption);
  let r = await fetch(`${GRAPH}/${igId}/media`, { method: "POST", body: createBody });
  let j = await r.json();
  if (!j.id) return { ok: false, error: j.error?.message || "IG container failed" };

  // 2) publish the container
  r = await fetch(`${GRAPH}/${igId}/media_publish`, { method: "POST", body: new URLSearchParams({ creation_id: j.id, access_token: token }) });
  j = await r.json();
  return j.id ? { ok: true, postId: j.id } : { ok: false, error: j.error?.message || "IG publish failed" };
}

// Publish to LinkedIn as the member via the "Share on LinkedIn" legacy API
// (/v2/ugcPosts for text, /v2/assets for image). Requires the w_member_social scope.
async function publishToLinkedIn(post, user) {
  const token = user.linkedin?.accessToken;
  const memberId = user.linkedin?.memberId;
  if (!token || !memberId) return { ok: false, error: "LinkedIn not connected" };
  const author = `urn:li:person:${memberId}`;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Restli-Protocol-Version": "2.0.0" };
  const text = post.caption || "";
  const image = (post.media || []).find((m) => m.type === "image");

  let mediaAsset = null;
  if (image) {
    let bytes;
    try { bytes = await urlToBuffer(image.url); } catch { return { ok: false, error: "Image not reachable" }; }
    const reg = await fetch("https://api.linkedin.com/v2/assets?action=registerUpload", {
      method: "POST", headers,
      body: JSON.stringify({ registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"], owner: author,
        serviceRelationships: [{ relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" }],
      } }),
    });
    const regJson = await reg.json().catch(() => ({}));
    const asset = regJson.value?.asset;
    const uploadUrl = regJson.value?.uploadMechanism?.["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]?.uploadUrl;
    if (!asset || !uploadUrl) return { ok: false, error: regJson.message || "LinkedIn image register failed" };
    const up = await fetch(uploadUrl, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: bytes });
    if (!up.ok) return { ok: false, error: `LinkedIn image upload failed (${up.status})` };
    mediaAsset = asset;
  }

  const shareContent = {
    shareCommentary: { text },
    shareMediaCategory: mediaAsset ? "IMAGE" : "NONE",
    ...(mediaAsset ? { media: [{ status: "READY", media: mediaAsset }] } : {}),
  };
  const r = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST", headers,
    body: JSON.stringify({
      author, lifecycleState: "PUBLISHED",
      specificContent: { "com.linkedin.ugc.ShareContent": shareContent },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });
  if (r.status === 201) return { ok: true, postId: r.headers.get("x-restli-id") || "" };
  const j = await r.json().catch(() => ({}));
  return { ok: false, error: j.message || `LinkedIn post failed (${r.status})` };
}

// Upload a video to YouTube (resumable upload via the Data API). Requires a video file.
async function publishToYouTube(post, user) {
  const yt = user.youtube;
  if (!yt?.connected) return { ok: false, error: "YouTube not connected" };
  const video = (post.media || []).find((m) => m.type === "video");
  if (!video) return { ok: false, error: "YouTube requires a video" };

  try {
    const bytes = await urlToBuffer(video.url); // works for Cloudinary or local URLs
    const client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALLBACK_URL);
    client.setCredentials({ access_token: yt.accessToken, refresh_token: yt.refreshToken, expiry_date: yt.expiryDate });
    const api = google.youtube({ version: "v3", auth: client });
    const title = (post.caption || "Untitled").split("\n")[0].slice(0, 100);
    const res = await api.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: { title, description: post.caption || "", categoryId: "22" },
        status: { privacyStatus: post.ytPrivacy || "unlisted", selfDeclaredMadeForKids: false },
      },
      media: { body: Readable.from(bytes) },
    });
    return res.data?.id ? { ok: true, postId: res.data.id } : { ok: false, error: "YouTube upload failed" };
  } catch (e) {
    return { ok: false, error: e.errors?.[0]?.message || e.message || "YouTube upload failed" };
  }
}

// Publish to a Facebook Page (text/link or photo).
// Photos are uploaded as binary (so it works even though our server is on
// localhost and Facebook can't fetch a localhost URL).
async function publishToFacebook(post, user) {
  const pageId = user.facebook?.pageId;
  const token = user.facebook?.pageAccessToken;
  if (!pageId || !token) return { ok: false, error: "Facebook Page not connected" };

  const image = (post.media || []).find((m) => m.type === "image");

  // Text / link post
  if (!image) {
    const body = new URLSearchParams({ access_token: token });
    if (post.caption) body.set("message", post.caption);
    const r = await fetch(`${GRAPH}/${pageId}/feed`, { method: "POST", body });
    const j = await r.json();
    return j.id || j.post_id ? { ok: true, postId: j.post_id || j.id } : { ok: false, error: j.error?.message || "Facebook publish failed" };
  }

  // Photo post.
  // If the image is publicly reachable (Cloudinary / production URL), let Facebook
  // fetch it via `url`. For localhost, upload the raw bytes via multipart `source`.
  const isPublic = /^https?:\/\//.test(image.url) && !image.url.includes("localhost");
  let r;
  if (isPublic) {
    const body = new URLSearchParams({ access_token: token, url: image.url });
    if (post.caption) body.set("caption", post.caption);
    r = await fetch(`${GRAPH}/${pageId}/photos`, { method: "POST", body });
  } else {
    const localPath = localPathFromUrl(image.url);
    if (!localPath || !fs.existsSync(localPath)) return { ok: false, error: "Image file not found on server" };
    const buf = fs.readFileSync(localPath);
    const ext = path.extname(localPath).toLowerCase().replace(".", "");
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : ext === "webp" ? "image/webp" : ext === "gif" ? "image/gif" : "image/png";
    const fd = new FormData();
    fd.append("access_token", token);
    if (post.caption) fd.append("caption", post.caption);
    fd.append("source", new Blob([buf], { type: mime }), path.basename(localPath));
    r = await fetch(`${GRAPH}/${pageId}/photos`, { method: "POST", body: fd });
  }
  const j = await r.json();
  return j.id || j.post_id ? { ok: true, postId: j.post_id || j.id } : { ok: false, error: j.error?.message || "Facebook photo publish failed" };
}

/* Background worker: publish due posts that are approved (or don't need approval). */
export async function publishDuePosts() {
  const due = await ScheduledPost.find({
    status: "pending",
    scheduledAt: { $lte: new Date() },
    approvalStatus: { $in: ["not_required", "approved"] },
  }).limit(20);

  for (const post of due) {
    try {
      const user = await User.findById(post.user).select("facebook instagram linkedin youtube");
      const results = []; // { platform, ok, postId?, error? }

      if (post.platforms.includes("facebook")) results.push({ platform: "facebook", ...(await publishToFacebook(post, user)) });
      if (post.platforms.includes("instagram")) results.push({ platform: "instagram", ...(await publishToInstagram(post, user)) });
      if (post.platforms.includes("linkedin")) results.push({ platform: "linkedin", ...(await publishToLinkedIn(post, user)) });
      if (post.platforms.includes("youtube")) results.push({ platform: "youtube", ...(await publishToYouTube(post, user)) });

      const anyOk = results.some((r) => r.ok);
      const firstOk = results.find((r) => r.ok);
      const fails = results.filter((r) => !r.ok).map((r) => `${r.platform}: ${r.error}`);
      post.status = anyOk ? "published" : "failed";
      post.platformPostId = firstOk?.postId || "";
      post.error = fails.length ? fails.join(" · ") : "";
      post.publishedAt = new Date();
      await post.save();
      console.log(`📤 post ${post._id} → ${post.status}${post.error ? " (" + post.error + ")" : ""}`);
    } catch (e) {
      post.status = "failed"; post.error = e.message; await post.save();
      console.error("publishDuePosts error:", e.message);
    }
  }
}

// ── Analytics helpers ──
// Build a small deterministic time series for the growth chart (used when a
// platform has no live time-series API available yet).
function series(seed, base, points = 14) {
  let v = base;
  const out = [];
  let s = seed;
  for (let i = 0; i < points; i++) {
    s = (s * 9301 + 49297) % 233280;
    const delta = Math.round(((s / 233280) - 0.45) * (base * 0.01));
    v = Math.max(0, v + delta);
    out.push(v);
  }
  return out;
}
const hash = (str = "") => [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

async function facebookAnalytics(user) {
  const pageId = user.facebook?.pageId;
  const token = user.facebook?.pageAccessToken || user.facebook?.accessToken;
  if (!pageId) return null;
  let followers = null, impressions = null, engagement = null, views = null;
  try {
    const fr = await fetch(`${GRAPH}/${pageId}?` + new URLSearchParams({ fields: "followers_count,fan_count", access_token: token }));
    const fj = await fr.json();
    followers = fj.followers_count ?? fj.fan_count ?? null;
  } catch { /* */ }
  try {
    const ir = await fetch(`${GRAPH}/${pageId}/insights?` + new URLSearchParams({ metric: "page_impressions,page_post_engagements,page_views_total", period: "days_28", access_token: token }));
    const ij = await ir.json();
    for (const m of ij.data || []) {
      const last = (m.values || []).slice(-1)[0]?.value ?? 0;
      if (m.name === "page_impressions") impressions = last;
      if (m.name === "page_post_engagements") engagement = last;
      if (m.name === "page_views_total") views = last;
    }
  } catch { /* */ }
  const f = followers ?? 0;
  return {
    connected: true, live: true, name: user.facebook.pageName,
    cards: [
      { label: "Followers", value: followers ?? "—", up: true },
      { label: "Views", value: views ?? "—", up: true },
      { label: "Page visits", value: impressions ?? "—", up: true },
      { label: "Engagement", value: engagement ?? "—", up: true },
    ],
    chart: series(hash(pageId), f || 1000),
  };
}

async function youtubeAnalytics(user) {
  const yt = user.youtube;
  if (!yt?.connected) return null;
  try {
    const client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALLBACK_URL);
    client.setCredentials({ access_token: yt.accessToken, refresh_token: yt.refreshToken, expiry_date: yt.expiryDate });
    const api = google.youtube({ version: "v3", auth: client });
    const me = await api.channels.list({ part: "statistics,snippet", mine: true });
    const ch = me.data.items?.[0];
    if (!ch) return { connected: true, live: false, name: yt.channelTitle, cards: [], chart: [] };
    const s = ch.statistics || {};
    const subs = Number(s.subscriberCount || 0);
    return {
      connected: true, live: true, name: ch.snippet?.title || yt.channelTitle,
      cards: [
        { label: "Subscribers", value: subs, up: true },
        { label: "Total Views", value: Number(s.viewCount || 0), up: true },
        { label: "Videos", value: Number(s.videoCount || 0), up: true },
        { label: "Comments", value: Number(s.commentCount || 0), up: true },
      ],
      chart: series(hash(ch.id || "yt"), subs || 500),
    };
  } catch (e) {
    console.warn("youtube analytics:", e.message);
    return { connected: true, live: false, name: yt.channelTitle, cards: [], chart: [] };
  }
}

async function instagramAnalytics(user) {
  const igId = user.instagram?.igId;
  const token = user.facebook?.pageAccessToken || user.facebook?.accessToken;
  if (!igId || !token) return null;
  let followers = null, media = null, reach = null, impressions = null;
  try {
    const r = await fetch(`${GRAPH}/${igId}?` + new URLSearchParams({ fields: "followers_count,media_count", access_token: token }));
    const j = await r.json();
    followers = j.followers_count ?? null;
    media = j.media_count ?? null;
  } catch { /* */ }
  // Insights need instagram_manage_insights (best-effort).
  try {
    const r = await fetch(`${GRAPH}/${igId}/insights?` + new URLSearchParams({ metric: "reach", period: "days_28", access_token: token }));
    const j = await r.json();
    for (const m of j.data || []) {
      const last = (m.values || []).slice(-1)[0]?.value ?? 0;
      if (m.name === "reach") reach = last;
      if (m.name === "impressions") impressions = last;
    }
  } catch { /* */ }
  const f = followers ?? 0;
  return {
    connected: true, live: followers != null,
    name: user.instagram.username ? `@${user.instagram.username}` : "Instagram",
    cards: [
      { label: "Followers", value: followers ?? "—", up: true },
      { label: "Posts", value: media ?? "—", up: true },
      { label: "Reach (28d)", value: reach ?? "—", up: true },
      { label: "Impressions", value: impressions ?? "—", up: true },
    ],
    chart: series(hash(igId), f || 1000),
  };
}

// Placeholder analytics for platforms without a live API yet (Instagram, LinkedIn).
function placeholderAnalytics(name, connected, seedKey) {
  const h = hash(seedKey);
  const base = 800 + (h % 4000);
  return {
    connected, live: false, name,
    cards: [
      { label: "Followers", value: base, up: h % 2 === 0 },
      { label: "Reach", value: 1000 + (h % 9000), up: h % 3 === 0 },
      { label: "Engagement", value: 50 + (h % 900), up: h % 2 === 1 },
      { label: "Posts", value: 10 + (h % 90), up: true },
    ],
    chart: series(h, base),
  };
}

/* ── GET /api/scheduler/analytics?platform=facebook ── (client) */
export const getAnalytics = async (req, res) => {
  try {
    const platform = (req.query.platform || "facebook").toLowerCase();
    const user = await User.findById(req.user.id).select("facebook instagram linkedin youtube");
    let data;
    if (platform === "facebook") data = (await facebookAnalytics(user)) || placeholderAnalytics("Facebook", !!user.facebook?.connected, "fb" + req.user.id);
    else if (platform === "youtube") data = (await youtubeAnalytics(user)) || placeholderAnalytics("YouTube", !!user.youtube?.connected, "yt" + req.user.id);
    else if (platform === "instagram") data = (await instagramAnalytics(user)) || placeholderAnalytics(user.instagram?.username ? `@${user.instagram.username}` : "Instagram", !!user.instagram?.connected, "ig" + req.user.id);
    else if (platform === "linkedin") data = placeholderAnalytics(user.linkedin?.name || "LinkedIn", !!user.linkedin?.connected, "li" + req.user.id);
    else data = placeholderAnalytics(platform, false, platform);
    // backward-compat alias for older callers that read `metrics`
    if (data && data.cards) data.metrics = data.cards;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── PUT /api/scheduler/posts/:id/approval ── (client approves/rejects their post) */
export const decideApproval = async (req, res) => {
  try {
    const { decision } = req.body; // "approved" | "rejected"
    if (!["approved", "rejected"].includes(decision)) {
      return res.status(400).json({ success: false, error: "Invalid decision" });
    }
    const post = await ScheduledPost.findOne({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ success: false, error: "Post not found" });
    if (post.approvalStatus !== "pending") return res.status(400).json({ success: false, error: "Nothing to approve" });
    const me = await User.findById(req.user.id).select("name");
    post.approvalStatus = decision;
    post.approvedBy = req.user.id;
    post.approvedByName = me?.name || "";
    // rejected posts won't publish; mark failed so they leave the queue
    if (decision === "rejected") { post.status = "failed"; post.error = "Rejected by client"; }
    await post.save();
    if (post.createdBy) notify(post.createdBy, { type: "approval", title: `Client ${decision} a post`, body: `${me?.name || "Client"}: "${(post.caption || "").slice(0, 60)}"`, link: "/admin/scheduling" });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Staff guard: admin → any client; manager → only assigned clients.
async function staffCanAccessClient(req, clientId) {
  if (req.user.role === "admin") return true;
  const c = await User.findById(clientId).select("assignedManager");
  return !!c && String(c.assignedManager) === String(req.user.id);
}

/* ── POST /api/scheduler/staff/posts ── (manager/admin compose FOR a client) */
export const staffCreatePost = async (req, res) => {
  try {
    let { caption, scheduledAt, platforms, clientId } = req.body;
    if (!clientId) return res.status(400).json({ success: false, error: "clientId is required" });
    if (!(await staffCanAccessClient(req, clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    if (typeof platforms === "string") {
      try { platforms = JSON.parse(platforms); } catch { platforms = platforms.split(",").map((s) => s.trim()).filter(Boolean); }
    }
    if (!Array.isArray(platforms) || !platforms.length) platforms = ["facebook"];
    const media = await mediaFrom(req.files);
    if ((!caption || !caption.trim()) && !media.length) return res.status(400).json({ success: false, error: "Add a caption or media." });
    const when = scheduledAt ? new Date(scheduledAt) : new Date();
    if (isNaN(when.getTime())) return res.status(400).json({ success: false, error: "Invalid date/time." });

    const staff = await User.findById(req.user.id).select("name role");
    const ytPrivacy = ["public", "unlisted", "private"].includes(req.body.ytPrivacy) ? req.body.ytPrivacy : "unlisted";
    // Manager-created posts ALWAYS require the client's approval before publishing.
    const post = await ScheduledPost.create({
      user: clientId,
      createdBy: req.user.id,
      createdByName: staff?.name || "",
      createdByRole: staff?.role || req.user.role,
      platforms, caption: caption || "", media, ytPrivacy, scheduledAt: when,
      requiresApproval: true,
      approvalStatus: "pending",
    });
    notify(clientId, { type: "approval", title: "New post awaiting your approval", body: caption ? caption.slice(0, 80) : "Tap to review", link: "/dashboard/scheduling" });
    res.json({ success: true, data: post });
  } catch (err) {
    console.error("staffCreatePost error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/scheduler/staff/posts?clientId= ── (manager/admin) */
export const staffListPosts = async (req, res) => {
  try {
    const { clientId } = req.query;
    if (!clientId) return res.status(400).json({ success: false, error: "clientId is required" });
    if (!(await staffCanAccessClient(req, clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const posts = await ScheduledPost.find({ user: clientId }).sort({ scheduledAt: 1 }).limit(300);
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── DELETE /api/scheduler/staff/posts/:id ── (manager/admin) */
export const staffDeletePost = async (req, res) => {
  try {
    const post = await ScheduledPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: "Post not found" });
    if (!(await staffCanAccessClient(req, post.user))) return res.status(403).json({ success: false, error: "Not your client" });
    await post.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/scheduler/staff/analytics?clientId=&platform= ── (manager/admin) */
export const staffAnalytics = async (req, res) => {
  try {
    const { clientId } = req.query;
    const platform = (req.query.platform || "facebook").toLowerCase();
    if (!clientId) return res.status(400).json({ success: false, error: "clientId is required" });
    if (!(await staffCanAccessClient(req, clientId))) return res.status(403).json({ success: false, error: "Not your client" });
    const user = await User.findById(clientId).select("facebook instagram linkedin youtube");
    let data;
    if (platform === "facebook") data = (await facebookAnalytics(user)) || placeholderAnalytics("Facebook", !!user.facebook?.connected, "fb" + clientId);
    else if (platform === "youtube") data = (await youtubeAnalytics(user)) || placeholderAnalytics("YouTube", !!user.youtube?.connected, "yt" + clientId);
    else if (platform === "instagram") data = (await instagramAnalytics(user)) || placeholderAnalytics(user.instagram?.username ? `@${user.instagram.username}` : "Instagram", !!user.instagram?.connected, "ig" + clientId);
    else if (platform === "linkedin") data = placeholderAnalytics(user.linkedin?.name || "LinkedIn", !!user.linkedin?.connected, "li" + clientId);
    else data = placeholderAnalytics(platform, false, platform);
    if (data && data.cards) data.metrics = data.cards;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/scheduler/staff/overview ── (manager/admin) — assigned clients + counts */
export const staffOverview = async (req, res) => {
  try {
    const filter = { role: "client" };
    if (req.user.role === "manager") filter.assignedManager = req.user.id;
    const clients = await User.find(filter).select("name email facebook instagram linkedin youtube").lean();
    const ids = clients.map((c) => c._id);
    const posts = await ScheduledPost.find({ user: { $in: ids } }).select("user status approvalStatus").lean();
    const byClient = (cid) => posts.filter((p) => String(p.user) === String(cid));
    const data = clients.map((c) => {
      const cp = byClient(c._id);
      const connected = ["facebook", "instagram", "linkedin", "youtube"].filter((k) => c[k]?.connected).length;
      return {
        id: c._id, name: c.name, email: c.email,
        connected,
        scheduled: cp.filter((p) => p.status === "pending").length,
        published: cp.filter((p) => p.status === "published").length,
        pendingApproval: cp.filter((p) => p.approvalStatus === "pending").length,
      };
    });
    res.json({ success: true, data: { clients: data, totalPendingApproval: data.reduce((a, c) => a + c.pendingApproval, 0) } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/scheduler/posts/:id/feedback ── (client)
   Sends feedback (text + the post's image) into the client↔team chat thread. */
export const submitPostFeedback = async (req, res) => {
  try {
    const Message = (await import("../models/message.model.js")).default;
    const post = await ScheduledPost.findOne({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ success: false, error: "Post not found" });
    const { text } = req.body;
    const me = await User.findById(req.user.id).select("name");
    const image = (post.media || []).find((m) => m.type === "image");
    await Message.create({
      client: req.user.id,
      sender: "client",
      senderName: me?.name || "",
      text: `📋 Feedback on scheduled post${post.caption ? ` "${post.caption.slice(0, 60)}"` : ""}:\n${text || ""}`.trim(),
      ...(image ? { fileUrl: image.url, fileName: image.name || "post.jpg", fileType: "image" } : {}),
      readByClient: true,
    });
    // Feedback means "not approved" → take it OUT of the scheduling queue (only Accept schedules).
    if (post.approvalStatus === "pending") {
      post.approvalStatus = "rejected";
      post.status = "failed";
      post.error = "Changes requested by client";
      await post.save();
    }
    const handler = await clientHandlerId(req.user.id);
    if (handler) notify(handler, { type: "feedback", title: `${me?.name || "Client"} requested changes`, body: (text || "").slice(0, 80), link: "/admin/chat" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/scheduler/summary ── (client) — connection + follower overview */
export const getSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("facebook instagram linkedin youtube isFreeTrial");
    const connected = {
      facebook: !!user.facebook?.connected,
      instagram: !!user.instagram?.connected,
      linkedin: !!user.linkedin?.connected,
      youtube: !!user.youtube?.connected,
    };
    res.json({ success: true, data: { connected, freeTrial: !!user.isFreeTrial } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
