import { useOutletContext } from "react-router-dom";

const metrics = [
  { label: "Engaged Users", value: "1,24k", change: "1.2%", up: true },
  { label: "Post Engagement", value: "120", change: "4.5%", up: false },
  { label: "Page Impresions", value: "1,67k", change: "4.3%", up: true },
  { label: "Post Impresions", value: "456", change: "2.2%", up: true },
  { label: "Page Views", value: "126", change: "4.5%", up: false },
];

const days = [
  { d: "31", n: "Sunday" },
  { d: "1", n: "Monday" },
  { d: "2", n: "Tuesday" },
  { d: "3", n: "Wednesday", active: true },
  { d: "4", n: "Thursday" },
  { d: "5", n: "Friday" },
];
const times = ["6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00am", "1:00pm"];
const postDays = new Set(["1", "3", "5"]);

const platforms = [
  { name: "X", color: "#000", letter: "𝕏" },
  { name: "Facebook", color: "#1877F2", letter: "f" },
  { name: "Instagram", color: "#E1306C", letter: "◎" },
];

function PostCard() {
  return (
    <div className="flex gap-1.5">
      {platforms.map((p) => (
        <div key={p.name} className="w-[54px] rounded-[6px] border border-[#e3e9f5] bg-white overflow-hidden shadow-[0_2px_6px_rgba(1,49,134,0.08)]">
          <div className="h-[5px]" style={{ background: p.color }} />
          <div className="px-1.5 py-1.5">
            <span className="text-[13px] font-bold" style={{ color: p.color }}>{p.letter}</span>
            <p className="m-0 text-[8px] leading-[1.25] text-[#9aa3b2] mt-0.5">Evert play disc that</p>
            <div className="mt-1 w-[22px] h-[14px] rounded-[3px] bg-[#013186] flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { name } = useOutletContext();
  return (
    <main className="h-full flex flex-col p-6 mq450:p-4 overflow-hidden mq1125:overflow-y-auto">
      <p className="m-0 text-[15px] text-[#5b6472] font-medium shrink-0">Good morning,</p>
      <h1 className="m-0 mt-1 mb-4 text-[#013186] font-bold shrink-0" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>{name}</h1>

      <section className="rounded-[16px] border border-[#eef1f6] p-5 mq450:p-4 shrink-0">
        <h2 className="m-0 text-[#013186] font-bold text-[20px] mq450:text-[18px]">Performance Summary</h2>
        <p className="m-0 mt-1 mb-4 text-[13px] text-[#7a8499] font-medium">View your key profile performance metrics from the repoting</p>

        <div className="grid grid-cols-5 mq1125:grid-cols-3 mq450:grid-cols-2 gap-y-5">
          {metrics.map((m, i) => (
            <div key={m.label} className={`px-5 mq450:px-3 ${i !== 0 ? "border-l border-[#eef1f6] mq1125:[&:nth-child(4)]:border-l-0 mq450:[&:nth-child(odd)]:border-l-0" : ""}`}>
              <p className="m-0 text-[14px] font-bold text-[#0b1f44]">{m.label}</p>
              <p className="m-0 text-[12px] text-[#9aa3b2] mb-2">All</p>
              <div className="flex items-end gap-2">
                <span className="text-[28px] mq450:text-[22px] font-bold text-[#0b1f44] leading-none">{m.value}</span>
                <span className={`text-[12px] font-semibold flex items-center gap-0.5 ${m.up ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                  {m.change} {m.up ? "↗" : "↘"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-4 flex gap-6 mq1125:flex-col flex-1 min-h-0">
        <div className="flex-1 min-w-0 rounded-[12px] border border-[#eef1f6] overflow-auto mq1125:overflow-x-auto">
          <div className="min-w-[920px]">
            <div className="grid" style={{ gridTemplateColumns: "80px repeat(6, 1fr)" }}>
              <div className="px-3 py-3 text-[13px] font-bold text-[#0b1f44] border-b border-r border-[#eef1f6]">Time</div>
              {days.map((d) => (
                <div key={d.d} className={`px-3 py-3 text-[13px] font-bold border-b border-r border-[#eef1f6] last:border-r-0 ${d.active ? "bg-[#013186] text-white rounded-t-[6px]" : "text-[#0b1f44]"}`}>
                  {d.d} {d.n}
                </div>
              ))}
            </div>
            {times.map((t) => (
              <div key={t} className="grid" style={{ gridTemplateColumns: "80px repeat(6, 1fr)" }}>
                <div className="px-3 py-4 text-[12px] text-[#9aa3b2] font-medium border-b border-r border-[#eef1f6]">{t}</div>
                {days.map((d) => (
                  <div key={d.d} className={`px-2 py-2 border-b border-r border-[#eef1f6] last:border-r-0 min-h-[58px] ${d.active ? "bg-[#f3f8ff]" : ""}`}>
                    {t === "9:00am" && postDays.has(d.d) && <PostCard />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[280px] shrink-0 mq1125:w-full rounded-[12px] border border-[#eef1f6] bg-[#fbfcfe] mq1125:min-h-[300px]" />
      </div>
    </main>
  );
}
