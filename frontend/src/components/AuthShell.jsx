import { Link } from "react-router-dom";

// Split-screen auth layout: brand panel on the left, form on the right.
export default function AuthShell({ children }) {
  return (
    <div className="w-full min-h-screen flex font-[Montserrat] bg-[#021b4a]">
      {/* Left brand panel */}
      <div
        className="relative w-1/2 mq800:hidden p-10 flex flex-col justify-between overflow-hidden"
        style={{ background: "linear-gradient(150deg, #013186 0%, #0146b8 45%, #0a5ce0 100%)" }}
      >
        {/* decorative blocks */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[12%] left-[10%] w-40 h-56 rounded-2xl bg-white/15" />
          <div className="absolute top-[35%] left-[45%] w-48 h-72 rounded-2xl bg-white/10" />
          <div className="absolute bottom-[10%] left-[20%] w-56 h-40 rounded-2xl bg-white/10" />
          <div className="absolute top-[20%] right-[8%] w-32 h-80 rounded-2xl bg-white/15" />
        </div>

        <Link to="/" className="relative z-10">
          <img src="/Logo@2x.png" alt="The Social 99" className="h-[44px] w-auto object-contain brightness-0 invert" onError={(e) => { e.target.src = "/Logo@2x.png"; }} />
        </Link>

        <div className="relative z-10">
          <h2 className="text-white font-bold leading-tight m-0" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
            Grow your brand with<br />The Social 99.
          </h2>
          <p className="mt-4 text-white/70 font-medium max-w-[420px]" style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}>
            Consistent, professional content that keeps your business visible — starting at just $99/month.
          </p>
        </div>

        <p className="relative z-10 text-white/50 text-sm m-0">⭐ 5/5 · Trusted by 1450+ businesses</p>
      </div>

      {/* Right form panel */}
      <div className="w-1/2 mq800:w-full bg-white flex items-center justify-center px-10 mq450:px-6 py-16">
        <div className="w-full max-w-[440px]">
          {/* mobile logo */}
          <Link to="/" className="hidden mq800:flex mb-10 justify-center">
            <img src="/Logo@2x.png" alt="The Social 99" className="h-[40px] w-auto object-contain" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
