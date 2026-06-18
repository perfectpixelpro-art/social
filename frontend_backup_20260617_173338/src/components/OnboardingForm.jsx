import { useState, useEffect } from "react";
import { getProfile, saveOnboarding } from "../api";

// Shown after login/signup until the client completes (saves) it.
export default function OnboardingForm({ user }) {
  const [show, setShow] = useState(false);
  const [me, setMe] = useState(user || {});
  const [form, setForm] = useState({ mobile: "", website: "", logoUrl: "", driveLink: "", instagram: "", facebook: "", linkedin: "", youtube: "" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await getProfile();
        const u = r.data || {};
        setMe(u);
        if (u.onboarded === false) {
          setForm((f) => ({
            ...f, mobile: u.mobile || "", website: u.website || "", logoUrl: u.logoUrl || "", driveLink: u.driveLink || "",
            instagram: u.socials?.instagram || "", facebook: u.socials?.facebook || "", linkedin: u.socials?.linkedin || "", youtube: u.socials?.youtube || "",
          }));
          setShow(true);
        }
      } catch { /* */ }
    })();
  }, []);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setSaving(true); setErr("");
    try {
      await saveOnboarding({
        mobile: form.mobile, website: form.website, logoUrl: form.logoUrl, driveLink: form.driveLink,
        socials: { instagram: form.instagram, facebook: form.facebook, linkedin: form.linkedin, youtube: form.youtube },
      });
      window.dispatchEvent(new Event("profile-updated"));
      setShow(false);
    } catch (e) { setErr(e.message || "Could not save."); setSaving(false); }
  };

  if (!show) return null;
  const inputCls = "w-full rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186]";
  const label = "block text-[12px] font-semibold text-[#7a8499] mb-1";

  return (
    <div className="fixed inset-0 z-[95] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[18px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-[0_24px_70px_rgba(1,49,134,0.3)]">
        <div className="px-6 py-5 border-b border-[#eef1f6]">
          <h2 className="m-0 text-[20px] font-bold text-[#013186]">Welcome! Let's set up your profile</h2>
          <p className="m-0 mt-1 text-[13px] text-[#7a8499]">This helps our team manage your accounts. You can edit it later in Profile.</p>
        </div>
        <div className="p-6 grid grid-cols-2 mq450:grid-cols-1 gap-4">
          <div><label className={label}>Name</label><input value={me.name || ""} disabled className={`${inputCls} bg-[#f5f7fb] text-[#9aa3b2]`} /></div>
          <div><label className={label}>Email</label><input value={me.email || ""} disabled className={`${inputCls} bg-[#f5f7fb] text-[#9aa3b2]`} /></div>
          <div><label className={label}>Phone number</label><input value={form.mobile} onChange={upd("mobile")} placeholder="+1 555 000 1234" className={inputCls} /></div>
          <div><label className={label}>Website</label><input value={form.website} onChange={upd("website")} placeholder="https://yoursite.com" className={inputCls} /></div>
          <div><label className={label}>Instagram link</label><input value={form.instagram} onChange={upd("instagram")} placeholder="https://instagram.com/…" className={inputCls} /></div>
          <div><label className={label}>Facebook link</label><input value={form.facebook} onChange={upd("facebook")} placeholder="https://facebook.com/…" className={inputCls} /></div>
          <div><label className={label}>LinkedIn link</label><input value={form.linkedin} onChange={upd("linkedin")} placeholder="https://linkedin.com/…" className={inputCls} /></div>
          <div><label className={label}>YouTube link</label><input value={form.youtube} onChange={upd("youtube")} placeholder="https://youtube.com/@…" className={inputCls} /></div>
          <div><label className={label}>Logo URL</label><input value={form.logoUrl} onChange={upd("logoUrl")} placeholder="Link to your logo image" className={inputCls} /></div>
          <div><label className={label}>Google Drive link</label><input value={form.driveLink} onChange={upd("driveLink")} placeholder="Shared Drive folder link" className={inputCls} /></div>
        </div>
        {err && <p className="m-0 px-6 text-[13px] font-semibold text-[#dc2626]">{err}</p>}
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#eef1f6]">
          <button onClick={() => setShow(false)} className="text-[14px] font-bold text-[#5b6472] border border-[#e3e9f5] rounded-[10px] px-5 py-2.5 hover:bg-[#f5f7fb] cursor-pointer">Cancel</button>
          <button onClick={save} disabled={saving} className="text-[14px] font-bold text-white bg-[#013186] rounded-[10px] px-6 py-2.5 hover:bg-[#012270] cursor-pointer disabled:opacity-60">
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
