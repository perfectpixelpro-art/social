import Seo from "../components/Seo";
import teamMain from "../assets/team-main.avif";
import team1 from "../assets/team1.avif";
import team2 from "../assets/team2.avif";
import team3 from "../assets/team3.avif";
import p1 from "../assets/p1.avif";
import p2 from "../assets/p2.avif";
import p3 from "../assets/p3.avif";
import p4 from "../assets/p4.avif"; 
import u1 from "../assets/u1.avif";
import u2 from "../assets/u2.avif";
import u3 from "../assets/u3.avif";
import u4 from "../assets/u4.avif";
import sf1 from "../assets/sf1.avif";

import sr1 from "../assets/sr1.webp";
import sr2 from "../assets/sr2.webp";
import sr3 from "../assets/sr3.webp";
import socialImage from "../assets/social-image.avif";

import QuestionsLayout from "../components/QuestionsLayout";
import FrameComponent from "../components/FrameComponent";
import { RealStories, PlansThatFit, WhyJoin } from "../components/SharedSections";

const teamSmall = [
  { img: u4, name: "Brayden Rivera", role: "Founder/CEO" },
  { img: u2, name: "Camille Reyes", role: "Content Lead" },
  { img: u3, name: "Nicolle Park", role: "Marketing Manager" },
];

const visionPoints = [
  { emoji: "🎯", text: "Align on goals and vision" },
  { emoji: "💁", text: "Define target audience" },
  { emoji: "📑", text: "Identify key website objectives" },
];

const badges = [
  { label: "User-Friendly Design", x: 4, y: 4, icon: "users" },
  { label: "Fast Load Times", x: 98, y: 4, icon: "bolt" },
  { label: "SEO Optimization", x: 78, y: 88, icon: "seo" },
  { label: "Strong Security", x: 24, y:88 , icon: "shield" },
];

const projects = [p1, p2, p3, p4];

// ── Website-specific content for the shared sections ──
const webStories = [
  {
    img: sr1,
    handle: "@Alex",
    quote:
      "The Social 99 completely reworked our website and brought clarity to how we present our real estate services. The layout is clean, the messaging is clear, and it finally feels like a site built for serious buyers and sellers. It looks professional, loads fast, and reflects the level of our business.",
  },
  {
    img: sr2,
    handle: "@Cathy",
    quote:
      "Our previous website didn’t clearly explain what we do or who we serve. The Social 99 simplified everything. They built a site that’s easy to navigate, straightforward, and communicates our packaging services without confusion. It feels reliable and professional, exactly what our customers expect.",
  },
  {
    img: sr3,
    handle: "@Jaclyn",
    quote:
      "The Social 99 designed a website that truly reflects the artistry and intention behind Chrysalis Studios. The visuals are elegant, the structure is thoughtful, and the overall experience feels refined without being overwhelming. It finally feels like a space that represents our work properly.",
  },
];

const webPlans = [
  {
    name: "Basic",
    price: "$99/month",
    includes: ["Single Page website",
"1x Changes allowed",
"Content Writing",
"Focused Messaging",
"Simple Page Layout",
"Foundational Web Presence"],
  },
  {
    name: "Standard",
    price: "$199/month",
    includes: ["Two Pages website",
"2x Changes allowed",
"Content Writing",
"SEO-Optimized Keywords",
"Keyword-Aligned Content",
"Search Visibility Foundation"],
  },
  {
    name: "Premium",
    price: "$299/month",
    includes: ["Unlimited Pages", "Conversion-Focused UX", "Full SEO Optimization", "CMS / Blog Setup", "Speed & Security Audit", "Unlimited Revisions"],
  },
];

const webCompareRows = ["Business Oriented Designs", "Easy Navigation", "Fast Loading Speed", "Pocket Friendly"];

const webWhyJoinText =
  ["Five Pages website",
"Unlimited Changes allowed",
"Content Writing",
"SEO-Optimized Keywords",
"Premium stock Images",
"Premium stock Videos"];

// Tech-stack badges around "Custom-Built for Every Project"
const techBadges = [
  { label: "Webflow", x: 33, y: 14, tech: "webflow" },
  { label: "Wix Studio", x: 78, y: 26, tech: "wix" },
  { label: "React", x: 13, y: 44, tech: "react" },
  { label: "HTML", x: 88, y: 54, tech: "html" },
  { label: "Wordpress", x: 25, y: 78, tech: "wordpress" },
  { label: "CSS", x: 72, y: 76, tech: "css" },
];

