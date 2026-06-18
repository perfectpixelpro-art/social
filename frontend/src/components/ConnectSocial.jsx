import { useState, useEffect, useCallback } from "react";
import {
  getYouTubeAuthUrl, getYouTubeStatus, disconnectYouTube, getYouTubeAnalytics,
  getMetaAuthUrl, getMetaStatus, disconnectMeta, getFacebookAnalytics,
  getLinkedInAuthUrl, getLinkedInStatus, disconnectLinkedIn,
  listScheduledPosts,
} from "../api";

// Brand marks for each network (simple inline SVG glyphs)
const networks = [
  {
    key: "instagram", name: "Instagram", color: "#E1306C", bg: "#fdeef5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "facebook", name: "Facebook", color: "#1877F2", bg: "#eaf2fe",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.7C11.6 3 10.5 4.4 10.5 6.8V8.5H8.5V12h2v9h3.5v-9h2.4l.4-3.5z" />
      </svg>
    ),
  },
  {
    key: "linkedin", name: "LinkedIn", color: "#0A66C2", bg: "#e8f1fb",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a1.96 1.96 0 100 3.92 1.96 1.96 0 000-3.92zM20.44 21v-6.86c0-3.67-1.96-5.38-4.57-5.38-2.11 0-3.05 1.16-3.57 1.98V8.5H8.94V21h3.36v-6.9c0-.36.03-.73.13-.99.29-.73.95-1.49 2.06-1.49 1.45 0 2.03 1.11 2.03 2.73V21h3.92z" />
      </svg>
    ),
  },
  {
    key: "youtube", name: "YouTube", color: "#FF0000", bg: "#feeaea",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 002 8.2 31.4 31.4 0 002 12a31.4 31.4 0 00.1 3.8 3 3 0 002.1 2.1c1.9.6 7.8.6 7.8.6s6 0 7.9-.6a3 3 0 002.1-2.1A31.4 31.4 0 0022 12a31.4 31.4 0 00-.1-3.8zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    ),
  },
  {
    key: "twitter", name: "X (Twitter)", color: "#000000", bg: "#eef1f6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ConnectSocial({ className = "", variant = "panel", includeTwitter = false }) {
  // ── Real OAuth connection state ──
  const [yt, setYt] = useState({ connected: false, channelTitle: "" });
  const [meta, setMeta] = useState({ facebook: { connected: false, name: "" }, instagram: { connected: false, name: "" } });
  const [li, setLi] = useState({ connected: false, name: "" });
  const [tw, setTw] = useState(false); // X/Twitter — not wired yet (mock)
  const [busy, setBusy] = useState(false);

  const loadYt = useCallback(async () => {
    try { const r = await getYouTubeStatus(); setYt(r.data || { connected: false, channelTitle: "" }); }
    catch { /* not logged in / ignore */ }
  }, []);

  const loadMeta = useCallback(async () => {
    try { const r = await getMetaStatus(); if (r.data) setMeta(r.data); }
    catch { /* ignore */ }
  }, []);

  const loadLi = useCallback(async () => {
    try { const r = await getLinkedInStatus(); setLi(r.data || { connected: false, name: "" }); }
    catch { /* ignore */ }
  }, []);

  useEffect(() => {
    loadYt();
    loadMeta();
    loadLi();
    // After returning from a provider, refresh status + clean the URL.
    const params = new URLSearchParams(window.location.search);
    let changed = false;
    if (params.get("youtube")) { loadYt(); params.delete("youtube"); changed = true; }
    if (params.get("facebook")) { loadMeta(); params.delete("facebook"); changed = true; }
    if (params.get("linkedin")) { loadLi(); params.delete("linkedin"); changed = true; }
    if (changed) {
      const qs = params.toString();
      window.history.replaceState({}, "", window.location.pathname + (qs ? `?${qs}` : ""));
    }
  }, [loadYt, loadMeta, loadLi]);

  // Generic OAuth starter
  const startOAuth = async (getUrl, label) => {
    setBusy(true);
    try { const r = await getUrl(); window.location.href = r.url; }
    catch (e) { setBusy(false); alert(e.message || `Could not start ${label} connection.`); }
  };

  const connectYouTube = () => startOAuth(getYouTubeAuthUrl, "YouTube");
  const connectMeta = () => startOAuth(getMetaAuthUrl, "Facebook");
  const connectLinkedIn = () => startOAuth(getLinkedInAuthUrl, "LinkedIn");

  const disconnectYt = async () => {
    setBusy(true);
    try { await disconnectYouTube(); setYt({ connected: false, channelTitle: "" }); }
    catch { /* */ } finally { setBusy(false); }
  };

  const disconnectMetaAll = async () => {
    setBusy(true);
    try { await disconnectMeta(); setMeta({ facebook: { connected: false, name: "" }, instagram: { connected: false, name: "" } }); }
    catch { /* */ } finally { setBusy(false); }
  };

  const disconnectLi = async () => {
    setBusy(true);
    try { await disconnectLinkedIn(); setLi({ connected: false, name: "" }); }
    catch { /* */ } finally { setBusy(false); }
  };

  // ── Detail panel: analytics + scheduled posts for a clicked connector ──
  const [open, setOpen] = useState(null); // platform key or null
  const [detail, setDetail] = useState({ loading: false, metrics: [], posts: [], note: "" });

  const openDetail = async (key, accountName) => {
    setOpen(key);
    setDetail({ loading: true, metrics: [], posts: [], note: "", accountName });
    let metrics = [], note = "", posts = [];
    try {
      if (key === "facebook") {
        const r = await getFacebookAnalytics();
        metrics = r.data?.metrics || [];
      } else if (key === "youtube") {
        const r = await getYouTubeAnalytics();
        metrics = r.data?.metrics || [];
        if (!metrics.length) note = "No channel stats — this Google account has no YouTube channel.";
      } else {
        note = "Live analytics for this platform aren't enabled yet (pending API permissions).";
      }
    } catch { note = "Couldn't load analytics."; }
    try {
      const r = await listScheduledPosts();
      posts = (r.data || []).filter((p) => p.platform === key);
    } catch { /* */ }
    setDetail({ loading: false, metrics, posts, note, accountName });
  };

  const fmt = (d) => new Date(d).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  const statusColor = { pending: "#d97706", published: "#16a34a", failed: "#dc2626" };
  const NETMAP = Object.fromEntries(networks.map((n) => [n.key, n]));

  // Per-network connection state + handlers.
  const stateFor = (n) => {
    if (n.key === "youtube") return { isOn: yt.connected, onClick: yt.connected ? disconnectYt : connectYouTube, subtitle: yt.connected ? (yt.channelTitle || "Connected") : "Not connected" };
    if (n.key === "facebook") return { isOn: meta.facebook.connected, onClick: meta.facebook.connected ? disconnectMetaAll : connectMeta, subtitle: meta.facebook.connected ? (meta.facebook.name || "Connected") : "Not connected" };
    if (n.key === "instagram") return { isOn: meta.instagram.connected, onClick: meta.instagram.connected ? disconnectMetaAll : connectMeta, subtitle: meta.instagram.connected ? (meta.instagram.name || "Connected") : "Connect via Facebook" };
    if (n.key === "linkedin") return { isOn: li.connected, onClick: li.connected ? disconnectLi : connectLinkedIn, subtitle: li.connected ? (li.name || "Connected") : "Not connected" };
    // twitter — mock only
    return { isOn: tw, onClick: () => setTw((v) => !v), subtitle: tw ? "Connected" : "Not connected" };
  };

  const shownNetworks = networks.filter((n) => n.key !== "twitter" || includeTwitter);

  return (
    <div className={`rounded-[12px] border border-[#eef1f6] bg-white p-5 flex flex-col ${className}`}>
      <h3 className="m-0 text-[16px] font-bold text-[#013186]">Connect your social media</h3>
      <p className="m-0 mt-1 mb-4 text-[12px] text-[#7a8499] font-medium">
        Link your accounts so we can schedule and publish on your behalf.
      </p>

      {variant === "grid" ? (
        /* ── Grid of tiles (Home page) ── */
        <div className="grid grid-cols-5 mq1125:grid-cols-3 mq450:grid-cols-2 gap-4">
          {shownNetworks.map((n) => {
            const { isOn, onClick } = stateFor(n);
            return (
              <div key={n.key} className="rounded-[12px] border border-[#eef1f6] p-4 flex flex-col items-center text-center">
                <button type="button" onClick={isOn ? () => openDetail(n.key, "Connected") : undefined} disabled={!isOn}
                  className={`w-12 h-12 rounded-[12px] flex items-center justify-center mb-2 ${isOn ? "cursor-pointer hover:opacity-80" : ""}`}
                  style={{ background: n.bg, color: n.color }} title={isOn ? "View analytics" : ""}>
                  {n.icon}
                </button>
                <p className="m-0 text-[13px] font-bold text-[#0b1f44] mb-2 truncate max-w-full">{n.name}</p>
                <button onClick={onClick} disabled={busy}
                  className={`text-[12px] font-bold rounded-[8px] px-4 py-1.5 cursor-pointer transition-colors disabled:opacity-60 border ${isOn ? "text-[#5b6472] border-[#e3e9f5] hover:bg-[#f5f7fb]" : "text-white border-transparent hover:opacity-90"}`}
                  style={isOn ? {} : { background: n.color }}>
                  {isOn ? "Disconnect" : "Connect"}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Vertical list (Scheduling sidebar) ── */
        <div className="flex flex-col gap-3">
          {shownNetworks.map((n) => {
            const { isOn, onClick, subtitle } = stateFor(n);
            return (
              <div key={n.key} className="flex items-center gap-3">
                <button type="button" onClick={isOn ? () => openDetail(n.key, subtitle) : undefined} disabled={!isOn}
                  title={isOn ? "View analytics & scheduling" : ""}
                  className={`flex items-center gap-3 min-w-0 flex-1 text-left rounded-[8px] -ml-1 p-1 ${isOn ? "cursor-pointer hover:bg-[#f5f9ff]" : "cursor-default"}`}>
                  <span className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: n.bg, color: n.color }}>{n.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{n.name}</p>
                    <p className="m-0 text-[11px] truncate" style={{ color: isOn ? "#16a34a" : "#9aa3b2" }}>{subtitle}</p>
                  </div>
                </button>
                <button onClick={onClick} disabled={busy}
                  className={`text-[12px] font-bold rounded-[8px] px-3 py-1.5 cursor-pointer transition-colors disabled:opacity-60 ${isOn ? "text-[#dc2626] border border-[#f3c0c0] hover:bg-[#fdf2f2]" : "text-white hover:opacity-90"}`}
                  style={isOn ? {} : { background: n.color }}>
                  {isOn ? "Disconnect" : "Connect"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Detail modal: analytics + scheduling for the clicked connector ── */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-[16px] w-full max-w-[560px] max-h-[85vh] overflow-y-auto shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
            {/* header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[#eef1f6]">
              <span className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: NETMAP[open]?.bg, color: NETMAP[open]?.color }}>
                {NETMAP[open]?.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[16px] font-bold text-[#0b1f44]">{NETMAP[open]?.name}</p>
                <p className="m-0 text-[12px] text-[#16a34a] font-semibold truncate">{detail.accountName}</p>
              </div>
              <button onClick={() => setOpen(null)} className="text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
            </div>

            <div className="p-6">
              {detail.loading && <p className="m-0 text-[13px] text-[#9aa3b2]">Loading…</p>}

              {!detail.loading && (
                <>
                  {/* Analytics */}
                  <h3 className="m-0 mb-3 text-[14px] font-bold text-[#013186]">Analytics</h3>
                  {detail.metrics.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {detail.metrics.map((m) => (
                        <div key={m.label} className="rounded-[10px] border border-[#eef1f6] p-3">
                          <p className="m-0 text-[12px] text-[#7a8499] font-semibold">{m.label}</p>
                          <p className="m-0 text-[22px] font-bold text-[#0b1f44]">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="m-0 mb-6 text-[13px] text-[#9aa3b2]">{detail.note || "No analytics available."}</p>
                  )}

                  {/* Scheduling */}
                  <h3 className="m-0 mb-3 text-[14px] font-bold text-[#013186]">Scheduled posts ({detail.posts.length})</h3>
                  {detail.posts.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {detail.posts.map((p) => (
                        <div key={p._id} className="flex items-start gap-3 rounded-[10px] border border-[#eef1f6] p-3">
                          <div className="min-w-0 flex-1">
                            <p className="m-0 text-[13px] text-[#0b1f44] font-semibold break-words">{p.message || "(image only)"}</p>
                            <p className="m-0 text-[11px] text-[#9aa3b2] mt-1">{fmt(p.scheduledAt)}</p>
                          </div>
                          <span className="text-[11px] font-bold capitalize shrink-0" style={{ color: statusColor[p.status] }}>{p.status}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="m-0 text-[13px] text-[#9aa3b2]">
                      {open === "facebook" ? "No posts scheduled yet — use the Schedule a post form." : "Scheduling for this platform isn't enabled yet."}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
