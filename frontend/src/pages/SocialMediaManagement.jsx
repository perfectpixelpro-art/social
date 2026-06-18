import { useState } from "react";
import s1 from "../assets/s1.avif";
import s2 from "../assets/s2.avif";
import s3 from "../assets/s3.avif";
import s4 from "../assets/s4.avif";
import s5 from "../assets/s5.avif";
import s6 from "../assets/s6.avif";
import s7 from "../assets/s7.avif";
import s8 from "../assets/s8.avif";
import s9 from "../assets/s9.avif";
import s10 from "../assets/s10.avif";
import s11 from "../assets/s11.avif";
import s12 from "../assets/s12.avif";
import s13 from "../assets/s13.webp";
import s14 from "../assets/s14.webp";
import s15 from "../assets/s15.webp";
import tableImg from "../assets/table.webp";
import ScheduleCard from "../assets/ScheduleCard.webp";
import t1 from "../assets/t1.avif";
import t2 from "../assets/t2.avif";
import t3 from "../assets/t3.avif";
import socialImage from "../assets/social-image.avif";
import QuestionsLayout from "../components/QuestionsLayout";
import FrameComponent from "../components/FrameComponent";

const plans = [
  {
    name: "Basic",
    price: "$99/month",
    includes: [
      "4 Custom Graphics",
      "2 Custom Videos",
      "1x Changes Allowed",
      "Creative Execution",
      "Consistent Brand Presence",
      "Reliable Turnaround",
    ],
  },
  {
    name: "Standard",
    price: "$199/month",
    includes: [
      "8 Custom Graphics",
      "4 Custom Videos",
      "2x Changes Allowed",
      "Captions & Scheduling",
      "Content Strategy",
      "Brand Consistency",
    ],
  },
  {
    name: "Premium",
    price: "$299/month",
    includes: [
      "8 Custom Graphics",
      "4 Carousels (Upto 3 Slides)",
      "6 Custom Videos",
      "Unlimited Changes Allowed",
      "Captions & Scheduling",
      "Weekly Report",
    ],
  },
];

const stories = [
  {
    img: s13,
    handle: "@Kevin",
    quote:
      "Social 99 understood that our brand isn't about selling toys, it's about intentional play. Their affordable social media services captured our visuals, language, and pacing all reflected that. Nothing felt loud or forced. The work felt calm, considered, and very true to who we are.",
  },
  {
    img: s14,
    handle: "@Greg Aden",
    quote:
      "Clarity matters in leadership work, and Social 99 respected that. They helped translate complex ideas into content that felt grounded and credible, without oversimplifying the message. That made a real difference.",
  },
  {
    img: s15,
    handle: "@Jasper",
    quote:
      "Before working with Social 99 and their social media management services, our brand felt scattered. We had a strong product, but our visuals, content, and messaging didn't reflect the level of precision and performance we deliver.",
  },
];

const compareRows = ["High-Engagement", "Sales Growth", "Cost Effective", "On-time Posting"];

const testimonials = [
  {
    img: s10,
    name: "Daniel Cruz",
    role: "Founder/CEO",
    quote:
      "Working with The Social 99 was the best decision we made for our brand. Their affordable social media services helped us refine the voice, the vibe, the direction in just a few weeks, our content finally started bringing in real leads.",
  },
  {
    img: s11,
    name: "Jordan Ellis",
    role: "Social Media Manager",
    quote:
      "We've worked with freelancers and big agencies before, but no one nailed our brand like this. Their social media marketing services for small businesses made every post look like us and speak directly to our audience. We started seeing results almost immediately.",
  },
  {
    img: s12,
    name: "Melissa Grant",
    role: "Chief Marketing Officer",
    quote:
      "We finally look like the brand we've always wanted to be. The Social 99's social media management services helped us clean up our feed, define our tone, and create content that stands out. I recommend them to everyone.",
  },
];

const posts = [s1, s2, s3, s4, s5, s6, s7, s8, s9];

