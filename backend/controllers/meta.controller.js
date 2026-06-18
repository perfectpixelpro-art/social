import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Graph API version
const GRAPH = "https://graph.facebook.com/v21.0";
const DIALOG = "https://www.facebook.com/v21.0/dialog/oauth";

const CLIENT_URL = () => process.env.CLIENT_URL || "http://localhost:5173";

// Permissions requested at login.
// `public_profile` is always available. Page/Instagram scopes
// (pages_show_list, instagram_basic, pages_read_engagement) must first be
// added to the Meta app — until then Facebook rejects them as "Invalid Scopes".
// Override via FB_SCOPES in .env (comma-separated) once they're enabled, e.g.
//   FB_SCOPES=public_profile,pages_show_list,instagram_basic,pages_read_engagement
const SCOPES = process.env.FB_SCOPES || "public_profile";

/* ── GET /api/auth/meta/url ── (client auth required)
   Returns the Facebook consent URL with a signed state carrying the userId. */
export const getMetaAuthUrl = (req, res) => {
  try {
    const state = jwt.sign({ sub: req.user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
    const params = new URLSearchParams({
      client_id: process.env.FB_APP_ID,
      redirect_uri: process.env.FB_CALLBACK_URL, // must match the Meta app config exactly
      state,
      response_type: "code",
    });
    // "Facebook Login for Business" apps require a config_id (permissions are
    // chosen inside the dashboard configuration) and reject `scope`.
    // Standard "Facebook Login" apps use `scope` instead.
    if (process.env.FB_CONFIG_ID) {
      params.set("config_id", process.env.FB_CONFIG_ID);
    } else {
      params.set("scope", SCOPES);
    }
    res.json({ success: true, url: `${DIALOG}?${params.toString()}` });
  } catch (err) {
    console.error("meta auth url error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /auth/facebook/callback ── (public — Facebook redirects here)
   Exchanges the code, fetches profile + (optionally) a linked IG account,
   stores everything, then bounces back to the dashboard. */
export const facebookCallback = async (req, res) => {
  const back = (status) => res.redirect(`${CLIENT_URL()}/dashboard/scheduling?facebook=${status}`);
  try {
    const { code, state, error } = req.query;
    if (error || !code || !state) return back("error");

    let userId;
    try { userId = jwt.verify(state, process.env.ACCESS_TOKEN_SECRET).sub; }
    catch { return back("error"); }
    const user = await User.findById(userId);
    if (!user) return back("error");

    // 1) Exchange code → short-lived user token
    const tokenRes = await fetch(`${GRAPH}/oauth/access_token?` + new URLSearchParams({
      client_id: process.env.FB_APP_ID,
      client_secret: process.env.FB_APP_SECRET,
      redirect_uri: process.env.FB_CALLBACK_URL,
      code,
    }));
    const tokenJson = await tokenRes.json();
    if (!tokenJson.access_token) {
      console.warn("fb token exchange failed:", JSON.stringify(tokenJson));
      return back("error");
    }

    // 2) Upgrade to a long-lived user token (~60 days)
    let userToken = tokenJson.access_token;
    let expiryDate = 0;
    try {
      const llRes = await fetch(`${GRAPH}/oauth/access_token?` + new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: process.env.FB_APP_ID,
        client_secret: process.env.FB_APP_SECRET,
        fb_exchange_token: userToken,
      }));
      const ll = await llRes.json();
      if (ll.access_token) {
        userToken = ll.access_token;
        if (ll.expires_in) expiryDate = Date.now() + ll.expires_in * 1000;
      }
    } catch (e) { console.warn("fb long-lived exchange failed:", e.message); }

    // 3) Basic profile
    let fbId = "", fbName = "", fbPic = "";
    try {
      const meRes = await fetch(`${GRAPH}/me?` + new URLSearchParams({
        fields: "id,name,picture.width(100).height(100)",
        access_token: userToken,
      }));
      const me = await meRes.json();
      fbId = me.id || "";
      fbName = me.name || "";
      fbPic = me.picture?.data?.url || "";
    } catch (e) { console.warn("fb /me failed:", e.message); }

    // 4) Pages + linked Instagram business account (best-effort)
    let pageId = "", pageName = "", pageAccessToken = "";
    let ig = null;
    try {
      const pagesRes = await fetch(`${GRAPH}/me/accounts?` + new URLSearchParams({
        fields: "name,access_token,instagram_business_account{id,username,name,profile_picture_url}",
        access_token: userToken,
      }));
      const pages = await pagesRes.json();
      const page = (pages.data || [])[0];
      if (page) {
        pageId = page.id || "";
        pageName = page.name || "";
        pageAccessToken = page.access_token || "";
        const iga = page.instagram_business_account;
        if (iga) {
          ig = {
            connected: true,
            igId: iga.id || "",
            username: iga.username || "",
            name: iga.name || "",
            thumbnail: iga.profile_picture_url || "",
          };
        }
      }
    } catch (e) { console.warn("fb pages/ig fetch failed:", e.message); }

    user.facebook = {
      connected: true,
      userId: fbId,
      name: fbName,
      thumbnail: fbPic,
      accessToken: userToken,
      expiryDate,
      pageId,
      pageName,
      pageAccessToken,
    };
    if (ig) user.instagram = ig;
    await user.save();

    return back("connected");
  } catch (err) {
    console.error("facebook callback error:", err.message);
    return back("error");
  }
};

/* ── GET /api/auth/meta/status ── (client auth required) */
export const metaStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("facebook instagram");
    const fb = user?.facebook || {};
    const ig = user?.instagram || {};
    res.json({
      success: true,
      data: {
        facebook: { connected: !!fb.connected, name: fb.pageName || fb.name || "", thumbnail: fb.thumbnail || "" },
        instagram: { connected: !!ig.connected, name: ig.username ? `@${ig.username}` : (ig.name || ""), thumbnail: ig.thumbnail || "" },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/auth/meta/disconnect ── (client auth required)
   Disconnects Facebook and the linked Instagram together. */
export const metaDisconnect = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      facebook: { connected: false, userId: "", name: "", thumbnail: "", accessToken: "", expiryDate: 0, pageId: "", pageName: "", pageAccessToken: "" },
      instagram: { connected: false, igId: "", username: "", name: "", thumbnail: "" },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