function TechIcon({ tech }) {
  switch (tech) {
    case "webflow":
      return <span className="w-[26px] h-[26px] rounded-[7px] bg-[#4353ff] flex items-center justify-center text-white text-[13px] font-black">W</span>;
    case "wix":
      return <span className="w-[26px] h-[26px] flex items-center justify-center text-[#000] text-[11px] font-black">WIX</span>;
    case "react":
      return (
        <span className="w-[26px] h-[26px] flex items-center justify-center">
          <svg width="22" height="22" viewBox="-11.5 -10.23 23 20.46" fill="#61DAFB"><circle r="2.05"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
        </span>
      );
    case "html":
      return <span className="w-[26px] h-[26px] rounded-[6px] bg-[#e44d26] flex items-center justify-center text-white text-[11px] font-black">5</span>;
    case "wordpress":
      return <span className="w-[26px] h-[26px] rounded-full bg-[#21759b] flex items-center justify-center text-white text-[14px] font-black">W</span>;
    case "css":
      return <span className="w-[26px] h-[26px] rounded-[6px] bg-[#264de4] flex items-center justify-center text-white text-[11px] font-black">3</span>;
    default:
      return null;
  }
}

function BadgeIcon({ name }) {
  const wrap = (child) => (
    <span className="w-[28px] h-[28px] rounded-[8px] bg-[#cfe2ff] flex items-center justify-center flex-shrink-0">{child}</span>
  );
  switch (name) {
    case "users":
      return wrap(<svg width="16" height="16" viewBox="0 0 24 24" fill="#013186"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>);
    case "bolt":
      return wrap(<svg width="16" height="16" viewBox="0 0 24 24" fill="#013186"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>);
    case "seo":
      return <span className="w-[28px] h-[28px] rounded-[8px] bg-[#cfe2ff] flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#013186]">SEO</span>;
    case "shield":
      return wrap(<svg width="16" height="16" viewBox="0 0 24 24" fill="#013186"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>);
    default:
      return null;
  }
}

