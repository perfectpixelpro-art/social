import { useState } from "react";
import { broadcastNotification } from "../../api";

export default function AdminNotifications() {
  const [form, setForm] = useState({ title: "", body: "", link: "" });
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState({ ok: null, text: "" });
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = async () => {
    if (!form.title.trim()) { setMsg({ ok: false, text: "Title is required." }); return; }
    setSending(true); setMsg({ ok: null, text: "" });
    try {
      const r = await broadcastNotification(form);
      setMsg({ ok: true, text: `Sent to ${r.sent} client${r.sent === 1 ? "" : "s"}!` });
      setForm({ title: "", body: "", link: "" });
    } catch (e) { setMsg({ ok: false, text: e.message || "Could not send." }); }
    finally { setSending(false); }
  };

  const inputCls = "w-full rounded-[10px] border border-[#e3e9f5] px-4 py-3 text-[14px] outline-none focus:border-[#013186]";

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Notifications</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Send a general notification to every client. It appears in their notification bell (dismissible).</p>

      <section className="rounded-[16px] border border-[#eef1f6] p-6 max-w-[560px] flex flex-col gap-4">
        <div>
          <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Title</label>
          <input value={form.title} onChange={upd("title")} placeholder="e.g. New feature: video scheduling!" className={inputCls} />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Message</label>
          <textarea value={form.body} onChange={upd("body")} rows={3} placeholder="Optional details…" className={`${inputCls} resize-y`} />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Link (optional)</label>
          <input value={form.link} onChange={upd("link")} placeholder="/dashboard/store" className={inputCls} />
        </div>
        {msg.text && <p className={`m-0 text-[13px] font-semibold ${msg.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg.text}</p>}
        <button onClick={send} disabled={sending} className="self-start h-[44px] px-6 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
          {sending ? "Sending…" : "Send to all clients"}
        </button>
      </section>
    </main>
  );
}
