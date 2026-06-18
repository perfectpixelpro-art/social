import { useState } from "react";

const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
const durations = [15, 30, 45, 60];

export default function ScheduleMeetingModal({ onClose, onSchedule }) {
  const today = new Date().toISOString().split("T")[0];
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState(today);
  const [slot, setSlot] = useState("");
  const [duration, setDuration] = useState(30);
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const submit = async () => {
    if (!date || !slot) { setStatus({ loading: false, msg: "Pick a date and time slot." }); return; }
    setStatus({ loading: true, msg: "" });
    // Combine date + slot into an ISO string in the user's local timezone
    const startTime = new Date(`${date}T${slot}:00`).toISOString();
    try {
      await onSchedule({ topic: topic.trim() || "The Social 99 Meeting", startTime, duration });
      onClose();
    } catch (err) {
      setStatus({ loading: false, msg: err.message || "Could not schedule." });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-[440px] bg-white rounded-[16px] p-6 mq450:p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="m-0 text-[18px] font-bold text-[#0b1f44]">Schedule a Zoom Meeting</h3>
          <button onClick={onClose} className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer text-[18px]">✕</button>
        </div>

        <label className="text-[13px] font-bold text-[#0b1f44] mb-1.5 block">Topic</label>
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Strategy call" className="w-full rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186] mb-4" />

        <label className="text-[13px] font-bold text-[#0b1f44] mb-1.5 block">Date</label>
        <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186] mb-4" />

        <label className="text-[13px] font-bold text-[#0b1f44] mb-1.5 block">Time slot</label>
        <div className="grid grid-cols-4 mq450:grid-cols-3 gap-2 mb-4">
          {slots.map((s) => (
            <button key={s} type="button" onClick={() => setSlot(s)}
              className={`text-[13px] font-semibold rounded-[8px] py-2 border transition-colors cursor-pointer ${slot === s ? "bg-[#013186] text-white border-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
              {s}
            </button>
          ))}
        </div>

        <label className="text-[13px] font-bold text-[#0b1f44] mb-1.5 block">Duration</label>
        <div className="flex gap-2 mb-5">
          {durations.map((d) => (
            <button key={d} type="button" onClick={() => setDuration(d)}
              className={`text-[13px] font-semibold rounded-[8px] px-4 py-2 border transition-colors cursor-pointer ${duration === d ? "bg-[#013186] text-white border-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
              {d} min
            </button>
          ))}
        </div>

        {status.msg && <p className="text-[13px] font-semibold text-[#dc2626] m-0 mb-3">{status.msg}</p>}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 text-[14px] font-bold text-[#5b6472] border border-[#e3e9f5] rounded-[10px] py-2.5 hover:bg-[#f5f7fb] cursor-pointer">Cancel</button>
          <button onClick={submit} disabled={status.loading} className="flex-1 text-[14px] font-bold text-white bg-[#2D8CFF] rounded-[10px] py-2.5 hover:bg-[#1f7ae0] cursor-pointer disabled:opacity-60">
            {status.loading ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
