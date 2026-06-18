import { useState, useEffect, useCallback, useRef } from "react";
import { adminListClients, staffListClientPosts, staffCreateClientPost, staffDeleteClientPost, staffClientAnalytics, staffGetTracker, staffUpdateTrackerItem, staffResetTracker } from "../../api";
import { openImage } from "../../components/ImageViewer";
import DeliverablesTracker from "../../components/DeliverablesTracker";
import { PLATFORMS, PMAP, PlatformBadge, AnalyticsPanel, num, fmt, defaultWhen, STATUS } from "../dashboard/Scheduling";

export default function AdminScheduling() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [tab, setTab] = useState("compose");

  useEffect(() => {
    (async () => {
      try {
        const r = await adminListClients();
        const list = r.data || [];
        setClients(list);
        if (list.length) setClientId(list[0]._id);
      } catch { /* */ }
    })();
  }, []);

  const client = clients.find((c) => c._id === clientId);

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Scheduling</h1>
        <div className="flex items-center gap-2">
          <label className="text-[13px] font-semibold text-[#7a8499]">Client</label>
          <select value={clientId} onChange={(e) => setClientId(e.target.value)}
            className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] font-semibold text-[#0b1f44] outline-none focus:border-[#013186] cursor-pointer min-w-[200px]">
            {clients.length === 0 && <option value="">No clients</option>}
            {clients.map((c) => <option key={c._id} value={c._id}>{c.name || c.email}</option>)}
          </select>
        </div>
      </div>
      <p className="m-0 mt-1 mb-5 text-[14px] text-[#7a8499] font-medium">
        {client ? `Compose & track posts for ${client.name || client.email}. Posts you create require the client's approval before publishing.` : "Select a client to begin."}
      </p>

      {client && (
        <>
          <div className="flex gap-2 mb-6 border-b border-[#eef1f6]">
            {[["compose", "Schedule"], ["analytics", "Analytics"], ["calendar", "Calendar"], ["deliverables", "Deliverables"]].map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`px-4 py-2.5 text-[14px] font-bold cursor-pointer border-b-2 -mb-px ${tab === k ? "border-[#013186] text-[#013186]" : "border-transparent text-[#7a8499] hover:text-[#013186]"}`}>
                {label}
              </button>
            ))}
          </div>
          {tab === "compose" && <StaffCompose clientId={clientId} clientName={client.name || client.email} />}
          {tab === "analytics" && <StaffAnalytics clientId={clientId} />}
          {tab === "calendar" && <StaffCalendar clientId={clientId} />}
          {tab === "deliverables" && <StaffDeliverables clientId={clientId} />}
        </>
      )}
    </main>
  );
}

