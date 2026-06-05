import { useState } from "react";
import PropTypes from "prop-types";
import sm1 from "../assets/sm1.png";
import sm2 from "../assets/sm2.png";
import sm3 from "../assets/sm3.png";
import sm4 from "../assets/sm4.png";
import sm5 from "../assets/sm5.png";
import sm6 from "../assets/sm6.png";
import sm7 from "../assets/sm7.png";
import sm8 from "../assets/sm8.png";

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

const PostCard = ({ src, alt, showLeftArrow, showRightArrow, onPrev, onNext, opacity = 1, scale = 1, origin = "center" }) => (
  <div style={{ position: "relative", flex: 1, minWidth: 0, maxWidth: 300, transform: `scale(${scale})`, transformOrigin: origin, opacity, transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
    {showLeftArrow && (
      <button onClick={onPrev} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", zIndex: 30, width: 34, height: 34, borderRadius: "50%", background: "#fff", border: "1px solid rgba(1,49,134,0.15)", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    )}
    {showRightArrow && (
      <button onClick={onNext} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", zIndex: 30, width: 34, height: 34, borderRadius: "50%", background: "#fff", border: "1px solid rgba(1,49,134,0.15)", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    )}
    <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 8px 40px rgba(1,49,134,0.10)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#013186", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>S</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#222" }}>thesocial99</span>
        </div>
        <span style={{ color: "#888", fontSize: 16, letterSpacing: 2 }}>···</span>
      </div>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", background: "#eef4ff", overflow: "hidden" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(1,49,134,0.85)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999 }}>{alt}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <svg width="18" height="16" viewBox="0 0 24 22" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e0e0e0"/></svg>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, paddingBottom: 8 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ borderRadius: "50%", width: i===1?8:6, height: i===1?8:6, background: i===1?"#013186":"#ccc" }} />)}
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

  // iPhone content
  const iPhone = (
    <div className="w-[300px] mq450:w-[240px]" style={{ flexShrink: 0, background: "#fff", borderRadius: 44, overflow: "hidden", border: "8px solid #1a1a1a", boxShadow: "0 32px 80px rgba(1,49,134,0.22)", zIndex: 10, position: "relative" }}>
      {/* Status bar */}
      <div style={{ background: "#1a1a1a", height: 34, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", position: "relative" }}>
        <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>11:23</span>
        <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 60, height: 16, background: "#1a1a1a", borderRadius: "0 0 10px 10px" }} />
        <div style={{ display: "flex", gap: 4 }}>
          <svg width="13" height="10" viewBox="0 0 24 16" fill="white"><rect x="0" y="5" width="4" height="11" rx="1"/><rect x="6" y="3" width="4" height="13" rx="1"/><rect x="12" y="1" width="4" height="15" rx="1"/><rect x="18" y="0" width="4" height="16" rx="1"/></svg>
          <svg width="20" height="10" viewBox="0 0 38 16" fill="white"><rect x="0" y="2" width="32" height="12" rx="3.5" stroke="white" strokeWidth="1.5" fill="none"/><rect x="2" y="4" width="24" height="8" rx="2" fill="white"/><path d="M34 6v4a2 2 0 000-4z"/></svg>
        </div>
      </div>
      {/* IG nav */}
      <div style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", borderBottom: "1px solid #f0f0f0" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>Post</span>
        <div />
      </div>
      {/* Post header */}
      <div style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#013186", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>S</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#222" }}>thesocial99</span>
        </div>
        <span style={{ color: "#888", fontSize: 16, letterSpacing: 2 }}>···</span>
      </div>
      {/* Post image */}
      <div style={{ width: "100%", aspectRatio: "1/1", background: "#eef4ff", overflow: "hidden" }}>
        <img src={POST_SLIDES[centerIdx].src} alt={POST_SLIDES[centerIdx].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#fff" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <svg width="18" height="16" viewBox="0 0 24 22" fill="#e33"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </div>
      <div style={{ padding: "0 12px 4px", fontSize: 10, fontWeight: 700, color: "#222" }}>thesocial99_ <span style={{ fontWeight: 400, color: "#555" }}>People trust what they see often.... <span style={{ color: "#013186" }}>more</span></span></div>
      <div style={{ padding: "0 12px 8px", fontSize: 10, color: "#999" }}>19 hours ago</div>
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 12 }}>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#e5eefd", border: "1px solid rgba(1,49,134,0.12)", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#013186" }}>Explore More</span>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(158,202,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/image-1@2x.png" alt="" style={{ width: 10, objectFit: "contain" }} onError={(e)=>{e.target.style.display='none'}} />
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <main className={`font-[Montserrat] ${className}`} style={{ width: "100%", overflow: "hidden" }}>

      {/* Heading */}
      <h2 className="text-center text-[#013186] font-extrabold m-0 px-5 pt-16 pb-8" style={{ fontSize: "clamp(28px, 5vw, 63px)", fontFamily: "Montserrat, sans-serif" }}>
        Social Media Post Examples
      </h2>

      {/* Carousel — full-width edge to edge, 2 cards + iPhone + 2 cards */}
      <div className="flex items-center justify-center gap-5 w-full px-10 mq800:px-4 mq450:gap-2 mq450:px-2 box-border" style={{ overflow: "visible" }}>
        {/* FAR LEFT — left arrow (hidden on tablet) */}
        <div className="flex-1 mq1125:hidden">
          <PostCard {...POST_SLIDES[gi(-2)]} showLeftArrow onPrev={prev} />
        </div>

        {/* LEFT (hidden on mobile) */}
        <div className="flex-1 mq450:hidden">
          <PostCard {...POST_SLIDES[gi(-1)]} showLeftArrow onPrev={prev} />
        </div>

        {/* MOBILE-ONLY left arrow */}
        <button
          onClick={prev}
          className="hidden mq450:flex flex-shrink-0 w-[38px] h-[38px] rounded-full bg-white border border-[rgba(1,49,134,0.15)] shadow-md items-center justify-center cursor-pointer"
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* CENTER iPhone */}
        <div style={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
          {iPhone}
        </div>

        {/* MOBILE-ONLY right arrow */}
        <button
          onClick={next}
          className="hidden mq450:flex flex-shrink-0 w-[38px] h-[38px] rounded-full bg-white border border-[rgba(1,49,134,0.15)] shadow-md items-center justify-center cursor-pointer"
          aria-label="Next"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        {/* RIGHT (hidden on mobile) */}
        <div className="flex-1 mq450:hidden">
          <PostCard {...POST_SLIDES[gi(1)]} showRightArrow onNext={next} />
        </div>

        {/* FAR RIGHT — right arrow (hidden on tablet) */}
        <div className="flex-1 mq1125:hidden">
          <PostCard {...POST_SLIDES[gi(2)]} showRightArrow onNext={next} />
        </div>
      </div>

      {/* Explore More */}
      <div style={{ display: "flex", justifyContent: "center", padding: "36px 0 64px" }}>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#e5eefd", border: "1px solid rgba(1,49,134,0.07)", borderRadius: 999, paddingLeft: 12, paddingRight: 4, height: 36, cursor: "pointer" }}>
          <b style={{ fontSize: 12, fontFamily: "Montserrat, sans-serif", color: "#000" }}>Explore More</b>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(158,202,255,0.39)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/image-1@2x.png" alt="" style={{ width: 14, objectFit: "contain" }} onError={(e)=>{e.target.style.display='none'}} />
          </div>
        </button>
      </div>

    </main>
  );
};

FrameComponent111.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent111;