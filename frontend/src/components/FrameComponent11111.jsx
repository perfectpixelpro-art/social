import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";


// Static points placed around the ellipse. `at` = fraction of the path (clockwise from top)
const points = [
  { id: "p1", num: "01", title: "Discovery & Strategy:", desc: "We understand your brand, audience, and goals.", x: 520, y: 30,  at: 0.0,  labelBelow: false },
  { id: "p2", num: "02", title: "Content Creation:",     desc: "Professionally designed posts tailored for your audience.", x: 980, y: 300, at: 0.25, labelBelow: false },
  { id: "p3", num: "03", title: "Review & Approval:",    desc: "You always have the final say.", x: 520, y: 570, at: 0.5,  labelBelow: true },
  { id: "p4", num: "04", title: "Scheduled & Delivered:", desc: "We manage posting seamlessly every week.", x: 60,  y: 300, at: 0.75, labelBelow: false },
];

const FrameComponent11111 = ({ className = "" }) => {
  const [progress, setProgress] = useState(0); // 0 → 1 along the ring
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
    const DURATION = 5000; // ms for one full loop
    const HOLD = 1200;     // pause at the end before restarting

    const tick = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;

      if (elapsed <= DURATION) {
        setProgress(elapsed / DURATION);
      } else if (elapsed <= DURATION + HOLD) {
        setProgress(1);
      } else {
        startRef.current = ts; // restart loop
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Mobile: clean vertical stacked list ──
  if (isMobile) {
    return (
      <section className={`w-full flex flex-col items-center py-12 px-6 font-[Montserrat] mt-20 ${className}`}>
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
        <button className="mt-8 cursor-pointer border-none bg-transparent flex">
          <div className="flex items-center gap-3 rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border border-[rgba(1,49,134,0.07)] py-2 pl-5 pr-2">
            <b className="text-sm text-black">Know How</b>
            <div className="w-[32px] h-[30px] rounded-[20px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
              <img className="w-4 h-4 object-contain" alt="" src="/image-1@2x.png" />
            </div>
          </div>
        </button>
      </section>
    );
  }

  return (
    <section className={`w-full flex items-center justify-center py-16 px-6 font-[Montserrat] ${className}`}>
      <div className="relative flex items-center justify-center w-full max-w-[1040px]" style={{ aspectRatio: "1040 / 600" }}>

        {/* Ellipse ring — draws progressively. Rotated -90 so it starts at the top. */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1040 600">
          
          {/* animated drawing ring */}
          <ellipse
            cx="520" cy="300" rx="460" ry="270"
            fill="none"
            stroke="rgba(1,49,134,0.45)"
            strokeWidth="2"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            transform="rotate(-90 520 300)"
            strokeLinecap="round"
          />
        </svg>

        {/* Static points — revealed once the line passes them */}
        {points.map((p) => {
          const revealed = progress >= p.at - 0.001;
          return (
            <div
              key={p.id}
              className="absolute flex flex-col items-center gap-2 pointer-events-none w-[200px] mq800:w-[140px] mq450:w-[100px]"
              style={{
                left: `${(p.x / 1040) * 100}%`,
                top: `${(p.y / 600) * 100}%`,
                transform: "translate(-50%, -50%)",
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

        {/* Static center */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <h1 className="text-[88px] font-bold text-[#013186] leading-tight mq800:text-[56px] mq450:text-[40px]">
            How It Works
          </h1>
          <button className="cursor-pointer border-none bg-transparent flex">
           
          </button>
        </div>
      </div>
    </section>
  );
};

FrameComponent11111.propTypes = { className: PropTypes.string };
export default FrameComponent11111;
