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
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(options.headers || {}) },
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

// ── Chat: client side ──
export const clientGetMessages = () => roleFetch("/messages/me", "client");
export const clientSendMessage = (text) =>
  roleFetch("/messages/me", "client", { method: "POST", body: JSON.stringify({ text }) });

// ── Chat: admin side ──
export const adminGetConversations = () => roleFetch("/messages/conversations", "admin");
export const adminGetMessages = (clientId) => roleFetch(`/messages/${clientId}`, "admin");
export const adminSendMessage = (clientId, text) =>
  roleFetch(`/messages/${clientId}`, "admin", { method: "POST", body: JSON.stringify({ text }) });

export default {
  submitContact, subscribeNewsletter, fetchBlogs, fetchBlogBySlug,
  signupUser, loginUser, logoutUser, resendVerification, forgotPassword, resetPassword, authedRequest,
  getAccessToken, setAccessToken, clearAuth,
  adminLogin, adminLogout, getAdminToken, clearAdminAuth,
  clientGetMessages, clientSendMessage,
  adminGetConversations, adminGetMessages, adminSendMessage,
};
