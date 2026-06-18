import { useState, useRef, useEffect } from "react";
import u1 from "../assets/u1.avif";
import u2 from "../assets/u2.avif";
import u3 from "../assets/u3.avif";
import u4 from "../assets/u4.avif";
import whyVideo from "../assets/VIDEO1.mp4";
import whyPoster from "../assets/vi1.avif";
import scheduleImg from "../assets/ScheduleCard.webp";
import deliverImg from "../assets/table.webp";
import socialImg from "../assets/social-image.avif";
import QuestionsLayout from "../components/QuestionsLayout";
import FrameComponent from "../components/FrameComponent";
import sf1 from "../assets/sf1.avif";
import sf2 from "../assets/sf2.webp";
import sf3 from "../assets/sf3.webp";
import sf4 from "../assets/sf4.webp";
import sf5 from "../assets/sf5.webp";
import sf6 from "../assets/sf6.webp";
import sf7 from "../assets/sf7.avif";
import sf8 from "../assets/sf8.mp4";
import {
  ImageShowcase,
  BrandShine,
  RealStories,
  PlansThatFit,
  WhyJoin,
} from "../components/SharedSections";

// ── Short-form-video–specific content ──
const sfvStories = [
  { img: u1, handle: "@Cathy", quote: "In packaging, clarity and reliability matter more than flashy marketing. Social 99 understood that immediately. They helped simplify how we communicate our services and products, making it easier for customers to understand what we offer and trust us as a long-term partner. The consistency they brought across our content and visuals has made our brand feel far more professional." },
  { img: u2, handle: "@Matty", quote: "Our customers care about one thing knowing they’re working with someone reliable. Social 99 kept that front and centre. They helped us present our well-drilling services clearly and professionally without overcomplicating anything. The content feels honest, direct, and true to how we actually operate, which matters a lot in our line of work." },
  { img: u3, handle: "@Shin", quote: "With hair services, trust and perception are everything. Social 99 helped shape how Masai Kanai shows up online, so it reflects the quality and care behind the work. The visuals, tone, and messaging feel refined and intentional, without losing personality. It’s helped position the brand more confidently and attract clients who value the experience, not just the service." },
];

const sfvPlans = [
  { name: "Basic", price: "$99/month", includes: ["4 Custom short-form videos", "1x Changes allowed", "Professional Editing", "Creative Execution", "Reliable Turnaround", "Clear Deliverables"] },
  { name: "Standard", price: "$199/month", includes: ["8 Custom short-form videos", "2x Changes allowed", "Storyboarding", "Captions & Scheduling", "Structured Storytelling", "Message Clarity"] },
  { name: "Premium", price: "$299/month", includes: [
"12 Custom short-form videos",
"Unlimited Changes",
"Captions & Scheduling",
"Community management",
"Weekly Report",
"Competitor Analysis"
] },
];

const sfvCompareRows = ["Scroll-Stopping content", "High Engagement", "Budget-Friendly", "On-time Delivery"];

const sfvWhyJoinText =
  "From scroll-stopping visuals and brand-aligned messaging to smooth approvals and growth-driven strategy, we handle it all. Short-form videos built to capture attention and drive action.";

const whyPoints = [
  { emoji: "📈", text: "Higher engagement than static content" },
  { emoji: "🛒", text: "Influences purchase decisions across all industries" },
  { emoji: "🔁", text: "Easily shared and remembered" },
];

// Floating platform badges around the hero
const platforms = [
  { label: "Reels", x: -3, y: 44, type: "reels" },
  { label: "TikTok", x: 102, y: 44, type: "tiktok" },
  { label: "Shorts", x: 48, y: 88, type: "shorts" },
];

// Floating avatar bubbles
const avatars = [
  { img: u1, x: 28, y: 6 },
  { img: u2, x: 78, y: 16 },
  { img: u3, x: 24, y: 87 },
  { img: u4, x: 76, y: 85 },
];

