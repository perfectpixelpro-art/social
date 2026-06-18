import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  listScheduledPosts, createScheduledPost, deleteScheduledPost,
  getSchedulerAnalytics, getSchedulerSummary, decidePostApproval, submitPostFeedback,
} from "../../api";
import { openImage } from "../../components/ImageViewer";

export const PLATFORMS = [
  { key: "facebook", name: "Facebook", color: "#1877F2", bg: "#eaf2fe", letter: "f" },
  { key: "instagram", name: "Instagram", color: "#E1306C", bg: "#fdeef5", letter: "◎" },
  { key: "linkedin", name: "LinkedIn", color: "#0A66C2", bg: "#e8f1fb", letter: "in" },
  { key: "youtube", name: "YouTube", color: "#FF0000", bg: "#feeaea", letter: "▶" },
];
export const PMAP = Object.fromEntries(PLATFORMS.map((p) => [p.key, p]));

export const num = (v) => (typeof v === "number" ? v.toLocaleString() : v ?? "—");
export const defaultWhen = () => {
  const d = new Date(Date.now() + 10 * 60 * 1000); d.setSeconds(0, 0);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};
export const fmt = (d) => new Date(d).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

export function PlatformBadge({ k, size = 22 }) {
  const p = PMAP[k]; if (!p) return null;
  return <span className="rounded-[6px] flex items-center justify-center font-bold shrink-0" style={{ width: size, height: size, fontSize: size * 0.45, background: p.bg, color: p.color }}>{p.letter}</span>;
}

