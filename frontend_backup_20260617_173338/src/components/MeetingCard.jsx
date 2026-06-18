// Renders a Zoom meeting inside a chat bubble
export default function MeetingCard({ meeting, mine }) {
  if (!meeting) return null;
  const dt = new Date(meeting.startTime);
  const date = dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const time = dt.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  return (
    <div className={`rounded-[12px] p-3 w-[230px] ${mine ? "bg-white/10" : "bg-white border border-[#e3e9f5]"}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-7 h-7 rounded-[8px] bg-[#2D8CFF] flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M3 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM21 7.5v9l-4-3v-3z" /></svg>
        </span>
        <span className={`text-[13px] font-bold ${mine ? "text-white" : "text-[#0b1f44]"}`}>Zoom Meeting</span>
      </div>
      <p className={`m-0 text-[13px] font-semibold ${mine ? "text-white" : "text-[#0b1f44]"}`}>{meeting.topic || "Meeting"}</p>
      <p className={`m-0 text-[12px] ${mine ? "text-white/80" : "text-[#7a8499]"}`}>📅 {date} · 🕒 {time} · {meeting.duration} min</p>
      <a
        href={meeting.joinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-2 block text-center text-[13px] font-bold rounded-[8px] py-2 no-underline ${mine ? "bg-white text-[#1463ff]" : "bg-[#2D8CFF] text-white hover:bg-[#1f7ae0]"} transition-colors`}
      >
        Join Meeting
      </a>
    </div>
  );
}
