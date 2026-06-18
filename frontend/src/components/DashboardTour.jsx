import { useState, useEffect } from "react";
import { getProfile, markTourSeen } from "../api";

const STEPS = [
  {
    title: "Welcome to The Social 99! 👋",
    body: "Quick tour of your dashboard — takes 30 seconds. You can skip anytime.",
    icon: "🎉",
  },
  {
    title: "Home",
    body: "Your starting point — connect your social accounts, see your plan's deliverables tracker, upcoming posts, and meetings.",
    icon: "🏠",
  },
  {
    title: "Connect your social media",
    body: "Link Instagram, Facebook, LinkedIn & YouTube so we can publish on your behalf and pull your analytics.",
    icon: "🔗",
  },
  {
    title: "Scheduling",
    body: "Compose posts (caption + photos/videos), pick a time, and view your content calendar and live analytics per platform.",
    icon: "📅",
  },
  {
    title: "Deliverables Tracker",
    body: "See exactly what your plan includes (graphics, videos, changes) and watch progress update as our team completes them.",
    icon: "✅",
  },
  {
    title: "Chat & Support",
    body: "Message your account team in Chat (schedule Zoom calls too), and raise tickets under Support whenever you need help.",
    icon: "💬",
  },
  {
    title: "Help",
    body: "Browse guides and articles from our team. You're all set — let's grow your brand! 🚀",
    icon: "📚",
  },
];

export default function DashboardTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const r = await getProfile();
        if (r.data && r.data.tourSeen === false) setShow(true);
      } catch { /* ignore */ }
    })();
  }, []);

  const finish = async () => {
    setShow(false);
    try { await markTourSeen(); } catch { /* ignore */ }
  };

  if (!show) return null;
  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[18px] w-full max-w-[440px] shadow-[0_24px_70px_rgba(1,49,134,0.3)] overflow-hidden">
        <div className="bg-[#013186] px-6 py-5 flex items-center justify-between">
          <span className="text-[11px] font-bold text-white/70">STEP {step + 1} OF {STEPS.length}</span>
          <button onClick={finish} className="text-white/70 hover:text-white text-[13px] font-semibold cursor-pointer">Skip tour</button>
        </div>

        <div className="p-7 text-center">
          <div className="text-[44px] mb-3">{s.icon}</div>
          <h2 className="m-0 text-[20px] font-bold text-[#0b1f44]">{s.title}</h2>
          <p className="m-0 mt-2 text-[14px] text-[#5b6472] leading-relaxed">{s.body}</p>

          {/* progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {STEPS.map((_, i) => (
              <span key={i} className="h-[7px] rounded-full transition-all" style={{ width: i === step ? 20 : 7, background: i === step ? "#013186" : "#cfd8e6" }} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 pb-6">
          <button onClick={() => setStep((x) => Math.max(0, x - 1))} disabled={step === 0}
            className="text-[14px] font-bold text-[#5b6472] px-4 py-2.5 rounded-[10px] hover:bg-[#f5f7fb] cursor-pointer disabled:opacity-0">
            Back
          </button>
          <button onClick={() => (last ? finish() : setStep((x) => x + 1))}
            className="text-[14px] font-bold text-white bg-[#013186] px-6 py-2.5 rounded-[10px] hover:bg-[#012270] cursor-pointer">
            {last ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
