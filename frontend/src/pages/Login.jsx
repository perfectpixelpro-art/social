import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { loginUser, resendVerification, restoreSession } from "../api";

const inputCls =
  "w-full rounded-[12px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3.5 text-[15px] font-[Montserrat] text-[#000] outline-none focus:border-[#013186] transition-colors placeholder-[rgba(0,0,0,0.35)]";
const labelCls = "text-[14px] font-bold text-[#111] mb-2 block";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified"); // "1" success, "0" failed
  const purchased = searchParams.get("purchased"); // "1" after checkout
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const [needsVerify, setNeedsVerify] = useState(false); // show resend button
  const [resend, setResend] = useState({ loading: false, msg: "" });
  const [checkingSession, setCheckingSession] = useState(true);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Auto-login: if this browser still has a valid (≤7-day) session, skip the
  // form and go straight to the dashboard. After 7 days the cookie expires and
  // the user lands on the login form as normal.
  useEffect(() => {
    let alive = true;
    (async () => {
      const user = await restoreSession();
      if (alive && user && (user.role === "client" || !user.role)) navigate("/dashboard", { replace: true });
      else if (alive && user) navigate("/admin", { replace: true }); // staff → team dashboard
      else if (alive) setCheckingSession(false);
    })();
    return () => { alive = false; };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: "" });
    setNeedsVerify(false);
    setResend({ loading: false, msg: "" });
    try {
      const res = await loginUser(form);
      if (res.accessToken) localStorage.setItem("accessToken", res.accessToken);
      if (res.user) localStorage.setItem("user", JSON.stringify(res.user));
      setStatus({ loading: false, ok: true, msg: `Login successful! Welcome back${res.user?.name ? ", " + res.user.name : ""}.` });
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      const msg = err.message || "Login failed.";
      // Backend sends this exact message when the email isn't verified yet
      const unverified = /verify your email/i.test(msg);
      setNeedsVerify(unverified);
      // Staff account tried the client login → send them to the Team login.
      if (/team account/i.test(msg)) {
        setStatus({ loading: false, ok: false, msg: "This is a team account — redirecting you to the Team login…" });
        setTimeout(() => navigate("/admin/login"), 1400);
        return;
      }
      setStatus({ loading: false, ok: false, msg });
    }
  };

  const handleResend = async () => {
    if (!form.email) {
      setResend({ loading: false, msg: "Enter your email above first." });
      return;
    }
    setResend({ loading: true, msg: "" });
    try {
      const res = await resendVerification(form.email);
      setResend({ loading: false, msg: res.message || "Verification email sent." });
    } catch (err) {
      setResend({ loading: false, msg: err.message || "Could not send email." });
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
        Welcome back
      </h1>
      <p className="mt-3 mb-8 text-[rgba(0,0,0,0.5)] font-semibold text-[15px]">
        Sign in to your account to continue.
      </p>

      {purchased === "1" && (
        <div className="mb-6 rounded-[12px] bg-[#e8fbe8] border border-[#b7e8b7] px-4 py-3 text-[14px] font-semibold text-[#1a8f00]">
          🎉 Purchase complete! Log in to access your dashboard.
        </div>
      )}
      {verified === "1" && (
        <div className="mb-6 rounded-[12px] bg-[#e8fbe8] border border-[#b7e8b7] px-4 py-3 text-[14px] font-semibold text-[#1a8f00]">
          ✓ Email verified! You can now sign in.
        </div>
      )}
      {verified === "0" && (
        <div className="mb-6 rounded-[12px] bg-[#fdeaea] border border-[#f3c0c0] px-4 py-3 text-[14px] font-semibold text-[#c0392b]">
          This verification link is invalid or has expired.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>Email address</label>
          <input type="email" required value={form.email} onChange={upd("email")} placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[14px] font-bold text-[#111]">Password</label>
            <Link to="/forgot-password" className="text-[13px] font-semibold text-[#013186] no-underline hover:underline">Forgot password?</Link>
          </div>
          <input type="password" required value={form.password} onChange={upd("password")} placeholder="Enter your password" className={inputCls} />
        </div>

        <button type="submit" disabled={status.loading} className="mt-2 h-[52px] rounded-[12px] bg-[#013186] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#012270] transition-colors cursor-pointer disabled:opacity-60">
          {status.loading ? "Signing in..." : <>Continue <span>›</span></>}
        </button>

        {status.msg && (
          <p className={`text-[14px] font-semibold text-center m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
        )}

        {needsVerify && (
          <div className="rounded-[12px] bg-[#fff8e6] border border-[#f3e0a0] px-4 py-3 text-center">
            <p className="text-[13px] font-semibold text-[#8a6d1a] m-0 mb-2">Didn't get the email?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resend.loading}
              className="text-[14px] font-bold text-[#013186] underline cursor-pointer bg-transparent border-none disabled:opacity-60"
            >
              {resend.loading ? "Sending..." : "Resend verification email"}
            </button>
            {resend.msg && <p className="text-[13px] font-semibold text-[#1a8f00] m-0 mt-2">{resend.msg}</p>}
          </div>
        )}
      </form>

      <p className="mt-8 text-center text-[15px] font-semibold text-[rgba(0,0,0,0.55)]">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#013186] font-bold no-underline hover:underline">Sign up</Link>
      </p>
      <p className="mt-6 text-center">
        <Link to="/" className="text-[rgba(0,0,0,0.45)] text-[14px] font-semibold no-underline hover:underline">← Return home</Link>
      </p>
    </AuthShell>
  );
}
