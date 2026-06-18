import { useState, useEffect, useCallback } from "react";
import { staffSchedulerOverview, staffGetTracker, staffUpdateTrackerItem, staffResetTracker, adminOverview } from "../../api";
import DeliverablesTracker from "../../components/DeliverablesTracker";

const SERVICE_OPTS = [["marketing", "Social Media"], ["video", "Short-Form Video"], ["website", "Website"]];
const TIER_OPTS = ["Basic", "Standard", "Premium"];

// Modal: edit a client's deliverables tracker from the manager Home.
function TrackerModal({ client, onClose }) {
  const [tracker, setTracker] = useState(null);
  const load = useCallback(async () => { try { const r = await staffGetTracker(client.id); setTracker(r.data); } catch { /* */ } }, [client.id]);
  useEffect(() => { load(); }, [load]);

  const change = async (key, payload) => { try { const r = await staffUpdateTrackerItem(client.id, { key, ...payload }); setTracker(r.data); } catch { /* */ } };
  const setPlan = async (service, tier) => {
    if (!window.confirm("Change the plan? This resets this month's progress.")) return;
    try { const r = await staffResetTracker(client.id, { service, tier }); setTracker(r.data); } catch { /* */ }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[16px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eef1f6]">
          <div>
            <p className="m-0 text-[16px] font-bold text-[#0b1f44]">{client.name}</p>
            <p className="m-0 text-[12px] text-[#9aa3b2]">Mark deliverables — the client sees it live.</p>
          </div>
          <button onClick={onClose} className="text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
        </div>
        <div className="p-6">
          <div className="flex gap-3 flex-wrap mb-5">
            <div>
              <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Service</label>
              <select value={tracker?.service || "marketing"} onChange={(e) => setPlan(e.target.value, tracker?.plan || "Basic")}
                className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] font-semibold text-[#0b1f44] outline-none focus:border-[#013186] cursor-pointer">
                {SERVICE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Plan</label>
              <select value={tracker?.plan || "Basic"} onChange={(e) => setPlan(tracker?.service || "marketing", e.target.value)}
                className="rounded-[10px] border border-[#e3e9f5] px-3 py-2 text-[14px] font-semibold text-[#0b1f44] outline-none focus:border-[#013186] cursor-pointer">
                {TIER_OPTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <DeliverablesTracker tracker={tracker} editable onChange={change} />
        </div>
      </div>
    </div>
  );
}

// ── Manager Home: scoped to the manager's assigned clients ──
function ManagerHome() {
  const [data, setData] = useState({ clients: [], totalPendingApproval: 0 });
  const [trackerClient, setTrackerClient] = useState(null);
  const admin = (() => { try { return JSON.parse(localStorage.getItem("adminUser")) || {}; } catch { return {}; } })();

  useEffect(() => { (async () => { try { const r = await staffSchedulerOverview(); setData(r.data || { clients: [], totalPendingApproval: 0 }); } catch { /* */ } })(); }, []);

  const totals = data.clients.reduce((a, c) => ({ scheduled: a.scheduled + c.scheduled, published: a.published + c.published }), { scheduled: 0, published: 0 });
  const card = (label, value, color) => (
    <div className="rounded-[14px] border border-[#eef1f6] p-5">
      <p className="m-0 text-[13px] text-[#7a8499] font-semibold">{label}</p>
      <p className="m-0 text-[28px] font-bold" style={{ color }}>{value}</p>
    </div>
  );

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 30px)" }}>Welcome back, {admin.name || "Manager"}!</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Your assigned clients and their content at a glance.</p>

      <div className="grid grid-cols-4 mq1125:grid-cols-2 mq450:grid-cols-1 gap-5 mb-6">
        {card("Assigned Clients", data.clients.length, "#013186")}
        {card("Scheduled Posts", totals.scheduled, "#1463ff")}
        {card("Published", totals.published, "#16a34a")}
        {card("Awaiting Approval", data.totalPendingApproval, "#d97706")}
      </div>

      <h2 className="m-0 mb-3 text-[16px] font-bold text-[#0b1f44]">Your Clients</h2>
      {data.clients.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No clients assigned to you yet.</p>}
      <div className="grid grid-cols-2 mq1125:grid-cols-1 gap-4">
        {data.clients.map((c) => (
          <div key={c.id} className="rounded-[14px] border border-[#eef1f6] p-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#013186] text-white flex items-center justify-center text-[14px] font-bold">{(c.name || "?")[0]}</span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[15px] font-bold text-[#0b1f44] truncate">{c.name}</p>
                <p className="m-0 text-[12px] text-[#9aa3b2] truncate">{c.email}</p>
              </div>
              {c.pendingApproval > 0 && <span className="text-[11px] font-bold text-[#d97706] bg-[#fef3c7] rounded-full px-2.5 py-1">{c.pendingApproval} awaiting</span>}
            </div>
            <div className="flex gap-4 mt-3 text-[12px] text-[#5b6472] font-semibold">
              <span>{c.connected}/4 connected</span><span>·</span><span>{c.scheduled} scheduled</span><span>·</span><span>{c.published} published</span>
            </div>
            <button onClick={() => setTrackerClient(c)} className="mt-4 w-full h-[40px] rounded-[10px] bg-[#013186] text-white font-bold text-[13px] hover:bg-[#012270] cursor-pointer">
              Manage deliverables
            </button>
          </div>
        ))}
      </div>

      {trackerClient && <TrackerModal client={trackerClient} onClose={() => setTrackerClient(null)} />}
    </main>
  );
}

const PLAN_COLOR = { Pro: "#7c3aed", Premium: "#7c3aed", Growth: "#1463ff", Standard: "#1463ff", Starter: "#f59e0b", Basic: "#f59e0b", Trial: "#16a34a", None: "#cbd5e1" };
const statusBadge = {
  active: "bg-[#e8f8ee] text-[#16a34a]", trialing: "bg-[#eaf1ff] text-[#1463ff]",
  past_due: "bg-[#fef3e6] text-[#d97706]", canceled: "bg-[#fdeaea] text-[#dc2626]", none: "bg-[#eef1f6] text-[#5b6472]",
};
const Av = ({ name, color = "#013186" }) => (
  <span className="w-9 h-9 rounded-full text-white flex items-center justify-center text-[13px] font-bold shrink-0" style={{ background: color }}>{(name || "?")[0]}</span>
);

export default function AdminHome() {
  const role = (() => { try { return (JSON.parse(localStorage.getItem("adminUser")) || {}).role || "admin"; } catch { return "admin"; } })();
  if (role === "manager") return <ManagerHome />;

  const [d, setD] = useState({ totalClients: 0, activeClients: 0, monthlyRevenue: 0, openTickets: 0, planDist: [], recentClients: [] });
  useEffect(() => { (async () => { try { const r = await adminOverview(); setD(r.data || {}); } catch { /* */ } })(); }, []);

  const fmtDate = (x) => x ? new Date(x).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }) : "—";
  const stats = [
    { label: "Total Clients", value: d.totalClients, color: "#013186", bg: "#eaf1ff" },
    { label: "Active Clients", value: d.activeClients, color: "#16a34a", bg: "#e8f8ee" },
    { label: "Monthly Revenue", value: `$${(d.monthlyRevenue || 0).toLocaleString()}`, color: "#7c3aed", bg: "#f0eafe" },
    { label: "Open Tickets", value: d.openTickets, color: "#f59e0b", bg: "#fef3e6" },
  ];
  const distTotal = (d.planDist || []).reduce((a, p) => a + p.count, 0) || 1;

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 30px)" }}>Welcome back, Admin!</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Here's what's happening with your clients today.</p>

      {/* Stat cards */}
      <div className="grid grid-cols-4 mq1125:grid-cols-2 mq450:grid-cols-1 gap-5 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[16px] border border-[#eef1f6] p-5">
            <p className="m-0 text-[13px] text-[#7a8499] font-semibold">{s.label}</p>
            <p className="m-0 mt-1 text-[28px] font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mq1125:flex-col items-start">
        {/* Recent clients */}
        <section className="flex-1 min-w-0 rounded-[16px] border border-[#eef1f6] p-5">
          <h2 className="m-0 mb-4 text-[16px] font-bold text-[#0b1f44]">Recent Clients</h2>
          {(d.recentClients || []).length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No clients yet.</p>}
          <div className="flex flex-col gap-3">
            {(d.recentClients || []).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <Av name={c.name} color={PLAN_COLOR[c.plan] || "#013186"} />
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[14px] font-bold text-[#0b1f44] truncate">{c.name}</p>
                  <p className="m-0 text-[12px] text-[#9aa3b2] truncate">{c.email} · joined {fmtDate(c.date)}</p>
                </div>
                <span className="text-[11px] font-bold rounded-full px-2.5 py-1" style={{ background: "#eaf1ff", color: PLAN_COLOR[c.plan] || "#1463ff" }}>{c.plan}</span>
                <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${statusBadge[c.status] || statusBadge.none}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Plan distribution */}
        <section className="w-[320px] shrink-0 mq1125:w-full rounded-[16px] border border-[#eef1f6] p-5">
          <h2 className="m-0 mb-4 text-[16px] font-bold text-[#0b1f44]">Plan Distribution</h2>
          {(d.planDist || []).length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No data yet.</p>}
          <div className="flex flex-col gap-3">
            {(d.planDist || []).map((p) => {
              const pct = Math.round((p.count / distTotal) * 100);
              return (
                <div key={p.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-semibold text-[#0b1f44]">{p.label}</span>
                    <span className="text-[12px] font-bold text-[#5b6472]">{p.count} · {pct}%</span>
                  </div>
                  <div className="h-[7px] rounded-full bg-[#eef1f6] overflow-hidden">
                    <div className="h-full" style={{ width: `${pct}%`, background: PLAN_COLOR[p.label] || "#1463ff" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
