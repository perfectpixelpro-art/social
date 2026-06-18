import { useState } from "react";

const industries = [
  ["E-commerce", "Product-focused content that drives direct sales and builds brand loyalty"],
  ["Health and Wellness", "Clean, credible content that positions brands as authorities in their space"],
  ["Food and Beverage", "Visual-first content that makes audiences stop, crave, and engage"],
  ["Professional Services", "Thought leadership content that builds credibility and generates inquiries"],
  ["Beauty and Personal Care", "Aesthetic, lifestyle-driven content that connects with highly engaged audiences"],
  ["Technology and SaaS", "Clear, jargon-free content that communicates complex offerings simply"],
];

const checklist = [
  ["Does It Stop the Scroll?", "Every piece of content is built to grab attention in the first frame, so your audience stops instead of swiping past."],
  ["Is It Platform-Ready?", "Content is optimised for the exact platform, format, and dimensions it will live on — never copy-pasted across channels."],
  ["Does It Reflect the Brand?", "Colours, typography, tone, and layout all stay unmistakably aligned with your brand identity."],
  ["Can I request changes?", "Yes. You can review and request revisions before anything goes live, so the final piece feels exactly right."],
  ["Does It Have a Clear Purpose?", "Every post is created with a specific goal — to educate, build trust, drive visits, or generate inquiries."],
  ["Can I review the calendar first?", "Absolutely. You get to review and approve the full content calendar before we begin production."],
];

function ChecklistItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[28px] bg-[#eef4ff] border border-[rgba(1,49,134,0.10)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 text-left cursor-pointer border-none bg-transparent px-6 py-5"
      >
        <span className="text-[#013186] font-bold text-[17px] mq450:text-[15px]">{q}</span>
        <svg
          width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="m-0 px-6 pb-5 text-[15px]   leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">{a}</p>
        </div>
      </div>
    </div>
  );
}
import V1 from "../assets/VIDEO1.mp4";
import V2 from "../assets/VIDEO2.mp4";
import V3 from "../assets/VIDEO3.mp4";
import V4 from "../assets/VIDEO4.mp4";
import V5 from "../assets/VIDEO5.mp4";
import V6 from "../assets/VIDEO6.mp4";
import V7 from "../assets/VIDEO7.mp4";
import V8 from "../assets/VIDEO8.mp4";
import vi1 from "../assets/vi1.avif";
import vi2 from "../assets/vi2.avif";
import vi3 from "../assets/vi3.avif";
import vi4 from "../assets/vi4.avif";
import vi5 from "../assets/vi5.avif";
import vi6 from "../assets/vi6.avif";
import vi7 from "../assets/vi7.avif";
import vi8 from "../assets/vi8.avif";
import sm1 from "../assets/sm1.png";
import sm2 from "../assets/sm2.png";
import sm3 from "../assets/sm3.png";
import sm4 from "../assets/sm4.png";
import sm5 from "../assets/sm5.png";
import sm6 from "../assets/sm6.png";
import sm7 from "../assets/sm7.png";
import sm8 from "../assets/sm8.png";
import s1 from "../assets/s1.avif";
import s2 from "../assets/s2.avif";
import s3 from "../assets/s3.avif";
import s4 from "../assets/s4.avif";
import s5 from "../assets/s5.avif";
import s6 from "../assets/s6.avif";
import s7 from "../assets/s7.avif";
import s8 from "../assets/s8.avif";
import s9 from "../assets/s9.avif";
import p1 from "../assets/p1.avif";
import p2 from "../assets/p2.avif";
import p3 from "../assets/p3.avif";
import p4 from "../assets/p4.avif";

// 21 images → 7 rows × 3 columns
const works = [
  sm1, sm2, sm3,
  sm4, sm5, sm6,
  sm7, sm8, s1,
  s2, s3, s4,
  s5, s6, s7,
  s8, s9, p1,
  p2, p3, p4,
];

// 12 videos → 4 rows × 3 columns
const reels = [
  { src: V1, poster: vi1 }, { src: V2, poster: vi2 }, { src: V3, poster: vi3 },
  { src: V4, poster: vi4 }, { src: V5, poster: vi5 }, { src: V6, poster: vi6 },
  { src: V7, poster: vi7 }, { src: V8, poster: vi8 }, { src: V1, poster: vi1 },
  { src: V2, poster: vi2 }, { src: V3, poster: vi3 }, { src: V4, poster: vi4 },
];

