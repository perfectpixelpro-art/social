const stats = [
  { label: "Total Clients", value: "248", sub: "vs last month", bg: "#eaf1ff", color: "#013186",
    d: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21c0-3.5 3-5.5 7-5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M22 21c0-3-2-4.5-5-4.5" /></> },
  { label: "Active Clients", value: "210", sub: "vs last month", bg: "#fef3e6", color: "#f59e0b",
    d: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></> },
  { label: "Monthly Revenue", value: "$7,540", sub: "vs last month", bg: "#e8f8ee", color: "#16a34a",
    d: <><rect x="3" y="6" width="18" height="13" rx="2" /><circle cx="12" cy="12.5" r="2.5" /></> },
  { label: "Open Tickets", value: "62", sub: "vs last month", bg: "#f0eafe", color: "#7c3aed",
    d: <><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" /></> },
];

const planColors = { Premium: "#7c3aed", Standard: "#1463ff", Basic: "#f59e0b" };
const planBadge = { Premium: "bg-[#f0eafe] text-[#7c3aed]", Standard: "bg-[#eaf1ff] text-[#1463ff]", Basic: "bg-[#fef3e6] text-[#d97706]" };
const statusBadge = {
  Active: "bg-[#e8f8ee] text-[#16a34a]",
  Paused: "bg-[#fef3e6] text-[#d97706]",
  Cancelled: "bg-[#fdeaea] text-[#dc2626]",
};

const clients = [
  { name: "Smith & Co.", site: "smithandco.com", plan: "Premium", status: "Active", date: "May 12, 2024", rev: "$299/mo", c: "#111" },
  { name: "Bright Realty", site: "brightrealty.com", plan: "Standard", status: "Active", date: "Mar 12, 2024", rev: "$199/mo", c: "#f59e0b" },
  { name: "Glow Cosmetics", site: "glowcosmetics.com", plan: "Premium", status: "Active", date: "Mar 24, 2024", rev: "$299/mo", c: "#16a34a" },
  { name: "Fit Club", site: "fitclub.com", plan: "Standard", status: "Paused", date: "Jun 10, 2024", rev: "$199/mo", c: "#7c3aed" },
  { name: "Leaf & Bloom", site: "leafnbloom.com", plan: "Basic", status: "Active", date: "Jun 10, 2024", rev: "$99/mo", c: "#ec4899" },
  { name: "The Wellness Lab", site: "thewellness.com", plan: "Premium", status: "Active", date: "Apr 29, 2024", rev: "$299/mo", c: "#1463ff" },
  { name: "Daily Dose Cafe", site: "dailydosecafe.com", plan: "Standard", status: "Cancelled", date: "Nov 12, 2024", rev: "$199/mo", c: "#f97316" },
  { name: "NextGen Tech", site: "nextgentech.com", plan: "Premium", status: "Active", date: "Dec 22, 2024", rev: "$299/mo", c: "#16a34a" },
];

const planDist = [
  { label: "Premium", pct: 42, color: "#7c3aed" },
  { label: "Standard", pct: 35, color: "#1463ff" },
  { label: "Basic", pct: 15, color: "#f59e0b" },
  { label: "Other", pct: 8, color: "#cbd5e1" },
];

const activity = [
  { text: 'New client "Bright Realty" has been added', time: "2 minutes ago", color: "#16a34a", d: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></> },
  { text: "Payment received from Smith & Co.", time: "1 hour ago", color: "#1463ff", amt: "+$299", d: <><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M2 10h20" /></> },
  { text: "New ticket from Glow Cosmetics", time: "2 hour ago", color: "#f59e0b", d: <><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" /></> },
  { text: "Plan upgraded by Fit Club", time: "4 hour ago", color: "#7c3aed", amt: "+$200", d: <><path d="M12 19V5M5 12l7-7 7 7" /></> },
];

const Av = ({ name, color }) => (
  <span className="w-9 h-9 rounded-full text-white flex items-center justify-center text-[13px] font-bold shrink-0" style={{ background: color }}>
    {name[0]}
  </span>
);

function Donut() {
  // build conic-gradient stops
  let acc = 0;
  const stops = planDist.map((p) => {
    const start = acc; acc += p.pct;
    return `${p.color} ${start}% ${acc}%`;
  }).join(", ");
  return (
    <div className="relative w-[150px] h-[150px] shrink-0">
      <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${stops})` }} />
      <div className="absolute inset-[22px] bg-white rounded-full flex flex-col items-center justify-center">
        <span className="text-[20px] font-bold text-[#0b1f44] leading-none">1,248</span>
        <span className="text-[11px] text-[#9aa3b2]">Total</span>
      </div>
    </div>
  );
}

export default function AdminHome() {
  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 30px)" }}>Welcome back, Admin!</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Here's what's happening with your clients today.</p>

      {/* Stat cards */}
      <div className="grid grid-cols-4 mq1125:grid-cols-2 mq450:grid-cols-1 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[16px] border border-[#eef1f6] p-5 flex items-start gap-4">
            <span className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: s.bg, color: s.color }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.d}</svg>
            </span>
            <div>
              <p className="m-0 text-[13px] text-[#7a8499] font-semibold">{s.label}</p>
              <p className="m-0 text-[28px] mq450:text-[24px] font-bold text-[#0b1f44] leading-tight">{s.value}</p>
              <p className="m-0 text-[12px] text-[#9aa3b2]">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-[1fr_330px] mq1125:grid-cols-1 gap-6 items-start">

        {/* All Clients */}
        <section className="rounded-[16px] border border-[#eef1f6] p-5 mq450:p-4">
          <h2 className="m-0 text-[18px] font-bold text-[#0b1f44]">All Clients</h2>
          <div className="mt-4 flex items-center gap-3 flex-wrap justify-between">
            <div className="flex items-center gap-2 rounded-[10px] bg-[#f5f7fb] px-3 py-2.5 flex-1 min-w-[180px] max-w-[320px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa3b2" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input placeholder="Search clients..." className="bg-transparent outline-none text-[13px] text-[#5b6472] w-full placeholder-[#9aa3b2]" />
            </div>
            <div className="flex gap-2">
              <button className="text-[13px] font-semibold text-[#5b6472] border border-[#e3e9f5] rounded-[10px] px-3 py-2 hover:bg-[#f5f7fb] cursor-pointer">⛃ Filter ▾</button>
              <button className="text-[13px] font-semibold text-[#5b6472] border border-[#e3e9f5] rounded-[10px] px-3 py-2 hover:bg-[#f5f7fb] cursor-pointer">⬆ Export ▾</button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="text-left text-[11px] font-bold tracking-wide text-[#9aa3b2]">
                  <th className="py-3 pr-3">CLIENT</th>
                  <th className="py-3 px-3">PLAN</th>
                  <th className="py-3 px-3">STATUS</th>
                  <th className="py-3 px-3">JOINED DATE</th>
                  <th className="py-3 px-3">MONTHLY REVENUE</th>
                  <th className="py-3 pl-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.name} className="border-t border-[#f1f4f9]">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <Av name={c.name} color={c.c} />
                        <div className="leading-tight">
                          <p className="m-0 text-[14px] font-bold text-[#0b1f44]">{c.name}</p>
                          <p className="m-0 text-[12px] text-[#9aa3b2]">{c.site}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${planBadge[c.plan]}`}>{c.plan}</span></td>
                    <td className="py-3 px-3"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusBadge[c.status]}`}>● {c.status}</span></td>
                    <td className="py-3 px-3 text-[13px] text-[#5b6472]">{c.date}</td>
                    <td className="py-3 px-3 text-[13px] font-semibold text-[#0b1f44]">{c.rev}</td>
                    <td className="py-3 pl-3"><button className="w-8 h-8 rounded-[8px] border border-[#e3e9f5] text-[#9aa3b2] hover:bg-[#f5f7fb] cursor-pointer">⋮</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <p className="m-0 text-[13px] text-[#9aa3b2]">Showing 1 to 8 of 1,248 clients</p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-[8px] border border-[#e3e9f5] text-[#9aa3b2] cursor-pointer">‹</button>
              <button className="w-8 h-8 rounded-[8px] bg-[#013186] text-white font-bold cursor-pointer">1</button>
              <button className="w-8 h-8 rounded-[8px] border border-[#e3e9f5] text-[#9aa3b2] cursor-pointer">›</button>
            </div>
          </div>
        </section>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Clients by Plan */}
          <section className="rounded-[16px] border border-[#eef1f6] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="m-0 text-[16px] font-bold text-[#0b1f44]">Clients by Plan</h2>
              <button className="text-[12px] font-semibold text-[#5b6472] border border-[#e3e9f5] rounded-[8px] px-2.5 py-1.5 cursor-pointer">This Month ▾</button>
            </div>
            <div className="flex items-center gap-5 mq450:flex-col">
              <Donut />
              <div className="flex-1 flex flex-col gap-3 w-full">
                {planDist.map((p) => (
                  <div key={p.label} className="flex items-center gap-2 text-[13px]">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-[#5b6472] font-semibold">{p.label}</span>
                    <span className="ml-auto text-[#0b1f44] font-bold">{p.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="rounded-[16px] border border-[#eef1f6] p-5">
            <h2 className="m-0 mb-4 text-[16px] font-bold text-[#0b1f44]">Recent Activity</h2>
            <div className="flex flex-col gap-4">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0" style={{ background: `${a.color}1a`, color: a.color }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{a.d}</svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-[13px] font-semibold text-[#0b1f44] leading-snug">{a.text}</p>
                    <p className="m-0 text-[12px] text-[#9aa3b2]">{a.time}</p>
                  </div>
                  {a.amt && <span className="text-[13px] font-bold text-[#16a34a] shrink-0">{a.amt}</span>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
