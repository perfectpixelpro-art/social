import { useState, useEffect, useRef, useCallback } from "react";
import { adminGetConversations, adminGetMessages, adminSendMessage, adminScheduleMeeting } from "../../api";
import ChatAttachment from "../../components/ChatAttachment";
import MeetingCard from "../../components/MeetingCard";
import ScheduleMeetingModal from "../../components/ScheduleMeetingModal";

const initialsOf = (name = "?") => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const fmtTime = (d) =>
  d ? new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "";
const Avatar = ({ name, size = 40, bg = "#dbe9ff", color = "#013186" }) => (
  <span className="rounded-full font-bold flex items-center justify-center shrink-0" style={{ width: size, height: size, fontSize: size * 0.34, background: bg, color }}>
    {initialsOf(name)}
  </span>
);

export default function AdminChat() {
  const [convos, setConvos] = useState([]);
  const [active, setActive] = useState(null); // {clientId, name, email}
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const fileRef = useRef(null);
  const endRef = useRef(null);

  const loadConvos = useCallback(async () => {
    try {
      const res = await adminGetConversations();
      setConvos(res.data || []);
      setActive((a) => a || (res.data && res.data[0]) || null);
    } catch { /* ignore */ }
  }, []);

  const loadMessages = useCallback(async (clientId) => {
    if (!clientId) return;
    try {
      const res = await adminGetMessages(clientId);
      setMessages(res.data || []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    loadConvos();
    const id = setInterval(loadConvos, 5000);
    return () => clearInterval(id);
  }, [loadConvos]);

  useEffect(() => {
    if (!active) return;
    loadMessages(active.clientId);
    const id = setInterval(() => loadMessages(active.clientId), 4000);
    return () => clearInterval(id);
  }, [active, loadMessages]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if ((!t && !file) || !active) return;
    const f = file;
    setText("");
    setFile(null);
    try {
      await adminSendMessage(active.clientId, t, f);
      loadMessages(active.clientId);
      loadConvos();
    } catch { /* ignore */ }
  };

  return (
    <div className="h-full flex min-h-0">
      {/* Conversations list */}
      <aside className={`w-[330px] shrink-0 border-r border-[#eef1f6] flex flex-col min-h-0 mq800:w-full ${active ? "mq800:hidden" : ""}`}>
        <div className="px-5 py-5 flex items-center gap-2">
          <h2 className="m-0 text-[20px] font-bold text-[#0b1f44]">Clients</h2>
          <span className="ml-auto text-[12px] font-bold text-[#5b6472] bg-[#eef1f6] rounded-full px-2 py-0.5">{convos.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convos.length === 0 && <p className="px-5 text-[13px] text-[#9aa3b2]">No clients yet.</p>}
          {convos.map((c) => (
            <button
              key={c.clientId}
              onClick={() => setActive(c)}
              className={`w-full text-left flex gap-3 px-4 py-3 border-b border-[#f4f6fa] cursor-pointer transition-colors ${active?.clientId === c.clientId ? "bg-[#f0f6ff]" : "hover:bg-[#fafbfd]"}`}
            >
              <Avatar name={c.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="m-0 text-[14px] font-bold text-[#0b1f44] truncate">{c.name}</p>
                  {c.unread > 0 && <span className="text-[11px] font-bold text-white bg-[#1463ff] rounded-full px-1.5 min-w-[18px] text-center">{c.unread}</span>}
                </div>
                <p className="m-0 text-[13px] text-[#7a8499] truncate">{c.lastMessage || c.email}</p>
                {c.handler && <span className="inline-block mt-1 text-[10px] font-semibold text-[#7c3aed] bg-[#f0eafe] rounded-full px-2 py-0.5">Handled by {c.handler}</span>}
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Conversation */}
      <section className={`flex-1 min-w-0 flex-col min-h-0 ${active ? "flex" : "hidden mq800:hidden [@media(min-width:801px)]:flex"}`}>
        {!active ? (
          <div className="m-auto text-[#9aa3b2] font-semibold">Select a client to start chatting</div>
        ) : (
          <>
            <div className="h-[72px] shrink-0 border-b border-[#eef1f6] flex items-center gap-3 px-5">
              <button onClick={() => setActive(null)} className="[@media(min-width:801px)]:hidden text-[#5b6472] cursor-pointer mr-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <Avatar name={active.name} size={42} />
              <div className="leading-tight">
                <p className="m-0 text-[16px] font-bold text-[#0b1f44]">{active.name}</p>
                <p className="m-0 text-[12px] text-[#9aa3b2]">{active.email}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 mq450:px-4 py-5 flex flex-col gap-3 bg-white">
              {messages.length === 0 && (
                <div className="m-auto text-center text-[#9aa3b2]">
                  <p className="m-0 text-[14px] font-semibold">No messages yet</p>
                  <p className="m-0 text-[13px]">Send a message to start the conversation.</p>
                </div>
              )}
              {messages.map((m) => {
                const mine = m.sender === "admin";
                return (
                  <div key={m._id} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
                    {!mine && <Avatar name={active.name} size={30} />}
                    <div className={`max-w-[60%] mq450:max-w-[78%] px-4 py-2.5 text-[14px] leading-snug flex flex-col gap-2 ${
                      mine ? "bg-[#1463ff] text-white rounded-[16px] rounded-br-[4px]" : "bg-[#eef1f6] text-[#1a2233] rounded-[16px] rounded-bl-[4px]"
                    }`}>
                      {mine && m.senderName && <span className="text-[11px] font-bold opacity-80">{m.senderName}</span>}
                      <ChatAttachment msg={m} mine={mine} />
                      {m.meeting?.joinUrl && <MeetingCard meeting={m.meeting} mine={mine} />}
                      {m.text && <span>{m.text}</span>}
                      <span className={`text-[10px] self-end ${mine ? "text-white/70" : "text-[#9aa3b2]"}`}>{fmtTime(m.createdAt)}</span>
                    </div>
                    {mine && <Avatar name="Admin" size={30} bg="#013186" color="#fff" />}
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>

            <div className="shrink-0 border-t border-[#eef1f6] px-5 py-4">
              {file && (
                <div className="mb-2 flex items-center gap-2 text-[13px] text-[#013186] bg-[#f0f6ff] border border-[#cfe0ff] rounded-[8px] px-3 py-2 w-fit max-w-full">
                  <span className="truncate max-w-[220px] font-semibold">{file.name}</span>
                  <button type="button" onClick={() => setFile(null)} className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer">✕</button>
                </div>
              )}
              <form onSubmit={send} className="flex items-center gap-3">
                <input ref={fileRef} type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] || null); e.target.value = ""; }} />
                <button type="button" onClick={() => fileRef.current?.click()} title="Attach file" className="text-[#9aa3b2] hover:text-[#013186] cursor-pointer">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21.4 11.05 12.25 20.2a5 5 0 0 1-7.07-7.07l8.49-8.49a3 3 0 0 1 4.24 4.24l-8.49 8.49a1 1 0 0 1-1.41-1.41l7.78-7.78" /></svg>
                </button>
                <button type="button" onClick={() => setShowSchedule(true)} title="Schedule Zoom meeting" className="text-[#2D8CFF] hover:text-[#1f7ae0] cursor-pointer">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="13" height="10" rx="2" /><path d="M21 8.5v7l-5-3.5z" /></svg>
                </button>
                <div className="flex-1 flex items-center rounded-[12px] border border-[#e3e9f5] bg-white px-4 py-2.5">
                  <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" className="flex-1 bg-transparent outline-none text-[14px] text-[#1a2233] placeholder-[#9aa3b2]" />
                  <button type="submit" className="text-[#1463ff] cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </section>

      {showSchedule && active && (
        <ScheduleMeetingModal
          onClose={() => setShowSchedule(false)}
          onSchedule={async (payload) => { await adminScheduleMeeting(active.clientId, payload); loadMessages(active.clientId); loadConvos(); }}
        />
      )}
    </div>
  );
}
