import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../../components/AuthShell";
import { adminLogin } from "../../api";

const inputCls =
  "w-full rounded-[12px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3.5 text-[15px] font-[Montserrat] text-[#000] outline-none focus:border-[#013186] transition-colors placeholder-[rgba(0,0,0,0.35)]";
const labelCls = "text-[14px] font-bold text-[#111] mb-2 block";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const res = await adminLogin(form);
      if (res.accessToken) localStorage.setItem("adminAccessToken", res.accessToken);
      if (res.user) localStorage.setItem("adminUser", JSON.stringify(res.user));
      setStatus({ loading: false, ok: true, msg: "Login successful! Redirecting…" });
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Login failed." });
    }
  };

  return (
    <AuthShell>
      <span className="inline-block mb-3 text-[11px] font-bold tracking-[0.15em] text-[#013186] bg-[#eaf1ff] px-3 py-1 rounded-full">
        ADMIN PORTAL
      </span>
      <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
        Admin Sign in
      </h1>
      <p className="mt-3 mb-8 text-[rgba(0,0,0,0.5)] font-semibold text-[15px]">
        Restricted access. Authorised administrators only.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>Email address</label>
          <input type="email" required value={form.email} onChange={upd("email")} placeholder="admin@thesocial99.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Password</label>
          <input type="password" required value={form.password} onChange={upd("password")} placeholder="Enter your password" className={inputCls} />
        </div>

        <button type="submit" disabled={status.loading} className="mt-2 h-[52px] rounded-[12px] bg-[#013186] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#012270] transition-colors cursor-pointer disabled:opacity-60">
          {status.loading ? "Signing in..." : <>Sign in <span>›</span></>}
        </button>

        {status.msg && (
          <p className={`text-[14px] font-semibold text-center m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
        )}
      </form>

      <p className="mt-8 text-center">
        <a href="/login" className="text-[rgba(0,0,0,0.45)] text-[14px] font-semibold no-underline hover:underline">← Client login</a>
      </p>
    </AuthShell>
  );
}
