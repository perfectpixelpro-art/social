import { useState, useEffect, useCallback } from "react";
import { getArticles, getArticle } from "../../api";
import { openImage } from "../../components/ImageViewer";

const fmtDate = (d) => new Date(d).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });

// Shared article list + reader. `role` = "client" | "admin" (which token to use).
export function ArticlesView({ role = "client", header = "Help & Articles", sub = "Guides and updates from our team." }) {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(null);

  const load = useCallback(async () => {
    try { const r = await getArticles(role); setArticles(r.data || []); } catch { /* */ }
  }, [role]);
  useEffect(() => { load(); }, [load]);

  const read = async (id) => {
    try { const r = await getArticle(id, role); setOpen(r.data); } catch { /* */ }
  };

  return (
    <>
      <div className="grid grid-cols-3 mq1125:grid-cols-2 mq450:grid-cols-1 gap-5">
        {articles.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No articles yet.</p>}
        {articles.map((a) => (
          <button key={a._id} onClick={() => read(a._id)}
            className="text-left rounded-[14px] border border-[#eef1f6] overflow-hidden bg-white hover:shadow-[0_8px_24px_rgba(1,49,134,0.08)] transition-shadow cursor-pointer flex flex-col">
            {a.coverImage
              ? <img src={a.coverImage} alt="" className="w-full h-[140px] object-cover" />
              : <div className="w-full h-[140px] bg-[#eaf1ff] flex items-center justify-center text-[#013186] text-[28px] font-bold">{a.title[0]}</div>}
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-[11px] font-bold text-[#1463ff] bg-[#eaf1ff] rounded-full px-2 py-0.5 self-start mb-2">{a.category || "General"}</span>
              <p className="m-0 text-[15px] font-bold text-[#0b1f44] leading-snug">{a.title}</p>
              {a.excerpt && <p className="m-0 mt-1 text-[12px] text-[#7a8499] line-clamp-2">{a.excerpt}</p>}
              <p className="m-0 mt-3 text-[11px] text-[#9aa3b2]">{a.authorName ? `${a.authorName} · ` : ""}{fmtDate(a.createdAt)}</p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-[16px] w-full max-w-[680px] max-h-[88vh] overflow-y-auto shadow-[0_20px_60px_rgba(1,49,134,0.25)]" onClick={(e) => e.stopPropagation()}>
            {open.coverImage && (
              <img src={open.coverImage} alt="" onClick={() => openImage(open.coverImage, open.title)} className="w-full h-[220px] object-cover cursor-pointer" />
            )}
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
    </>
  );
}

export default function Help() {
  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>Help & Articles</h1>
      <p className="m-0 mt-1 mb-6 text-[13px] text-[#7a8499] font-medium">Guides, tips, and updates from our team.</p>
      <ArticlesView role="client" />
    </main>
  );
}
