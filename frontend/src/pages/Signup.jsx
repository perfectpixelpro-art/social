import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { signupUser } from "../api";

const inputCls =
  "w-full rounded-[12px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3.5 text-[15px] font-[Montserrat] text-[#000] outline-none focus:border-[#013186] transition-colors placeholder-[rgba(0,0,0,0.35)]";
const labelCls = "text-[14px] font-bold text-[#111] mb-2 block";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "", agree: false });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: k === "agree" ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) return;
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      await signupUser({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });
      setStatus({ loading: false, ok: true, msg: "Registration successful! Redirecting to login..." });
      setForm({ name: "", email: "", mobile: "", password: "", agree: false });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Could not create account." });
    }
  };

  return (
    <AuthShell>
      <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
        Create your account
      </h1>
      <p className="mt-3 mb-8 text-[rgba(0,0,0,0.5)] font-semibold text-[15px]">
        Join 1450+ businesses growing with The Social 99.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>Your name</label>
          <input type="text" required value={form.name} onChange={upd("name")} placeholder="Jim Smith" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Your email</label>
          <input type="email" required value={form.email} onChange={upd("email")} placeholder="you@example.com" className={inputCls} />
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

        {status.msg && (
          <p className={`text-[14px] font-semibold text-center m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
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
