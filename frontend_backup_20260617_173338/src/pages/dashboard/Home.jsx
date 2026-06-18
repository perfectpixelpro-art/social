import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConnectSocial from "../../components/ConnectSocial";
import DeliverablesTracker from "../../components/DeliverablesTracker";
import { listScheduledPosts, clientGetMessages, getMyTracker } from "../../api";
import { PlatformBadge } from "./Scheduling";

const WEEKLY_TARGET = 8;
const dayName = (d) => new Date(d).toLocaleDateString([], { weekday: "long" });
const dayNum = (d) => new Date(d).getDate();
const fmtMeet = (d) => new Date(d).toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

// Monday-based start of the current week
const weekStart = () => {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  const diff = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
};

export default function Home() {
  const { name } = useOutletContext();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [tracker, setTracker] = useState(null);

  useEffect(() => {
    const loadTracker = async () => { try { const t = await getMyTracker(); setTracker(t.data); } catch { /* */ } };
    loadTracker();
    const id = setInterval(loadTracker, 5000); // live updates from manager
    (async () => {
      try { const r = await listScheduledPosts(); setPosts(r.data || []); } catch { /* */ }
      try {
        const m = await clientGetMessages();
        const now = Date.now();
        const up = (m.data || [])
          .filter((x) => x.meeting?.startTime && new Date(x.meeting.startTime).getTime() > now)
          .map((x) => x.meeting)
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setMeetings(up);
      } catch { /* */ }
    })();
    return () => clearInterval(id);
  }, []);

  const ws = weekStart().getTime();
  const we = ws + 7 * 24 * 60 * 60 * 1000;
  const thisWeek = posts.filter((p) => { const t = new Date(p.scheduledAt).getTime(); return t >= ws && t < we; });
  const weekCount = thisWeek.length;
  const pct = Math.min(100, Math.round((weekCount / WEEKLY_TARGET) * 100));
  const shownPosts = [...posts].sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt)).slice(0, 8);

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <p className="m-0 text-[15px] text-[#5b6472] font-medium">Good morning,</p>
      <h1 className="m-0 mt-1 mb-5 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.6vw, 30px)" }}>{name}</h1>

      {/* Top row: Connect (left) + Upcoming Meetings (right) */}
      <div className="flex gap-6 mq1125:flex-col items-start mb-6">
        <ConnectSocial variant="grid" className="flex-1 min-w-0" />
        <section className="w-[320px] shrink-0 mq1125:w-full rounded-[14px] border border-[#eef1f6] p-5">
          <p className="m-0 mb-3 text-[14px] font-bold text-[#013186]">Upcoming Meetings</p>
          {meetings.length === 0 ? (
            <div className="text-center py-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cfd8e6" strokeWidth="1.5" className="mx-auto"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              <p className="m-0 mt-2 text-[13px] font-semibold text-[#9aa3b2]">No upcoming meetings</p>
              <p className="m-0 text-[12px] text-[#9aa3b2]">Your scheduled meetings will appear here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {meetings.map((m, i) => (
                <a key={i} href={m.joinUrl} target="_blank" rel="noreferrer" className="block rounded-[10px] border border-[#eef1f6] p-3 no-underline hover:bg-[#f5f9ff]">
                  <p className="m-0 text-[13px] font-bold text-[#0b1f44] truncate">{m.topic || "Zoom Meeting"}</p>
                  <p className="m-0 text-[11px] text-[#9aa3b2] mt-0.5">{fmtMeet(m.startTime)}</p>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Plan deliverables tracker (table) */}
      {tracker && <DeliverablesTracker tracker={tracker} className="mb-6" />}

      <div className="flex gap-6 mq1125:flex-col items-start">
        {/* Posts table */}
        <section className="flex-1 min-w-0 rounded-[14px] border border-[#1463ff] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#eef1f6]">
            <h2 className="m-0 text-[18px] font-bold text-[#013186]">Posts</h2>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#1463ff]">{weekCount}/{WEEKLY_TARGET} <span className="text-[#9aa3b2] font-semibold">This Week</span></span>
              <div className="w-[110px] h-[6px] rounded-full bg-[#eef1f6] overflow-hidden">
                <div className="h-full bg-[#1463ff]" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          {shownPosts.length === 0 ? (
            <p className="m-0 px-5 py-8 text-center text-[13px] text-[#9aa3b2]">No posts scheduled yet. Create one in Scheduling.</p>
          ) : (
            <div className="divide-y divide-[#eef1f6]">
              {shownPosts.map((p) => (
                <div key={p._id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-[70px] shrink-0">
                    <p className="m-0 text-[15px] font-bold text-[#0b1f44] leading-none">{dayNum(p.scheduledAt)}</p>
                    <p className="m-0 text-[11px] text-[#9aa3b2]">{dayName(p.scheduledAt)}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">{p.platforms.map((k) => <PlatformBadge key={k} k={k} size={22} />)}</div>
                  <p className="m-0 flex-1 min-w-0 text-[13px] text-[#5b6472] truncate">{p.caption || "(media post)"}</p>
                  <span className="text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0"
                    style={{ background: p.status === "published" ? "#dcfce7" : p.status === "failed" ? "#fdeaea" : "#fef3c7", color: p.status === "published" ? "#15803d" : p.status === "failed" ? "#dc2626" : "#92710a" }}>
                    {p.status}
                  </span>
                  <button onClick={() => navigate("/dashboard/scheduling")} className="text-[#9aa3b2] hover:text-[#013186] cursor-pointer shrink-0" title="Open in Scheduling">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17 17 7M9 7h8v8" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
