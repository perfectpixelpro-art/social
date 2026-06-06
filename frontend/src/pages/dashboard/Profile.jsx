import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const labelCls = "text-[13px] font-bold text-[#0b1f44] mb-2 block";
const inputCls =
  "w-full rounded-[10px] bg-white border border-[#e3e9f5] px-4 py-3 text-[14px] text-[#1a2233] outline-none focus:border-[#013186] transition-colors placeholder-[#9aa3b2]";

const CardIcon = ({ d }) => (
  <span className="w-9 h-9 rounded-[10px] bg-[#eaf1ff] text-[#013186] flex items-center justify-center shrink-0">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  </span>
);

export default function Profile() {
  const { user, initials } = useOutletContext();
  const [form, setForm] = useState({
    fullName: user.name || "",
    email: user.email || "",
    phone: user.mobile || "",
    company: "",
    website: "",
  });
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>My Profile</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Your professional identity inside the Black In HR ecosystem.</p>

      <div className="grid grid-cols-2 mq1125:grid-cols-1 gap-6">

        {/* ── Profile information ── */}
        <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
          <div className="flex items-center gap-3 mb-6">
            <CardIcon d={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>} />
            <div>
              <h2 className="m-0 text-[16px] font-bold text-[#0b1f44]">Profile information</h2>
              <p className="m-0 text-[12px] text-[#9aa3b2]">Update your personal and business deals.</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="w-[72px] h-[72px] rounded-full bg-[#013186] text-white flex items-center justify-center text-[26px] font-bold">{initials}</span>
            <button className="text-[13px] font-bold text-[#0b1f44] border border-[#e3e9f5] rounded-[10px] px-4 py-2.5 hover:bg-[#f5f7fb] transition-colors cursor-pointer">Change Photo</button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelCls}>Full Name</label>
              <input value={form.fullName} onChange={upd("fullName")} className={inputCls} placeholder="Your name" />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input value={form.email} onChange={upd("email")} className={inputCls} placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-2 mq450:grid-cols-1 gap-4">
              <div>
                <label className={labelCls}>Phone Number</label>
                <input value={form.phone} onChange={upd("phone")} className={inputCls} placeholder="+1 555 123 4567" />
              </div>
              <div>
                <label className={labelCls}>Company Name</label>
                <input value={form.company} onChange={upd("company")} className={inputCls} placeholder="Your company" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Business Website</label>
              <input value={form.website} onChange={upd("website")} className={inputCls} placeholder="https://..." />
            </div>
            <button className="mt-2 h-[48px] rounded-[10px] bg-[#1463ff] text-white font-bold text-[15px] hover:bg-[#0d50d8] transition-colors cursor-pointer">
              Save Changes
            </button>
          </div>
        </section>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-6">

          {/* Subscription Plan */}
          <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
            <div className="flex items-center gap-3 mb-5">
              <CardIcon d={<><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" /><path d="M4 6v12a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></>} />
              <h2 className="m-0 text-[16px] font-bold text-[#0b1f44]">Subscription Plan</h2>
            </div>

            <p className="m-0 text-[12px] text-[#9aa3b2]">Current Plan</p>
            <div className="flex items-center gap-3 mt-1">
              <h3 className="m-0 text-[20px] font-bold text-[#0b1f44]">The Social 99 - Monthly Plan</h3>
              <span className="text-[12px] font-semibold text-[#15803d] bg-[#dcfce7] rounded-full px-2.5 py-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" /> Active
              </span>
            </div>
            <p className="m-0 mt-1 text-[13px] text-[#7a8499]">Full social media management, content creation, strategy, and ongoing support.</p>

            <div className="my-5 border-t border-[#eef1f6]" />

            <div className="grid grid-cols-3 mq450:grid-cols-1 gap-4">
              {[
                { d: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>, label: "Billing Cycle", val: "Monthly" },
                { d: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>, label: "Next Billing Date", val: "June 25, 2026" },
                { d: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>, label: "Amount", val: "$199.00 / month" },
              ].map((it) => (
                <div key={it.label} className="flex items-start gap-2">
                  <CardIcon d={it.d} />
                  <div className="leading-tight">
                    <p className="m-0 text-[12px] text-[#9aa3b2]">{it.label}</p>
                    <p className="m-0 text-[14px] font-bold text-[#0b1f44]">{it.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-5 border-t border-[#eef1f6]" />

            <div className="flex gap-3 flex-wrap">
              <button className="text-[13px] font-bold text-[#0b1f44] border border-[#e3e9f5] rounded-[10px] px-4 py-2.5 hover:bg-[#f5f7fb] transition-colors cursor-pointer flex items-center gap-2">
                ↻ Change Plan
              </button>
              <button className="text-[13px] font-bold text-[#1463ff] border border-[#cfe0ff] rounded-[10px] px-4 py-2.5 hover:bg-[#f0f6ff] transition-colors cursor-pointer flex items-center gap-2">
                ✦ Upgrade Plan
              </button>
            </div>
          </section>

          {/* Billing Information */}
          <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
            <div className="flex items-center gap-3 mb-4">
              <CardIcon d={<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>} />
              <div>
                <h2 className="m-0 text-[16px] font-bold text-[#0b1f44]">Billing Information</h2>
                <p className="m-0 text-[12px] text-[#9aa3b2] underline">Manage your payment method and billing details.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[12px] border border-[#eef1f6] bg-[#fbfcfe] px-4 py-3">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-[#eb001b]" />
                <span className="w-7 h-7 rounded-full bg-[#f79e1b] opacity-90" />
              </div>
              <div className="leading-tight">
                <p className="m-0 text-[14px] font-bold text-[#0b1f44] flex items-center gap-2">
                  Mastercard ending in 4242
                  <span className="text-[11px] font-semibold text-[#5b6472] bg-[#eef1f6] rounded-full px-2 py-0.5">Default</span>
                </p>
                <p className="m-0 text-[12px] text-[#9aa3b2]">Expires 08/28</p>
              </div>
              <button className="ml-auto text-[13px] font-bold text-[#1463ff] cursor-pointer flex items-center gap-1">Edit ✎</button>
            </div>

            <button className="mt-4 text-[14px] font-bold text-[#1463ff] cursor-pointer flex items-center gap-2">+ Add New Payment Method</button>
          </section>
        </div>
      </div>

      {/* ── Account Setting ── */}
      <section className="mt-6 rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
        <div className="flex items-center gap-3 mb-5">
          <CardIcon d={<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>} />
          <div>
            <h2 className="m-0 text-[16px] font-bold text-[#0b1f44]">Account Setting</h2>
            <p className="m-0 text-[12px] text-[#9aa3b2]">Update your personal and business deals.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 mq800:grid-cols-1 gap-4">
          {[
            { label: "Change Password", d: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> },
            { label: "Notification Preferences", d: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></> },
            { label: "Download Invoice", d: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></> },
          ].map((b) => (
            <button key={b.label} className="flex items-center gap-3 rounded-[12px] border border-[#eef1f6] px-4 py-3.5 hover:bg-[#f5f7fb] transition-colors cursor-pointer text-left">
              <span className="text-[#5b6472]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{b.d}</svg>
              </span>
              <span className="text-[14px] font-semibold text-[#0b1f44]">{b.label}</span>
              <span className="ml-auto text-[#9aa3b2]">›</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
