import { useState, useEffect, useCallback, useRef } from "react";
import { getArticles, getArticle, createArticle, deleteArticle } from "../../api";
import { openImage } from "../../components/ImageViewer";

const fmtDate = (d) => new Date(d).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });

const currentRole = () => {
  try { return (JSON.parse(localStorage.getItem("adminUser")) || {}).role || "admin"; } catch { return "admin"; }
};

export default function AdminHelp() {
  const role = currentRole();
  const canWrite = role === "admin" || role === "writer";

  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(null);   // article being read
  const [adding, setAdding] = useState(false); // add-article popup

  const load = useCallback(async () => {
    try { const r = await getArticles("admin"); setArticles(r.data || []); } catch { /* */ }
  }, []);
  useEffect(() => { load(); }, [load]);

  const read = async (id) => { try { const r = await getArticle(id, "admin"); setOpen(r.data); } catch { /* */ } };

  const remove = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    try { await deleteArticle(id); setOpen(null); load(); } catch (e) { alert(e.message || "Failed"); }
  };

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Help & Articles</h1>
        {canWrite && (
          <button onClick={() => setAdding(true)} className="flex items-center gap-2 h-[42px] px-5 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            Add Article
          </button>
        )}
      </div>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">
        {canWrite ? "Write articles for clients and managers to read." : "Articles published by the team."}
      </p>

      <div className="grid grid-cols-3 mq1125:grid-cols-2 mq450:grid-cols-1 gap-5">
        {articles.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No articles yet.</p>}
        {articles.map((a) => (
          <div key={a._id} className="rounded-[14px] border border-[#eef1f6] overflow-hidden bg-white flex flex-col">
            <button onClick={() => read(a._id)} className="text-left cursor-pointer p-0 border-0 bg-transparent">
              {a.coverImage
                ? <img src={a.coverImage} alt="" className="w-full h-[140px] object-cover" />
                : <div className="w-full h-[140px] bg-[#eaf1ff] flex items-center justify-center text-[#013186] text-[28px] font-bold">{a.title[0]}</div>}
              <div className="p-4">
                <span className="text-[11px] font-bold text-[#1463ff] bg-[#eaf1ff] rounded-full px-2 py-0.5">{a.category || "General"}</span>
                <p className="m-0 mt-2 text-[15px] font-bold text-[#0b1f44] leading-snug">{a.title}</p>
                <p className="m-0 mt-2 text-[11px] text-[#9aa3b2]">{a.authorName ? `${a.authorName} · ` : ""}{fmtDate(a.createdAt)}</p>
              </div>
            </button>
            {(role === "admin" || a.authorRole === role) && (
              <button onClick={() => remove(a._id)} className="m-3 mt-0 self-start text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer">Delete</button>
            )}
          </div>
        ))}
      </div>

      {/* Reader */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-[16px] w-full max-w-[680px] max-h-[88vh] overflow-y-auto shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
            {open.coverImage && <img src={open.coverImage} alt="" onClick={() => openImage(open.coverImage, open.title)} className="w-full h-[220px] object-cover cursor-pointer" />}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-bold text-[#1463ff] bg-[#eaf1ff] rounded-full px-2 py-0.5">{open.category || "General"}</span>
                <button onClick={() => setOpen(null)} className="text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
              </div>
              <h1 className="m-0 mt-2 text-[24px] font-bold text-[#0b1f44]">{open.title}</h1>
              <p className="m-0 mt-1 text-[12px] text-[#9aa3b2]">{open.authorName ? `By ${open.authorName} (${open.authorRole}) · ` : ""}{fmtDate(open.createdAt)}</p>
              <div className="mt-4 text-[14px] text-[#1a2233] leading-relaxed whitespace-pre-wrap">{open.content}</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Article popup */}
      {adding && <AddArticle onClose={() => setAdding(false)} onAdded={() => { setAdding(false); load(); }} />}
    </main>
  );
}

function AddArticle({ onClose, onAdded }) {
  const [form, setForm] = useState({ title: "", category: "General", excerpt: "", content: "" });
  const [cover, setCover] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef(null);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    if (!form.title.trim()) { setErr("Title is required."); return; }
    setSaving(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("excerpt", form.excerpt);
      fd.append("content", form.content);
      if (cover) fd.append("cover", cover);
      await createArticle(fd);
      onAdded();
    } catch (e) { setErr(e.message || "Could not save."); setSaving(false); }
  };

  const inputCls = "w-full rounded-[10px] border border-[#e3e9f5] px-4 py-3 text-[14px] outline-none focus:border-[#013186]";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[16px] w-full max-w-[640px] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eef1f6]">
          <h2 className="m-0 text-[18px] font-bold text-[#0b1f44]">Add Article</h2>
          <button onClick={onClose} className="text-[#9aa3b2] hover:text-[#0b1f44] cursor-pointer text-[20px] leading-none">✕</button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <input value={form.title} onChange={upd("title")} placeholder="Article title" className={inputCls} />
          <input value={form.category} onChange={upd("category")} placeholder="Category (e.g. Getting Started)" className={inputCls} />
          <input value={form.excerpt} onChange={upd("excerpt")} placeholder="Short summary (shown on the card)" className={inputCls} />
          <textarea value={form.content} onChange={upd("content")} rows={8} placeholder="Write the article content…" className={`${inputCls} resize-y`} />
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => setCover(e.target.files?.[0] || null)} />
            <button onClick={() => fileRef.current?.click()} className="text-[13px] font-semibold text-[#013186] border border-[#cfe0ff] rounded-[8px] px-4 py-2 hover:bg-[#f0f6ff] cursor-pointer">
              {cover ? `Cover: ${cover.name}` : "Add cover image (optional)"}
            </button>
          </div>
          {err && <p className="m-0 text-[13px] font-semibold text-[#dc2626]">{err}</p>}
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="text-[14px] font-bold text-[#5b6472] border border-[#e3e9f5] rounded-[10px] px-5 py-2.5 hover:bg-[#f5f7fb] cursor-pointer">Cancel</button>
            <button onClick={save} disabled={saving} className="text-[14px] font-bold text-white bg-[#013186] rounded-[10px] px-6 py-2.5 hover:bg-[#012270] cursor-pointer disabled:opacity-60">
              {saving ? "Publishing…" : "Publish Article"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
