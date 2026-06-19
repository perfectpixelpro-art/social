import { useState, useEffect } from "react";
import { adminGetConversations, adminGetClientMeetings, adminScheduleMeeting } from "../../api";
import { MeetingsView } from "../dashboard/Meetings";

export default function AdminMeetings() {
  const [clients, setClients] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await adminGetConversations();
        const list = r.data || [];
        setClients(list);
        if (list.length) setActive(list[0].clientId);
      } catch { /* */ }
    })();
  }, []);

  if (!active) {
    return (
      <main className="h-full overflow-y-auto p-6">
        <h1 className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>Meetings</h1>
        <p className="mt-2 text-[13px] text-[#9aa3b2]">No clients yet.</p>
      </main>
    );
  }

  const selector = (
    <select value={active} onChange={(e) => setActive(e.target.value)}
      className="h-[42px] rounded-[10px] border border-[#e3e9f5] px-3 text-[14px] outline-none focus:border-[#013186]">
      {clients.map((c) => <option key={c.clientId} value={c.clientId}>{c.name}</option>)}
    </select>
  );

  return (
    <MeetingsView
      key={active}
      role="admin"
      header={selector}
      fetchMeetings={() => adminGetClientMeetings(active)}
      schedule={(payload) => adminScheduleMeeting(active, payload)}
    />
  );
}
