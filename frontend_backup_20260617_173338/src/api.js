// Central API helper for talking to the backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// ── Access token helpers (kept in localStorage) ──
export const getAccessToken = () => localStorage.getItem("accessToken");
export const setAccessToken = (token) => localStorage.setItem("accessToken", token);
export const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

// Low-level fetch that attaches the access token if we have one.
async function rawRequest(path, options = {}, useAuth = true) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (useAuth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`${API_URL}${path}`, {
    credentials: "include", // send/receive the httpOnly refresh cookie
    ...options,
    headers,
  });
}

// ── Silent refresh: ask the backend for a new access token using the cookie ──
// We keep a single in-flight refresh promise so many parallel 401s only
// trigger ONE /refresh call (avoids a refresh storm).
let refreshPromise = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Session expired");
        const data = await res.json();
        setAccessToken(data.accessToken);
        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

/**
 * Main request wrapper.
 * If a call returns 401 (access token expired), it silently calls /refresh
 * once, then retries the original request with the new token.
 */
async function request(path, options = {}, { auth = true, _retried = false } = {}) {
  const res = await rawRequest(path, options, auth);

  // Token expired → try a silent refresh + one retry
  if (res.status === 401 && auth && !_retried && path !== "/auth/refresh") {
    try {
      await refreshAccessToken();
      return request(path, options, { auth, _retried: true });
    } catch {
      clearAuth(); // refresh failed → the 7-day session is truly over
      throw new Error("Session expired. Please log in again.");
    }
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

// ── Public, unauthenticated endpoints (no token / no auto-refresh needed) ──
export const submitContact = (payload) =>
  request("/contact", { method: "POST", body: JSON.stringify(payload) }, { auth: false });

export const subscribeNewsletter = (email) =>
  request("/subscribe", { method: "POST", body: JSON.stringify({ email }) }, { auth: false });

export const fetchBlogs = () => request("/blogs", {}, { auth: false });

export const fetchBlogBySlug = (slug) => request(`/blogs/${slug}`, {}, { auth: false });

// ── Auth ──
export const signupUser = (payload) =>
  request("/auth/signup", { method: "POST", body: JSON.stringify(payload) }, { auth: false });

export const loginUser = (payload) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(payload) }, { auth: false });

export const resendVerification = (email) =>
  request("/auth/resend-verification", { method: "POST", body: JSON.stringify({ email }) }, { auth: false });

export const forgotPassword = (email) =>
  request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }, { auth: false });

