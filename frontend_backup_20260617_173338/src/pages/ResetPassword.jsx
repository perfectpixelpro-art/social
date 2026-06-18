import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { resetPassword } from "../api";

const inputCls =
  "w-full rounded-[12px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3.5 text-[15px] font-[Montserrat] text-[#000] outline-none focus:border-[#013186] transition-colors placeholder-[rgba(0,0,0,0.35)]";
const labelCls = "text-[14px] font-bold text-[#111] mb-2 block";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      setStatus({ loading: false, ok: false, msg: "Password must be at least 8 characters." });
      return;
    }
    if (form.password !== form.confirm) {
      setStatus({ loading: false, ok: false, msg: "Passwords do not match." });
      return;
    }
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const res = await resetPassword(token, form.password);
      setStatus({ loading: false, ok: true, msg: res.message || "Password updated! Redirecting to login…" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Could not reset password." });
    }
  };

  if (!token) {
    return (
      <AuthShell>
        <h1 className="text-[#013186] font-bold m-0" style={{ fontSize: "clamp(26px, 4vw, 38px)" }}>Invalid link</h1>
        <p className="mt-3 mb-8 text-[rgba(0,0,0,0.5)] font-semibold text-[15px]">This password reset link is missing or invalid.</p>
        <Link to="/forgot-password" className="text-[#013186] font-bold no-underline hover:underline">Request a new link</Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
        Set a new password
      </h1>
      <p className="mt-3 mb-8 text-[rgba(0,0,0,0.5)] font-semibold text-[15px]">
        Choose a strong password you haven't used before.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>New password</label>
          <input type="password" required value={form.password} onChange={upd("password")} placeholder="Enter new password" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Confirm password</label>
          <input type="password" required value={form.confirm} onChange={upd("confirm")} placeholder="Re-enter new password" className={inputCls} />
        </div>
        <button type="submit" disabled={status.loading} className="mt-2 h-[52px] rounded-[12px] bg-[#013186] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#012270] transition-colors cursor-pointer disabled:opacity-60">
          {status.loading ? "Updating..." : <>Update password <span>›</span></>}
        </button>
        {status.msg && (
          <p className={`text-[14px] font-semibold text-center m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
        )}
      </form>

      <p className="mt-8 text-center text-[15px] font-semibold text-[rgba(0,0,0,0.55)]">
        <Link to="/login" className="text-[#013186] font-bold no-underline hover:underline">Back to login</Link>
      </p>
    </AuthShell>
  );
}
