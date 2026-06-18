import { useState, useEffect, useCallback, useRef } from "react";
import { staffGetTickets, staffGetTicket, staffReplyTicket, staffUpdateTicketStatus } from "../../api";
import { statusMeta, Attachments } from "../dashboard/Tickets";

const fmtDateTime = (d) => new Date(d).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

const STATUS_ACTIONS = [
  { key: "in_progress", label: "In Progress", color: "#92710a", bg: "#fef3c7" },
  { key: "resolved", label: "Resolved", color: "#15803d", bg: "#dcfce7" },
  { key: "closed", label: "Closed", color: "#5b6472", bg: "#eef1f6" },
];

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [active, setActive] = useState(null); // full ticket
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    try { const r = await staffGetTickets(); setTickets(r.data || []); } catch { /* */ }
  }, []);
  useEffect(() => { load(); }, [load]);

  const openDetail = async (id) => {
    try { const r = await staffGetTicket(id); setActive(r.data); } catch { /* */ }
  };

  const shown = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Ticket Support</h1>
      <p className="m-0 mt-1 mb-5 text-[14px] text-[#7a8499] font-medium">Client tickets assigned to you. Reply and update status.</p>

      {/* filter chips */}
      <div className="flex gap-2 flex-wrap mb-5">
        {["all", "open", "in_progress", "resolved", "closed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-[12px] font-bold rounded-full px-3 py-1.5 cursor-pointer border ${filter === f ? "border-[#013186] bg-[#eaf1ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
            {f === "all" ? "All" : (statusMeta[f]?.label || f)} ({f === "all" ? tickets.length : tickets.filter((t) => t.status === f).length})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {shown.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No tickets.</p>}
        {shown.map((t) => {
          const s = statusMeta[t.status] || statusMeta.open;
          return (
            <div key={t._id} onClick={() => openDetail(t._id)} className="rounded-[12px] border border-[#eef1f6] px-4 py-3.5 hover:bg-[#fafbfd] transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="m-0 text-[14px] font-bold text-[#0b1f44]">{t.subject}</p>
                  <p className="m-0 mt-1 text-[12px] text-[#9aa3b2]">
                    {t.ticketNo} · {t.client?.name || t.clientName} · {t.category || "—"} · {t.priority} priority
                    {t.handledByName ? ` · handled by ${t.handledByName} (${t.handledByRole})` : ""}
                  </p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${s.cls}`}>{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {active && <StaffTicketDetail ticket={active} onClose={() => setActive(null)} onUpdated={(t) => { setActive(t); load(); }} />}
    </main>
  );
}

function StaffTicketDetail({ ticket, onClose, onUpdated }) {
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
      const r = await staffReplyTicket(ticket._id, fd);
      setText(""); setFiles([]);
      onUpdated(r.data);
    } catch { /* */ } finally { setSending(false); }
  };

  const setStatus = async (status) => {
    try { const r = await staffUpdateTicketStatus(ticket._id, status); onUpdated(r.data); } catch { /* */ }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[16px] w-full max-w-[680px] max-h-[90vh] flex flex-col shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3 px-6 py-4 border-b border-[#eef1f6]">
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[16px] font-bold text-[#0b1f44]">{ticket.subject}</p>
            <p className="m-0 text-[12px] text-[#9aa3b2]">{ticket.ticketNo} · {ticket.client?.name || ticket.clientName} · {ticket.priority} priority</p>
          </div>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${s.cls}`}>{s.label}</span>
          <button onClick={onClose} className="text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
        </div>

        {/* status buttons */}
        <div className="flex gap-2 flex-wrap px-6 py-3 border-b border-[#eef1f6]">
          {STATUS_ACTIONS.map((a) => (
            <button key={a.key} onClick={() => setStatus(a.key)} disabled={ticket.status === a.key}
              className="text-[12px] font-bold rounded-[8px] px-3 py-1.5 cursor-pointer disabled:opacity-100 disabled:ring-2 disabled:ring-offset-1"
              style={{ background: a.bg, color: a.color }}>
              {a.label}{ticket.status === a.key ? " ✓" : ""}
            </button>
          ))}
          {ticket.handledByName && <span className="ml-auto text-[11px] text-[#9aa3b2] self-center">Last action: {ticket.handledByName} ({ticket.handledByRole})</span>}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="rounded-[10px] bg-[#f5f9ff] border border-[#eef1f6] p-3 mb-4">
            <p className="m-0 text-[12px] font-bold text-[#013186]">{ticket.client?.name || ticket.clientName} (client) · {fmtDateTime(ticket.createdAt)}</p>
            {ticket.description && <p className="m-0 mt-1 text-[13px] text-[#0b1f44] whitespace-pre-wrap">{ticket.description}</p>}
            <Attachments items={ticket.attachments} />
          </div>

          {ticket.replies?.map((r, i) => {
            const staff = r.sender === "staff";
            return (
              <div key={i} className={`rounded-[10px] border p-3 mb-3 ${staff ? "bg-white border-[#e3e9f5]" : "bg-[#f5f9ff] border-[#eef1f6]"}`}>
                <p className="m-0 text-[12px] font-bold" style={{ color: staff ? "#7c3aed" : "#013186" }}>
                  {r.senderName || (staff ? "Staff" : "Client")} ({r.senderRole}) · {fmtDateTime(r.createdAt)}
                </p>
                {r.text && <p className="m-0 mt-1 text-[13px] text-[#0b1f44] whitespace-pre-wrap">{r.text}</p>}
                <Attachments items={r.attachments} />
              </div>
            );
          })}
        </div>

        <div className="border-t border-[#eef1f6] p-4">
          {files.length > 0 && <p className="m-0 mb-2 text-[12px] text-[#9aa3b2]">{files.length} file(s) attached</p>}
          <div className="flex items-end gap-2">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="Reply to the client…"
              className="flex-1 rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] outline-none focus:border-[#013186] resize-none" />
            <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files))} />
            <button onClick={() => fileRef.current?.click()} className="h-[42px] w-[42px] rounded-[10px] border border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb] cursor-pointer shrink-0" title="Attach">📎</button>
            <button onClick={send} disabled={sending} className="h-[42px] px-5 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60 shrink-0">
              {sending ? "…" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