export const resetPassword = (token, password) =>
  request("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, password }) }, { auth: false });

export const logoutUser = async () => {
  try {
    await request("/auth/logout", { method: "POST" }, { auth: false });
  } finally {
    clearAuth();
  }
};

// ── Admin auth (separate token storage so it doesn't clash with client) ──
export const getAdminToken = () => localStorage.getItem("adminAccessToken");
export const clearAdminAuth = () => {
  localStorage.removeItem("adminAccessToken");
  localStorage.removeItem("adminUser");
};
export const adminLogin = (payload) =>
  request("/auth/admin/login", { method: "POST", body: JSON.stringify(payload) }, { auth: false });
export const adminLogout = async () => {
  try {
    await request("/auth/admin/logout", { method: "POST" }, { auth: false });
  } finally {
    clearAdminAuth();
  }
};

// Use this for any future protected request — it auto-refreshes behind the scenes.
export const authedRequest = (path, options = {}) => request(path, options, { auth: true });

// Token-aware fetch with auto-refresh. role = "client" | "admin".
// Client refreshes via /auth/refresh (refreshToken cookie);
// admin via /auth/admin/refresh (adminRefreshToken cookie) — separate cookies
// so both sessions can run in the same browser without clashing.
async function roleFetch(path, role, options = {}, _retried = false) {
  const token = role === "admin" ? getAdminToken() : getAccessToken();
  const isForm = options.body instanceof FormData;
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }), // let browser set multipart boundary
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401 && !_retried) {
    const refreshPath = role === "admin" ? "/auth/admin/refresh" : "/auth/refresh";
    const r = await fetch(`${API_URL}${refreshPath}`, { method: "POST", credentials: "include" });
    if (r.ok) {
      const d = await r.json();
      if (role === "admin") localStorage.setItem("adminAccessToken", d.accessToken);
      else setAccessToken(d.accessToken);
      return roleFetch(path, role, options, true);
    }
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

// ── Profile (client) ──
export const getProfile = () => roleFetch("/users/me", "client");
export const markTourSeen = () => roleFetch("/users/me/tour", "client", { method: "POST" });
export const saveOnboarding = (payload) => roleFetch("/users/me/onboarding", "client", { method: "POST", body: JSON.stringify(payload) });

// ── Notifications (role = "client" | "admin") ──
export const getNotifications = (role = "client") => roleFetch("/notifications", role);
export const markNotificationsRead = (role = "client") => roleFetch("/notifications/read", role, { method: "PUT" });
export const dismissNotification = (id, role = "client") => roleFetch(`/notifications/${id}`, role, { method: "DELETE" });
export const broadcastNotification = (payload) => roleFetch("/notifications/broadcast", "admin", { method: "POST", body: JSON.stringify(payload) });
export const updateProfile = (payload) =>
  roleFetch("/users/me", "client", { method: "PUT", body: JSON.stringify(payload) });

// avatar upload — multipart, so we bypass the JSON content-type
export const uploadAvatar = async (file) => {
  const fd = new FormData();
  fd.append("avatar", file);
  const res = await fetch(`${API_URL}/users/me/avatar`, {
    method: "POST",
    credentials: "include",
    headers: { Authorization: `Bearer ${getAccessToken()}` }, // no Content-Type → browser sets multipart boundary
    body: fd,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data;
};

// helper: build the request body (FormData if a file is attached, else JSON)
const chatBody = (text, file) => {
  if (file) {
    const fd = new FormData();
    if (text) fd.append("text", text);
    fd.append("file", file);
    return fd;
  }
  return JSON.stringify({ text });
};

// ── Stripe billing ──
// Logged-in users → authed call (auto-refreshes the token so the backend always
// recognises them → success goes to the dashboard).
// Guests → plain call with their email → success goes to signup (email prefilled).
const guestCheckout = async (email, plan, addons, service) => {
  const res = await fetch(`${API_URL}/stripe/create-checkout-session`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, plan, addons, service }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Could not start checkout");
  return data;
};

export const createCheckoutSession = async (email, plan, addons = [], service = "") => {
  if (getAccessToken()) {
    try {
      return await roleFetch("/stripe/create-checkout-session", "client", {
        method: "POST",
        body: JSON.stringify({ email, plan, addons, service }),
      });
    } catch {
      // session fully expired → treat as guest if we have an email
      clearAuth();
      if (email) return guestCheckout(email, plan, addons, service);
      throw new Error("Your session expired. Please log in again.");
    }
  }
  return guestCheckout(email, plan, addons, service);
};
export const createPortalSession = () => roleFetch("/stripe/create-portal-session", "client", { method: "POST" });
export const getSubscription = () => roleFetch("/stripe/subscription", "client");

// ── Storefront (one-time add-ons) ──
export const getStore = () => roleFetch("/stripe/store", "client");
export const createAddonCheckout = (addons) => roleFetch("/stripe/addon-checkout", "client", { method: "POST", body: JSON.stringify({ addons }) });
export const confirmAddon = (sessionId) => roleFetch("/stripe/addon-confirm", "client", { method: "POST", body: JSON.stringify({ sessionId }) });

// ── Banners ──
export const getActiveBanners = () => roleFetch("/banners/active", "client");
export const adminListBanners = () => roleFetch("/banners", "admin");
export const adminCreateBanner = (formData) => roleFetch("/banners", "admin", { method: "POST", body: formData });
export const adminToggleBanner = (id) => roleFetch(`/banners/${id}`, "admin", { method: "PUT" });
export const adminDeleteBanner = (id) => roleFetch(`/banners/${id}`, "admin", { method: "DELETE" });

// ── YouTube (Google OAuth) connection ──
export const getYouTubeAuthUrl = () => roleFetch("/auth/youtube/url", "client");
export const getYouTubeStatus = () => roleFetch("/auth/youtube/status", "client");
export const disconnectYouTube = () => roleFetch("/auth/youtube/disconnect", "client", { method: "POST" });
export const getYouTubeAnalytics = () => roleFetch("/auth/youtube/analytics", "client");

// ── Meta (Facebook + Instagram) connection ──
export const getMetaAuthUrl = () => roleFetch("/auth/meta/url", "client");
export const getMetaStatus = () => roleFetch("/auth/meta/status", "client");
export const disconnectMeta = () => roleFetch("/auth/meta/disconnect", "client", { method: "POST" });

// ── LinkedIn connection ──
export const getLinkedInAuthUrl = () => roleFetch("/auth/linkedin/url", "client");
export const getLinkedInStatus = () => roleFetch("/auth/linkedin/status", "client");
export const disconnectLinkedIn = () => roleFetch("/auth/linkedin/disconnect", "client", { method: "POST" });

// ── Scheduler (posts, analytics, summary) ──
export const listScheduledPosts = () => roleFetch("/scheduler/posts", "client");
// Create a post — FormData (caption, platforms[], media files, scheduledAt, requiresApproval)
export const createScheduledPost = (formData) =>
  roleFetch("/scheduler/posts", "client", { method: "POST", body: formData });
export const deleteScheduledPost = (id) =>
  roleFetch(`/scheduler/posts/${id}`, "client", { method: "DELETE" });
export const getSchedulerAnalytics = (platform = "facebook") =>
  roleFetch(`/scheduler/analytics?platform=${encodeURIComponent(platform)}`, "client");
export const getSchedulerSummary = () => roleFetch("/scheduler/summary", "client");
export const decidePostApproval = (id, decision) =>
  roleFetch(`/scheduler/posts/${id}/approval`, "client", { method: "PUT", body: JSON.stringify({ decision }) });
export const submitPostFeedback = (id, text) =>
  roleFetch(`/scheduler/posts/${id}/feedback`, "client", { method: "POST", body: JSON.stringify({ text }) });
// back-compat (Home page)
export const getFacebookAnalytics = () => roleFetch("/scheduler/analytics?platform=facebook", "client");

// ── Staff scheduling (manager/admin compose for a client) ──
export const staffSchedulerOverview = () => roleFetch("/scheduler/staff/overview", "admin");
export const staffListClientPosts = (clientId) => roleFetch(`/scheduler/staff/posts?clientId=${clientId}`, "admin");
export const staffCreateClientPost = (formData) => roleFetch("/scheduler/staff/posts", "admin", { method: "POST", body: formData });
export const staffDeleteClientPost = (id) => roleFetch(`/scheduler/staff/posts/${id}`, "admin", { method: "DELETE" });
export const staffClientAnalytics = (clientId, platform = "facebook") =>
  roleFetch(`/scheduler/staff/analytics?clientId=${clientId}&platform=${platform}`, "admin");

// ── Tickets ──
// Client side
export const clientCreateTicket = (formData) =>
  roleFetch("/tickets/me", "client", { method: "POST", body: formData }); // FormData (files)
export const clientGetTickets = () => roleFetch("/tickets/me", "client");
export const clientGetTicket = (id) => roleFetch(`/tickets/me/${id}`, "client");
export const clientReplyTicket = (id, formData) =>
  roleFetch(`/tickets/me/${id}/reply`, "client", { method: "POST", body: formData });
// Staff side (admin or manager → uses admin token)
export const staffGetTickets = () => roleFetch("/tickets", "admin");
export const staffGetTicket = (id) => roleFetch(`/tickets/${id}`, "admin");
export const staffReplyTicket = (id, formData) =>
  roleFetch(`/tickets/${id}/reply`, "admin", { method: "POST", body: formData });
export const staffUpdateTicketStatus = (id, status) =>
  roleFetch(`/tickets/${id}/status`, "admin", { method: "PUT", body: JSON.stringify({ status }) });

// ── Articles (Help) ──
// Reading works for any logged-in role. We try the client token first, then admin.
export const getArticles = async (role = "client") => roleFetch("/articles", role);
export const getArticle = async (id, role = "client") => roleFetch(`/articles/${id}`, role);
export const createArticle = (formData) =>
  roleFetch("/articles", "admin", { method: "POST", body: formData }); // FormData (cover)
export const deleteArticle = (id) => roleFetch(`/articles/${id}`, "admin", { method: "DELETE" });

// ── Deliverables tracker ──
export const getMyTracker = () => roleFetch("/tracker/me", "client");
export const staffGetTracker = (clientId) => roleFetch(`/tracker/staff/${clientId}`, "admin");
export const staffUpdateTrackerItem = (clientId, payload) =>
  roleFetch(`/tracker/staff/${clientId}/item`, "admin", { method: "PUT", body: JSON.stringify(payload) });
export const staffResetTracker = (clientId, payload = {}) =>
  roleFetch(`/tracker/staff/${clientId}/reset`, "admin", { method: "POST", body: JSON.stringify(payload) });

export const adminOverview = () => roleFetch("/admin/overview", "admin");

// ── Admin: managers & client assignment ──
export const adminCreateManager = (payload) =>
  roleFetch("/admin/managers", "admin", { method: "POST", body: JSON.stringify(payload) });
export const adminListManagers = () => roleFetch("/admin/managers", "admin");
export const adminListClients = () => roleFetch("/admin/clients", "admin");
export const adminAssignClient = (clientId, managerId) =>
  roleFetch(`/admin/clients/${clientId}/assign`, "admin", { method: "PUT", body: JSON.stringify({ managerId }) });
export const adminResetManagerPassword = (id, password) =>
  roleFetch(`/admin/managers/${id}/password`, "admin", { method: "PUT", body: JSON.stringify({ password }) });
export const adminDeleteManager = (id) =>
  roleFetch(`/admin/managers/${id}`, "admin", { method: "DELETE" });

// ── Files (Google Drive) ──
export const uploadClientFile = (file, folderType) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folderType", folderType);
  return roleFetch("/files", "client", { method: "POST", body: fd });
};
export const getMyFiles = () => roleFetch("/files/me", "client");
export const adminGetAllFiles = () => roleFetch("/files/all", "admin");
export const adminUploadForClient = (clientId, file, folderType) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folderType", folderType);
  return roleFetch(`/files/admin/${clientId}`, "admin", { method: "POST", body: fd });
};

// ── Chat: client side ──
export const clientGetMessages = () => roleFetch("/messages/me", "client");
export const clientSendMessage = (text, file) =>
  roleFetch("/messages/me", "client", { method: "POST", body: chatBody(text, file) });

export const clientScheduleMeeting = (payload) =>
  roleFetch("/messages/me/meeting", "client", { method: "POST", body: JSON.stringify(payload) });

// ── Chat: admin side ──
export const adminGetConversations = () => roleFetch("/messages/conversations", "admin");
export const adminGetMessages = (clientId) => roleFetch(`/messages/${clientId}`, "admin");
export const adminSendMessage = (clientId, text, file) =>
  roleFetch(`/messages/${clientId}`, "admin", { method: "POST", body: chatBody(text, file) });
export const adminScheduleMeeting = (clientId, payload) =>
  roleFetch(`/messages/${clientId}/meeting`, "admin", { method: "POST", body: JSON.stringify(payload) });

export default {
  submitContact, subscribeNewsletter, fetchBlogs, fetchBlogBySlug,
  signupUser, loginUser, logoutUser, resendVerification, forgotPassword, resetPassword, authedRequest,
  getAccessToken, setAccessToken, clearAuth,
  adminLogin, adminLogout, getAdminToken, clearAdminAuth,
  clientGetMessages, clientSendMessage,
  adminGetConversations, adminGetMessages, adminSendMessage,
  getProfile, updateProfile, uploadAvatar,
  clientScheduleMeeting, adminScheduleMeeting,
  uploadClientFile, getMyFiles, adminGetAllFiles, adminUploadForClient,
  adminCreateManager, adminListManagers, adminListClients, adminAssignClient,
  adminResetManagerPassword, adminDeleteManager,
  createCheckoutSession, createPortalSession, getSubscription,
};
