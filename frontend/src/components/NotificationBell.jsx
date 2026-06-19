import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications, markNotificationsRead, dismissNotification } from "../api";

const TYPE_ICON = {
  message: "💬", meeting: "📅", approval: "✅", feedback: "📋", plan_expiry: "⏳", general: "📢", post: "📝", file: "📎",
};
const ago = (d) => {
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

// role: "client" | "admin"
export default function NotificationBell({ role = "client" }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const prevUnread = useRef(null); // null = first load (don't chime)
  const audioCtx = useRef(null);

  // Create + unlock a single AudioContext on the first user gesture, so the
  // browser's autoplay policy doesn't silence the chime.
  useEffect(() => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const unlock = () => {
      if (!audioCtx.current) audioCtx.current = new Ctx();
      if (audioCtx.current.state === "suspended") audioCtx.current.resume();
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  // Short "ping" via Web Audio — no asset file needed.
  const playPing = useCallback(() => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx.current) audioCtx.current = new Ctx();
      const ctx = audioCtx.current;
      if (ctx.state === "suspended") ctx.resume();
      // Two quick chime tones, louder, for a clearly audible "ding-ding".
      const blip = (startAt, f1, f2) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f1, startAt);
        osc.frequency.exponentialRampToValueAtTime(f2, startAt + 0.12);
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(0.7, startAt + 0.02); // louder peak
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.28);
        osc.start(startAt); osc.stop(startAt + 0.3);
      };
      const t = ctx.currentTime;
      blip(t, 880, 1320);
      blip(t + 0.18, 1046, 1568);
    } catch { /* ignore */ }
  }, []);

  const load = useCallback(async () => {
    try {
      const r = await getNotifications(role);
      // General notifications show in the bottom bar, not the bell.
      const list = (r.data?.items || []).filter((n) => n.type !== "general");
      setItems(list);
      const u = list.filter((n) => !n.read).length;
      // Chime when new unread arrives (skip the very first load).
      if (prevUnread.current !== null && u > prevUnread.current) playPing();
      prevUnread.current = u;
      setUnread(u);
    } catch { /* */ }
  }, [role, playPing]);

  useEffect(() => { load(); const id = setInterval(load, 10000); return () => clearInterval(id); }, [load]);
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggle = async () => {
    const next = !open; setOpen(next);
    if (next && unread > 0) { try { await markNotificationsRead(role); setUnread(0); } catch { /* */ } }
  };
  const dismiss = async (e, id) => { e.stopPropagation(); try { await dismissNotification(id, role); setItems((x) => x.filter((n) => n._id !== id)); } catch { /* */ } };
  const openItem = (n) => { setOpen(false); if (n.link) navigate(n.link); };

  return (
    <div className="relative" ref={ref}>
      <button onClick={toggle} className="relative text-[#5b6472] cursor-pointer hover:text-[#013186]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
        {unread > 0 && <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">{unread > 9 ? "9+" : unread}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[340px] max-h-[440px] overflow-y-auto bg-white rounded-[12px] border border-[#eef1f6] shadow-[0_12px_40px_rgba(1,49,134,0.18)] z-50">
          <div className="px-4 py-3 border-b border-[#f1f4f9] flex items-center justify-between">
            <p className="m-0 text-[14px] font-bold text-[#0b1f44]">Notifications</p>
            {items.length > 0 && <span className="text-[11px] text-[#9aa3b2]">{items.length}</span>}
          </div>
          {items.length === 0 ? (
            <p className="m-0 px-4 py-8 text-center text-[13px] text-[#9aa3b2]">You're all caught up 🎉</p>
          ) : (
            <div className="flex flex-col">
              {items.map((n) => (
                <div key={n._id} onClick={() => openItem(n)}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-[#f4f6fb] last:border-0 cursor-pointer hover:bg-[#f5f9ff] ${n.read ? "" : "bg-[#f5f9ff]"}`}>
                  <span className="text-[18px] shrink-0">{TYPE_ICON[n.type] || "🔔"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{n.title}</p>
                    {n.body && <p className="m-0 text-[12px] text-[#5b6472] line-clamp-2">{n.body}</p>}
                    <p className="m-0 text-[11px] text-[#9aa3b2] mt-0.5">{ago(n.createdAt)}</p>
                  </div>
                  <button onClick={(e) => dismiss(e, n._id)} title="Dismiss" className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer shrink-0 text-[14px]">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
