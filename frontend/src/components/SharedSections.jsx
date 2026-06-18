import { useState } from "react";
import s10 from "../assets/s10.avif";
import s11 from "../assets/s11.avif";
import s12 from "../assets/s12.avif";

const stories = [
  {
    img: s10,
    handle: "@Kevin",
    quote:
      "Social 99 understood that our brand isn't about selling toys, it's about intentional play. Their team captured our visuals, language, and pacing perfectly. Nothing felt loud or forced. The work felt calm, considered, and very true to who we are.",
  },
  {
    img: s11,
    handle: "@Greg Aden",
    quote:
      "Clarity matters in leadership work, and Social 99 respected that. They helped translate complex ideas into content that felt grounded and credible, without oversimplifying the message. That made a real difference.",
  },
  {
    img: s12,
    handle: "@Jasper",
    quote:
      "Before working with Social 99, our brand felt scattered. We had a strong product, but our visuals, content, and messaging didn't reflect the level of precision and performance we deliver.",
  },
];

const compareRows = ["High-Engagement", "Sales Growth", "Cost Effective", "On-time Posting"];

const plans = [
  {
    name: "Basic",
    price: "$99/month",
    includes: ["4 Custom Graphics", "2 Custom Videos", "1x Changes Allowed", "Creative Execution", "Consistent Brand Presence", "Reliable Turnaround"],
  },
  {
    name: "Standard",
    price: "$199/month",
    includes: ["8 Custom Graphics", "4 Custom Videos", "2x Changes Allowed", "Captions & Scheduling", "Content Strategy", "Brand Consistency"],
  },
  {
    name: "Premium",
    price: "$299/month",
    includes: ["8 Custom Graphics", "4 Carousels (Upto 3 Slides)", "6 Custom Videos", "Unlimited Changes Allowed", "Captions & Scheduling", "Weekly Report"],
  },
];

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const CtaButton = ({ label = "Start for $99", href = "/book-a-call" }) => (
  <a href={href} className="flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]">
    <b className="text-base text-[#000]">{label}</b>
    <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center"><Arrow /></span>
  </a>
);

/* ── Generic centered image showcase ──
   Covers "Schedule Smarter, Grow Faster" & "Deliverables at a Glance" */
export function ImageShowcase({ title, subtitle, subtitleAccent, image, ctaLabel }) {
  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center text-center font-[Montserrat]">
      <h2 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(32px, 5vw, 72px)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[rgba(0,0,0,0.7)] font-semibold" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
          {subtitle} {subtitleAccent && <span className="text-[#013186]">{subtitleAccent}</span>}
        </p>
      )}
      {image && (
        <img src={image} alt={title} loading="lazy" className="mt-10 w-full max-w-[1200px] h-auto object-contain" />
      )}
      {ctaLabel && <div className="mt-10"><CtaButton label={ctaLabel} /></div>}
    </div>
  );
}

/* ── Brand Shine: concentric circles + floating social badges ──
   Covers "Where We Make Your Brand Shine" */
