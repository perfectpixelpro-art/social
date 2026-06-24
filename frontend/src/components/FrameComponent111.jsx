import { useState } from "react";
import PropTypes from "prop-types";
import sm1 from "../assets/sm1.webp";
import sm2 from "../assets/sm2.webp";
import sm3 from "../assets/sm3.webp";
import sm4 from "../assets/sm4.png";
import sm5 from "../assets/sm5.webp";
import sm6 from "../assets/sm6.webp";
import sm7 from "../assets/sm7.webp";
import sm8 from "../assets/sm8.webp";
import iphone from "../assets/iphone23.svg";
import Logo2 from "../assets/Logo2.png";

const POST_SLIDES = [
  { id: 1, src: sm1, alt: "Post 1" },
  { id: 2, src: sm2, alt: "Post 2" },
  { id: 3, src: sm3, alt: "Post 3" },
  { id: 4, src: sm4, alt: "Post 4" },
  { id: 5, src: sm5, alt: "Post 5" },
  { id: 6, src: sm6, alt: "Post 6" },
  { id: 7, src: sm7, alt: "Post 7" },
  { id: 8, src: sm8, alt: "Post 8" },
];

const carouselStyles = `
  @media (max-width: 1440px) {
    .far-card {
      display: none !important;
    }
  }
`;

const PostCard = ({ src, alt, showLeftArrow, showRightArrow, onPrev, onNext }) => (
  <div style={{ position: "relative", width: "300px", flexShrink: 0 }}>
    {showLeftArrow && (
      <button
        onClick={onPrev}
        aria-label="Previous"
        style={{
          position: "absolute",
          left: "-18px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 200,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid rgba(1,49,134,0.15)",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    )}
    {showRightArrow && (
      <button
        onClick={onNext}
        aria-label="Next"
        style={{
          position: "absolute",
          right: "-18px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 200,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid rgba(1,49,134,0.15)",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    )}
    <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 4px 24px rgba(1,49,134,0.10)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 ,  padding: "10px 0 10px 12px"}}>
  {/* Story-style ring around logo */}
  <div style={{
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    padding: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <div style={{
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "2px solid white",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
    }}>
      <img
        src={Logo2}
        alt="thesocial99"
        style={{ width: "70%", height: "70%", objectFit: "cover", borderRadius: "50%" }}
      />
    </div>
  </div>
  <span style={{ fontSize: 11, fontWeight: 600, color: "#222" }}>thesocial99</span>
</div>
      <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px" }}>
        <div style={{ display: "flex", gap: 9 }}>
          <svg width="17" height="15" viewBox="0 0 24 22" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ccc"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, paddingBottom: 8 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ borderRadius: "50%", width: i===0?7:5, height: i===0?7:5, background: i===0?"#013186":"#ccc" }} />)}
      </div>
    </div>
  </div>
);

const FrameComponent111 = ({ className = "" }) => {
  const [centerIdx, setCenterIdx] = useState(0);
  const total = POST_SLIDES.length;
  const prev = () => setCenterIdx((i) => (i - 1 + total) % total);
  const next = () => setCenterIdx((i) => (i + 1) % total);
  const gi = (offset) => (centerIdx + offset + total) % total;

  return (
    <main className={`font-[Montserrat] ${className}`} style={{ width: "100%", overflow: "hidden" }}>
      <style>{carouselStyles}</style>

      {/* Heading */}
      <h2
        className="text-center text-[#013186] font-extrabold m-0 px-5 pt-14 pb-10"
        style={{ fontSize: "clamp(28px, 5vw, 63px)", fontFamily: "Montserrat, sans-serif" }}
      >
        Social Media Post Examples
      </h2>

      {/* Carousel */}
      <div
        className="flex items-start justify-center mq450:gap-2 mq450:px-2"
        style={{ gap: "48px", padding: "0 20px", overflow: "visible" }}
      >
        {/* FAR LEFT — only on screens wider than 1440px */}
        <div className="far-card flex-shrink-0" style={{ marginTop: "5%" }}>
          <PostCard {...POST_SLIDES[gi(2)]} showLeftArrow onPrev={prev} />
        </div>

        {/* LEFT — hidden on mobile */}
        <div className="mq450:hidden flex-shrink-0 relative" style={{ marginTop: "5%" }}>
          <button
            onClick={prev}
            aria-label="Previous"
            className="mq1125:hidden flex"
            style={{
              position: "absolute",
              left: -18,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 30,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(1,49,134,0.15)",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <PostCard {...POST_SLIDES[gi(1)]} />
        </div>

        {/* CENTER iPhone */}
        <div
          style={{
            flexShrink: 0,
            position: "relative",
            width: "320px",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* MOBILE LEFT ARROW */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="hidden mq450:flex"
            style={{
              position: "absolute",
              left: "-34px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 50,
              width: "34px",
              height: "34px",
              borderRadius: "999px",
              background: "#fff",
              border: "1px solid rgba(1,49,134,0.15)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image inside screen */}
          <div
            style={{
              position: "absolute",
              top: "14%",
              left: "5.5%",
              width: "90%",
              height: "58%",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <img
              key={centerIdx}
              src={POST_SLIDES[centerIdx].src}
              alt={POST_SLIDES[centerIdx].alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* iPhone SVG */}
          <img
            src={iphone}
            alt="iPhone frame"
            style={{ width: "100%", height: "auto", objectFit: "contain", position: "relative", zIndex: 2 }}
          />

          {/* MOBILE RIGHT ARROW */}
          <button
            onClick={next}
            aria-label="Next"
            className="hidden mq450:flex"
            style={{
              position: "absolute",
              right: "-34px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 50,
              width: "34px",
              height: "34px",
              borderRadius: "999px",
              background: "#fff",
              border: "1px solid rgba(1,49,134,0.15)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* RIGHT — hidden on mobile */}
        <div className="mq450:hidden flex-shrink-0 relative" style={{ marginTop: "5%" }}>
          <PostCard {...POST_SLIDES[gi(-1)]} />
          <button
            onClick={next}
            aria-label="Next"
            className="mq1125:hidden flex"
            style={{
              position: "absolute",
              right: -18,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 30,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(1,49,134,0.15)",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* FAR RIGHT — only on screens wider than 1440px */}
        <div className="far-card flex-shrink-0" style={{ marginTop: "5%" }}>
          <PostCard {...POST_SLIDES[gi(-2)]} showRightArrow onNext={next} />
        </div>
      </div>

      {/* Explore More */}
      <div className="flex justify-center py-12">
        <button
          className="
            inline-flex items-center gap-3
            rounded-full border border-[rgba(1,49,134,0.12)]
            bg-[rgba(188,214,255,0.35)] px-3 py-2
            transition-all duration-300
            hover:bg-[rgba(188,214,255,0.55)]
          "
        >
          <span className="text-[20px] mq450:text-[10px] font-bold text-black whitespace-nowrap">
            <a href="book-a-call">Explore now $99</a>
          </span>
          <span className="w-8 h-8 mq450:w-6 mq450:h-6 rounded-full bg-[rgba(158,202,255,0.6)] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </button>
      </div>

    </main>
  );
};

FrameComponent111.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent111;