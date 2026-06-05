import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const items = [
  { num: "01", label: "Engaging Post" },
  { num: "02", label: "Viral Reel" },
  { num: "03", label: "Compelling Post" },
  { num: "04", label: "Creative Carousel" },
  { num: "05", label: "Captivating Reel" },
  { num: "06", label: "Insightful Carousel" },
];

const ChallengeCard = ({ className = "" }) => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  // Track mobile viewport (≤450px) to switch tabs to vertical
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 450px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Click outside → reset to default (0)
  useEffect(() => {
    const handleClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setActive(0);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <section
      ref={cardRef}
      className={`w-full rounded-[24px] font-[Montserrat] p-[36px_40px_0_40px] mq800:p-[24px_20px_0_20px] ${className}`}
      style={{
        background: "linear-gradient(180deg, #F2F7FF 0%, #EAF2FF 100%)",
        border: "1px solid rgba(1, 49, 134, 0.12)",
        overflow: "hidden",
      }}
    >
      {/* Top row: heading + brand */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2
          className="m-0 text-[#111] font-bold leading-tight"
          style={{ fontSize: "clamp(20px, 2.2vw, 30px)" }}
        >
          Get Results in Just 7 Days – Risk-Free!
        </h2>
        <span className="text-[13px] font-semibold text-[rgba(0,0,0,0.4)] whitespace-nowrap mt-1">
          the<span className="text-[#013186] font-bold">Social99</span>
        </span>
      </div>

      {/* Subtitle */}
      <p className="m-0 mb-6 text-[14px] text-[rgba(0,0,0,0.55)] font-medium">
        Experience amazing results or get your money back,{" "}
        <b className="text-[#111] font-bold">no questions asked!</b>
      </p>

      {/* Bottom row: Try Now + animated tabs */}
      <div className="flex items-end gap-3 mq450:flex-col mq450:items-stretch">

        {/* Try Now button */}
        <div className="flex-shrink-0 pb-4 mq450:pb-0 mq450:mb-3">
          <button className="flex items-center gap-2 bg-white border border-[rgba(1,49,134,0.15)] rounded-full px-5 py-3 cursor-pointer hover:shadow-md transition-all whitespace-nowrap">
            <span className="text-[14px] font-bold text-[#000]">Try Now</span>
            <span className="w-[26px] h-[26px] rounded-full bg-[#f0f4ff] border border-[rgba(1,49,134,0.1)] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Animated number tabs — horizontal on desktop, vertical list on mobile */}
        <div
          className="flex flex-1 w-full"
          style={{
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "flex-end",
            gap: isMobile ? 8 : 4,
          }}
        >
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <div
                key={item.num}
                className="cursor-pointer"
                style={{
                  flex: isMobile ? "none" : 1,
                  height: isMobile ? "auto" : isActive ? "120px" : "72px",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  background: isActive ? "rgba(1, 49, 134, 0.08)" : "rgba(1, 49, 134, 0.04)",
                  borderRadius: isMobile ? "12px" : "14px 14px 0 0",
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  alignItems: isMobile ? "center" : "flex-start",
                  justifyContent: isMobile ? "flex-start" : "flex-end",
                  gap: isMobile ? 12 : 0,
                  padding: isMobile ? "12px 16px" : "0 16px 14px 16px",
                }}
                onMouseEnter={() => !isMobile && setActive(i)}
                onClick={() => setActive(i)}
              >
                <span
                  className="font-bold text-[#111] leading-none transition-all duration-300"
                  style={{ fontSize: isMobile ? "22px" : isActive ? "32px" : "20px" }}
                >
                  {item.num}
                </span>
                <span
                  className="text-[rgba(0,0,0,0.5)] font-medium whitespace-nowrap overflow-hidden transition-all duration-300"
                  style={{
                    fontSize: isMobile ? "13px" : "12px",
                    marginTop: isMobile ? 0 : 4,
                    opacity: isMobile ? 1 : isActive ? 1 : 0.7,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

ChallengeCard.propTypes = {
  className: PropTypes.string,
};

export default ChallengeCard;