function PlatformIcon({ name }) {
  const wrap = (bg, child) => (
    <span className="w-[26px] h-[26px] rounded-full flex items-center justify-center" style={{ background: bg }}>{child}</span>
  );
  switch (name) {
    case "instagram":
      return wrap("radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-11.85a1.44 1.44 0 10 1.44 1.44 1.44 1.44 0 00-1.44-1.44z"/></svg>);
    case "facebook":
      return wrap("#1877F2", <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z"/></svg>);
    case "tiktok":
      return wrap("#000", <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>);
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

export default function SocialMediaManagement() {
  const [activePlan, setActivePlan] = useState(0);
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
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-20 mq450:pt-12 pb-16 flex flex-col items-center text-center">
     <h1
  className="
    text-[#013186]
    font-bold
    leading-[1.1]
    md:leading-[1.1]
    leading-[1.05]
    m-0
    text-[32px]
    md:text-[80px]
  "
>
  <span className="hidden md:inline">
    Scroll-Stopping Content
    <br />
    Built for Your Brand
  </span>

  <span className="md:hidden">
    Scroll-Stopping
    <br />
    Content Built for Your
    <br />
    Brand
  </span>
</h1>

      <a
  href="/book-a-call"
  className="
    mt-6 flex items-center
    gap-3 md:gap-4
    no-underline
    border border-[rgba(1,49,134,0.07)]
    bg-[rgba(188,214,255,0.37)]
    hover:bg-[rgba(188,214,255,0.6)]
    transition-colors

    h-[42px] md:h-[52px]
    rounded-full

    pl-5 md:pl-8
    pr-2
  "
>
  <b  className="text-[14px] md:text-[20px] text-[#000] whitespace-nowrap">
    Start for $99
  </b>

  <span
    className="
      h-[30px] w-[30px]
      md:h-[40px] md:w-[40px]
      rounded-full
      bg-[rgba(158,202,255,0.39)]
      flex items-center justify-center
    "
  >
    <svg
      width="16"
      height="16"
      className="md:w-[18px] md:h-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#013186"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  </span>
</a>
        </div>
      </div>

      {/* ── Post grid: 3 per row (1 per row on mobile) ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-10 flex justify-center mt-4 mq450:mt-0">
        <div className="grid grid-cols-3 gap-6 mq800:grid-cols-2 mq450:grid-cols-1 w-full max-w-[1800px]">
          {posts.map((src, i) => (
            <div
              key={i}
              className="rounded-[18px] overflow-hidden bg-[#eef4ff] shadow-[0_8px_30px_rgba(1,49,134,0.10)]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                src={src}
                alt={`Social media post ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
            
          ))}
          
        </div>
      </div>

     

      {/* ── Deliverables at a Glance ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center text-center">
        <h2
          className="text-[#013186] font-bold leading-tight m-0"
          style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
        >
          Deliverables at a Glance
        </h2>
        <p className="mt-4 text-[rgba(0,0,0,0.7)] font-semibold" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
          What we'll deliver: <span className="text-[#013186]">once you approve it!</span>
        </p>

        {/* Table image — scales down on mobile, never cuts */}
        <img
          src={tableImg}
          alt="Weekly deliverables table"
          loading="lazy"
          className="mt-10 w-full max-w-[1200px] h-auto object-contain"
        />
      </div>

       {/* ── Where We Make Your Brand Shine ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-20 mq450:py-0 flex justify-center">
        <div className="relative w-full max-w-[1100px] flex items-center justify-center" style={{ aspectRatio: "1100 / 620" }}>

          {/* Concentric circles background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1100 620" preserveAspectRatio="xMidYMid meet">
            {[110, 200, 290, 380].map((r) => (
              <circle key={r} cx="550" cy="310" r={r} fill="none" stroke="rgba(1,49,134,0.06)" strokeWidth="1.5" />
            ))}
          </svg>

          {/* Floating platform badges — hidden on mobile */}
          {[
            { label: "Instagram", x: 32, y: 12, icon: "instagram" },
            { label: "Facebook", x: 74, y: 24, icon: "facebook" },
            { label: "TikTok", x: 88, y: 52, icon: "tiktok" },
            { label: "X", x: 64, y: 78, icon: "x" },
            { label: "Linkedin", x: 22, y: 82, icon: "linkedin" },
            { label: "YouTube", x: 8, y: 50, icon: "youtube" },
          ].map((b) => (
            <div
              key={b.label}
              className="absolute mq800:hidden flex items-center gap-2 bg-white rounded-full shadow-[0_4px_20px_rgba(1,49,134,0.10)] px-4 py-2"
              style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <PlatformIcon name={b.icon} />
              <span className="text-[15px] font-semibold text-[#111]">{b.label}</span>
            </div>
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-[#013186] font-bold leading-[1.1] m-0" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
              Where We Make Your<br />Brand Shine
            </h2>
            <a
              href="/book-a-call"
              className="mt-7 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
            >
              <b className="text-base text-[#000]">Book a Free Strategy Call</b>
              <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>

            {/* Mobile-only stacked badges */}
            <div className="hidden mq800:flex flex-wrap items-center justify-center gap-2 mt-8">
              {["instagram", "facebook", "tiktok", "x", "linkedin", "youtube"].map((ic) => (
                <div key={ic} className="bg-white rounded-full shadow-md p-2 flex items-center justify-center">
                  <PlatformIcon name={ic} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* ── Schedule Smarter, Grow Faster

── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center text-center">
        <h2
          className="text-[#013186] font-bold leading-tight m-0"
          style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
        >
          Schedule Smarter, Grow Faster


        </h2>
        <p className="mt-4 text-[rgba(0,0,0,0.7)] font-semibold" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
         Engage your audience with <span className="text-[#013186]">consistent, scheduled posts.</span>
        </p>

        {/* Table image — scales down on mobile, never cuts */}
        <img
          src={ScheduleCard}
          alt="Weekly deliverables table"
          loading="lazy"
          className="mt-10 w-full max-w-[1200px] h-auto object-contain"
        />

        {/* CTA button */}
        <a
          href="/book-a-call"
          className="mt-10 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
        >
          <b className="text-base text-[#000]">Book a Free Strategy Call</b>
          <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </a>
      </div>


      {/* ── Testimonials ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center">
        <div className="grid grid-cols-3 gap-6 mq800:grid-cols-2 mq450:grid-cols-1 w-full max-w-[1600px]">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-[16px] overflow-hidden flex items-end"
              style={{ aspectRatio: "3 / 4" }}
            >
              {/* Background photo */}
              <img src={t.img} alt={t.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              {/* Dark gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              {/* Content */}
              <div className="relative z-10 p-6 w-full text-white">
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                  <h3 className="m-0 text-[24px] font-bold">{t.name}</h3>
                  <span className="text-[12px] font-semibold bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 whitespace-nowrap">
                    {t.role}
                  </span>
                </div>
                <p className="m-0 text-[14px] leading-relaxed text-white/90">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Start for $99 button */}
        <a
          href="/book-a-call"
          className="mt-12 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
        >
          <b className="text-base text-[#000]">Start for $99</b>
          <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </a>
      </div>

      {/* ── Content that Drives Real Engagement── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center text-center">
        <h2
          className="text-[#013186] font-bold leading-tight m-0"
          style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
        >
          Content that Drives Real Engagement

        </h2>
        <p className="mt-4 text-[rgba(0,0,0,0.7)] font-semibold" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
        We manage content to boost <span className="text-[#013186]">interaction and growth.</span>
        </p>

        {/* Table image — scales down on mobile, never cuts */}
        <img
          src={socialImage}
          alt="Weekly deliverables table"
          loading="lazy"
          className="mt-10 w-full max-w-[900px] h-auto object-contain"
        />

        {/* CTA button */}
        <a
          href="/book-a-call"
          className="mt-10 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
        >
          <b className="text-base text-[#000]">Book a Free Strategy Call</b>
          <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </a>
      </div>

      {/* ── Real Stories. Real Growth. ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center">
        <h2 className="text-[#013186] font-bold leading-tight m-0 mb-12 text-center" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
          Real Stories. Real Growth.
        </h2>
        <div className="grid grid-cols-3 gap-6 mq800:grid-cols-2 mq450:grid-cols-1 w-full max-w-[1600px]">
          {stories.map((s) => (
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

      {/* ── Why Join? comparison ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex justify-center">
        <div className="w-full max-w-[1600px] rounded-[24px] bg-[#f4f8ff] border border-[rgba(1,49,134,0.08)] p-12 mq800:p-8 mq450:p-5 flex items-center gap-10 mq1125:flex-col">

          {/* Comparison table */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-10 mq450:gap-x-4 mb-6">
              <div />
              <div className="flex flex-col items-center gap-1">
                <img src="/Logo@2x.png" alt="The Social 99" className="h-[36px] mq450:h-[28px] w-auto object-contain" />
              </div>
              <div className="text-[18px] mq450:text-[14px] font-bold text-[#111] text-center w-[80px] mq450:w-[50px]">Others</div>
            </div>
            {compareRows.map((row) => (
              <div key={row} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-10 mq450:gap-x-4 py-4 border-t border-[rgba(1,49,134,0.07)]">
                <div className="text-[22px] mq800:text-[18px] mq450:text-[15px] font-bold text-[#111]">{row}</div>
                <div className="w-[80px] mq450:w-[50px] flex justify-center text-[22px]">✅</div>
                <div className="w-[80px] mq450:w-[50px] flex justify-center text-[22px]">❌</div>
              </div>
            ))}
          </div>

          {/* Why Join text */}
          <div className="flex-1 w-full flex flex-col items-start">
            <h2 className="text-[#013186] font-bold m-0" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Why Join?
            </h2>
            <p className="mt-5 text-[rgba(0,0,0,0.6)] font-medium leading-relaxed" style={{ fontSize: "clamp(15px, 1.4vw, 19px)" }}>
              We bring your brand to life on every platform, in every post. At The Social 99, you're not just outsourcing content; you're gaining a creative partner who sharpens your voice and positions you for real growth through expert social media management services.
            </p>
            <a
              href="/book-a-call"
              className="mt-8 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[50px] rounded-[25.5px] pl-6 pr-[6px]"
            >
              <b className="text-base text-[#000]">Start for $99</b>
              <span className="h-[38px] w-[38px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

 



      {/* ── Plans that Fit just Right ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center">
        <h2 className="text-[#013186] font-bold leading-tight m-0 text-center" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
          Plans that Fit just Right
        </h2>
        <p className="mt-4 mb-12 text-[#111] font-semibold text-center" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
          Flexible plans designed to deliver value and results.
        </p>

        <div className="w-full max-w-[1500px] flex items-stretch gap-8 mq1125:flex-col">
          {/* Plan selector */}
          <div className="flex-1 flex flex-col gap-5">
            {plans.map((plan, i) => (
              <button
                key={plan.name}
                onClick={() => setActivePlan(i)}
                className={`w-full flex items-center justify-between px-8 py-7 rounded-[18px] border transition-all cursor-pointer text-left ${
                  activePlan === i
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
              {plans[activePlan].includes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[18px] mq450:text-[15px] text-[#111]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={`/checkout?tab=Marketing&plan=${encodeURIComponent(plans[activePlan].name)}`}
              className="self-end mt-8 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[48px] rounded-[25.5px] pl-6 pr-[6px]"
            >
              <b className="text-base text-[#000]">Buy Now</b>
              <span className="h-[36px] w-[36px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── FAQ (shared with home page) ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16 flex flex-col gap-[47px] mq800:gap-[23px]">
        <QuestionsLayout />
        <FrameComponent />
      </div>

    </div>
  );
}
