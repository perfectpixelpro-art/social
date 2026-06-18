import LightGradientBG from "../components/LightGradientBG";
import PlanContent from "../components/PlanContent";
import ChallengeCard from "../components/ChallengeCard";
import FrameComponent11 from "../components/FrameComponent11";
import FrameComponent111 from "../components/FrameComponent111";
import FrameComponent11111 from "../components/FrameComponent11111";
import FrameComponent1111 from "../components/FrameComponent1111";
import QuestionsLayout from "../components/QuestionsLayout";
import FrameComponent from "../components/FrameComponent";
import VideoExamples from "../components/VideoExamples";
import VideoExample from "../components/VideoExample";
import s13 from "../assets/s13.webp";
import s14 from "../assets/s14.webp";
import s15 from "../assets/s15.webp";


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

const SocialIcons = () => (
  <div className="flex items-center">
    {/* Google */}
    <div className="w-[36px] h-[36px] rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 relative z-[5]" style={{ marginRight: "-8px" }}>
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
    </div>
    {/* Facebook */}
    <div className="w-[36px] h-[36px] rounded-full bg-[#1877F2] flex items-center justify-center relative z-[4]" style={{ marginRight: "-8px" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </div>
    {/* Instagram */}
    <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center relative z-[3]" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", marginRight: "-8px" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    </div>
    {/* X / Twitter */}
    <div className="w-[36px] h-[36px] rounded-full bg-black flex items-center justify-center relative z-[2]" style={{ marginRight: "-8px" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </div>
    {/* LinkedIn */}
    <div className="w-[36px] h-[36px] rounded-full bg-[#0A66C2] flex items-center justify-center relative z-[1]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="w-full flex flex-col font-[Montserrat] overflow-x-hidden">

      {/* ── Hero + Social Icons + Plan Cards — one continuous bg ── */}
      <div
        className="w-full relative"
        style={{
          backgroundImage: "url('/Light-Gradient-BG.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Hero text */}
<div className="w-full px-[100px] mq800:px-10 mq450:px-2 pt-14 mq450:pt-8 pb-8 mq450:pb-2">
  <div className="flex flex-col items-center text-center">

    <h1
      className="
        text-[#013186]
        leading-[1.0]
        w-full
        m-0
        p-0
        font-bold
        mq450:text-[12px]
        mq450:leading-[1.1]
      "
      style={{
        fontSize: "clamp(34px,5vw,70px)",
        fontWeight: 650,
      }}
    >
      Affordable Social Media
      <br />
      Management for Small Business
    </h1>

    <p
      className="
        mt-3
        text-[rgba(0,0,0,0.45)]
        font-semibold
        mq450:text-[18px]
        mq450:leading-[1.35]
        mq450:px-4
        mq450:mt-4
      "
      style={{
        fontSize: "clamp(17px,2vw,27px)",
      }}
    >
      Customized Content, Expert Management, Proven Results.
    </p>

    {/* Mobile-only: Book A Call button */}
    {/* CTA Buttons */}
<div className="flex items-center gap-3 mt-4">
  
  {/* Book A Call Button - LEFT (filled with avatars) */}
  <button
    className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1A318B] text-white font-semibold text-sm hover:bg-[#142870] transition-all duration-200 shadow-md"
    onClick={() => {/* your existing handler */}}
  >
    <div className="flex items-center -space-x-2">
      <img src={s13} alt="client" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
      <img src={s14} alt="client" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
      <img src={s15} alt="client" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
    </div>
    <a href="book-a-call">Book A Call ›</a>
  </button>

  {/* Start Free Trial - RIGHT (outline style) */}
  <button className="flex items-center justify-center px-5 py-3 rounded-full border-2 border-[#1A318B] text-[#1A318B] font-semibold text-sm whitespace-nowrap hover:bg-[#1A318B] hover:text-white transition-all duration-200">
    <a href="free-trial">Start Free Trial</a>
  </button>

</div>

  </div>
</div>

        {/* Social icons + plan header */}
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5">
          {/* Social icons — right on desktop, centered on mobile */}
          <div className="flex justify-end mq450:justify-center mb-2 mq450:mt-13 mq450:scale-[1.1]">
  <SocialIcons />
</div>
          {/* Desktop */}
<div className="flex items-center justify-between gap-4 flex-wrap mb-5 mq450:hidden">
  <h3 className="text-[23px] text-[rgba(0,0,0,0.5)] font-semibold m-0">
    Choose Your Plan at The Social 99
  </h3>

  <div className="text-sm font-semibold text-right text-[#000] leading-6">
    Trusted by <span className="text-[#3db100]">1450+ Businesses</span> to Boost
    <br />
    Engagement and Followers.
  </div>
</div>

{/* Mobile Only */}
<div className="hidden mq450:flex flex-col items-center text-center mb-5">
  <div className="text-[15px] font-semibold text-[#000] leading-[1.4]">
    Trusted by <span className="text-[#3db100]">1450+ Businesses</span> to Boost
    <br />
    Engagement and Followers.
  </div>
</div>
        </div>

        {/* Plan Cards */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-4 pb-16">
  <PlanContent hideSectionHeader />
</div>
      </div>

     

      {/* ── Consistency + Video sections ── */}
      <div className="w-full w-full px-[100px] mq800:px-10 mq450:px-5">
        <FrameComponent11 />
      </div>

 {/* ── Challenge ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-16">
        <ChallengeCard />
      </div>


      {/* ── Post & Video Examples ── */}
      <div className="w-full w-full px-[100px] mq800:px-10 mq450:px-5">
        <FrameComponent111 />
      </div>
      
      {/* ── Video Examples — 2 rows × 4 = 8 videos ── */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5">
        <VideoExamples/>
      </div>

      {/* ── How It Works ── */}
      <div className="w-full w-full px-[100px] mq800:px-10 mq450:px-5 mt-20">
        <FrameComponent11111 />
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

      {/* ── FAQ ── */}
      <div className="w-full w-full px-[100px] mq800:px-10 mq450:px-5 pb-16 flex flex-col gap-[47px] mq800:gap-[23px]">
        <QuestionsLayout />
        <FrameComponent />
      </div>

    </div>
  );
};

export default Home;