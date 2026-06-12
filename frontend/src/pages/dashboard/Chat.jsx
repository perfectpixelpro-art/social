import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { clientGetMessages, clientSendMessage, clientScheduleMeeting } from "../../api";
import ChatAttachment from "../../components/ChatAttachment";
import MeetingCard from "../../components/MeetingCard";
import ScheduleMeetingModal from "../../components/ScheduleMeetingModal";

const fmtTime = (d) =>
  d ? new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "";

const Avatar = ({ label, size = 40, bg = "#dbe9ff", color = "#013186" }) => (
  <span className="rounded-full font-bold flex items-center justify-center shrink-0" style={{ width: size, height: size, fontSize: size * 0.36, background: bg, color }}>
    {label}
  </span>
);

export default function Chat() {
  const { initials } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const fileRef = useRef(null);
  const endRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const res = await clientGetMessages();
      setMessages(res.data || []);
    } catch { /* ignore poll errors */ }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 4000); // poll every 4s
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t && !file) return;
    const f = file;
    setText("");
    setFile(null);
    setSending(true);
    try {
      await clientSendMessage(t, f);
      load();
    } catch { /* ignore */ } finally { setSending(false); }
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* header */}
      <div className="h-[72px] shrink-0 border-b border-[#eef1f6] flex items-center gap-3 px-6 mq450:px-4">
        <Avatar label="A" bg="#013186" color="#fff" size={42} />
        <div className="leading-tight">
          <p className="m-0 text-[16px] font-bold text-[#0b1f44]">The Social 99 — Support</p>
          <p className="m-0 text-[12px] text-[#16a34a] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] inline-block" /> Admin team
          </p>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-6 mq450:px-4 py-5 flex flex-col gap-3 bg-white">
        {messages.length === 0 && (
          <div className="m-auto text-center text-[#9aa3b2]">
            <p className="m-0 text-[14px] font-semibold">No messages yet</p>
            <p className="m-0 text-[13px]">Send a message to start chatting with our team.</p>
          </div>
        )}
        {messages.map((m) => {
          const mine = m.sender === "client";
          return (
            <div key={m._id} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
              {!mine && <Avatar label="A" bg="#013186" color="#fff" size={30} />}
              <div className={`max-w-[60%] mq450:max-w-[78%] px-4 py-2.5 text-[14px] leading-snug flex flex-col gap-2 ${
                mine ? "bg-[#1463ff] text-white rounded-[16px] rounded-br-[4px]" : "bg-[#eef1f6] text-[#1a2233] rounded-[16px] rounded-bl-[4px]"
              }`}>
                {!mine && m.senderName && <span className="text-[11px] font-bold text-[#013186]">{m.senderName}</span>}
                <ChatAttachment msg={m} mine={mine} />
                {m.meeting?.joinUrl && <MeetingCard meeting={m.meeting} mine={mine} />}
                {m.text && <span>{m.text}</span>}
                <span className={`text-[10px] self-end ${mine ? "text-white/70" : "text-[#9aa3b2]"}`}>{fmtTime(m.createdAt)}</span>
              </div>
              {mine && <Avatar label={initials} size={30} />}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* input */}
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
            <button type="submit" disabled={sending} className="text-[#1463ff] cursor-pointer disabled:opacity-50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            </button>
          </div>
        </form>
      </div>

      {showSchedule && (
        <ScheduleMeetingModal
          onClose={() => setShowSchedule(false)}
          onSchedule={async (payload) => { await clientScheduleMeeting(payload); load(); }}
        />
      )}
    </div>
  );
}
