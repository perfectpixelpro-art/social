import { useState, useEffect, useCallback, useRef } from "react";
import { getMyMeetings, clientScheduleMeeting, saveMeetingNotes } from "../../api";
import ScheduleMeetingModal from "../../components/ScheduleMeetingModal";
import { openImage } from "../../components/ImageViewer";

const fmt = (d) => new Date(d).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

export default function Meetings() {
  return <MeetingsView role="client" />;
}

// Shared view — used by client and (via wrapper) admin/manager.
export function MeetingsView({ role = "client", clientId = null, schedule, fetchMeetings, header }) {
  const [meetings, setMeetings] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const r = fetchMeetings ? await fetchMeetings() : await getMyMeetings();
      setMeetings(r.data || []);
    } catch { /* */ } finally { setLoading(false); }
  }, [fetchMeetings]);

  useEffect(() => { load(); }, [load]);

  const onSchedule = async (payload) => {
    if (schedule) await schedule(payload);
    else await clientScheduleMeeting(payload);
    load();
  };

  const now = Date.now();
  const upcoming = meetings.filter((m) => new Date(m.startTime).getTime() + (m.duration || 30) * 60000 > now);
  const past = meetings.filter((m) => new Date(m.startTime).getTime() + (m.duration || 30) * 60000 <= now);

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>Meetings</h1>
          <p className="m-0 mt-1 text-[13px] text-[#7a8499] font-medium">Schedule Zoom calls, keep notes, and attach files.</p>
        </div>
        {header}
        <button onClick={() => setShowSchedule(true)} className="h-[42px] px-5 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="13" height="10" rx="2" /><path d="M21 8.5v7l-5-3.5z" /></svg>
          Schedule Meeting
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-[13px] text-[#9aa3b2]">Loading…</p>
      ) : meetings.length === 0 ? (
        <p className="mt-6 text-[13px] text-[#9aa3b2]">No meetings yet. Schedule your first one.</p>
      ) : (
        <>
          {upcoming.length > 0 && <Section title="Upcoming" list={upcoming} role={role} onSaved={load} />}
          {past.length > 0 && <Section title="Past" list={past} role={role} onSaved={load} />}
        </>
      )}

      {showSchedule && <ScheduleMeetingModal onClose={() => setShowSchedule(false)} onSchedule={onSchedule} />}
    </main>
  );
}

function Section({ title, list, role, onSaved }) {
  return (
    <section className="mt-6">
      <h2 className="m-0 mb-3 text-[14px] font-bold text-[#0b1f44]">{title} <span className="text-[#9aa3b2] font-semibold">({list.length})</span></h2>
      <div className="flex flex-col gap-4">
        {list.map((m) => <MeetingCard key={m.msgId} m={m} role={role} onSaved={onSaved} />)}
      </div>
    </section>
  );
}

function MeetingCard({ m, role, onSaved }) {
  const [notes, setNotes] = useState(m.notes || "");
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef(null);

  const save = async () => {
    setSaving(true); setMsg("");
    try {
      await saveMeetingNotes(m.msgId, notes, files, role);
      setFiles([]); setMsg("Saved!");
      onSaved && onSaved();
    } catch (e) { setMsg(e.message || "Could not save."); }
    finally { setSaving(false); }
  };

  return (
    <div className="rounded-[14px] border border-[#eef1f6] p-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="m-0 text-[15px] font-bold text-[#0b1f44]">{m.topic || "Zoom Meeting"}</p>
          <p className="m-0 mt-0.5 text-[12px] text-[#7a8499]">{fmt(m.startTime)} · {m.duration || 30} min</p>
        </div>
        {m.joinUrl && (
          <a href={m.joinUrl} target="_blank" rel="noopener noreferrer" className="h-[38px] px-4 rounded-[10px] bg-[#2D8CFF] text-white font-bold text-[13px] flex items-center no-underline hover:bg-[#1b7ce8]">Join Meeting →</a>
        )}
      </div>

      {/* notes */}
      <div className="mt-4">
        <label className="text-[12px] font-bold text-[#0b1f44] mb-1 block">Meeting notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Write notes, action items, decisions…"
          className="w-full rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] outline-none focus:border-[#013186] resize-y" />
      </div>

      {/* existing media */}
      {m.noteMedia?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {m.noteMedia.map((med, i) => med.type === "image" ? (
            <img key={i} src={med.url} alt={med.name} onClick={() => openImage(med.url)} className="w-[72px] h-[72px] object-cover rounded-[8px] border border-[#eef1f6] cursor-pointer" />
          ) : med.type === "video" ? (
            <video key={i} src={med.url} controls className="w-[120px] h-[72px] object-cover rounded-[8px] border border-[#eef1f6]" />
          ) : (
            <a key={i} href={med.url} target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold text-[#013186] border border-[#cfe0ff] rounded-[8px] px-3 py-2 no-underline">📎 {med.name}</a>
          ))}
        </div>
      )}

      {/* add media + save */}
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <input ref={fileRef} type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" className="hidden" onChange={(e) => { setFiles(Array.from(e.target.files || [])); }} />
        <button onClick={() => fileRef.current?.click()} className="text-[13px] font-semibold text-[#013186] border border-[#cfe0ff] rounded-[8px] px-4 py-2 hover:bg-[#f0f6ff] cursor-pointer">📎 Add images / videos</button>
        {files.length > 0 && <span className="text-[12px] text-[#7a8499]">{files.length} file(s) selected</span>}
        <button onClick={save} disabled={saving} className="ml-auto h-[38px] px-5 rounded-[10px] bg-[#013186] text-white font-bold text-[13px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">{saving ? "Saving…" : "Save notes"}</button>
        {msg && <span className="text-[12px] font-semibold text-[#16a34a]">{msg}</span>}
      </div>
    </div>
  );
}
