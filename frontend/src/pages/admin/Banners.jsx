import { useState, useEffect, useCallback, useRef } from "react";
import { adminListBanners, adminCreateBanner, adminToggleBanner, adminDeleteBanner } from "../../api";
import { openImage } from "../../components/ImageViewer";

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ title: "", body: "", link: "" });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef(null);

  const load = useCallback(async () => { try { const r = await adminListBanners(); setBanners(r.data || []); } catch { /* */ } }, []);
  useEffect(() => { load(); }, [load]);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const create = async () => {
    if (!image && !form.title) { setMsg("Add an image or a title."); return; }
    setSaving(true); setMsg("");
    try {
      const fd = new FormData();
      fd.append("title", form.title); fd.append("body", form.body); fd.append("link", form.link);
      if (image) fd.append("image", image);
      await adminCreateBanner(fd);
      setForm({ title: "", body: "", link: "" }); setImage(null); load();
    } catch (e) { setMsg(e.message || "Could not save."); } finally { setSaving(false); }
  };

  const toggle = async (id) => { try { await adminToggleBanner(id); load(); } catch { /* */ } };
  const remove = async (id) => { if (!window.confirm("Delete this banner?")) return; try { await adminDeleteBanner(id); load(); } catch { /* */ } };

  const inputCls = "w-full rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186]";

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Banners</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Upload promo banners — active ones pop up on every client's dashboard.</p>

      {/* create */}
      <section className="rounded-[16px] border border-[#eef1f6] p-6 mb-6 max-w-[640px] flex flex-col gap-4">
        <h2 className="m-0 text-[16px] font-bold text-[#0b1f44]">New Banner</h2>
        <input value={form.title} onChange={upd("title")} placeholder="Title (optional)" className={inputCls} />
        <textarea value={form.body} onChange={upd("body")} rows={2} placeholder="Short message (optional)" className={`${inputCls} resize-y`} />
        <input value={form.link} onChange={upd("link")} placeholder="Link URL (optional, e.g. https://…)" className={inputCls} />
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          <button onClick={() => fileRef.current?.click()} className="text-[13px] font-semibold text-[#013186] border border-[#cfe0ff] rounded-[8px] px-4 py-2 hover:bg-[#f0f6ff] cursor-pointer">
            {image ? `Image: ${image.name}` : "Upload banner image"}
          </button>
        </div>
        {msg && <p className="m-0 text-[13px] font-semibold text-[#dc2626]">{msg}</p>}
        <button onClick={create} disabled={saving} className="h-[44px] rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60 self-start px-6">
          {saving ? "Saving…" : "Publish Banner"}
        </button>
      </section>

      {/* list */}
      <div className="grid grid-cols-2 mq1125:grid-cols-1 gap-4">
        {banners.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No banners yet.</p>}
        {banners.map((b) => (
          <div key={b._id} className="rounded-[14px] border border-[#eef1f6] overflow-hidden">
            {b.imageUrl && <img src={b.imageUrl} alt="" onClick={() => openImage(b.imageUrl)} className="w-full h-[140px] object-cover cursor-pointer" />}
            <div className="p-4">
              {b.title && <p className="m-0 text-[15px] font-bold text-[#0b1f44]">{b.title}</p>}
              {b.body && <p className="m-0 mt-1 text-[12px] text-[#7a8499]">{b.body}</p>}
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-[11px] font-bold rounded-full px-2.5 py-1 ${b.active ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#eef1f6] text-[#5b6472]"}`}>{b.active ? "Active" : "Hidden"}</span>
                <button onClick={() => toggle(b._id)} className="text-[13px] font-semibold text-[#013186] hover:underline cursor-pointer">{b.active ? "Hide" : "Show"}</button>
                <button onClick={() => remove(b._id)} className="text-[13px] font-semibold text-[#dc2626] hover:underline cursor-pointer ml-auto">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
