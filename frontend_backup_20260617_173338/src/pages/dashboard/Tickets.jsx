import { useState, useRef, useEffect, useCallback } from "react";
import { clientCreateTicket, clientGetTickets, clientGetTicket, clientReplyTicket } from "../../api";
import { openImage } from "../../components/ImageViewer";

const labelCls = "text-[13px] font-bold text-[#0b1f44] mb-2 block";
const inputCls =
  "w-full rounded-[10px] bg-white border border-[#e3e9f5] px-4 py-3 text-[14px] text-[#1a2233] outline-none focus:border-[#013186] transition-colors placeholder-[#9aa3b2]";

const categories = [
  { label: "Content Request", d: <><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h5" /></> },
  { label: "Project Issue", d: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></> },
  { label: "Billing & Payments", d: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></> },
  { label: "Account Access", d: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></> },
  { label: "Technical Support", d: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.4-.6-.6-2.4z" /></> },
  { label: "Other", d: <><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></> },
];

const priorities = [
  { label: "Low", color: "#16a34a" },
  { label: "Medium", color: "#f59e0b" },
  { label: "High", color: "#1463ff" },
];

// status → display
export const statusMeta = {
  open: { label: "Open", cls: "bg-[#eaf1ff] text-[#1463ff]" },
  in_progress: { label: "In Progress", cls: "bg-[#fef3c7] text-[#92710a]" },
  resolved: { label: "Resolved", cls: "bg-[#dcfce7] text-[#15803d]" },
  closed: { label: "Closed", cls: "bg-[#eef1f6] text-[#5b6472]" },
};

const fmtDate = (d) => new Date(d).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
const fmtDateTime = (d) => new Date(d).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

// Render a list of attachments (image thumbs + file links)
export function Attachments({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((a, i) =>
        a.fileType === "image" ? (
          <button key={i} type="button" onClick={() => openImage(a.fileUrl, a.fileName)} className="p-0 border-0 bg-transparent cursor-pointer">
            <img src={a.fileUrl} alt={a.fileName} className="w-[64px] h-[64px] object-cover rounded-[8px] border border-[#eef1f6]" />
          </button>
        ) : (
          <a key={i} href={a.fileUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 rounded-[8px] border border-[#eef1f6] bg-[#fbfcfe] px-3 py-2 text-[12px] font-semibold text-[#1463ff] no-underline max-w-[200px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
            <span className="truncate">{a.fileName}</span>
          </a>
        )
      )}
    </div>
  );
}

export default function Tickets() {
  const [form, setForm] = useState({ subject: "", category: "", description: "" });
  const [activeCat, setActiveCat] = useState("");
  const [priority, setPriority] = useState("High");
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ ok: null, text: "" });
  const fileInputRef = useRef(null);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const [tickets, setTickets] = useState([]);
  const [openTicket, setOpenTicket] = useState(null); // full ticket object

  const load = useCallback(async () => {
    try { const r = await clientGetTickets(); setTickets(r.data || []); } catch { /* */ }
  }, []);
  useEffect(() => { load(); }, [load]);

  const MAX = 25 * 1024 * 1024; // matches backend limit
  const addFiles = (list) => {
    const arr = Array.from(list);
    const tooBig = arr.filter((f) => f.size > MAX);
    if (tooBig.length) setMsg({ ok: false, text: `${tooBig.length} file(s) over 25MB were skipped.` });
    setFiles((prev) => [...prev, ...arr.filter((f) => f.size <= MAX)]);
  };
  const onDrop = (e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files); };
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const fmtSize = (b) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

  const resetForm = () => { setForm({ subject: "", category: "", description: "" }); setActiveCat(""); setPriority("High"); setFiles([]); };

  const submit = async () => {
    if (!form.subject.trim()) { setMsg({ ok: false, text: "Please add a subject." }); return; }
    setSubmitting(true); setMsg({ ok: null, text: "" });
    try {
      const fd = new FormData();
      fd.append("subject", form.subject);
      fd.append("category", form.category);
      fd.append("priority", priority);
      fd.append("description", form.description);
      files.forEach((f) => fd.append("files", f));
      await clientCreateTicket(fd);
      setMsg({ ok: true, text: "Ticket submitted!" });
      resetForm();
      load();
    } catch (err) {
      setMsg({ ok: false, text: err.message || "Could not submit." });
    } finally { setSubmitting(false); }
  };

  const openDetail = async (id) => {
    try { const r = await clientGetTicket(id); setOpenTicket(r.data); } catch { /* */ }
  };

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <div className="grid grid-cols-[1fr_360px] mq1125:grid-cols-1 gap-6 items-start">

        {/* ── Raise a Ticket ── */}
        <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
          <div className="flex items-start gap-3 mb-6">
            <span className="w-9 h-9 rounded-[10px] bg-[#eaf1ff] text-[#013186] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" /></svg>
            </span>
            <div>
              <h2 className="m-0 text-[17px] font-bold text-[#0b1f44]">Raise a Ticket</h2>
              <p className="m-0 text-[13px] text-[#9aa3b2]">Need help? Submit a ticket and our team will get back to you as soon as possible.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className={labelCls}>Subject</label>
              <input value={form.subject} onChange={upd("subject")} className={inputCls} placeholder="Briefly describe your issue" />
            </div>

            <div>
              <label className={labelCls}>Category</label>
              <div className="grid grid-cols-3 mq450:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <button key={c.label} type="button"
                    onClick={() => { setActiveCat(c.label); setForm((f) => ({ ...f, category: c.label })); }}
                    className={`flex items-center gap-2 rounded-[10px] border px-3 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                      activeCat === c.label ? "border-[#1463ff] bg-[#f0f6ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"
                    }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1463ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.d}</svg>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Priority</label>
              <div className="flex gap-3 flex-wrap">
                {priorities.map((p) => (
                  <button key={p.label} type="button" onClick={() => setPriority(p.label)}
                    className={`flex items-center gap-2 rounded-[10px] border px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                      priority === p.label ? "border-[#1463ff] bg-[#f0f6ff]" : "border-[#e3e9f5] hover:bg-[#f5f7fb]"
                    }`}>
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: p.color }}>
                      {priority === p.label && <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />}
                    </span>
                    <span className="text-[#0b1f44]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea value={form.description} onChange={upd("description")} rows={5} className={`${inputCls} resize-none`} placeholder="Please provide detailed information about your issue...." />
            </div>

            <div>
              <label className={labelCls}>Attachments <span className="text-[#9aa3b2] font-medium">(Optional)</span></label>
              <input ref={fileInputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.docx,.mp4" className="hidden"
                onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
              <div onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)} onDrop={onDrop}
                className={`rounded-[12px] border border-dashed py-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  dragging ? "border-[#1463ff] bg-[#e8f1ff]" : "border-[#9ec2ff] bg-[#f5f9ff] hover:bg-[#eef6ff]"
                }`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1463ff" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 9l5-5 5 5" /><path d="M12 4v12" /></svg>
                <p className="m-0 mt-2 text-[13px] text-[#5b6472] font-semibold">Drag and drop files here or <span className="text-[#1463ff]">click to upload</span></p>
                <p className="m-0 text-[11px] text-[#9aa3b2]">Max file size: 25MB (PDF, PNG, JPG, DOCX, MP4)</p>
              </div>

              {files.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-[10px] border border-[#eef1f6] bg-[#fbfcfe] px-3 py-2">
                      {f.type?.startsWith("image/")
                        ? <img src={URL.createObjectURL(f)} alt="" className="w-9 h-9 rounded-[6px] object-cover shrink-0" />
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1463ff" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>}
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-[13px] font-semibold text-[#0b1f44] truncate">{f.name}</p>
                        <p className="m-0 text-[11px] text-[#9aa3b2]">{fmtSize(f.size)}</p>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              {msg.text && <span className={`text-[13px] font-semibold ${msg.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg.text}</span>}
              <button onClick={submit} disabled={submitting} className="ml-auto text-[14px] font-bold text-white bg-[#1463ff] rounded-[10px] px-6 py-2.5 hover:bg-[#0d50d8] transition-colors cursor-pointer disabled:opacity-60">
                {submitting ? "Submitting…" : "Submit Ticket"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Recent Tickets ── */}
        <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
          <h2 className="m-0 mb-4 text-[16px] font-bold text-[#0b1f44]">Your Recent Tickets</h2>
          <div className="flex flex-col gap-3">
            {tickets.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No tickets yet.</p>}
            {tickets.map((t) => {
              const s = statusMeta[t.status] || statusMeta.open;
              return (
                <div key={t._id} onClick={() => openDetail(t._id)} className="rounded-[12px] border border-[#eef1f6] px-4 py-3.5 hover:bg-[#fafbfd] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <p className="m-0 text-[14px] font-bold text-[#0b1f44]">{t.subject}</p>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${s.cls}`}>{s.label}</span>
                  </div>
                  <p className="m-0 mt-1 text-[12px] text-[#9aa3b2]">{t.ticketNo} · {fmtDate(t.createdAt)}{t.replies?.length ? ` · ${t.replies.length} repl${t.replies.length === 1 ? "y" : "ies"}` : ""}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {openTicket && <TicketDetail ticket={openTicket} onClose={() => setOpenTicket(null)} onUpdated={(t) => { setOpenTicket(t); load(); }} />}
    </main>
  );
}

// ── Client ticket detail + reply thread ──
function TicketDetail({ ticket, onClose, onUpdated }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [sending, setSending] = useState(false);
  const fileRef = useRef(null);
  const s = statusMeta[ticket.status] || statusMeta.open;

  const send = async () => {
    if (!text.trim() && !files.length) return;
    setSending(true);
    try {
      const fd = new FormData();
      fd.append("text", text);
      files.forEach((f) => fd.append("files", f));
      const r = await clientReplyTicket(ticket._id, fd);
      setText(""); setFiles([]);
      onUpdated(r.data);
    } catch { /* */ } finally { setSending(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[16px] w-full max-w-[640px] max-h-[88vh] flex flex-col shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3 px-6 py-4 border-b border-[#eef1f6]">
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[16px] font-bold text-[#0b1f44]">{ticket.subject}</p>
            <p className="m-0 text-[12px] text-[#9aa3b2]">{ticket.ticketNo} · {ticket.category || "—"} · {ticket.priority} priority</p>
          </div>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${s.cls}`}>{s.label}</span>
          <button onClick={onClose} className="text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* original message */}
          <div className="rounded-[10px] bg-[#f5f9ff] border border-[#eef1f6] p-3 mb-4">
            <p className="m-0 text-[12px] font-bold text-[#013186]">You · {fmtDateTime(ticket.createdAt)}</p>
            {ticket.description && <p className="m-0 mt-1 text-[13px] text-[#0b1f44] whitespace-pre-wrap">{ticket.description}</p>}
            <Attachments items={ticket.attachments} />
          </div>

          {/* replies */}
          {ticket.replies?.map((r, i) => {
            const mine = r.sender === "client";
            return (
              <div key={i} className={`rounded-[10px] border p-3 mb-3 ${mine ? "bg-[#f5f9ff] border-[#eef1f6]" : "bg-white border-[#e3e9f5]"}`}>
                <p className="m-0 text-[12px] font-bold" style={{ color: mine ? "#013186" : "#7c3aed" }}>
                  {mine ? "You" : `${r.senderName || "Support"} (${r.senderRole})`} · {fmtDateTime(r.createdAt)}
                </p>
                {r.text && <p className="m-0 mt-1 text-[13px] text-[#0b1f44] whitespace-pre-wrap">{r.text}</p>}
                <Attachments items={r.attachments} />
              </div>
            );
          })}
        </div>

        {/* reply box (clients can reply unless closed) */}
        {ticket.status !== "closed" ? (
          <div className="border-t border-[#eef1f6] p-4">
            {files.length > 0 && <p className="m-0 mb-2 text-[12px] text-[#9aa3b2]">{files.length} file(s) attached</p>}
            <div className="flex items-end gap-2">
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="Write a reply…"
                className="flex-1 rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] outline-none focus:border-[#013186] resize-none" />
              <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => { setFiles(Array.from(e.target.files)); }} />
              <button onClick={() => fileRef.current?.click()} className="h-[42px] w-[42px] rounded-[10px] border border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb] cursor-pointer shrink-0" title="Attach">📎</button>
              <button onClick={send} disabled={sending} className="h-[42px] px-5 rounded-[10px] bg-[#1463ff] text-white font-bold text-[14px] hover:bg-[#0d50d8] cursor-pointer disabled:opacity-60 shrink-0">
                {sending ? "…" : "Send"}
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-[#eef1f6] p-4 text-center text-[13px] text-[#9aa3b2] font-semibold">This ticket is closed.</div>
        )}
      </div>
    </div>
  );
}
