// Zoom Server-to-Server OAuth helper
const ZOOM_OAUTH = "https://zoom.us/oauth/token";
const ZOOM_API = "https://api.zoom.us/v2";

let cached = { token: null, expiresAt: 0 };

async function getAccessToken() {
  // reuse token until ~1 min before expiry
  if (cached.token && Date.now() < cached.expiresAt - 60000) return cached.token;

  const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
  const basic = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

  const res = await fetch(`${ZOOM_OAUTH}?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.reason || data.message || "Zoom auth failed");

  cached = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cached.token;
}

// Create a scheduled meeting. start = ISO string, duration in minutes.
export async function createZoomMeeting({ topic, startTime, duration, timezone = "UTC" }) {
  const token = await getAccessToken();
  const res = await fetch(`${ZOOM_API}/users/me/meetings`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: topic || "The Social 99 Meeting",
      type: 2, // scheduled
      start_time: startTime,
      duration: duration || 30,
      timezone,
      settings: {
        join_before_host: true,
        waiting_room: false,
        approval_type: 2,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Could not create Zoom meeting");

  return {
    meetingId: String(data.id),
    joinUrl: data.join_url,
    startUrl: data.start_url,
    startTime: data.start_time,
    duration: data.duration,
    topic: data.topic,
  };
}
