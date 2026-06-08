import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { clientGetMessages, clientSendMessage } from "../../api";

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
    if (!t) return;
    setText("");
    setSending(true);
    // optimistic
    setMessages((m) => [...m, { _id: "tmp" + Date.now(), sender: "client", text: t, createdAt: new Date().toISOString() }]);
    try {
      await clientSendMessage(t);
      load();
    } catch { /* keep optimistic */ } finally { setSending(false); }
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
              <div className={`max-w-[60%] mq450:max-w-[78%] px-4 py-2.5 text-[14px] leading-snug ${
                mine ? "bg-[#1463ff] text-white rounded-[16px] rounded-br-[4px]" : "bg-[#eef1f6] text-[#1a2233] rounded-[16px] rounded-bl-[4px]"
              }`}>
                {m.text}
              </div>
              {mine && <Avatar label={initials} size={30} />}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* input */}
      <form onSubmit={send} className="shrink-0 border-t border-[#eef1f6] px-5 py-4 flex items-center gap-3">
        <div className="flex-1 flex items-center rounded-[12px] border border-[#e3e9f5] bg-white px-4 py-2.5">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" className="flex-1 bg-transparent outline-none text-[14px] text-[#1a2233] placeholder-[#9aa3b2]" />
          <button type="submit" disabled={sending} className="text-[#1463ff] cursor-pointer disabled:opacity-50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
          </button>
        </div>
      </form>
    </div>
  );
}