function PlatformBadge({ type, label }) {
  let icon = null;
  if (type === "reels") {
    icon = (
      <span className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-11.85a1.44 1.44 0 101.44 1.44 1.44 1.44 0 00-1.44-1.44z"/></svg>
      </span>
    );
  } else if (type === "tiktok") {
    icon = (
      <span className="w-[26px] h-[26px] rounded-[8px] bg-black flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
      </span>
    );
  } else {
    icon = (
      <span className="w-[26px] h-[26px] rounded-[8px] bg-[#FF0000] flex items-center justify-center">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z"/></svg>
      </span>
    );
  }
  return (
    <div className="flex items-center gap-2 bg-white rounded-full shadow-[0_4px_20px_rgba(1,49,134,0.12)] px-4 py-2">
      {icon}
      <span className="text-[15px] font-semibold text-[#111] whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function ShortFormVideos() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">

      {/* ── Hero ── */}
      <div
        className="w-full relative"
        style={{
          backgroundImage: "url('/Light-Gradient-BG.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-10 mq450:py-14 flex justify-center">
          <div className="relative w-full max-w-[1300px] flex items-center justify-center" style={{ minHeight: "clamp(420px, 52vw, 620px)" }}>

            {/* Concentric circles — hidden on mobile */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none mq800:hidden" viewBox="0 0 1300 620" preserveAspectRatio="xMidYMid meet">
              {[140, 240, 340, 440].map((r) => (
                <circle key={r} cx="650" cy="310" r={r} fill="none" stroke="rgba(1,49,134,0.06)" strokeWidth="1.5" />
              ))}
            </svg>

            {/* Floating platform badges — hidden on mobile */}
            {platforms.map((p) => (
              <div
                key={p.label}
                className="absolute mq800:!hidden"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <PlatformBadge type={p.type} label={p.label} />
              </div>
            ))}

            {/* Floating avatars — hidden on mobile */}
            {avatars.map((a, i) => (
              <div
                key={i}
                className="absolute mq800:!hidden w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-white shadow-[0_4px_16px_rgba(1,49,134,0.18)]"
                style={{ left: `${a.x}%`, top: `${a.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <img src={a.img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <h1 className="text-[#013186] font-bold leading-[1.05] m-0" style={{ fontSize: "clamp(36px, 6vw, 84px)" }}>
                Content that Captures<br />Attention and Builds Recall
              </h1>
              <p className="mt-5 text-[rgba(0,0,0,0.45)] font-semibold" style={{ fontSize: "clamp(14px, 1.6vw, 22px)" }}>
                Short-form video captures attention fast and keeps your brand top of mind in a scroll-heavy world.
              </p>

              {/* Mobile-only platform chips */}
              <div className="hidden mq800:flex flex-wrap items-center justify-center gap-2 mt-8">
                {platforms.map((p) => (
                  <PlatformBadge key={p.label} type={p.type} label={p.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Short-Form Video Matters ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex justify-center">
        <div className="w-full max-w-[1500px] flex items-center gap-12 mq1125:gap-8 mq800:flex-col">

          {/* Left: video — plays inline in place */}
          <div
            className="flex-1 w-full relative rounded-[20px] overflow-hidden group aspect-[16/11] mq800:aspect-video"
            style={{ boxShadow: "0 16px 50px rgba(1,49,134,0.14)" }}
          >
            {playing ? (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={whyVideo}
                controls
                autoPlay
              />
            ) : (
              <div className="absolute inset-0 cursor-pointer" onClick={() => setPlaying(true)}>
                <img src={sf7} alt="Short-form video" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[74px] h-[74px] rounded-full bg-white/90 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-lg">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#013186"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: text */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-[#013186] font-bold leading-[1.05] m-0" style={{ fontSize: "clamp(34px, 4.2vw, 60px)" }}>
              Why Short-Form Video<br />Matters for Your Brand
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {whyPoints.map((p) => (
                <div key={p.text} className="flex items-center gap-3 text-[18px] mq450:text-[15px] font-semibold text-[#111]">
                  <span className="text-[20px]">{p.emoji}</span>
                  {p.text}
                </div>
              ))}
            </div>
            <a
              href="/book-a-call"
              className="mt-8 self-start flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
            >
              <b className="text-base text-[#000]">Drive Views</b>
              <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Drive More Views, Faster (Schedule showcase) ── */}
      <ImageShowcase
        title="Drive More Views, Faster"
        subtitle="Consistent short-form content that"
        subtitleAccent="keeps your audience hooked."
        image={sf1}
        ctaLabel="Get More Views"
      />
       <WhyJoin rows={sfvCompareRows} text={sfvWhyJoinText} />

      {/* ── Where We Make Your Brand Shine ── */}
      <BrandShine
        title="Where We Make Your Brand Shine"
        ctaLabel="Increase Visibility"
        platforms={[
          { label: "Scriptwriting & Storyboarding", x: 48, y: -8, emoji: "✍️" },
          { label: "Trend & Audio Research", x: 88, y: 16, emoji: "🎧" },
          { label: "On-Brand Editing with Captions", x: 92, y: 72, emoji: "💻" },
          { label: "Ongoing Performance Tracking", x: 50, y: 107, emoji: "📊" },
          { label: "Platform Optimization", x: 10, y: 72, emoji: "📱" },
          { label: "Custom Content Strategy", x:11, y: 16, emoji: "🧠" },
        ]}
      />

      {/* ── Deliverables at a Glance ── */}
      <ImageShowcase
        title="Deliverables at a Glance"
        subtitle="What we’ll deliver:"
        subtitleAccent="once you approve it!."
        image={sf3}
      />

    

      {/* ── Shared sections (short-form content) ── */}
      <PlansThatFit data={sfvPlans} subtitle="Flexible plans designed to deliver value and results." />
      <RealStories data={sfvStories} />
     
     

      {/* ── FAQ ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16 flex flex-col gap-[47px] mq800:gap-[23px]">
        <QuestionsLayout />
        <FrameComponent />
      </div>

    </div>
  );
}
