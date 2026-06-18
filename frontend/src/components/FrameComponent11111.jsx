import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const points = [
  {
    id: "p1",
    num: "01",
    title: "Discovery & Strategy:",
    desc: "We understand your brand, audience, and goals.",
    x: 1305,
    y: 182,
    at: 0.0,
    labelBelow: false,
  },
  {
    id: "p2",
    num: "02",
    title: "Content Creation:",
    desc: "Professionally designed posts tailored for your audience.",
    x: 1320,
    y: 480,
    at: 0.25,
    labelBelow: false,
  },
  {
    id: "p3",
    num: "03",
    title: "Review & Approval:",
    desc: "You always have the final say.",
    x: 280,
    y: 472,
    at: 0.5,
    labelBelow: false,
  },
  {
    id: "p4",
    num: "04",
    title: "Scheduled & Delivered:",
    desc: "We manage posting seamlessly every week.",
    x: 280,
    y: 190,
    at: 0.75,
    labelBelow: false,
  },
];

const FrameComponent11111 = ({ className = "" }) => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 800px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const DURATION = 5000;
    const HOLD = 1200;
    const tick = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      if (elapsed <= DURATION) setProgress(elapsed / DURATION);
      else if (elapsed <= DURATION + HOLD) setProgress(1);
      else { startRef.current = ts; setProgress(0); }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (isMobile) {
    return (
      <section className={`w-full flex flex-col items-center py-2 px-6 font-[Montserrat]  ${className}`}>
        <h1 className="text-[40px] mq450:text-[32px] font-bold text-[#013186] leading-tight text-center mb-8">
          How It Works
        </h1>
        <div className="w-full max-w-[420px] flex flex-col gap-4">
          {points.map((p) => (
            <div key={p.id} className="flex items-start gap-4 rounded-[16px] border border-[rgba(1,49,134,0.12)] bg-white p-4">
              <div className="flex-shrink-0 w-[34px] h-[34px] rounded-full bg-[#013186] flex items-center justify-center text-[13px] font-bold text-white">
                {p.num}
              </div>
              <div>
                <p className="m-0 text-[15px] font-bold text-[#111]">{p.title}</p>
                <p className="m-0 text-[13px] text-[rgba(0,0,0,0.55)] font-medium">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ViewBox: 1040 wide × 600 tall. Ellipse: rx=460 (wide), ry=190 (short) → horizontal oval
  return (
    <section className={`w-full flex items-center justify-center py-0 pb-8 px-6 font-[Montserrat] ${className}`}>
      {/*
        Using padding-bottom trick to enforce aspect ratio.
        1040/600 = 57.69%
        This ensures the container is always wider than tall regardless of parent CSS.
      */}
      <div
        className="relative w-full max-w-[1700px]"
        style={{ paddingBottom: "42%", height: 0 }}
      >
        {/* Full-size absolute inner */}
        <div className="absolute inset-0 flex items-center justify-center">

          {/* SVG — draws the horizontal ellipse */}
          <svg
  className="absolute inset-0 w-full h-full overflow-visible"
  viewBox="0 0 1600 600"
  preserveAspectRatio="xMidYMid meet"
>
<ellipse
  cx="800"
  cy="300"
  rx="680"
  ry="250"
  fill="none"
  stroke="rgba(1,49,134,0.12)"
  strokeWidth="2"
/>

<ellipse
  cx="800"
  cy="300"
  rx="680"
  ry="250"
  fill="none"
  stroke="rgba(1,49,134,0.45)"
  strokeWidth="2"
  pathLength="1"
  strokeDasharray="1"
  strokeDashoffset={1 - progress}
  strokeLinecap="round"
/>
</svg>

          {/* Labels positioned via % matching the viewBox coords */}
          {points.map((p) => {
            const revealed = progress >= p.at - 0.001;
            return (
              <div
                key={p.id}
                className="absolute flex flex-col items-center gap-1 pointer-events-none"
                style={{
                  left: `${(p.x / 1600) * 100}%`,
top: `${(p.y / 600) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: "260px",
                  opacity: revealed ? 1 : 0,
                  scale: revealed ? "1" : "0.7",
                  transition: "opacity 0.5s ease, scale 0.5s ease",
                }}
              >
                {p.labelBelow ? (
                  <>
                    <p className="text-[14px] font-semibold text-[rgba(0,0,0,0.45)] text-center leading-snug m-0">
                      {p.title}<br /><span className="font-normal text-[12px]">{p.desc}</span>
                    </p>
                    <div className="w-[26px] h-[26px] rounded-full bg-[#013186] flex items-center justify-center text-[11px] font-bold text-white">{p.num}</div>
                  </>
                ) : (
                  <>
                    <div className="w-[26px] h-[26px] rounded-full bg-[#013186] flex items-center justify-center text-[11px] font-bold text-white">{p.num}</div>
                    <p className="text-[14px] font-semibold text-[rgba(0,0,0,0.45)] text-center leading-snug m-0">
                      {p.title}<br /><span className="font-normal text-[12px]">{p.desc}</span>
                    </p>
                  </>
                )}
              </div>
            );
          })}

          {/* Center heading */}
          <div className="relative z-10 flex flex-col items-center text-center">
  <h1 className="text-[88px] font-bold text-[#013186] leading-tight mq800:text-[56px] mq450:text-[40px]">
  How it Works
</h1>
          </div>

        </div>
      </div>
    </section>
  );
};

FrameComponent11111.propTypes = { className: PropTypes.string };
export default FrameComponent11111;