function ReelCard({ src, poster }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative rounded-[18px] overflow-hidden group" style={{ aspectRatio: "9/16", boxShadow: "0 8px 30px rgba(1,49,134,0.12)" }}>
      {playing ? (
        <video className="absolute inset-0 w-full h-full object-cover bg-black" src={src} poster={poster} controls autoPlay playsInline />
      ) : (
        <button
          className="absolute inset-0 w-full h-full cursor-pointer border-none p-0"
          style={{ backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }}
          onClick={() => setPlaying(true)}
          aria-label="Play video"
        >
          <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-[60px] h-[60px] rounded-full bg-white/85 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#013186"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function Work() {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">

      {/* ── Hero ── */}
      <div
        className="w-full"
        style={{
          backgroundImage: "url('/Light-Gradient-BG.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-20 mq450:pt-12 pb-10 flex flex-col items-center text-center">
      <h1 className="text-[#013186] font-bold leading-tight m-0 text-[36px] md:text-[80px]">
  Work Examples
</h1>
          <p className="mt-0 text-[rgba(0,0,0,0.5)] font-semibold max-w-[1108px]" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
            Explore structured, high-quality social media posts designed to keep brands consistent, modern, and visually aligned.
          </p>
        </div>
      </div>

      {/* ── Image grid: 3 per row (1 per row on mobile) ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 mq450:py-0 py-16 flex justify-center">
        <div className="grid grid-cols-3 gap-6 mq800:grid-cols-2 mq450:grid-cols-1 w-full max-w-[1500px]">
          {works.map((src, i) => (
            <div
              key={i}
              className="rounded-[16px] overflow-hidden bg-[#eef4ff] shadow-[0_8px_30px_rgba(1,49,134,0.10)]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img src={src} alt={`Work example ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

       {/* ── Long-form content ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16">
        <div className="w-full flex flex-col gap-10 text-left">

          {/* Block 1 */}
          <div>
            <h2 className="text-[#013186] font-bold m-0 mb-3" style={{ fontSize: "clamp(24px, 3vw, 38px)" }}>
              What Great Content Actually Looks Like
            </h2>
            <p className="m-0 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
              Every brand has a story. The difference between brands that grow and brands that stay invisible is how that story is told — visually, consistently, and with intention. The examples you see on this page aren't just designs. They're strategies. Each post, reel, and carousel has been built with a specific goal in mind — to stop the scroll, build trust, and move the right audience to act.
            </p>
          </div>

          {/* Block 2 */}
          <div>
            <h2 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)" }}>
              Why Visual Consistency Is Everything
            </h2>
            <h3 className="text-[#111] font-bold text-[16px] m-0 mb-2">Your Brand Is Judged in Seconds</h3>
            <p className="m-0 mb-3 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
              When a potential customer lands on your profile, they don't read — they scan. In less than 10 seconds, they've already formed an opinion about your brand. That opinion is based almost entirely on how your content looks and feels.
            </p>
            <p className="m-0 mb-2 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">A consistent visual identity tells your audience three things immediately:</p>
            <ul className="m-0 mb-3 pl-5 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium list-disc">
              <li>You are professional</li>
              <li>You are trustworthy</li>
              <li>You take your brand seriously</li>
            </ul>
            <p className="m-0 mb-4 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
              Without that consistency, even the best product gets ignored.
            </p>
            <h3 className="text-[#111] font-bold text-[16px] m-0 mb-2">Consistency Builds Recognition</h3>
            <p className="m-0 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
              Think about the brands you follow without thinking. Chances are, you recognise their content before you even see their name. That's not an accident — it's the result of deliberate, consistent visual branding applied across every single post. At The Social 99, every piece of content we create is built to feel unmistakably like your brand — from the colour palette and typography to the tone of your captions and the structure of your layouts.
            </p>
          </div>

          {/* Block 3 */}
          <div>
            <h2 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(24px, 3vw, 38px)" }}>
              What Goes Into Every Piece of Content We Create
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-[#111] font-bold text-[16px] m-0 mb-1">Strategy First, Design Second</h3>
                <p className="m-0 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
                  Before a single post is designed, we understand your brand — your audience, your goals, your tone, and your positioning. Every creative decision flows from that understanding. This is why our content doesn't just look good. It works.
                </p>
              </div>
              <div>
                <h3 className="text-[#111] font-bold text-[16px] m-0 mb-1">Designed for the Platform</h3>
                <p className="m-0 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
                  A post that performs on Instagram doesn't automatically work on LinkedIn. A reel that works on TikTok needs to be adapted for YouTube Shorts. We create content that is built specifically for the platform it lives on — optimised for format, dimension, and audience behaviour.
                </p>
              </div>
              <div>
                <h3 className="text-[#111] font-bold text-[16px] m-0 mb-1">Built to Convert</h3>
                <p className="m-0 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
                  Aesthetics matter — but results matter more. Every post we create is designed with a purpose. Whether that purpose is to educate, to build trust, to drive profile visits, or to generate direct inquiries — the goal is always clear before the work begins.
                </p>
              </div>
            </div>
          </div>

          {/* A Closer Look at Our Work — cards */}
          <div>
            <h2 className="text-[#013186] font-bold m-0 mb-6" style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}>
              A Closer Look at Our Work
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { title: "Built to Convert", text: "Aesthetics matter — but results matter more. Every post we create is designed with a purpose. Whether that purpose is to educate, to build trust, to drive profile visits, or to generate direct inquiries — the goal is always clear before the work begins." },
                { title: "Short-Form Videos", text: "Short-form video is the most consumed content format on the internet right now. Our reels and short videos are built to capture attention in the first two seconds and hold it until the last frame. Every video is scripted, structured, and edited to feel native to the platform — not like an ad." },
                { title: "Carousels and Multi-Slide Content", text: "Carousels are one of the highest-engagement formats on Instagram and LinkedIn. We use them to tell stories, break down complex ideas, and walk audiences through content that builds credibility and authority for your brand." },
              ].map((c) => (
                <div key={c.title} className="rounded-[16px] bg-[#eef4ff] border border-[rgba(1,49,134,0.08)] p-6">
                  <h3 className="text-[#111] font-bold text-[17px] m-0 mb-2">{c.title}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Video Examples: 4 rows × 3 (1 per row on mobile), inline play ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16">
        <h2 className="text-[#013186] font-bold leading-tight m-0 mb-12 text-center" style={{ fontSize: "clamp(38px, 6vw, 84px)" }}>
          Video Examples
        </h2>
        <div className="grid grid-cols-3 gap-6 mq800:grid-cols-2 mq450:grid-cols-1 w-full">
          {reels.map((r, i) => (
            <ReelCard key={i} src={r.src} poster={r.poster} />
          ))}
        </div>
      </div>

      {/* ── Industries We have Created Content for ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16">
        <h2 className="text-[#013186] font-bold leading-tight m-0 mb-6" style={{ fontSize: "clamp(30px, 5vw, 64px)" }}>
          Industries We have Created Content for
        </h2>
        <p className="m-0 mb-8 text-[16px] leading-relaxed text-[rgba(0,0,0,0.55)] font-medium max-w-[1100px]">
          Great content is not one-size-fits-all. Different industries require different tones, different visual styles, and different messaging approaches. Here is a snapshot of the industries we have worked across:
        </p>
        <ul className="m-0 mb-8 p-0 list-none flex flex-col gap-5">
          {industries.map(([name, desc]) => (
            <li key={name} className="flex items-start gap-3">
              <span className="mt-[9px] w-[7px] h-[7px] rounded-full bg-[#013186] shrink-0" />
              <span className="text-[16px] mq450:text-[15px] leading-relaxed text-[rgba(0,0,0,0.7)] font-medium">
                <b className="text-[#111]">{name}</b> — {desc}
              </span>
            </li>
          ))}
        </ul>
        <p className="m-0 text-center text-[16px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
          No matter your industry, the approach is the same; understand the audience, build the strategy, create the content.
        </p>
      </div>

      {/* ── The Standard We Hold (checklist accordion) ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16">
        <h2 className="text-[#013186] font-bold leading-tight m-0 mb-4 text-center" style={{ fontSize: "clamp(30px, 5vw, 64px)" }}>
          The Standard We Hold Every Piece of Content to
        </h2>
        <p className="m-0 mb-10 text-center text-[16px] leading-relaxed text-[rgba(0,0,0,0.55)] font-medium">
          Before any content leaves our team, it passes through a clear quality checklist:
        </p>
        <div className="grid grid-cols-2 gap-5 mq800:grid-cols-1 w-full max-w-[1300px] mx-auto">
          {checklist.map(([q, a]) => (
            <ChecklistItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>

      {/* ── Ready to See What We can Do for Your Brand? ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-20">
        <h2 className="text-[#013186] font-bold leading-tight m-0 mb-6" style={{ fontSize: "clamp(30px, 5vw, 64px)" }}>
          Ready to See What We can Do for Your Brand?
        </h2>
        <p className="m-0 mb-4 text-[16px] leading-relaxed text-[rgba(0,0,0,0.55)] font-medium">
          The work on this page represents just a fraction of what we create every month for brands across industries. Every business is different and every content strategy we build reflects that.
        </p>
        <p className="m-0 text-[16px] leading-relaxed text-[rgba(0,0,0,0.55)] font-medium">
          If you're ready to see what consistent, professional, and strategic content can do for your brand, the next step is simple. Book a free strategy call with our team and let's build something worth scrolling for.
        </p>
      </div>

    </div>
  );
}
