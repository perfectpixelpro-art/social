import { useState } from "react";
import { broadcastNotification } from "../../api";

const DESTINATIONS = [
  { value: "", label: "No link (just a message)" },
  { value: "/dashboard", label: "Dashboard Home" },
  { value: "/dashboard/store", label: "Store (add-ons)" },
  { value: "/dashboard/scheduling", label: "Scheduling" },
  { value: "/dashboard/files", label: "Files" },
  { value: "/dashboard/help", label: "Help & Articles" },
];
const CTAS = ["Learn more", "Buy now", "Avail now", "Get started"];

export default function AdminNotifications() {
  const [form, setForm] = useState({ title: "", body: "", link: "", cta: "Learn more" });
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState({ ok: null, text: "" });
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = async () => {
    if (!form.title.trim()) { setMsg({ ok: false, text: "Title is required." }); return; }
    setSending(true); setMsg({ ok: null, text: "" });
    try {
      const r = await broadcastNotification(form);
      setMsg({ ok: true, text: `Sent to ${r.sent} client${r.sent === 1 ? "" : "s"}!` });
      setForm({ title: "", body: "", link: "", cta: "Learn more" });
    } catch (e) { setMsg({ ok: false, text: e.message || "Could not send." }); }
    finally { setSending(false); }
  };

  const inputCls = "w-full rounded-[10px] border border-[#e3e9f5] px-4 py-3 text-[14px] outline-none focus:border-[#013186]";

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Notifications</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Send a general notification to every client. It appears as a bar on their dashboard (dismissible).</p>

      <div className="flex gap-6 mq1125:flex-col items-start">
        {/* ── Form ── */}
        <section className="flex-1 min-w-0 max-w-[560px] rounded-[16px] border border-[#eef1f6] p-6 flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Title</label>
            <input value={form.title} onChange={upd("title")} placeholder="e.g. New feature: video scheduling!" className={inputCls} />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Message</label>
            <textarea value={form.body} onChange={upd("body")} rows={3} placeholder="Optional details…" className={`${inputCls} resize-y`} />
          </div>
          <div className="grid grid-cols-2 mq450:grid-cols-1 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Goes to</label>
              <select value={form.link} onChange={upd("link")} className={`${inputCls} cursor-pointer`}>
                {DESTINATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Button</label>
              <select value={form.cta} onChange={upd("cta")} disabled={!form.link} className={`${inputCls} cursor-pointer disabled:bg-[#f5f7fb] disabled:text-[#9aa3b2]`}>
                {CTAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {msg.text && <p className={`m-0 text-[13px] font-semibold ${msg.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg.text}</p>}
          <button onClick={send} disabled={sending} className="self-start h-[44px] px-6 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
            {sending ? "Sending…" : "Send to all clients"}
          </button>
        </section>

        {/* ── Live preview ── */}
        <section className="w-[420px] shrink-0 mq1125:w-full">
          <p className="m-0 mb-3 text-[12px] font-bold tracking-wider text-[#9aa3b2]">PREVIEW</p>
          <div className="rounded-[16px] border border-[#eef1f6] bg-[#f5f7fb] p-6 flex items-end justify-center min-h-[180px]">
            <div className="w-full flex items-center gap-4 rounded-[14px] bg-[#0b1f44] text-white px-5 py-3.5 shadow-[0_16px_50px_rgba(1,49,134,0.4)]">
              <span className="text-[20px] shrink-0">📢</span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[14px] font-bold truncate">{form.title || "Your notification title"}</p>
                {form.body && <p className="m-0 text-[12px] text-white/70 truncate">{form.body}</p>}
              </div>
              {form.link && (
                <button className="shrink-0 rounded-[10px] bg-[#1463ff] text-white font-bold text-[13px] px-4 py-2">{form.cta} →</button>
              )}
              <button className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <p className="m-0 mt-3 text-[12px] text-[#9aa3b2]">This is exactly how it appears at the bottom of each client's dashboard.</p>
        </section>
      </div>
    </main>
  );
}