function StaffCompose({ clientId, clientName }) {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [picked, setPicked] = useState(["facebook"]);
  const [when, setWhen] = useState(defaultWhen());
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ ok: null, text: "" });
  const fileRef = useRef(null);

  const load = useCallback(async () => { try { const r = await staffListClientPosts(clientId); setPosts(r.data || []); } catch { /* */ } }, [clientId]);
  useEffect(() => { load(); const id = setInterval(load, 5000); return () => clearInterval(id); }, [load]); // live updates

  const togglePlatform = (k) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const addFiles = (list) => { const arr = Array.from(list); setFiles((prev) => [...prev, ...arr]); };
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async () => {
    if (!caption.trim() && !files.length) { setMsg({ ok: false, text: "Add a caption or media." }); return; }
    if (!picked.length) { setMsg({ ok: false, text: "Pick a platform." }); return; }
    setSaving(true); setMsg({ ok: null, text: "" });
    try {
      const fd = new FormData();
      fd.append("clientId", clientId);
      fd.append("caption", caption);
      fd.append("platforms", JSON.stringify(picked));
      fd.append("scheduledAt", new Date(when).toISOString());
      files.forEach((f) => fd.append("media", f));
      await staffCreateClientPost(fd);
      setMsg({ ok: true, text: "Sent to client for approval!" });
      setCaption(""); setFiles([]); setWhen(defaultWhen()); setPicked(["facebook"]);
      load();
    } catch (e) { setMsg({ ok: false, text: e.message || "Could not create." }); }
    finally { setSaving(false); }
  };

  const remove = async (id) => { if (!window.confirm("Delete this post?")) return; try { await staffDeleteClientPost(id); load(); } catch { /* */ } };

  const aStatus = (p) => p.approvalStatus === "pending" ? { t: "Awaiting client", c: "#d97706" }
    : p.approvalStatus === "approved" ? { t: "Approved", c: "#16a34a" }
    : p.approvalStatus === "rejected" ? { t: "Rejected", c: "#dc2626" } : { t: "", c: "#9aa3b2" };

  return (
    <div className="flex gap-6 mq1125:flex-col">
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <section className="rounded-[12px] border border-[#eef1f6] p-5">
          <h2 className="m-0 mb-1 text-[16px] font-bold text-[#0b1f44]">Create a post for {clientName}</h2>
          <p className="m-0 mb-4 text-[12px] text-[#7a8499]">The client must approve before it publishes.</p>

          <div className="flex gap-2 flex-wrap mb-4">
            {PLATFORMS.map((p) => {
              const on = picked.includes(p.key);
              return (
                <button key={p.key} onClick={() => togglePlatform(p.key)}
                  className={`flex items-center gap-2 rounded-[10px] border px-3 py-2 text-[13px] font-bold cursor-pointer ${on ? "border-[#013186] bg-[#eaf1ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
                  <PlatformBadge k={p.key} size={18} /> {p.name}
                </button>
              );
            })}
          </div>

          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={4} placeholder="Write the caption…"
            className="w-full rounded-[10px] border border-[#e3e9f5] px-4 py-3 text-[14px] outline-none focus:border-[#013186] resize-y mb-4" />

          <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-[13px] font-semibold text-[#013186] border border-[#cfe0ff] rounded-[8px] px-4 py-2 hover:bg-[#f0f6ff] cursor-pointer">Add photos / videos</button>
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

          <div className="flex items-center gap-3 flex-wrap mt-4">
            <label className="text-[13px] font-semibold text-[#7a8499]">Publish at</label>
            <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] outline-none focus:border-[#013186]" />
            <button onClick={submit} disabled={saving} className="ml-auto h-[44px] px-6 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
              {saving ? "Sending…" : "Send for approval"}
            </button>
          </div>
          {msg.text && <p className={`m-0 mt-3 text-[13px] font-semibold ${msg.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg.text}</p>}
        </section>

        <section className="rounded-[12px] border border-[#eef1f6] p-5">
          <h2 className="m-0 mb-4 text-[16px] font-bold text-[#0b1f44]">Posts ({posts.length})</h2>
          {posts.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No posts yet.</p>}
          <div className="flex flex-col gap-3">
            {posts.map((p) => {
              const s = STATUS[p.status] || STATUS.pending;
              const a = aStatus(p);
              const firstImg = (p.media || []).find((m) => m.type === "image");
              return (
                <div key={p._id} className="flex items-start gap-3 rounded-[10px] border border-[#eef1f6] p-3">
                  {firstImg
                    ? <img src={firstImg.url} alt="" onClick={() => openImage(firstImg.url)} className="w-12 h-12 rounded-[8px] object-cover cursor-pointer shrink-0" />
                    : <div className="w-12 h-12 rounded-[8px] bg-[#eaf1ff] flex items-center justify-center shrink-0"><span className="text-[#013186] text-[10px] font-bold">{(p.media||[]).length ? "VID" : "TXT"}</span></div>}
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-1 mb-1">{p.platforms.map((k) => <PlatformBadge key={k} k={k} size={16} />)}</div>
                    <p className="m-0 text-[13px] text-[#0b1f44] font-semibold break-words line-clamp-2">{p.caption || "(media only)"}</p>
                    <p className="m-0 text-[11px] text-[#9aa3b2] mt-1">{fmt(p.scheduledAt)} · <span style={{ color: a.c }} className="font-bold">{a.t}</span>{p.error ? ` · ${p.error}` : ""}</p>
                  </div>
                  <span className="text-[11px] font-bold rounded-full px-2.5 py-1 shrink-0" style={{ color: s.c, background: s.bg }}>{s.label}</span>
                  <button onClick={() => remove(p._id)} className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer shrink-0">✕</button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function StaffAnalytics({ clientId }) {
  const [platform, setPlatform] = useState("facebook");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    staffClientAnalytics(clientId, platform).then((r) => setData(r.data)).catch(() => setData(null)).finally(() => setLoading(false));
  }, [clientId, platform]);

  return (
    <div className="flex gap-6 mq800:flex-col">
      <div className="w-[200px] shrink-0 mq800:w-full flex mq800:flex-row flex-col gap-2">
        {PLATFORMS.map((p) => (
          <button key={p.key} onClick={() => setPlatform(p.key)}
            className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-[14px] font-bold cursor-pointer text-left ${platform === p.key ? "border-[#013186] bg-[#eaf1ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
            <PlatformBadge k={p.key} size={22} /> <span className="mq800:hidden">{p.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 min-w-0">
        {loading && <p className="text-[13px] text-[#9aa3b2]">Loading…</p>}
        {!loading && data && <AnalyticsPanel data={data} platform={platform} />}
      </div>
    </div>
  );
}

const SERVICE_OPTS = [["marketing", "Social Media"], ["video", "Short-Form Video"], ["website", "Website"]];
const TIER_OPTS = ["Basic", "Standard", "Premium"];

function StaffDeliverables({ clientId }) {
  const [tracker, setTracker] = useState(null);
  const load = useCallback(async () => { try { const r = await staffGetTracker(clientId); setTracker(r.data); } catch { /* */ } }, [clientId]);
  useEffect(() => { load(); }, [load]);

  const change = async (key, payload) => {
    try { const r = await staffUpdateTrackerItem(clientId, { key, ...payload }); setTracker(r.data); } catch { /* */ }
  };
  const setPlan = async (service, tier) => {
    if (!window.confirm("Change the plan? This resets all progress for this month.")) return;
    try { const r = await staffResetTracker(clientId, { service, tier }); setTracker(r.data); } catch { /* */ }
  };

  return (
    <div className="max-w-[640px]">
      <p className="m-0 mb-4 text-[13px] text-[#7a8499]">Set the client's service & plan, then tick deliverables as you complete them — the client sees it live.</p>

      {/* service + tier selectors */}
      <div className="flex gap-3 flex-wrap mb-5">
        <div>
          <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Service</label>
          <select value={tracker?.service || "marketing"} onChange={(e) => setPlan(e.target.value, tracker?.plan || "Basic")}
            className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] font-semibold text-[#0b1f44] outline-none focus:border-[#013186] cursor-pointer">
            {SERVICE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Plan</label>
          <select value={tracker?.plan || "Basic"} onChange={(e) => setPlan(tracker?.service || "marketing", e.target.value)}
            className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] font-semibold text-[#0b1f44] outline-none focus:border-[#013186] cursor-pointer">
            {TIER_OPTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <DeliverablesTracker tracker={tracker} editable onChange={change} />
    </div>
  );
}

function StaffCalendar({ clientId }) {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });

  useEffect(() => { (async () => { try { const r = await staffListClientPosts(clientId); setPosts(r.data || []); } catch { /* */ } })(); }, [clientId]);

  const year = cursor.getFullYear(), month = cursor.getMonth();
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const postsOn = (day) => posts.filter((p) => { const dt = new Date(p.scheduledAt); return dt.getFullYear() === year && dt.getMonth() === month && dt.getDate() === day; });

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="w-9 h-9 rounded-[8px] border border-[#e3e9f5] hover:bg-[#f5f7fb] cursor-pointer">‹</button>
        <h2 className="m-0 text-[18px] font-bold text-[#0b1f44] min-w-[170px] text-center">{cursor.toLocaleString([], { month: "long", year: "numeric" })}</h2>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="w-9 h-9 rounded-[8px] border border-[#e3e9f5] hover:bg-[#f5f7fb] cursor-pointer">›</button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-[#eef1f6] border border-[#eef1f6] rounded-[10px] overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="bg-white px-2 py-2 text-[12px] font-bold text-[#7a8499] text-center">{d}</div>)}
        {cells.map((day, i) => (
          <div key={i} className="bg-white min-h-[96px] p-1.5">
            {day && (
              <>
                <p className="m-0 text-[12px] font-bold text-[#0b1f44] mb-1">{day}</p>
                <div className="flex flex-col gap-1">
                  {postsOn(day).slice(0, 3).map((p) => (
                    <div key={p._id} className="flex items-center gap-1 rounded-[5px] bg-[#f5f9ff] border border-[#e3e9f5] px-1 py-0.5" title={p.caption}>
                      {p.platforms.slice(0, 2).map((k) => <PlatformBadge key={k} k={k} size={14} />)}
                      <span className="text-[10px] text-[#0b1f44] truncate">{p.caption || "media"}</span>
                    </div>
                  ))}
                  {postsOn(day).length > 3 && <span className="text-[10px] text-[#9aa3b2]">+{postsOn(day).length - 3} more</span>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
