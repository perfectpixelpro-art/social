import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { forgotPassword } from "../api";

const inputCls =
  "w-full rounded-[12px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3.5 text-[15px] font-[Montserrat] text-[#000] outline-none focus:border-[#013186] transition-colors placeholder-[rgba(0,0,0,0.35)]";
const labelCls = "text-[14px] font-bold text-[#111] mb-2 block";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const res = await forgotPassword(email);
      setStatus({ loading: false, ok: true, msg: res.message || "Check your email for a reset link." });
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Something went wrong." });
    }
  };

  return (
    <AuthShell>
      <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
        Forgot password?
      </h1>
      <p className="mt-3 mb-8 text-[rgba(0,0,0,0.5)] font-semibold text-[15px]">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>Email address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
        </div>
        <button type="submit" disabled={status.loading} className="mt-2 h-[52px] rounded-[12px] bg-[#013186] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#012270] transition-colors cursor-pointer disabled:opacity-60">
          {status.loading ? "Sending..." : <>Send reset link <span>›</span></>}
        </button>
        {status.msg && (
          <p className={`text-[14px] font-semibold text-center m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
        )}
      </form>

      <p className="mt-8 text-center text-[15px] font-semibold text-[rgba(0,0,0,0.55)]">
        Remembered it?{" "}
        <Link to="/login" className="text-[#013186] font-bold no-underline hover:underline">Back to login</Link>
      </p>
    </AuthShell>
  );
}
