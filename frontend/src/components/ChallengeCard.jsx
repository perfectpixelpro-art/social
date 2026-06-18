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
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 450px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setActive(null);
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

      {/* Bottom row: Try Now + tabs */}
      <div className="flex items-end gap-3 mq450:flex-col mq450:items-stretch">

        {/* Try Now button */}
        <div className="flex-shrink-0 pb-4 mq450:pb-0 mq450:mb-3">
          <button className="flex items-center gap-2 bg-white border border-[rgba(1,49,134,0.15)] rounded-full px-5 py-3 cursor-pointer hover:shadow-md transition-all whitespace-nowrap">
            <span className="text-[14px] font-bold text-[#000]"><a href="book-a-call">Try Now</a></span>
            <span className="w-[26px] h-[26px] rounded-full bg-[#f0f4ff] border border-[rgba(1,49,134,0.1)] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Tabs — fixed height, no layout shift on hover */}
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
                  /* Fixed height — never changes, no layout shift */
                  height: isMobile ? "auto" : "90px",
                  background: isActive
                    ? "rgba(1, 49, 134, 0.12)"
                    : "rgba(1, 49, 134, 0.04)",
                  borderRadius: isMobile ? "12px" : "14px 14px 0 0",
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  alignItems: isMobile ? "center" : "flex-start",
                  justifyContent: isMobile ? "flex-start" : "flex-end",
                  gap: isMobile ? 12 : 0,
                  padding: isMobile ? "12px 16px" : "0 16px 14px 16px",
                  /* Only scale the tab up slightly — no height change */
                  transform: isActive && !isMobile ? "scaleY(1.08)" : "scaleY(1)",
                  transformOrigin: "bottom",
                  transition: "background 0.2s ease, transform 0.2s ease",
                  boxShadow: isActive ? "0 -4px 12px rgba(1,49,134,0.10)" : "none",
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(i)}
              >
                <span
                  style={{
                    fontSize: isMobile ? "22px" : "20px",
                    fontWeight: 700,
                    color: isActive ? "#013186" : "#111",
                    lineHeight: 1,
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.num}
                </span>
                <span
                  style={{
                    fontSize: isMobile ? "13px" : "12px",
                    marginTop: isMobile ? 0 : 4,
                    fontWeight: 500,
                    color: isActive ? "#013186" : "rgba(0,0,0,0.5)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    transition: "color 0.2s ease",
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