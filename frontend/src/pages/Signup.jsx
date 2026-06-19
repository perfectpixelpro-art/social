import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { signupUser, restoreSession } from "../api";

const inputCls =
  "w-full rounded-[12px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3.5 text-[15px] font-[Montserrat] text-[#000] outline-none focus:border-[#013186] transition-colors placeholder-[rgba(0,0,0,0.35)]";
const labelCls = "text-[14px] font-bold text-[#111] mb-2 block";

export default function Signup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const paid = params.get("paid") === "1"; // came back from a successful payment
  const trial = params.get("trial") === "1"; // free-trial signup
  const prefillEmail = params.get("email") || "";

  const [form, setForm] = useState({ name: "", email: prefillEmail, mobile: "", password: "", agree: false });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const [checkingSession, setCheckingSession] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: k === "agree" ? e.target.checked : e.target.value }));

  // Already logged in (≤7-day session)? Skip signup and go to the dashboard.
  // Don't auto-redirect a "paid" return — that user must still create their account.
  useEffect(() => {
    if (paid) { setCheckingSession(false); return; }
    let alive = true;
    (async () => {
      const user = await restoreSession();
      if (alive && user) navigate("/dashboard", { replace: true });
      else if (alive) setCheckingSession(false);
    })();
    return () => { alive = false; };
  }, [navigate, paid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) return;
    setAlreadyExists(false);
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const res = await signupUser({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        trial,
        paid, // only true when returning from a completed checkout (?paid=1)
      });
      // Paid users are auto-verified → straight to login. Others verify by email.
      if (res.verified) {
        setStatus({ loading: false, ok: true, msg: "Account created! Redirecting you to log in…" });
        setTimeout(() => navigate("/login?purchased=1"), 1500);
        return;
      }
      setStatus({ loading: false, ok: true, msg: "Account created! Please check your email to verify your account." });
      setForm({ name: "", email: "", mobile: "", password: "", agree: false });
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      const msg = err.message || "Could not create account.";
      setAlreadyExists(/already exists/i.test(msg));
      setStatus({ loading: false, ok: false, msg });
    }
  };

  if (checkingSession) {
    return (
      <AuthShell>
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 rounded-full border-4 border-[#dbe9ff] border-t-[#013186] animate-spin" />
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
        {trial ? "Start your free trial" : "Create your account"}
      </h1>
      {trial && (
        <p className="mt-2 mb-0 text-[14px] font-bold text-[#16a34a] bg-[#e8f8ee] inline-block rounded-full px-3 py-1">
          Free trial · 4 graphics · 4 videos · 1 change
        </p>
      )}
      <p className="mt-3 mb-6 text-[rgba(0,0,0,0.5)] font-semibold text-[15px]">
        Join 1450+ businesses growing with The Social 99.
      </p>

      {paid && (
        <div className="mb-6 rounded-[12px] bg-[#e8fbe8] border border-[#b7e8b7] px-4 py-3 text-[14px] font-semibold text-[#1a8f00]">
          🎉 Payment successful! Create your account to access your dashboard.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>Your name</label>
          <input type="text" required value={form.name} onChange={upd("name")} placeholder="Jim Smith" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Your email</label>
          <input type="email" required value={form.email} onChange={upd("email")} readOnly={paid} placeholder="you@example.com" className={`${inputCls} ${paid ? "bg-[#eef1f6] text-[#5b6472]" : ""}`} />
          {paid && <p className="mt-1 text-[12px] text-[#9aa3b2]">Use the same email you paid with.</p>}
        </div>
        <div>
          <label className={labelCls}>Mobile number</label>
          <input type="tel" required value={form.mobile} onChange={upd("mobile")} placeholder="+1 555 123 4567" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Choose a password</label>
          <input type="password" required value={form.password} onChange={upd("password")} placeholder="Secure password..." className={inputCls} />
        </div>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input type="checkbox" checked={form.agree} onChange={upd("agree")} className="mt-1 w-[18px] h-[18px] accent-[#013186] cursor-pointer" />
          <span className="text-[14px] font-semibold text-[rgba(0,0,0,0.6)]">
            I agree to the <Link to="/privacy" className="text-[#013186] font-bold no-underline hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#013186] font-bold no-underline hover:underline">Privacy Policy</Link>
          </span>
        </label>

        <button type="submit" disabled={!form.agree || status.loading} className="mt-2 h-[52px] rounded-[12px] bg-[#013186] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#012270] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {status.loading ? "Creating account..." : <>Create account <span>›</span></>}
        </button>

        {status.msg && !alreadyExists && (
          <p className={`text-[14px] font-semibold text-center m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
        )}

        {alreadyExists && (
          <div className="rounded-[12px] bg-[#fff8e6] border border-[#f3e0a0] px-4 py-3 text-center">
            <p className="text-[14px] font-semibold text-[#8a6d1a] m-0 mb-2">
              An account with this email already exists.
            </p>
            <Link
              to={`/login`}
              className="inline-block text-[14px] font-bold text-white bg-[#013186] hover:bg-[#012270] transition-colors rounded-[10px] px-5 py-2.5 no-underline"
            >
              Go to login →
            </Link>
          </div>
        )}
      </form>

      <p className="mt-8 text-center text-[15px] font-semibold text-[rgba(0,0,0,0.55)]">
        Already have an account?{" "}
        <Link to="/login" className="text-[#013186] font-bold no-underline hover:underline">Sign in</Link>
      </p>
      <p className="mt-6 text-center">
        <Link to="/" className="text-[rgba(0,0,0,0.45)] text-[14px] font-semibold no-underline hover:underline">← Return home</Link>
      </p>
    </AuthShell>
  );
}
