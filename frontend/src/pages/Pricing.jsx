import { useState } from "react";
import Seo from "../components/Seo";
import QuestionsLayout from "../components/QuestionsLayout";
import FrameComponent from "../components/FrameComponent";

const tabs = ["Marketing", "Videos", "Website"];

const pricing = {
  Marketing: [
    {
      tier: "BASIC", name: "Starter", desc: "Get consistent, professional content posted every month.",
      price: "99", period: "per month",
      features: [
        ["4 custom graphics / month", true], ["2 custom videos / month", true],
        ["1 revision per deliverable", true], ["Creative execution", true],
        ["Content strategy", true], ["Reliable turnaround", true],
        ["Captions", false], ["Content strategy",false], ["Weekly report", false], ["Scheduling", false],
      ],
    },
    {
      tier: "STANDARD", name: "Growth", desc: "Strategy-driven content with captions and a plan behind every post.",
      price: "199", period: "per month", featured: true,
      features: [
        ["8 custom graphics / month", true], ["4 custom videos / month", true],
        ["2 revisions per deliverable", true], ["Creative execution", true],
        ["Consistent brand presence", true], ["Captions", true],
        ["Scheduling", true], ["Content strategy", true],
        ["Reliable turnaround", true], ["Weekly report", false],
      ],
    },
    {
      tier: "PREMIUM", name: "Pro", desc: "Full-service management with analytics, scheduling, and competitor insights.",
      price: "299", period: "per month",
      features: [
        ["12 custom graphics / month", true], ["4 carousels (up to 3 slides)", true],
        ["6 custom videos / month", true], ["Unlimited revisions", true],
        ["Creative execution", true], ["Consistent brand presence", true],
        ["Captions", true], ["Scheduling", true],
        ["Weekly report", true], ["Competitor analysis", true],
      ],
    },
  ],
  Videos: [
    {
      tier: "BASIC", name: "Starter ", desc: "Short-form videos to get your brand seen on Reels, Shorts, and TikTok.",
      price: "99", period: "per month",
      features: [
        ["4 short-form videos / month", true], ["1 revision per video", true],
        ["Professional editing", true], ["Creative execution", true],
        ["Reliable turnaround ", true], ["Clear deliverables", true],
        ["Storyboarding", false], ["Captions", false], ["Weekly report", false], ["Scheduling",false],
      ],
    },
    {
      tier: "STANDARD", name: "Growth", desc: "Strategy-backed videos with structured storytelling and captions.",
      price: "199", period: "per month", featured: true,
features: [
        ["8 short-form videos / month", true], ["2 revisions per video", true],
        ["Professional editing", true], ["Storyboarding", true],
        ["Captions", true], ["Scheduling", true],
        ["Structured storytelling", true], ["Message clarity", true],
        ["Reliable turnaround", true], ["Weekly report", false],
      ],
    },
    {
      tier: "PREMIUM", name: "Pro", desc: "Complete video management with scheduling, community, and analytics.",
      price: "299", period: "per month",
      features: [
        ["12 short-form videos / month", true], ["Unlimited revisions", true],
        ["Professional editing", true], ["Storyboarding", true],
        ["Captions", true], ["Scheduling", true],
        ["Community management", true], ["Competitor analysis", true],
        ["Weekly report", true],
      ],
    },
  ],
  Website: [
    {
      tier: "BASIC", name: "Starter", desc: "A clean, professional single-page site to establish your online presence.",
      price: "99", period: "per month",
      features: [
        ["Single page website", true], ["1 revision included", true],
        ["Content writing", true], ["Focused messaging", true],
        ["Simple page layout", true], ["Foundational web presence", true],
        ["Reliable turnaround", true], ["Premium stock assets", false],
      ],
    },
    {
      tier: "STANDARD", name: "Growth", desc: "A multi-page site built to rank, convert, and grow your business.",
      price: "199", period: "per month", featured: true,
      features: [
        ["Two-page website", true], ["2 revisions included", true],
        ["Content writing", true], ["SEO-optimized keywords", true],
        ["Keyword-aligned content", true], ["Search visibility foundation", true],
        ["Focused messaging", true], ["Reliable turnaround", true], ["Premium stock assets", false], 
      ],
    },
    {
      tier: "PREMIUM", name: "Pro", desc: "A full five-page site with premium assets, SEO, and unlimited revisions.",
      price: "299", period: "per month",
      features: [
        ["Five-page website", true], ["Unlimited revisions", true],
        ["Content writing", true], ["SEO-optimized keywords", true],
        ["Keyword-aligned content", true], ["Search visibility foundation", true],
        ["Premium stock images", true], ["Premium stock videos", true],
      ],
    },
  ],
};

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

function PlanCard({ plan, tab = "Marketing" }) {
  const f = plan.featured;
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

      <a
        href={`/checkout?tab=${encodeURIComponent(tab)}&plan=${encodeURIComponent(plan.name)}`}
        className={`mt-8 h-[52px] rounded-[12px] flex items-center justify-center font-bold text-[16px] no-underline transition-colors ${
          f ? "bg-white text-[#013186] hover:bg-[#e6f0ff]" : "bg-[#013186] text-white hover:bg-[#012270]"
        }`}
      >
        Buy Now
      </a>
    </div>
  );
}

export default function Pricing() {
  const [active, setActive] = useState("Marketing");

  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <Seo
        path="/pricing"
        title="Pricing — Social Media, Video & Website Plans from $99/mo | The Social 99"
        description="Simple, transparent pricing from The Social 99. Social media management, short-form video, and website design plans starting at $99/month. No setup fee, cancel anytime."
      />

      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-12 mq450:pt-8 ">
        <div className="rounded-[28px] [background:linear-gradient(180deg,_#eef4ff,_#dbe9ff)] px-10 mq450:px-6 py-16 mq450:py-12 text-center">
          <h1 className="text-[#013186] font-bold leading-none m-0" style={{ fontSize: "clamp(38px, 6.5vw, 84px)" }}>
            Choose a Plan,<br />We'll Take it from there
          </h1>
          <p className="mt-5 mx-auto max-w-[1480px] text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(15px, 1.7vw, 22px)" }}>
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
