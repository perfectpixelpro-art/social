import Seo from "../components/Seo";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { findPlan, serviceAddons } from "../data/plans";
import { createCheckoutSession, recordCart } from "../api";

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1463ff" className="shrink-0"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z" /></svg>
);

const Stepper = () => (
  <div className="flex items-center gap-2 text-[13px]">
    {[["1", "Checkout", true], ["2", "Payment", false], ["3", "Confirm", false]].map(([n, label, active], i) => (
      <div key={n} className="flex items-center gap-2">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${active ? "bg-[#1463ff] text-white" : "bg-[#dbe3ef] text-[#7a8499]"}`}>{n}</span>
        <span className={`font-semibold ${active ? "text-[#0b1f44]" : "text-[#7a8499]"}`}>{label}</span>
        {i < 2 && <span className="w-10 mq450:w-5 h-px bg-[#cfd8e6] mx-1" />}
      </div>
    ))}
  </div>
);

const labelCls = "absolute -top-2 left-3 bg-white px-1 text-[11px] font-semibold text-[#7a8499]";
const fieldCls = "w-full rounded-[10px] border border-[#e3e9f5] pl-10 pr-3 py-3 text-[14px] text-[#1a2233] outline-none focus:border-[#013186] transition-colors";

const Field = ({ icon, label, value, onChange, placeholder, type = "text" }) => (
  <div className="relative">
    <span className={labelCls}>{label}</span>
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3b2]">{icon}</span>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={fieldCls} />
  </div>
);

export default function Checkout() {
  const [params] = useSearchParams();
  const [placing, setPlacing] = useState(false);
  const tab = params.get("tab") || "Marketing";
  const plan = findPlan(tab, params.get("plan") || "Growth");
  const BASE = Number(plan.price) || 99;
  const includedFeatures = plan.features.filter(([, on]) => on).map(([label]) => label);

  // Prefill name/email if the user is already logged in
  const loggedUser = (() => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; } })();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const [addons, setAddons] = useState((serviceAddons[tab] || serviceAddons.Marketing).map((a) => ({ ...a, on: false, qty: a.min })));
  const [info, setInfo] = useState({ name: loggedUser.name || "", email: loggedUser.email || "", company: "", website: "" });

  const toggle = (i) => setAddons((a) => a.map((x, idx) => (idx === i ? { ...x, on: !x.on } : x)));
  const setQty = (i, v) => setAddons((a) => a.map((x, idx) => (idx === i ? { ...x, qty: Math.max(x.min, Math.min(x.max, Number(v) || x.min)) } : x)));
  const upd = (k) => (e) => setInfo((f) => ({ ...f, [k]: e.target.value }));

  const addonTotal = addons.reduce((sum, a) => (a.on ? sum + a.price * a.qty : sum), 0);
  const subtotal = BASE + addonTotal;
  const total = subtotal; // tax 0%

  const [error, setError] = useState("");

  const handleProceed = async () => {
    setError("");
    const email = (info.email || "").trim();
    // Guests must provide an email so we can prefill signup after payment.
    if (!isLoggedIn && !email) {
      setError("Please enter your email to continue.");
      return;
    }
    setPlacing(true);
    try {
      // chosen add-ons → [{ key, qty }]
      const chosenAddons = addons.filter((a) => a.on).map((a) => ({ key: a.key, qty: a.qty }));
      // Map the pricing tab → tracker service key so the client's tracker matches their purchase.
      const service = { Marketing: "marketing", Videos: "video", Website: "website" }[tab] || "marketing";
      // Capture the cart so we can email if they abandon checkout (best-effort).
      recordCart({ email, name: info.name, plan: plan.name, service });
      // Logged-in → token attached automatically (success → dashboard).
      // Guest → email used (success → signup with this email prefilled).
      const res = await createCheckoutSession(email, plan.name, chosenAddons, service);
      window.location.href = res.url; // Stripe-hosted secure payment
    } catch (err) {
      setPlacing(false);
      setError(err.message || "Could not start payment. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-[Montserrat] py-10 px-6 mq450:px-4">
      <Seo title="Checkout | The Social 99" description="Complete your The Social 99 plan purchase securely." noindex />
      <div className="max-w-[1080px] mx-auto grid grid-cols-[400px_1fr] mq1125:grid-cols-1 gap-6 items-start">

        {/* ── Order Summary ── */}
        <section className="rounded-[16px] border border-[#eef1f6] p-6 shadow-[0_8px_30px_rgba(1,49,134,0.06)]">
          <h2 className="m-0 text-[22px] font-bold text-[#0b1f44]">Order Summary</h2>

          <div className="flex items-start justify-between mt-5">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-[10px] bg-[#1463ff] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </span>
              <div>
                <p className="m-0 text-[15px] font-bold text-[#0b1f44] flex items-center gap-2">
                  {plan.name} Plan
                  {plan.featured && <span className="text-[10px] font-bold text-[#1463ff] bg-[#eaf1ff] rounded-full px-2 py-0.5">Most Popular</span>}
                </p>
                <p className="m-0 text-[12px] text-[#9aa3b2]">{tab} · Billed Monthly</p>
              </div>
            </div>
            <div className="text-right">
              <p className="m-0 text-[20px] font-bold text-[#0b1f44]">${BASE.toFixed(2)}</p>
              <p className="m-0 text-[12px] text-[#9aa3b2]">/month</p>
            </div>
          </div>

          {/* features 2-col */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-5">
            {includedFeatures.map((f) => (
              <div key={f} className="flex items-center gap-2 text-[12px] text-[#5b6472]"><Check /> {f}</div>
            ))}
          </div>

          <div className="my-5 border-t border-[#eef1f6]" />

          {/* Addons */}
          <h3 className="m-0 text-[14px] font-bold text-[#0b1f44] mb-3">Addons</h3>
          <div className="flex flex-col gap-4">
            {addons.map((a, i) => (
              <div key={a.key} className="flex items-center gap-3">
                <button onClick={() => toggle(i)} className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 cursor-pointer ${a.on ? "bg-[#1463ff] border-[#1463ff]" : "border-[#cfd8e6] bg-white"}`}>
                  {a.on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{a.label}</p>
                  <p className="m-0 text-[11px] text-[#9aa3b2]">{a.hint}</p>
                </div>
                <input
                  type="number" min={a.min} max={a.max} value={a.qty} disabled={!a.on}
                  onChange={(e) => setQty(i, e.target.value)}
                  className="w-[52px] rounded-[8px] border border-[#e3e9f5] px-2 py-1.5 text-[13px] text-center outline-none focus:border-[#013186] disabled:bg-[#f5f7fb] disabled:text-[#9aa3b2]"
                />
                <span className="text-[13px] font-semibold text-[#0b1f44] w-[64px] text-right">${(a.on ? a.price * a.qty : a.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="my-5 border-t border-[#eef1f6]" />

          <div className="flex justify-between text-[14px] mb-2"><span className="text-[#5b6472] font-semibold">Subtotal</span><span className="text-[#0b1f44] font-semibold">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-[14px]"><span className="text-[#9aa3b2] font-semibold">Tax (0%)</span><span className="text-[#9aa3b2] font-semibold">$0.00</span></div>

          <div className="my-4 border-t border-[#eef1f6]" />
          <div className="flex justify-between items-center">
            <span className="text-[18px] font-bold text-[#0b1f44]">Total</span>
            <span className="text-[22px] font-bold text-[#1463ff]">${total.toFixed(2)}</span>
          </div>
        </section>

        {/* ── Payment panel ── */}
        <section className="rounded-[16px] border border-[#eef1f6] overflow-hidden shadow-[0_8px_30px_rgba(1,49,134,0.06)]">
          <div className="bg-[#eaf1ff] px-7 mq450:px-5 py-4"><Stepper /></div>

          <div className="p-7 mq450:p-5">
            <h2 className="m-0 text-[22px] font-bold text-[#0b1f44]">Let's get you started!</h2>
            <p className="m-0 mt-1 mb-6 text-[13px] text-[#7a8499] font-medium">Complete your purchase and start growing your brand.</p>

            <h3 className="m-0 text-[16px] font-bold text-[#0b1f44] mb-4">Information</h3>
            <div className="grid grid-cols-2 mq450:grid-cols-1 gap-4 mb-6">
              <Field label="Full Name" placeholder="John Smith" value={info.name} onChange={upd("name")} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>} />
              <Field label="Email Address" type="email" placeholder="johnsmith@email.com" value={info.email} onChange={upd("email")} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>} />
            </div>

            <h3 className="m-0 text-[16px] font-bold text-[#0b1f44] mb-4">Business information</h3>
            <div className="grid grid-cols-2 mq450:grid-cols-1 gap-4 mb-6">
              <Field label="Company Name" placeholder="Smith & CO." value={info.company} onChange={upd("company")} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></svg>} />
              <Field label="Website" placeholder="www.smithandco.com" value={info.website} onChange={upd("website")} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>} />
            </div>

            {/* Payment — handled securely on Stripe's hosted checkout */}
            <div className="flex items-center gap-2 mb-3">
              <h3 className="m-0 text-[16px] font-bold text-[#0b1f44]">Payment Method</h3>
              <span className="text-[11px] text-[#9aa3b2]">🔒 All payments are secure and encrypted.</span>
            </div>
            <div className="flex items-center gap-3 rounded-[10px] border border-[#1463ff] bg-[#f5f9ff] px-4 py-3 mb-3">
              <span className="w-9 h-9 rounded-[8px] flex items-center justify-center text-white text-[13px] font-bold shrink-0" style={{ background: "#635bff" }}>S</span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[14px] font-bold text-[#0b1f44]">Stripe</p>
                <p className="m-0 text-[11px] text-[#9aa3b2]">You'll enter your card securely on Stripe's checkout page.</p>
              </div>
            </div>
            <p className="m-0 mb-5 text-[11px] text-[#9aa3b2]">🔒 Your card details are entered on Stripe — we never see or store them.</p>

            <button onClick={handleProceed} disabled={placing} className="w-full h-[52px] rounded-[12px] bg-[#1463ff] text-white font-bold text-[16px] hover:bg-[#0d50d8] transition-colors cursor-pointer disabled:opacity-60">
              {placing ? "Redirecting to secure checkout…" : "Proceed to Payment"}
            </button>
            {error && <p className="mt-3 text-[13px] font-semibold text-[#dc2626] text-center m-0">{error}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
