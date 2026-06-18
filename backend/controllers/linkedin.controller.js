import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const AUTH = "https://www.linkedin.com/oauth/v2/authorization";
const TOKEN = "https://www.linkedin.com/oauth/v2/accessToken";
const USERINFO = "https://api.linkedin.com/v2/userinfo"; // OpenID Connect

const CLIENT_URL = () => process.env.CLIENT_URL || "http://localhost:5173";

// "Sign In with LinkedIn using OpenID Connect" product scopes.
// Override via LINKEDIN_SCOPES in .env (space-separated) if you add more.
const SCOPES = process.env.LINKEDIN_SCOPES || "openid profile email";

/* ── GET /api/auth/linkedin/url ── (client auth required) */
export const getLinkedInAuthUrl = (req, res) => {
  try {
    const state = jwt.sign({ sub: req.user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.LINKEDIN_CLIENT_ID,
      redirect_uri: process.env.LINKEDIN_CALLBACK_URL, // must match the LinkedIn app config
      state,
      scope: SCOPES,
    });
    res.json({ success: true, url: `${AUTH}?${params.toString()}` });
  } catch (err) {
    console.error("linkedin auth url error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /auth/linkedin/callback ── (public — LinkedIn redirects here) */
export const linkedinCallback = async (req, res) => {
  const back = (status) => res.redirect(`${CLIENT_URL()}/dashboard/scheduling?linkedin=${status}`);
  try {
    const { code, state, error } = req.query;
    if (error || !code || !state) return back("error");

    let userId;
    try { userId = jwt.verify(state, process.env.ACCESS_TOKEN_SECRET).sub; }
    catch { return back("error"); }
    const user = await User.findById(userId);
    if (!user) return back("error");

    // 1) Exchange code → access token
    const tokenRes = await fetch(TOKEN, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
    });
    const tokenJson = await tokenRes.json();
    if (!tokenJson.access_token) {
      console.warn("linkedin token exchange failed:", JSON.stringify(tokenJson));
      return back("error");
    }
    const expiryDate = tokenJson.expires_in ? Date.now() + tokenJson.expires_in * 1000 : 0;

    // 2) Fetch the member's profile via OpenID userinfo
    let memberId = "", name = "", thumbnail = "";
    try {
      const meRes = await fetch(USERINFO, { headers: { Authorization: `Bearer ${tokenJson.access_token}` } });
      const me = await meRes.json();
      memberId = me.sub || "";
      name = me.name || [me.given_name, me.family_name].filter(Boolean).join(" ") || me.email || "";
      thumbnail = me.picture || "";
    } catch (e) { console.warn("linkedin userinfo failed:", e.message); }

    user.linkedin = {
      connected: true,
      memberId,
      name: name || "LinkedIn account",
      thumbnail,
      accessToken: tokenJson.access_token,
      expiryDate,
    };
    await user.save();

    return back("connected");
  } catch (err) {
    console.error("linkedin callback error:", err.message);
    return back("error");
  }
};

/* ── GET /api/auth/linkedin/status ── (client auth required) */
export const linkedinStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("linkedin");
    const li = user?.linkedin || {};
    res.json({ success: true, data: { connected: !!li.connected, name: li.name || "", thumbnail: li.thumbnail || "" } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/auth/linkedin/disconnect ── (client auth required) */
export const linkedinDisconnect = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      linkedin: { connected: false, memberId: "", name: "", thumbnail: "", accessToken: "", expiryDate: 0 },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
