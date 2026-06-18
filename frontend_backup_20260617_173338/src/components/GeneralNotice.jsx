import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications, dismissNotification } from "../api";

// Sticky bottom bar showing the latest general (admin broadcast) notification.
export default function GeneralNotice() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  const load = async () => {
    try {
      const r = await getNotifications("client");
      const gen = (r.data?.items || []).find((n) => n.type === "general");
      setNotice(gen || null);
    } catch { /* */ }
  };
  useEffect(() => { load(); const id = setInterval(load, 15000); return () => clearInterval(id); }, []);

  const close = async () => {
    if (notice) { try { await dismissNotification(notice._id, "client"); } catch { /* */ } }
    setNotice(null);
  };
  const openLink = () => {
    if (!notice?.link) return;
    if (notice.link.startsWith("/")) { navigate(notice.link); close(); }
    else window.open(notice.link, "_blank");
  };

  if (!notice) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] w-[calc(100%-32px)] max-w-[820px]">
      <div className="flex items-center gap-4 rounded-[14px] bg-[#0b1f44] text-white px-5 py-3.5 shadow-[0_16px_50px_rgba(1,49,134,0.4)]">
        <span className="text-[20px] shrink-0">📢</span>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[14px] font-bold truncate">{notice.title}</p>
          {notice.body && <p className="m-0 text-[12px] text-white/70 truncate">{notice.body}</p>}
        </div>
        {notice.link && (
          <button onClick={openLink} className="shrink-0 rounded-[10px] bg-[#1463ff] hover:bg-[#0d50d8] text-white font-bold text-[13px] px-4 py-2 cursor-pointer">
            Learn more →
          </button>
        )}
        <button onClick={close} title="Dismiss" className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}