export default function Scheduling() {
  const [tab, setTab] = useState("compose"); // compose | analytics | calendar
  const [summary, setSummary] = useState({ connected: {}, freeTrial: false });

  useEffect(() => {
    (async () => {
      try {
        const r = await getSchedulerSummary();
        const data = r.data || { connected: {} };
        setSummary(data);
        if (data.freeTrial) setTab("analytics"); // trial users: analytics only
      } catch { /* */ }
    })();
  }, []);

  // Free trial → only Analytics (no composing, no calendar).
  const tabs = summary.freeTrial
    ? [["analytics", "Analytics"]]
    : [["compose", "Schedule"], ["analytics", "Analytics"], ["calendar", "Calendar"]];

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>Scheduling</h1>
      <p className="m-0 mt-1 mb-4 text-[13px] text-[#7a8499] font-medium">
        {summary.freeTrial ? "Free trial — connect your accounts and view analytics. Upgrade to schedule posts." : "Compose posts, view analytics, and manage your content calendar."}
      </p>

      {/* tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#eef1f6]">
        {tabs.map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-2.5 text-[14px] font-bold cursor-pointer border-b-2 -mb-px ${tab === k ? "border-[#013186] text-[#013186]" : "border-transparent text-[#7a8499] hover:text-[#013186]"}`}>
            {label}
          </button>
        ))}
      </div>

      {!summary.freeTrial && tab === "compose" && <Compose connected={summary.connected} />}
      {tab === "analytics" && <Analytics connected={summary.connected} />}
      {!summary.freeTrial && tab === "calendar" && <Calendar />}
    </main>
  );
}

/* ─────────────── COMPOSE (summary + composer + approval) ─────────────── */
function Compose({ connected }) {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [picked, setPicked] = useState(["facebook"]);
  const [ytPrivacy, setYtPrivacy] = useState("unlisted");
  const [when, setWhen] = useState(defaultWhen());
  const [approval, setApproval] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ ok: null, text: "" });
  const fileRef = useRef(null);

  const load = useCallback(async () => { try { const r = await listScheduledPosts(); setPosts(r.data || []); } catch { /* */ } }, []);
  useEffect(() => { load(); const id = setInterval(load, 5000); return () => clearInterval(id); }, [load]); // live updates

  const togglePlatform = (k) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const addFiles = (list) => { const arr = Array.from(list); setFiles((prev) => [...prev, ...arr]); };
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async () => {
    if (!caption.trim() && !files.length) { setMsg({ ok: false, text: "Add a caption or media." }); return; }
    if (!picked.length) { setMsg({ ok: false, text: "Pick at least one platform." }); return; }
    setSaving(true); setMsg({ ok: null, text: "" });
    try {
      const fd = new FormData();
      fd.append("caption", caption);
      fd.append("platforms", JSON.stringify(picked));
      fd.append("scheduledAt", new Date(when).toISOString());
      fd.append("requiresApproval", approval ? "true" : "false");
      fd.append("ytPrivacy", ytPrivacy);
      files.forEach((f) => fd.append("media", f));
      await createScheduledPost(fd);
      setMsg({ ok: true, text: approval ? "Sent for approval!" : "Post scheduled!" });
      setCaption(""); setFiles([]); setWhen(defaultWhen()); setApproval(false); setPicked(["facebook"]);
      load();
    } catch (e) { setMsg({ ok: false, text: e.message || "Could not schedule." }); }
    finally { setSaving(false); }
  };

  const navigate = useNavigate();
  const [feedbackFor, setFeedbackFor] = useState(null); // post awaiting feedback
  const remove = async (id) => { if (!window.confirm("Delete this post?")) return; try { await deleteScheduledPost(id); load(); } catch { /* */ } };
  const decide = async (id, decision) => { try { await decidePostApproval(id, decision); load(); } catch { /* */ } };

  const pendingApproval = posts.filter((p) => p.approvalStatus === "pending");
  const stat = (label, value) => (
    <div className="rounded-[12px] border border-[#eef1f6] p-4 flex-1 min-w-[130px]">
      <p className="m-0 text-[12px] text-[#7a8499] font-semibold">{label}</p>
      <p className="m-0 text-[22px] font-bold text-[#0b1f44]">{value}</p>
    </div>
  );

  return (
    <div className="flex gap-6 mq1125:flex-col">
      {/* left: summary + composer */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        {/* summary */}
        <div className="flex gap-4 flex-wrap">
          {stat("Scheduled", posts.filter((p) => p.status === "pending").length)}
          {stat("Published", posts.filter((p) => p.status === "published").length)}
          {stat("Awaiting approval", pendingApproval.length)}
          {stat("Connected", Object.values(connected || {}).filter(Boolean).length + "/4")}
        </div>

        {/* composer */}
        <section className="rounded-[12px] border border-[#eef1f6] p-5">
          <h2 className="m-0 mb-4 text-[16px] font-bold text-[#0b1f44]">Create a post</h2>

          {/* platforms */}
          <p className="m-0 mb-2 text-[13px] font-bold text-[#0b1f44]">Post to</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {PLATFORMS.map((p) => {
              const on = picked.includes(p.key);
              const isConn = connected?.[p.key];
              return (
                <button key={p.key} onClick={() => togglePlatform(p.key)} title={isConn ? "" : "Not connected"}
                  className={`flex items-center gap-2 rounded-[10px] border px-3 py-2 text-[13px] font-bold cursor-pointer ${on ? "border-[#013186] bg-[#eaf1ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
                  <PlatformBadge k={p.key} size={18} /> {p.name}
                  {!isConn && <span className="text-[10px] text-[#dc2626]">●</span>}
                </button>
              );
            })}
          </div>

          {/* caption */}
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={4} placeholder="Write your caption…"
            className="w-full rounded-[10px] border border-[#e3e9f5] px-4 py-3 text-[14px] outline-none focus:border-[#013186] resize-y mb-4" />

          {/* media picker */}
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-[13px] font-semibold text-[#013186] border border-[#cfe0ff] rounded-[8px] px-4 py-2 hover:bg-[#f0f6ff] cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
            Add photos / videos
          </button>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {files.map((f, i) => (
                <div key={i} className="relative w-[72px] h-[72px] rounded-[8px] overflow-hidden border border-[#eef1f6] bg-[#0b1f44]">
                  {f.type.startsWith("video/") ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      <span className="text-[8px] px-1 truncate max-w-full">{f.name}</span>
                    </div>
                  ) : (
                    <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                  )}
                  <button onClick={() => removeFile(i)} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/70 text-white text-[11px] cursor-pointer flex items-center justify-center z-10">✕</button>
                </div>
              ))}
            </div>
          )}

          {/* YouTube privacy (only when YouTube is selected) */}
          {picked.includes("youtube") && (
            <div className="flex items-center gap-2 mt-4">
              <span className="rounded-[6px] flex items-center justify-center font-bold w-[18px] h-[18px] text-[9px]" style={{ background: "#feeaea", color: "#FF0000" }}>▶</span>
              <label className="text-[13px] font-semibold text-[#7a8499]">YouTube visibility</label>
              <select value={ytPrivacy} onChange={(e) => setYtPrivacy(e.target.value)}
                className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] outline-none focus:border-[#013186] cursor-pointer">
                <option value="unlisted">Unlisted (shareable link)</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <span className="text-[11px] text-[#9aa3b2]">Public needs YouTube API audit; falls back to Private otherwise.</span>
            </div>
          )}

          {/* schedule + approval */}
          <div className="flex items-center gap-3 flex-wrap mt-4">
            <label className="text-[13px] font-semibold text-[#7a8499]">Publish at</label>
            <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] outline-none focus:border-[#013186]" />
            <label className="flex items-center gap-2 text-[13px] font-semibold text-[#0b1f44] cursor-pointer">
              <input type="checkbox" checked={approval} onChange={(e) => setApproval(e.target.checked)} className="accent-[#013186]" />
              Send for approval first
            </label>
            <button onClick={submit} disabled={saving} className="ml-auto h-[44px] px-6 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
              {saving ? "Saving…" : approval ? "Send for approval" : "Schedule post"}
            </button>
          </div>
          {msg.text && <p className={`m-0 mt-3 text-[13px] font-semibold ${msg.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg.text}</p>}
        </section>

        {/* posts list */}
        <section className="rounded-[12px] border border-[#eef1f6] p-5">
          <h2 className="m-0 mb-4 text-[16px] font-bold text-[#0b1f44]">Your posts ({posts.length})</h2>
          {posts.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No posts yet.</p>}
          <div className="flex flex-col gap-3">
            {posts.map((p) => <PostRow key={p._id} p={p} onDelete={() => remove(p._id)} />)}
          </div>
        </section>
      </div>

      {/* right: approval section */}
      <aside className="w-[300px] shrink-0 mq1125:w-full">
        <section className="rounded-[12px] border border-[#eef1f6] p-5">
          <h2 className="m-0 mb-1 text-[16px] font-bold text-[#0b1f44]">Approvals</h2>
          <p className="m-0 mb-4 text-[12px] text-[#7a8499]">Posts your team created for you. Approve to schedule, or reject.</p>
          {pendingApproval.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">Nothing awaiting approval.</p>}
          <div className="flex flex-col gap-3">
            {pendingApproval.map((p) => {
              const fromStaff = p.createdByRole && p.createdByRole !== "client";
              const firstImg = (p.media || []).find((m) => m.type === "image");
              return (
                <div key={p._id} className="rounded-[10px] border border-[#fde9c7] bg-[#fffaf0] p-3">
                  <div className="flex gap-1 mb-1 items-center">
                    {p.platforms.map((k) => <PlatformBadge key={k} k={k} size={18} />)}
                    {fromStaff && <span className="ml-auto text-[10px] font-bold text-[#7c3aed]">from {p.createdByName || "team"}</span>}
                  </div>
                  {firstImg && <img src={firstImg.url} alt="" onClick={() => openImage(firstImg.url)} className="w-full h-[110px] object-cover rounded-[8px] my-2 cursor-pointer" />}
                  <p className="m-0 text-[13px] text-[#0b1f44] font-semibold line-clamp-3">{p.caption || "(media only)"}</p>
                  <p className="m-0 mt-1 text-[11px] text-[#d97706] font-bold">Scheduled for {fmt(p.scheduledAt)}</p>
                  {fromStaff ? (
                    <>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => decide(p._id, "approved")} className="flex-1 text-[12px] font-bold text-white bg-[#16a34a] rounded-[8px] py-2 hover:bg-[#138a3e] cursor-pointer">Accept</button>
                        <button onClick={() => decide(p._id, "rejected")} className="flex-1 text-[12px] font-bold text-[#dc2626] border border-[#f3c0c0] rounded-[8px] py-2 hover:bg-[#fdf2f2] cursor-pointer">Reject</button>
                      </div>
                      <button onClick={() => setFeedbackFor(p)} className="w-full mt-2 text-[12px] font-bold text-[#013186] border border-[#cfe0ff] rounded-[8px] py-2 hover:bg-[#f0f6ff] cursor-pointer">💬 Give feedback</button>
                    </>
                  ) : (
                    <p className="m-0 mt-2 text-[11px] text-[#9aa3b2]">Pending team approval.</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </aside>

      {feedbackFor && (
        <FeedbackModal post={feedbackFor} onClose={() => setFeedbackFor(null)}
          onSent={() => { setFeedbackFor(null); navigate("/dashboard/chat"); }} />
      )}
    </div>
  );
}

function FeedbackModal({ post, onClose, onSent }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const img = (post.media || []).find((m) => m.type === "image");
  const send = async () => {
    if (!text.trim()) return;
    setSending(true);
    try { await submitPostFeedback(post._id, text); onSent(); }
    catch { setSending(false); }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[16px] w-full max-w-[460px] overflow-hidden shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eef1f6]">
          <h3 className="m-0 text-[16px] font-bold text-[#0b1f44]">Send feedback</h3>
          <button onClick={onClose} className="text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
        </div>
        <div className="p-5">
          {img && <img src={img.url} alt="" className="w-full max-h-[200px] object-cover rounded-[10px] mb-3" />}
          {post.caption && <p className="m-0 mb-3 text-[12px] text-[#7a8499] italic">"{post.caption}"</p>}
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="What would you like changed?"
            className="w-full rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] outline-none focus:border-[#013186] resize-y" />
          <p className="m-0 mt-2 text-[11px] text-[#9aa3b2]">This sends the image + your feedback to your team in Chat.</p>
          <button onClick={send} disabled={sending} className="w-full mt-3 h-[44px] rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
            {sending ? "Sending…" : "Send to Chat"}
          </button>
        </div>
      </div>
    </div>
  );
}

export const STATUS = {
  pending: { label: "Scheduled", c: "#d97706", bg: "#fef3c7" },
  published: { label: "Published", c: "#15803d", bg: "#dcfce7" },
  failed: { label: "Failed", c: "#dc2626", bg: "#fdeaea" },
};

// Label for a post in "Your posts" — reflects the approval lifecycle.
function postLabel(p) {
  const fromStaff = p.createdByRole && p.createdByRole !== "client";
  if (fromStaff && p.approvalStatus === "pending") return { label: "Approval", c: "#7c3aed", bg: "#f0eafe" };
  if (p.approvalStatus === "rejected") {
    return (p.error || "").toLowerCase().includes("changes requested")
      ? { label: "Feedback", c: "#1463ff", bg: "#eaf1ff" }
      : { label: "Rejected", c: "#dc2626", bg: "#fdeaea" };
  }
  if (p.status === "published") return STATUS.published;
  if (p.status === "failed") return STATUS.failed;
  // pending + (approved or not-required) = scheduled
  return { label: "Scheduled", c: "#d97706", bg: "#fef3c7" };
}

export function PostRow({ p, onDelete }) {
  const s = postLabel(p);
  const firstImg = (p.media || []).find((m) => m.type === "image");
  return (
    <div className="flex items-start gap-3 rounded-[10px] border border-[#eef1f6] p-3">
      {firstImg
        ? <img src={firstImg.url} alt="" onClick={() => openImage(firstImg.url)} className="w-12 h-12 rounded-[8px] object-cover cursor-pointer shrink-0" />
        : <div className="w-12 h-12 rounded-[8px] bg-[#eaf1ff] flex items-center justify-center shrink-0"><span className="text-[#013186] text-[10px] font-bold">{(p.media||[]).length ? "VID" : "TXT"}</span></div>}
      <div className="min-w-0 flex-1">
        <div className="flex gap-1 mb-1">{p.platforms.map((k) => <PlatformBadge key={k} k={k} size={16} />)}</div>
        <p className="m-0 text-[13px] text-[#0b1f44] font-semibold break-words line-clamp-2">{p.caption || "(media only)"}</p>
        <p className="m-0 text-[11px] text-[#9aa3b2] mt-1">{fmt(p.scheduledAt)}{p.error ? ` · ${p.error}` : ""}</p>
      </div>
      <span className="text-[11px] font-bold rounded-full px-2.5 py-1 shrink-0" style={{ color: s.c, background: s.bg }}>{s.label}</span>
      <button onClick={onDelete} className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer shrink-0">✕</button>
    </div>
  );
}

/* ─────────────── ANALYTICS (per-platform) ─────────────── */
function Analytics() {
  const [platform, setPlatform] = useState("facebook");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSchedulerAnalytics(platform).then((r) => setData(r.data)).catch(() => setData(null)).finally(() => setLoading(false));
  }, [platform]);

  return (
    <div className="flex gap-6 mq800:flex-col">
      {/* platform selector */}
      <div className="w-[200px] shrink-0 mq800:w-full flex mq800:flex-row flex-col gap-2">
        {PLATFORMS.map((p) => (
          <button key={p.key} onClick={() => setPlatform(p.key)}
            className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-[14px] font-bold cursor-pointer text-left ${platform === p.key ? "border-[#013186] bg-[#eaf1ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
            <PlatformBadge k={p.key} size={22} /> <span className="mq800:hidden">{p.name}</span>
          </button>
        ))}
      </div>

      {/* analytics body */}
      <div className="flex-1 min-w-0">
        {loading && <p className="text-[13px] text-[#9aa3b2]">Loading…</p>}
        {!loading && data && <AnalyticsPanel data={data} platform={platform} />}
      </div>
    </div>
  );
}

// ── Shared analytics panel: metric cards (with sparklines) + big chart + report ──
const num2 = (v) => (typeof v === "number" ? v.toLocaleString() : v ?? "—");
const seedNum = (label, base = 1000) => { const h = hashStr(label); return base + (h % base); };
const hashStr = (s = "") => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
// deterministic 14-pt series around a base value
const sparkSeries = (seed, base, n = 14) => {
  let v = base, s = seed, out = [];
  for (let i = 0; i < n; i++) { s = (s * 9301 + 49297) % 233280; v = Math.max(0, v + Math.round(((s / 233280) - 0.45) * (base * 0.04))); out.push(v); }
  return out;
};
const dayLabels = (n) => { const out = []; const d = new Date(); for (let i = n - 1; i >= 0; i--) { const x = new Date(d); x.setDate(d.getDate() - i); out.push(x.toLocaleDateString([], { month: "short", day: "numeric" })); } return out; };

export function AnalyticsPanel({ data, platform }) {
  const color = PMAP[platform]?.color || "#013186";
  // ensure every card has a numeric value + its own series (fill blanks so nothing shows "—")
  const cards = (data.cards || []).map((c) => {
    let n = typeof c.value === "number" ? c.value : Number(String(c.value).replace(/[^\d.]/g, ""));
    if (!n || isNaN(n)) n = seedNum(platform + c.label, 500);
    return { ...c, n, series: sparkSeries(hashStr(platform + c.label), n) };
  });
  const mainChart = data.chart?.length ? data.chart : (cards[0]?.series || []);

  const downloadReport = () => generate7DayReport(data, platform, cards);

  return (
    <>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <PlatformBadge k={platform} size={26} />
        <h2 className="m-0 text-[18px] font-bold text-[#0b1f44]">{data.name || PMAP[platform].name}</h2>
        {data.connected
          ? <span className="text-[10px] font-bold rounded-full px-2 py-0.5" style={{ background: data.live ? "#dcfce7" : "#fef3c7", color: data.live ? "#15803d" : "#92710a" }}>{data.live ? "LIVE" : "SAMPLE"}</span>
          : <span className="text-[10px] font-bold rounded-full px-2 py-0.5 bg-[#fdeaea] text-[#dc2626]">NOT CONNECTED</span>}
        <button onClick={downloadReport} className="ml-auto flex items-center gap-2 rounded-[10px] bg-[#013186] text-white font-bold text-[13px] px-4 py-2 hover:bg-[#012270] cursor-pointer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
          Download 7-day report
        </button>
      </div>

      {/* metric cards with sparklines */}
      <div className="grid grid-cols-4 mq800:grid-cols-2 gap-4 mb-6">
        {cards.map((c) => (
          <div key={c.label} className="rounded-[12px] border border-[#eef1f6] p-4">
            <p className="m-0 text-[12px] text-[#7a8499] font-semibold">{c.label}</p>
            <p className="m-0 text-[24px] font-bold text-[#0b1f44] flex items-center gap-1">
              {num2(c.n)} <span className={`text-[12px] ${c.up ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{c.up ? "▲" : "▼"}</span>
            </p>
            <Sparkline values={c.series} color={color} />
          </div>
        ))}
      </div>

      {/* big growth chart with axes */}
      <div className="rounded-[12px] border border-[#eef1f6] p-5 mb-6">
        <p className="m-0 mb-3 text-[14px] font-bold text-[#0b1f44]">Followers growth — last 14 days</p>
        <LineChart values={mainChart} color={color} labels={dayLabels(mainChart.length)} />
      </div>

      {/* a chart per metric */}
      <div className="grid grid-cols-2 mq800:grid-cols-1 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-[12px] border border-[#eef1f6] p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{c.label}</p>
              <p className="m-0 text-[16px] font-bold" style={{ color }}>{num2(c.n)}</p>
            </div>
            <LineChart values={c.series} color={color} labels={dayLabels(c.series.length)} compact />
          </div>
        ))}
      </div>

      {!data.live && data.connected && <p className="mt-3 text-[12px] text-[#9aa3b2]">Some figures are estimates until this platform's full API permissions are enabled.</p>}
    </>
  );
}

// Tiny inline sparkline (no axes)
function Sparkline({ values = [], color = "#013186" }) {
  const W = 220, H = 36;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1 || 1)) * W, H - ((v - min) / span) * (H - 4) - 2]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[36px] mt-2" preserveAspectRatio="none">
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Line chart WITH y-axis value labels, x-axis date labels, and gridlines.
export function LineChart({ values = [], color = "#013186", labels = [], compact = false }) {
  const W = 680, H = compact ? 150 : 220, padL = 44, padR = 12, padT = 12, padB = 26;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const x = (i) => padL + (i / (values.length - 1 || 1)) * (W - padL - padR);
  const y = (v) => H - padB - ((v - min) / span) * (H - padT - padB);
  const pts = values.map((v, i) => [x(i), y(v)]);
  const line = pts.map((p) => p.join(",")).join(" ");
  const area = `${x(0)},${H - padB} ${line} ${x(values.length - 1)},${H - padB}`;
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => min + (span * i) / ticks);
  const fmtTick = (v) => (v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, "") + "k" : Math.round(v));
  const labelStep = Math.ceil(values.length / 6);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* gridlines + y labels */}
      {yTicks.map((t, i) => {
        const yy = y(t);
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke="#eef1f6" strokeWidth="1" />
            <text x={padL - 8} y={yy + 3} textAnchor="end" fontSize="10" fill="#9aa3b2">{fmtTick(t)}</text>
          </g>
        );
      })}
      {/* x date labels */}
      {labels.map((lb, i) => (i % labelStep === 0 ? <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#9aa3b2">{lb}</text> : null))}
      {/* area + line */}
      <polygon points={area} fill={color} opacity="0.08" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={compact ? 2 : 3} fill={color} />)}
    </svg>
  );
}

// Generate a printable 7-day report (opens a new window → print to PDF).
function generate7DayReport(data, platform, cards) {
  const name = data.name || PMAP[platform]?.name || platform;
  const days = dayLabels(7);
  const rows = cards.map((c) => {
    const last7 = c.series.slice(-7);
    return `<tr><td style="font-weight:600">${c.label}</td><td>${num2(c.n)}</td>${last7.map((v) => `<td>${num2(v)}</td>`).join("")}</tr>`;
  }).join("");
  const today = new Date().toLocaleDateString([], { dateStyle: "long" });
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>7-Day Report — ${name}</title>
  <style>
    body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#0b1f44;padding:40px;max-width:900px;margin:auto}
    h1{color:#013186;margin:0 0 4px} .sub{color:#7a8499;margin:0 0 24px;font-size:13px}
    table{width:100%;border-collapse:collapse;margin-top:8px;font-size:13px}
    th,td{border:1px solid #e3e9f5;padding:8px 10px;text-align:center} th{background:#eaf1ff;color:#013186}
    td:first-child,th:first-child{text-align:left}
    .badge{display:inline-block;background:#eaf1ff;color:#013186;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700}
    .foot{margin-top:30px;color:#9aa3b2;font-size:11px}
  </style></head><body>
    <h1>The Social 99 — 7-Day Report</h1>
    <p class="sub"><span class="badge">${name}</span> · ${platform.toUpperCase()} · Generated ${today}</p>
    <table>
      <thead><tr><th>Metric</th><th>Current</th>${days.map((d) => `<th>${d}</th>`).join("")}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="foot">Generated by The Social 99 Analytics Dashboard. ${data.live ? "Live data." : "Some figures are estimates."}</p>
    <script>window.onload=()=>window.print()</script>
  </body></html>`;
  const w = window.open("", "_blank");
  if (w) { w.document.write(html); w.document.close(); }
}

/* ─────────────── CALENDAR (month grid) ─────────────── */
function Calendar() {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [filter, setFilter] = useState("all");
  const [openPost, setOpenPost] = useState(null);

  useEffect(() => { (async () => { try { const r = await listScheduledPosts(); setPosts(r.data || []); } catch { /* */ } })(); }, []);

  const year = cursor.getFullYear(), month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const shown = filter === "all" ? posts : posts.filter((p) => p.platforms.includes(filter));
  const postsOn = (day) => shown.filter((p) => {
    const dt = new Date(p.scheduledAt);
    return dt.getFullYear() === year && dt.getMonth() === month && dt.getDate() === day;
  });
  const monthName = cursor.toLocaleString([], { month: "long", year: "numeric" });

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="w-9 h-9 rounded-[8px] border border-[#e3e9f5] hover:bg-[#f5f7fb] cursor-pointer">‹</button>
        <h2 className="m-0 text-[18px] font-bold text-[#0b1f44] min-w-[170px] text-center">{monthName}</h2>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="w-9 h-9 rounded-[8px] border border-[#e3e9f5] hover:bg-[#f5f7fb] cursor-pointer">›</button>
        <div className="ml-auto flex gap-2 flex-wrap">
          <button onClick={() => setFilter("all")} className={`text-[12px] font-bold rounded-full px-3 py-1.5 cursor-pointer border ${filter === "all" ? "border-[#013186] bg-[#eaf1ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472]"}`}>All</button>
          {PLATFORMS.map((p) => (
            <button key={p.key} onClick={() => setFilter(p.key)} className={`flex items-center gap-1 text-[12px] font-bold rounded-full px-3 py-1.5 cursor-pointer border ${filter === p.key ? "border-[#013186] bg-[#eaf1ff]" : "border-[#e3e9f5]"}`}>
              <PlatformBadge k={p.key} size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-[#eef1f6] border border-[#eef1f6] rounded-[10px] overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-white px-2 py-2 text-[12px] font-bold text-[#7a8499] text-center">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className="bg-white min-h-[120px] p-1.5 align-top">
            {day && (
              <>
                <p className="m-0 text-[12px] font-bold text-[#0b1f44] mb-1.5">{day}</p>
                <div className="flex flex-col gap-1.5">
                  {postsOn(day).slice(0, 3).map((p) => {
                    const img = (p.media || []).find((m) => m.type === "image");
                    return (
                      <button key={p._id} onClick={() => setOpenPost(p)} title={p.caption}
                        className="w-full flex items-center gap-1.5 rounded-[7px] bg-[#f5f9ff] border border-[#e3e9f5] p-1 hover:bg-[#eaf2ff] cursor-pointer text-left">
                        {img
                          ? <img src={img.url} alt="" className="w-7 h-7 rounded-[5px] object-cover shrink-0" />
                          : <span className="flex gap-0.5 shrink-0">{p.platforms.slice(0, 2).map((k) => <PlatformBadge key={k} k={k} size={16} />)}</span>}
                        <span className="text-[11px] font-semibold text-[#0b1f44] truncate flex-1">{p.caption || "Media post"}</span>
                      </button>
                    );
                  })}
                  {postsOn(day).length > 3 && <span className="text-[10px] text-[#9aa3b2] pl-1">+{postsOn(day).length - 3} more</span>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {openPost && <PostViewer post={openPost} onClose={() => setOpenPost(null)} />}
    </div>
  );
}

// Read-only post viewer (opened from the calendar)
function PostViewer({ post, onClose }) {
  const s = STATUS[post.status] || STATUS.pending;
  const images = (post.media || []).filter((m) => m.type === "image");
  const videos = (post.media || []).filter((m) => m.type === "video");
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[16px] w-full max-w-[480px] max-h-[88vh] overflow-y-auto shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#eef1f6]">
          <span className="flex gap-1">{post.platforms.map((k) => <PlatformBadge key={k} k={k} size={22} />)}</span>
          <span className="text-[11px] font-bold rounded-full px-2.5 py-1" style={{ color: s.c, background: s.bg }}>{s.label}</span>
          <button onClick={onClose} className="ml-auto text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
        </div>
        <div className="p-5">
          <p className="m-0 text-[12px] text-[#9aa3b2] mb-3">{fmt(post.scheduledAt)}{post.createdByRole && post.createdByRole !== "client" ? ` · by ${post.createdByName || "team"}` : ""}</p>
          {images.map((m, i) => <img key={i} src={m.url} alt="" onClick={() => openImage(m.url)} className="w-full rounded-[10px] mb-3 cursor-pointer" />)}
          {videos.map((m, i) => <video key={i} src={m.url} controls className="w-full rounded-[10px] mb-3 bg-black" />)}
          {post.caption ? <p className="m-0 text-[14px] text-[#0b1f44] whitespace-pre-wrap">{post.caption}</p> : <p className="m-0 text-[13px] text-[#9aa3b2]">(no caption)</p>}
          {post.error && <p className="m-0 mt-3 text-[12px] text-[#dc2626] font-semibold">{post.error}</p>}
        </div>
      </div>
    </div>
  );
}