function ShineIcon({ name }) {
  const wrap = (bg, child) => (
    <span className="w-[26px] h-[26px] rounded-full flex items-center justify-center" style={{ background: bg }}>{child}</span>
  );
  switch (name) {
    case "google":
      return wrap("#fff", <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 015.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 001 12c0 1.78.43 3.45 1.18 4.93z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>);
    case "facebook":
      return wrap("#1877F2", <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z"/></svg>);
    case "instagram":
      return wrap("radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-11.85a1.44 1.44 0 101.44 1.44 1.44 1.44 0 00-1.44-1.44z"/></svg>);
    case "x":
      return wrap("#000", <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-4.71-6.23-5.4 6.23H2.74l7.73-8.84L1.25 2.25H8.08l4.21 5.57zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg>);
    case "linkedin":
      return wrap("#0A66C2", <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>);
    case "youtube":
      return wrap("#FF0000", <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z"/></svg>);
    default:
      return null;
  }
}

const defaultShinePlatforms = [
  { label: "Instagram", x: 32, y: 12, icon: "instagram" },
  { label: "Facebook", x: 74, y: 24, icon: "facebook" },
  { label: "TikTok", x: 88, y: 52, icon: "x" },
  { label: "X", x: 64, y: 78, icon: "x" },
  { label: "Linkedin", x: 22, y: 82, icon: "linkedin" },
  { label: "YouTube", x: 8, y: 50, icon: "youtube" },
];

export function BrandShine({
  title = "Where We Make Your Brand Shine",
  ctaLabel = "Book a Free Strategy Call",
  platforms = defaultShinePlatforms,
}) {
  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-20 flex justify-center font-[Montserrat]">
      <div className="relative w-full max-w-[1100px] flex items-center justify-center" style={{ aspectRatio: "1100 / 620" }}>
        {/* Concentric circles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none mq800:hidden" viewBox="0 0 1100 620" preserveAspectRatio="xMidYMid meet">
          {[110, 200, 290, 380].map((r) => (
            <circle key={r} cx="550" cy="310" r={r} fill="none" stroke="rgba(1,49,134,0.06)" strokeWidth="1.5" />
          ))}
        </svg>

        {/* Floating badges — hidden on mobile */}
        {platforms.map((b) => (
          <div
            key={b.label}
            className="absolute mq800:!hidden flex items-center gap-2 bg-white rounded-full shadow-[0_4px_20px_rgba(1,49,134,0.10)] px-4 py-2"
            style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {b.emoji ? <span className="text-[18px]">{b.emoji}</span> : <ShineIcon name={b.icon} />}
            <span className="text-[15px] font-semibold text-[#111] whitespace-nowrap">{b.label}</span>
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-[#013186] font-bold leading-[1.1] m-0" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            {title}
          </h2>
          <div className="mt-7"><CtaButton label={ctaLabel} /></div>
          {/* Mobile-only chips */}
          <div className="hidden mq800:flex flex-wrap items-center justify-center gap-2 mt-8">
            {platforms.map((b) => (
              <div key={b.label} className="flex items-center gap-2 bg-white rounded-full shadow-md px-3 py-1.5">
                {b.emoji ? <span className="text-[16px]">{b.emoji}</span> : <ShineIcon name={b.icon} />}
                <span className="text-[13px] font-semibold text-[#111] whitespace-nowrap">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RealStories({ data = stories }) {
  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center font-[Montserrat]">
      <h2 className="text-[#013186] font-bold leading-tight m-0 mb-12 text-center" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
        Real Stories. Real Growth.
      </h2>
      <div className="grid grid-cols-3 gap-6 mq800:grid-cols-2 mq450:grid-cols-1 w-full max-w-[1600px]">
        {data.map((s) => (
          <div key={s.handle} className="rounded-[16px] bg-[#f4f8ff] border border-[rgba(1,49,134,0.08)] p-6 flex gap-4">
            <img src={s.img} alt={s.handle} loading="lazy" className="w-[64px] h-[64px] rounded-full object-cover flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 text-[#4d9fff]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.167L12 18.896l-7.335 3.865 1.401-8.167L.132 9.21l8.2-1.192z"/></svg>
                ))}
              </div>
              <h3 className="m-0 text-[18px] font-bold text-[#111]">{s.handle}</h3>
              <p className="m-0 text-[14px] leading-relaxed text-[rgba(0,0,0,0.6)]">"{s.quote}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlansThatFit({ data = plans, subtitle = "Flexible plans designed to deliver value and results.", tab = "Marketing" }) {
  const [active, setActive] = useState(0);
  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center font-[Montserrat]">
      <h2 className="text-[#013186] font-bold leading-tight m-0 text-center" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
        Plans that Fit just Right
      </h2>
      <p className="mt-4 mb-12 text-[#111] font-semibold text-center" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
        {subtitle}
      </p>
      <div className="w-full max-w-[1500px] flex items-stretch gap-8 mq1125:flex-col">
        {/* Plan selector */}
        <div className="flex-1 flex flex-col gap-5">
          {data.map((plan, i) => (
            <button
              key={plan.name}
              onClick={() => setActive(i)}
              className={`w-full flex items-center justify-between px-8 py-7 rounded-[18px] border transition-all cursor-pointer text-left ${
                active === i
                  ? "border-[rgba(1,49,134,0.3)] [background:linear-gradient(180deg,_#eaf2ff,_#dceaff)]"
                  : "border-[rgba(1,49,134,0.12)] bg-white hover:bg-[#f6f9ff]"
              }`}
            >
              <span className="text-[26px] mq450:text-[20px] font-bold text-[#111]">{plan.name}</span>
              <span className="text-[24px] mq450:text-[18px] font-bold text-[#013186]">{plan.price}</span>
            </button>
          ))}
        </div>
        {/* Includes card */}
        <div className="flex-1 rounded-[18px] border border-[rgba(1,49,134,0.12)] p-10 mq450:p-6 flex flex-col">
          <h3 className="m-0 mb-6 text-[24px] font-bold text-[#013186]">Includes:</h3>
          <ul className="flex flex-col gap-4 m-0 p-0 list-none flex-1">
            {data[active].includes.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[18px] mq450:text-[15px] text-[#111]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
          <a href={`/checkout?tab=${encodeURIComponent(tab)}&plan=${encodeURIComponent(data[active].name)}`} className="self-end mt-8 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[48px] rounded-[25.5px] pl-6 pr-[6px]">
            <b className="text-base text-[#000]">Buy Now</b>
            <span className="h-[36px] w-[36px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center"><Arrow /></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function WhyJoin({
  rows = compareRows,
  text = "We bring your brand to life on every platform, in every post. At The Social 99, you're not just outsourcing content; you're gaining a creative partner who sharpens your voice and positions you for real growth.",
}) {
  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex justify-center font-[Montserrat]">
      <div className="w-full max-w-[1600px] rounded-[24px] bg-[#f4f8ff] border border-[rgba(1,49,134,0.08)] p-12 mq800:p-8 mq450:p-5 flex items-center gap-10 mq1125:flex-col">
        {/* Comparison table */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-10 mq450:gap-x-4 mb-6">
            <div />
            <img src="/Logo@2x.png" alt="The Social 99" className="h-[36px] mq450:h-[28px] w-auto object-contain justify-self-center" />
            <div className="text-[18px] mq450:text-[14px] font-bold text-[#111] text-center w-[80px] mq450:w-[50px]">Others</div>
          </div>
          {rows.map((row) => (
            <div key={row} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-10 mq450:gap-x-4 py-4 border-t border-[rgba(1,49,134,0.07)]">
              <div className="text-[22px] mq800:text-[18px] mq450:text-[15px] font-bold text-[#111]">{row}</div>
              <div className="w-[80px] mq450:w-[50px] flex justify-center text-[22px]">✅</div>
              <div className="w-[80px] mq450:w-[50px] flex justify-center text-[22px]">❌</div>
            </div>
          ))}
        </div>
        {/* Why Join text */}
        <div className="flex-1 w-full flex flex-col items-start">
          <h2 className="text-[#013186] font-bold m-0" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Why Join?</h2>
          <p className="mt-5 text-[rgba(0,0,0,0.6)] font-medium leading-relaxed" style={{ fontSize: "clamp(15px, 1.4vw, 19px)" }}>
            {text}
          </p>
          <a href="/book-a-call" className="mt-8 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]">
            <b className="text-base text-[#000]">Start for $99</b>
            <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center"><Arrow /></span>
          </a>
        </div>
      </div>
    </div>
  );
}
