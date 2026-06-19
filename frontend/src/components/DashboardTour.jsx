import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { getProfile, markTourSeen } from "../api";

// Each step can target a DOM element (by selector). Steps without a target
// are shown centered (intro / outro).
const STEPS = [
  { title: "Welcome to The Social 99! 👋", body: "Quick 30-second tour of your dashboard. You can skip anytime.", icon: "🎉" },
  { title: "Home", body: "Your starting point — connect accounts, see your deliverables tracker, posts and meetings.", icon: "🏠", target: '[data-tour="nav-home"]' },
  { title: "Scheduling", body: "Compose posts with photos/videos, pick a time, and view your calendar + live analytics.", icon: "📅", target: '[data-tour="nav-calendar"]' },
  { title: "Store", body: "Buy add-ons for your plan — extra graphics, videos or pages — added straight to your account.", icon: "🛒", target: '[data-tour="nav-store"]' },
  { title: "Profile", body: "Update your details, change your photo, and upgrade or manage your subscription here.", icon: "👤", target: '[data-tour="nav-profile"]' },
  { title: "Files", body: "Upload logos, brand guides and assets — drag & drop straight in. Your team can access them instantly.", icon: "📁", target: '[data-tour="nav-files"]' },
  { title: "Chat", body: "Message your account team, share files, and schedule Zoom calls.", icon: "💬", target: '[data-tour="nav-chat"]' },
  { title: "Support", body: "Raise a ticket whenever you need help — track its status until it's resolved.", icon: "🛟", target: '[data-tour="nav-ticket"]' },
  { title: "Help", body: "Browse guides and articles from our team.", icon: "📚", target: '[data-tour="nav-help"]' },
  { title: "Notifications", body: "Everything shows up here — file uploads, chat replies, post approvals and Zoom meetings. 🔔", icon: "🔔", target: '[data-tour="bell"]' },
  { title: "You're all set! 🚀", body: "That's the tour. Let's grow your brand together.", icon: "🎯" },
];

const PAD = 8; // highlight padding around the target

export default function DashboardTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await getProfile();
        if (r.data && r.data.tourSeen === false) setShow(true);
      } catch { /* ignore */ }
    })();
  }, []);

  const s = STEPS[step];

  // Measure the current target so we can spotlight it + place the tooltip.
  const measure = useCallback(() => {
    if (!s?.target) { setRect(null); return; }
    const el = document.querySelector(s.target);
    if (!el) { setRect(null); return; }
    el.scrollIntoView({ block: "nearest" });
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [s]);

  useLayoutEffect(() => {
    if (!show) return;
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [show, measure]);

  const finish = async () => {
    setShow(false);
    try { await markTourSeen(); } catch { /* ignore */ }
  };

  if (!show) return null;
  const last = step === STEPS.length - 1;

  // Tooltip position: to the right of the target (sidebar), else below it.
  let cardStyle;
  if (rect) {
    const CARD_W = 320;
    const vw = window.innerWidth;
    const placeRight = rect.left + rect.width + 16 + CARD_W < vw;
    const top = Math.min(Math.max(rect.top - 10, 16), window.innerHeight - 240);
    cardStyle = placeRight
      ? { top, left: rect.left + rect.width + 16, width: CARD_W }
      : { top: rect.top + rect.height + 12, left: Math.min(rect.left, vw - CARD_W - 16), width: CARD_W };
  }

  return (
    <div className="fixed inset-0 z-[120]">
      {/* dimmed backdrop with a spotlight cut-out around the target */}
      {rect ? (
        <>
          <div
            className="fixed rounded-[12px] transition-all duration-200 pointer-events-none"
            style={{
              top: rect.top - PAD, left: rect.left - PAD,
              width: rect.width + PAD * 2, height: rect.height + PAD * 2,
              boxShadow: "0 0 0 9999px rgba(2, 12, 35, 0.72)",
              border: "3px solid #1463ff",
              outline: "2px solid rgba(255,255,255,0.9)",
            }}
          />
          {/* bright glow + light wash so the highlighted item really pops */}
          <div
            className="fixed rounded-[12px] transition-all duration-200 pointer-events-none animate-pulse"
            style={{
              top: rect.top - PAD, left: rect.left - PAD,
              width: rect.width + PAD * 2, height: rect.height + PAD * 2,
              background: "rgba(255,255,255,0.14)",
              boxShadow: "0 0 0 4px rgba(20,99,255,0.35), 0 0 28px 8px rgba(20,99,255,0.55)",
            }}
          />
        </>
      ) : (
        <div className="fixed inset-0 bg-black/55" />
      )}

      {/* tooltip / card */}
      <div
        className="fixed bg-white rounded-[16px] shadow-[0_24px_70px_rgba(1,49,134,0.35)] p-5"
        style={cardStyle || { top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 380 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-[#9aa3b2]">STEP {step + 1} OF {STEPS.length}</span>
          <button onClick={finish} className="text-[#9aa3b2] hover:text-[#0b1f44] text-[12px] font-semibold cursor-pointer">Skip</button>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-[30px] leading-none">{s.icon}</div>
          <div>
            <h2 className="m-0 text-[17px] font-bold text-[#0b1f44]">{s.title}</h2>
            <p className="m-0 mt-1 text-[13px] text-[#5b6472] leading-relaxed">{s.body}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-4">
          {STEPS.map((_, i) => (
            <span key={i} className="h-[6px] rounded-full transition-all" style={{ width: i === step ? 18 : 6, background: i === step ? "#013186" : "#cfd8e6" }} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 mt-4">
          <button onClick={() => setStep((x) => Math.max(0, x - 1))} disabled={step === 0}
            className="text-[13px] font-bold text-[#5b6472] px-3 py-2 rounded-[10px] hover:bg-[#f5f7fb] cursor-pointer disabled:opacity-0">
            Back
          </button>
          <button onClick={() => (last ? finish() : setStep((x) => x + 1))}
            className="text-[13px] font-bold text-white bg-[#013186] px-5 py-2 rounded-[10px] hover:bg-[#012270] cursor-pointer">
            {last ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
