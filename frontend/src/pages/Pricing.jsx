import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionsLayout from "../components/QuestionsLayout";
import FrameComponent from "../components/FrameComponent";
import { tabs, pricing } from "../data/plans";

function Check({ on, dark }) {
  if (on) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={dark ? "#9ecaff" : "#013186"} className="shrink-0">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z" />
      </svg>
    );
  }
  return <span className="shrink-0 text-[rgba(0,0,0,0.25)] text-[14px] tracking-tighter">····</span>;
}

function PlanCard({ plan, tab }) {
  const f = plan.featured;
  const navigate = useNavigate();
  return (
    <div
      className={`rounded-[20px] border p-8 mq450:p-6 flex flex-col ${
        f
          ? "bg-[#013186] border-[#013186] text-white shadow-[0_20px_50px_rgba(1,49,134,0.30)]"
          : "bg-[#f7faff] border-[rgba(1,49,134,0.15)] text-[#000]"
      }`}
    >
      <span className={`text-[12px] font-bold tracking-[0.12em] ${f ? "text-[#9ecaff]" : "text-[#013186]"}`}>{plan.tier}</span>
      <h3 className={`m-0 mt-2 font-bold ${f ? "text-white" : "text-[#013186]"}`} style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>{plan.name}</h3>
      <p className={`m-0 mt-3 text-[14px] leading-relaxed font-medium ${f ? "text-[rgba(255,255,255,0.8)]" : "text-[rgba(0,0,0,0.55)]"}`}>{plan.desc}</p>

      <div className="flex items-end gap-1 mt-6">
        <span className={`text-[24px] font-bold ${f ? "text-[#9ecaff]" : "text-[#013186]"}`}>$</span>
        <span className={`leading-none font-bold ${f ? "text-white" : "text-[#013186]"}`} style={{ fontSize: "clamp(46px, 5vw, 62px)" }}>{plan.price}</span>
      </div>
      <span className={`text-[13px] font-semibold mt-1 ${f ? "text-[rgba(255,255,255,0.7)]" : "text-[rgba(0,0,0,0.5)]"}`}>{plan.period}</span>

      <div className={`mt-5 rounded-[8px] px-4 py-3 text-[13px] font-semibold ${f ? "bg-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.85)]" : "bg-[rgba(188,214,255,0.37)] text-[#013186]"}`}>
        No setup fee · Cancel anytime
      </div>

      <div className={`my-6 border-t ${f ? "border-[rgba(255,255,255,0.18)]" : "border-[rgba(1,49,134,0.12)]"}`} />

      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
        {plan.features.map(([label, on]) => (
          <li key={label} className={`flex items-center gap-3 text-[14px] font-medium ${on ? (f ? "text-white" : "text-[#111]") : (f ? "text-[rgba(255,255,255,0.45)]" : "text-[rgba(0,0,0,0.35)]")}`}>
            <Check on={on} dark={f} /> {label}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate(`/signup?tab=${encodeURIComponent(tab)}&plan=${encodeURIComponent(plan.name)}`)}
        className={`mt-8 h-[52px] rounded-[12px] flex items-center justify-center font-bold text-[16px] cursor-pointer transition-colors ${
          f ? "bg-white text-[#013186] hover:bg-[#e6f0ff]" : "bg-[#013186] text-white hover:bg-[#012270]"
        }`}
      >
        Buy Now
      </button>
    </div>
  );
}

export default function Pricing() {
  const [active, setActive] = useState("Marketing");

  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">

      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-12">
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-16 mq450:py-12 text-center">
          <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(38px, 6.5vw, 84px)" }}>
            Choose a Plan,<br />We'll Take it from there
          </h1>
          <p className="mt-5 mx-auto max-w-[1000px] text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(15px, 1.7vw, 22px)" }}>
            Our social media management pricing services are built to work together as one system. Once you're set, we manage execution so your brand stays visible, consistent, and professional.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-14 pb-10">
        <div className="flex items-center justify-center gap-4 mq450:gap-2 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`cursor-pointer px-10 mq450:px-6 py-4 rounded-[14px] border text-[17px] mq450:text-[15px] font-semibold transition-colors ${
                active === t
                  ? "bg-[#dbe9ff] border-[#013186] text-[#013186]"
                  : "bg-white border-[rgba(1,49,134,0.15)] text-[#111] hover:bg-[#f2f7ff]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16">
        <div className="grid grid-cols-3 gap-8 mq1125:grid-cols-1 w-full max-w-[1500px] mx-auto items-start">
          {pricing[active].map((plan) => (
            <PlanCard key={plan.name} plan={plan} tab={active} />
          ))}
        </div>
        
      </div>

      {/* FAQ */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16 flex flex-col gap-[47px] mq800:gap-[23px]">
        <QuestionsLayout />
        <FrameComponent />
      </div>

    </div>
  );
}