export default function Website() {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <Seo path="/website" title="Website Design Services - Built to Convert | The Social 99" description="Conversion-focused, SEO-optimized website design for small businesses. Clean, fast, mobile-friendly sites that turn visitors into customers from $99/month." />

      {/* ── Hero ── */}
      <div
        className="w-full relative"
        style={{
          backgroundImage: "url('/website-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-24  mq450:py-0 flex justify-center">
          <div className="relative w-full max-w-[1300px] flex items-center justify-center" style={{ minHeight: "clamp(380px, 50vw, 560px)" }}>

            {/* Floating feature badges — hidden on mobile */}
            {badges.map((b) => (
              <div
                key={b.label}
                className="absolute mq800:!hidden flex items-center gap-2 bg-white rounded-full shadow-[0_4px_20px_rgba(1,49,134,0.12)] px-4 py-2"
                style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <BadgeIcon name={b.icon} />
                <span className="text-[15px] font-semibold text-[#111] whitespace-nowrap">{b.label}</span>
              </div>
            ))}

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <h1 className="text-[#013186] font-bold leading-[1.05] m-0" style={{ fontSize: "clamp(36px, 6vw, 88px)" }}>
                Award-Winning Websites<br />that Drive Results
              </h1>
              <a
                href="/book-a-call"
                className="mt-8 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
              >
                <b className="text-base text-[#000]">Build To Convert</b>
                <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* ── Understanding Your Vision ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 mq450:py-2 py-16 flex justify-center">
        <div className="w-full max-w-[1500px] flex items-stretch gap-8 mq1125:flex-col">

          {/* Left: team images */}
          <div className="flex-1 flex gap-4 mq450:flex-col">
            {/* Big image */}
            <div className="flex-[1.4] relative rounded-[24px] overflow-hidden min-h-[520px] mq450:min-h-[300px]">
              <img src={u1} alt="Team The Social 99" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
               
              </div>
            </div>
            {/* 3 small images */}
            <div className="flex-1 flex flex-col gap-4 mq450:flex-row">
              {teamSmall.map((m) => (
                <div key={m.name} className="flex-1 relative rounded-[20px] overflow-hidden min-h-[170px]">
                  <img src={m.img} alt={m.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h4 className="m-0 text-[14px] font-bold leading-tight">{m.name}</h4>
                    <p className="m-0 text-[10px] text-white/80">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-[#013186] font-bold leading-[1.05] m-0" style={{ fontSize: "clamp(34px, 4vw, 60px)" }}>
              Understanding<br />Your Vision
            </h2>
            <p className="mt-5 text-[rgba(0,0,0,0.5)] font-medium leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 19px)" }}>
              We listen first so every graphic and text on your website reflects your purpose, not just your presence.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {visionPoints.map((p) => (
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
              <b className="text-base text-[#000]">Grow Online</b>
              <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Custom-Built for Every Project ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 mq450:py-10 py-16 flex justify-center">
        <div
          className="w-full max-w-[1600px] rounded-[28px] border border-[rgba(1,49,134,0.12)] relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #f2f7ff 0%, #eaf2ff 100%)" }}
        >
          <div className="relative flex items-center justify-center min-h-[360px] aspect-[1600/620] mq800:aspect-auto mq800:min-h-0 mq800:py-16">

            {/* Concentric circles — hidden on mobile */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none mq800:hidden" viewBox="0 0 1600 620" preserveAspectRatio="xMidYMid meet">
              {[120, 220, 320, 430].map((r) => (
                <circle key={r} cx="800" cy="310" r={r} fill="none" stroke="rgba(1,49,134,0.06)" strokeWidth="1.5" />
              ))}
            </svg>

            {/* Floating tech badges — hidden on mobile */}
            {techBadges.map((b) => (
              <div
                key={b.label}
                className="absolute mq800:!hidden flex items-center gap-2 bg-white rounded-full shadow-[0_4px_20px_rgba(1,49,134,0.12)] px-4 py-2"
                style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <TechIcon tech={b.tech} />
                <span className="text-[15px] font-semibold text-[#111] whitespace-nowrap">{b.label}</span>
              </div>
            ))}

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <h2 className="text-[#013186] font-bold leading-[1.05] m-0" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
                Custom-Built for<br />Every Project
              </h2>
              <a
                href="/book-a-call"
                className="mt-7 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
              >
                <b className="text-base text-[#000]">Go Live</b>
                <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* ── Project Highlights ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center">
        <h2 className="text-[#013186] font-bold leading-tight m-0 text-center" style={{ fontSize: "clamp(34px, 5vw, 68px)" }}>
          Project Highlights
        </h2>
        <p className="mt-4 mb-12 text-[#111] font-semibold text-center" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
          Web projects tailored to business goals and user experience.
        </p>

        {/* 2 rows × 2 = 4 project cards (1 per row on mobile) */}
        <div className="grid grid-cols-2 gap-6 mq800:grid-cols-1 w-full max-w-[1600px] box-border">
          {projects.map((src, i) => (
            <div
              key={i}
              className="rounded-[18px] border border-[rgba(1,49,134,0.1)] overflow-hidden w-full box-border aspect-[16/10] mq450:aspect-[16/11]"
            >
              <img src={src} alt={`Project ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Built for Clarity and Performance */}
        <div className="w-full max-w-[1600px] flex items-start gap-12 mt-20 mq1125:flex-col mq1125:gap-6">
          <h2 className="flex-1 text-[#013186] font-bold leading-[1.1] m-0" style={{ fontSize: "clamp(34px, 4.5vw, 64px)" }}>
            Built for Clarity<br />and Performance
          </h2>
          <p className="flex-1 text-[rgba(0,0,0,0.5)] font-medium leading-relaxed" style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}>
            Your website is structured to communicate clearly from the first interaction. Each section is designed to guide visitors through your services without confusion. This creates a smoother experience and helps users understand your business faster.
          </p>
        </div>
      </div>

      {/* ── Imported shared sections (website-specific content) ── */}
      <WhyJoin rows={webCompareRows} text={webWhyJoinText} />
      <PlansThatFit data={webPlans} tab="Website" subtitle="Website packages built to launch, rank, and convert." />
      <RealStories data={webStories} />

      {/* ── FAQ (shared with home page) ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16 flex flex-col gap-[47px] mq800:gap-[23px]">
        <QuestionsLayout />
        <FrameComponent />
      </div>

    </div>
  );
}
