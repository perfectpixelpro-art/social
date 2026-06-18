import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StickyBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !dismissed) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "90%",
        maxWidth: "660px",
        animation: "slideUp 0.4s ease-out forwards",
      }}
    >
      <div
        className="sticky-banner-inner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "100px",
          padding: "10px 10px 10px 22px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Text */}
        <p
          className="sticky-banner-text"
          style={{ margin: 0, lineHeight: 1.4, whiteSpace: "nowrap" }}
        >
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", fontWeight: 500 }}>
            Consistency is tough. We make it simple.{" "}
          </span>
          <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>
            Starting at $99/month.
          </span>
        </p>

        {/* Right side */}
        <div
          className="sticky-banner-right"
          style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
        >
          {/* Book A Call */}
          <button
            onClick={() => navigate("/book-a-call")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, #013186, #0147c8)",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              padding: "9px 18px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 12px rgba(1,49,134,0.5)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Book A Call
            <span style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
            }}>→</span>
          </button>

          {/* Close */}
          <button
            onClick={() => { setVisible(false); setDismissed(true); }}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @media (max-width: 480px) {
          .sticky-banner-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            border-radius: 24px !important;
            padding: 14px 14px 14px 16px !important;
          }
          .sticky-banner-text {
            white-space: normal !important;
            font-size: 12px !important;
          }
          .sticky-banner-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}