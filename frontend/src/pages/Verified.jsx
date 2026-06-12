import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Landing page after the email-verification link is clicked.
// → If a purchase is pending, continue to checkout.
// → Otherwise, go to login.
export default function Verified() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ok = params.get("ok");

  useEffect(() => {
    const t = setTimeout(() => {
      if (ok !== "1") {
        navigate("/login?verified=0", { replace: true });
        return;
      }
      let pending = null;
      try { pending = JSON.parse(localStorage.getItem("pendingCheckout")); } catch { /* */ }
      if (pending && pending.plan) {
        navigate(`/checkout?tab=${encodeURIComponent(pending.tab || "Marketing")}&plan=${encodeURIComponent(pending.plan)}`, { replace: true });
      } else {
        navigate("/login?verified=1", { replace: true });
      }
    }, 1400);
    return () => clearTimeout(t);
  }, [ok, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-[Montserrat] bg-[#f7faff]">
      <div className="text-center">
        {ok === "1" ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#e8fbe8] border border-[#b7e8b7] flex items-center justify-center mx-auto mb-5">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1a8f00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h1 className="text-[#013186] font-bold text-[26px] m-0">Email verified!</h1>
            <p className="mt-2 text-[rgba(0,0,0,0.5)] font-semibold">Taking you to the next step…</p>
          </>
        ) : (
          <>
            <h1 className="text-[#c0392b] font-bold text-[26px] m-0">Verification failed</h1>
            <p className="mt-2 text-[rgba(0,0,0,0.5)] font-semibold">This link is invalid or expired. Redirecting…</p>
          </>
        )}
      </div>
    </div>
  );
}
