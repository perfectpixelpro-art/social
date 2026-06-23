import Seo from "../components/Seo";
import socialImage from "../assets/about1.avif";
import sm1 from "../assets/sm1.webp";
import sm2 from "../assets/sm2.webp";
import sm3 from "../assets/sm3.webp";
import sm4 from "../assets/sm4.png";
import sm5 from "../assets/sm5.webp";
import sm6 from "../assets/sm6.webp";
import sm7 from "../assets/sm7.webp";
import sm8 from "../assets/sm8.webp";
import a1 from "../assets/a1.avif";
import a2 from "../assets/a2.avif";
import a3 from "../assets/a3.avif";
import a4 from "../assets/a4.avif";
import a5 from "../assets/a5.avif";
import a6 from "../assets/a6.webp";
import a7 from "../assets/a7.webp";
import a8 from "../assets/a8.webp";
import a9 from "../assets/a9.webp";

const About = () => {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <Seo path="/about" title="About The Social 99 — Our Story & Mission" description="Learn about The Social 99: the team helping small businesses grow with affordable, done-for-you social media management, video, and web design." />

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
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-16 mq450:pt-10 pb-12 flex flex-col items-center text-center">

         <div
  className="
    inline-flex
    items-center
    rounded-full
    bg-white
    px-6
    py-3
  "
  style={{
    border: "1px solid #029df6",
    boxShadow: `
      0 0 10px rgba(2,157,246,0.35),
      0 0 20px rgba(2,157,246,0.20),
      0 4px 20px rgba(1,49,134,0.08)
    `,
  }}
>
  <span className="text-[15px] mq450:text-[12px] font-semibold text-[#013186]">
    Trusted by <b className="text-[#3db100]">1450+ Businesses</b> to Boost Engagement and Followers.
  </span>
</div>

          <h1 className="text-[#013186] font-bold leading-tight m-0 mt-4 text-[32px] md:text-[92px]">
  About The Social 99
</h1>
          <p className="mt-3 text-[rgba(0,0,0,0.45)] font-semibold" style={{ fontSize: "clamp(16px, 2vw, 26px)" }}>
            Built to bring structure to digital execution
          </p>

          {/* CTA */}
          <a
            href="/book-a-call"
            className="mt-9 flex items-center gap-3 no-underline border border-[rgba(1,49,134,0.10)] bg-white hover:bg-[rgba(188,214,255,0.37)] transition-colors h-[58px] rounded-[29px] pl-7 pr-[8px] shadow-[0_6px_24px_rgba(1,49,134,0.08)]"
          >
            <b className="text-[17px] mq450:text-[14px] text-[#013186]">Activate Your Plan with The Social 99</b>
            <span className="h-[42px] w-[42px] rounded-full bg-[rgba(158,202,255,0.39)] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
            </span>
          </a>

          {/* Hero image */}
          <div className="w-full max-w-[1100px] mt-12">
            <img src={socialImage} alt="The Social 99 work showcase" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>

      {/* ── What Is Social 99 ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-8 pb-12">
        <h2 className="text-[#013186] font-bold m-0 mb-4" style={{ fontSize: "clamp(26px, 3.4vw, 80px)" }}>
          What Is Social 99
        </h2>
        <p className="m-0 mb-3 text-[20px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium text-justify">
          Social 99 is built for businesses that know they should be showing up online, but don't have the time or structure to do it consistently. Most teams start with good intent, but content ends up getting delayed, rushed, or ignored when other priorities take over.
        </p>
        <p className="m-0 mb-3 text-[20px] font-bold text-[#3db100]">That's where we fit in.</p>
        <p className="m-0 mb-6 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium text-justify">
          We take over the execution side — social media, short-form videos, and basic website support — and turn it into a simple, repeatable system. So instead of figuring things out every week, your brand just keeps showing up the way it should.
        </p>
        <a
          href="/book-a-call"
          className="inline-flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.10)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[44px] rounded-[22px] pl-5 pr-[6px]"
        >
          <b className="text-[14px] text-[#013186]">Work with Social 99</b>
          <span className="h-[32px] w-[32px] rounded-full bg-[rgba(158,202,255,0.39)] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>
      </div>

      {/* ── Our Mission ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-12">
        <h2 className="text-[#013186] font-bold m-0 mb-2" style={{ fontSize: "clamp(26px, 3.4vw, 80px)" }}>
          Our Mission
        </h2>
        <p className="m-0 mb-5 text-[20px] text-[rgba(0,0,0,0.4)] font-semibold">Built to ensure brands show up with intention, not inconsistency</p>
        <div className="flex flex-col gap-3">
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">
            Our mission is to make consistent digital execution accessible to every growing business.
          </p>
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium text-justify">
            We believe brands shouldn't have to choose between running their operations and maintaining a strong online presence. With the right systems in place, both can happen together.
          </p>
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium text-justify">
            Through Social 99, we aim to remove the friction around content — the overthinking, the delays, the inconsistency — and replace it with a process that works quietly in the background, week after week.
          </p>
        </div>
      </div>

      {/* ── Why Everything Starts at $99 ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16">
        <h2 className="text-[#013186] font-bold m-0 mb-2" style={{ fontSize: "clamp(26px, 3.4vw, 80px)" }}>
          Why Everything Starts at $99
        </h2>
        <p className="m-0 mb-5 text-[20px] text-[rgba(0,0,0,0.4)] font-semibold">Because consistency shouldn't be expensive</p>
        <div className="flex flex-col gap-3">
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium text-justify">
            Most businesses don't fail at marketing because they lack ideas; they fail because execution becomes irregular. Traditional agencies make this worse with high retainers, complex contracts, and unpredictable output.
          </p>
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">We chose a different model.</p>
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium text-justify">
            At $99/month, you get structured, ongoing execution — the one thing most brands actually need. No overcomplication. No inflated pricing. Just consistent content that keeps your business visible.
          </p>
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">It's not about being cheaper.</p>
          <p className="m-0 text-[18px] leading-relaxed text-[rgba(0,0,0,0.6)] font-medium">It's about making consistency sustainable.</p>
        </div>
      </div>

      {/* ── Brands We've Worked With ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16 text-center">
        <h2 className="text-[#013186] font-bold m-0 mb-10" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          Brands We've Worked With
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 mq450:gap-x-10">
          {[a1, a2, a3, a4, a5].map((logo, i) => (
            <img key={i} src={logo} alt={`Brand ${i + 1}`} loading="lazy" className="h-[48px] mq450:h-[36px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </div>

      {/* ── Our Core Services ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-20">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center rounded-full bg-white border border-[rgba(1,49,134,0.12)] px-4 py-1.5 text-[12px] font-semibold text-[#013186]">
            What We Help With
          </span>
        </div>
        <h2 className="text-[#013186] font-bold m-0 mb-2 text-center" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          Our Core Services
        </h2>
        <p className="m-0 mb-10 text-center text-[15px] text-[rgba(0,0,0,0.4)] font-semibold">
          All delivered through defined plans and workflows.
        </p>
        <div className="grid grid-cols-2 gap-5 mq800:grid-cols-1 w-full max-w-[1100px] mx-auto">
          {[
            { icon: a6, title: "Social Media Management", desc: "Content planning, posting, and brand consistency across platforms." },
            { icon: a7, title: "Short-Form Video Editing", desc: "Video editing, formatting, and storytelling built for clarity and engagement." },
            { icon: a8, title: "Graphic Content Creation", desc: "Visual design, brand alignment, and creative support for strong messaging." },
            { icon: a9, title: "Website Design & Pages", desc: "Clean, conversion-ready websites and page additions." },
          ].map((s) => (
            <div key={s.title} className="flex items-start gap-4 rounded-[16px] bg-[#eef4ff] border border-[rgba(1,49,134,0.08)] p-6">
              <span className="shrink-0 w-[44px] h-[44px] rounded-[12px] bg-white border border-[rgba(1,49,134,0.10)] flex items-center justify-center overflow-hidden">
                <img src={s.icon} alt="" className="w-[26px] h-[26px] object-contain" />
              </span>
              <div>
                <h3 className="text-[#013186] font-bold text-[17px] m-0 mb-1">{s.title}</h3>
                <p className="m-0 text-[14px] leading-relaxed text-[rgba(0,0,0,0.55)] font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="/book-a-call"
            className="flex items-center gap-3 no-underline border border-[rgba(1,49,134,0.10)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[56px] rounded-[28px] pl-7 pr-[8px] shadow-[0_6px_24px_rgba(1,49,134,0.08)]"
          >
            <b className="text-[17px] mq450:text-[14px] text-[#013186]">Activate Your Plan Now</b>
            <span className="h-[40px] w-[40px] rounded-full bg-[rgba(158,202,255,0.39)] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
            </span>
          </a>
        </div>
      </div>

      {/* ── Social Media Posts Examples: 2 rows × 4 (1 per row on mobile) ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-20">
        <h2 className="text-[#013186] font-bold leading-tight m-0 mb-12 text-center" style={{ fontSize: "clamp(34px, 6vw, 84px)" }}>
          Social Media Posts Examples
        </h2>
        <div className="grid grid-cols-4 gap-6 mq800:grid-cols-2 mq450:grid-cols-1 w-full max-w-[1600px] mx-auto">
          {[sm1, sm2, sm3, sm4, sm5, sm6, sm7, sm8].map((src, i) => (
            <div
              key={i}
              className="rounded-[16px] overflow-hidden bg-[#eef4ff] shadow-[0_8px_30px_rgba(1,49,134,0.10)]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img src={src} alt={`Social media post ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Getting Started is Easy (dark blue) ── */}
      <div className="w-full bg-[#013186] py-20 mq450:py-14">
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5 text-center">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-[#013186]">
            How it Works
          </span>
          <h2 className="text-white font-bold leading-tight m-0 mt-4 mb-14" style={{ fontSize: "clamp(34px, 6vw, 84px)" }}>
            Getting Started is Easy
          </h2>
          <div className="grid grid-cols-3 gap-10 mq800:grid-cols-1 w-full max-w-[1500px] mx-auto">
            {[
              { num: "01", title: "Choose a Plan", desc: "Pick the plan that fits your goals, output needs, and budget." },
              { num: "02", title: "Complete Onboarding", desc: "Share your brand details through a quick, structured form." },
              { num: "03", title: "We Deliver Consistently", desc: "We plan, execute, and deliver through reliable monthly workflows." },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center">
                <div className="text-white font-bold leading-none" style={{ fontSize: "clamp(60px, 7vw, 100px)" }}>{s.num}</div>
                <h3 className="text-white font-bold m-0 mt-3 mb-2" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>{s.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-[rgba(255,255,255,0.75)] font-medium max-w-[320px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Brands Choose The Social 99 ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-20 mq450:py-14">
        <div className="grid grid-cols-2 gap-12 mq800:grid-cols-1 items-center w-full max-w-[1500px] mx-auto">

          {/* Left */}
          <div>
            <span className="inline-flex items-center rounded-full bg-white border border-[rgba(1,49,134,0.25)] px-4 py-1.5 text-[12px] font-semibold text-[#013186]">
              Why Social 99
            </span>
            <h2 className="text-[#013186] font-bold m-0 mt-5 mb-7" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              Why Brands Choose<br />The Social 99
            </h2>
            <ul className="m-0 p-0 list-none flex flex-col gap-5">
              {[
                "Clear deliverables, no surprises",
                "Predictable monthly execution",
                "Systems built for long-term consistency",
                "Designed for busy founders & teams",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="12" cy="12" r="9" /><path d="M8.5 12l2.5 2.5 4.5-5" />
                  </svg>
                  <span className="text-[17px] mq450:text-[15px] font-semibold text-[#111]">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right card */}
          <div className="rounded-[20px] border border-[rgba(1,49,134,0.15)] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] p-12 mq450:p-8 flex flex-col gap-7">
            <p className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>This isn't DIY.</p>
            <p className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>This isn't Agency Chaos.</p>
            <p className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>This is Structured Digital Support.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
