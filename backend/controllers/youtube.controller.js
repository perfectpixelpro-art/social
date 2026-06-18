import { google } from "googleapis";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Lazily build the OAuth2 client (env is loaded after ESM imports).
function oauthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL // must exactly match the Google Console redirect URI
  );
}

const CLIENT_URL = () => process.env.CLIENT_URL || "http://localhost:5173";

// Scopes: identify the user (login) + read their YouTube channel.
const SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.upload", // upload videos
];

/* ── GET /api/auth/youtube/url ── (client auth required)
   Returns the Google consent URL. We embed a short-lived signed `state`
   that carries the userId so the public callback can identify the user. */
export const getYouTubeAuthUrl = (req, res) => {
  try {
    const state = jwt.sign({ sub: req.user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
    const url = oauthClient().generateAuthUrl({
      access_type: "offline",      // get a refresh token
      prompt: "consent",           // force refresh-token issuance on re-connect
      scope: SCOPES,
      state,
      include_granted_scopes: true,
    });
    res.json({ success: true, url });
  } catch (err) {
    console.error("youtube auth url error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /auth/youtube/callback ── (public — Google redirects here)
   Exchanges the code, fetches the channel, persists tokens to the user,
   then bounces back to the dashboard. Path matches GOOGLE_CALLBACK_URL. */
export const youtubeCallback = async (req, res) => {
  const back = (status) => res.redirect(`${CLIENT_URL()}/dashboard/scheduling?youtube=${status}`);
  try {
    const { code, state, error } = req.query;
    if (error || !code || !state) return back("error");

    // Identify the user from the signed state.
    let userId;
    try {
      userId = jwt.verify(state, process.env.ACCESS_TOKEN_SECRET).sub;
    } catch {
      return back("error");
    }
    const user = await User.findById(userId);
    if (!user) return back("error");

    // Exchange the authorization code for tokens.
    const client = oauthClient();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Fetch the user's YouTube channel (name + thumbnail).
    let channelId = "", channelTitle = "", thumbnail = "";
    try {
      const yt = google.youtube({ version: "v3", auth: client });
      const me = await yt.channels.list({ part: "snippet", mine: true });
      const ch = me.data.items?.[0];
      if (ch) {
        channelId = ch.id || "";
        channelTitle = ch.snippet?.title || "";
        thumbnail = ch.snippet?.thumbnails?.default?.url || "";
      }
    } catch (e) {
      console.warn("youtube channel fetch failed:", e.message);
    }

    // Fallback: if the Google account has no YouTube channel, show the
    // Google profile name/email (we requested openid/email/profile scopes).
    if (!channelTitle) {
      try {
        const oauth2 = google.oauth2({ version: "v2", auth: client });
        const profile = await oauth2.userinfo.get();
        channelTitle = profile.data.name || profile.data.email || "YouTube account";
        if (!thumbnail) thumbnail = profile.data.picture || "";
      } catch (e) {
        console.warn("google userinfo fetch failed:", e.message);
        channelTitle = "YouTube account";
      }
    }

    user.youtube = {
      connected: true,
      channelId,
      channelTitle,
      thumbnail,
      accessToken: tokens.access_token || "",
      // Google only returns a refresh_token the first time — keep the old one otherwise.
      refreshToken: tokens.refresh_token || user.youtube?.refreshToken || "",
      expiryDate: tokens.expiry_date || 0,
    };
    await user.save();

    return back("connected");
  } catch (err) {
    console.error("youtube callback error:", err.message);
    return back("error");
  }
};

/* ── GET /api/auth/youtube/status ── (client auth required) */
export const youtubeStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("youtube");
    const yt = user?.youtube || {};
    res.json({
      success: true,
      data: { connected: !!yt.connected, channelTitle: yt.channelTitle || "", thumbnail: yt.thumbnail || "" },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── GET /api/auth/youtube/analytics ── (client auth required)
   Real channel statistics (subscribers, views, videos) via the Data API.
   Uses the stored refresh token so the access token auto-renews. */
export const youtubeAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("youtube");
    const yt = user?.youtube || {};
    if (!yt.connected) return res.json({ success: true, data: { connected: false, metrics: [] } });

    const client = oauthClient();
    client.setCredentials({
      access_token: yt.accessToken || undefined,
      refresh_token: yt.refreshToken || undefined,
      expiry_date: yt.expiryDate || undefined,
    });

    const api = google.youtube({ version: "v3", auth: client });
    const me = await api.channels.list({ part: "statistics,snippet", mine: true });
    const ch = me.data.items?.[0];
    // This Google account has no YouTube channel → nothing to show.
    if (!ch) return res.json({ success: true, data: { connected: true, channelTitle: yt.channelTitle || "", metrics: [] } });
    const s = ch.statistics || {};

    // Persist any refreshed access token for next time.
    const creds = client.credentials;
    if (creds.access_token && creds.access_token !== yt.accessToken) {
      yt.accessToken = creds.access_token;
      if (creds.expiry_date) yt.expiryDate = creds.expiry_date;
      await user.save();
    }

    const num = (v) => (v == null ? "—" : Number(v).toLocaleString());
    res.json({
      success: true,
      data: {
        connected: true,
        channelTitle: ch?.snippet?.title || yt.channelTitle || "",
        metrics: [
          { label: "Subscribers", value: s.hiddenSubscriberCount ? "Hidden" : num(s.subscriberCount) },
          { label: "Total Views", value: num(s.viewCount) },
          { label: "Videos", value: num(s.videoCount) },
        ],
      },
    });
  } catch (err) {
    console.error("youtube analytics error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ── POST /api/auth/youtube/disconnect ── (client auth required) */
export const youtubeDisconnect = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      youtube: { connected: false, channelId: "", channelTitle: "", thumbnail: "", accessToken: "", refreshToken: "", expiryDate: 0 },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
