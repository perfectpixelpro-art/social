import { useState, useEffect, useCallback, useRef } from "react";
import { adminGetAllFiles, adminGetConversations, adminUploadForClient, adminDeleteFile } from "../../api";

const labelOf = (k) => ({ logo: "Logos", brand: "Brand Guide", product: "Product Images", other: "Other" }[k] || "Other");
const badge = { logo: "bg-[#eaf1ff] text-[#1463ff]", brand: "bg-[#f0eafe] text-[#7c3aed]", product: "bg-[#e8f8ee] text-[#16a34a]", other: "bg-[#eef1f6] text-[#5b6472]" };
const folderTypes = [
  { key: "logo", label: "Logos" },
  { key: "brand", label: "Brand Guide" },
  { key: "product", label: "Product Images" },
  { key: "other", label: "Other" },
];

export default function AdminFiles() {
  const [files, setFiles] = useState([]);
  const [q, setQ] = useState("");
  const [clients, setClients] = useState([]);
  const [selClient, setSelClient] = useState("");
  const [selType, setSelType] = useState("logo");
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const inputRef = useRef(null);

  const load = useCallback(async () => {
    try { const res = await adminGetAllFiles(); setFiles(res.data || []); } catch { /* */ }
  }, []);

  const del = async (f) => {
    if (!window.confirm(`Delete "${f.fileName}"? This can't be undone.`)) return;
    try { await adminDeleteFile(f._id); setFiles((x) => x.filter((y) => y._id !== f._id)); }
    catch { /* ignore */ }
  };
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    (async () => {
      try { const r = await adminGetConversations(); setClients(r.data || []); } catch { /* */ }
    })();
  }, []);

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!selClient) { setMsg("Select a client first."); e.target.value = ""; return; }
    setUploading(true); setMsg("");
    try {
      await adminUploadForClient(selClient, file, selType);
      setMsg("Uploaded to client successfully!");
      load();
    } catch (err) { setMsg(err.message || "Upload failed."); }
    finally { setUploading(false); e.target.value = ""; }
  };

  // group by client
  const groups = {};
  files
    .filter((f) => {
      if (!q) return true;
      const s = q.toLowerCase();
      return (f.client?.name || "").toLowerCase().includes(s) || (f.fileName || "").toLowerCase().includes(s);
    })
    .forEach((f) => {
      const key = f.client?._id || "unknown";
      if (!groups[key]) groups[key] = { client: f.client, items: [] };
      groups[key].items.push(f);
    });

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Client Files</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">All files uploaded by every client, grouped by client.</p>

      {/* Upload-to-client card */}
      <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4 mb-6">
        <h2 className="m-0 text-[16px] font-bold text-[#0b1f44] mb-3">Upload a file to a client</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <select value={selClient} onChange={(e) => setSelClient(e.target.value)} className="rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186] cursor-pointer min-w-[220px]">
            <option value="">Select a client…</option>
            {clients.map((c) => <option key={c.clientId} value={c.clientId}>{c.name} ({c.email})</option>)}
          </select>
          <div className="flex flex-wrap gap-2">
            {folderTypes.map((f) => (
              <button key={f.key} onClick={() => setSelType(f.key)}
                className={`text-[13px] font-semibold rounded-[8px] px-3 py-2 border transition-colors cursor-pointer ${selType === f.key ? "bg-[#013186] text-white border-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <input ref={inputRef} type="file" className="hidden" onChange={onPick} />
        <button onClick={() => { if (!selClient) { setMsg("Select a client first."); return; } inputRef.current?.click(); }} disabled={uploading}
          className="text-[14px] font-bold text-white bg-[#1463ff] rounded-[10px] px-5 py-2.5 hover:bg-[#0d50d8] cursor-pointer disabled:opacity-60">
          {uploading ? "Uploading..." : "Choose file & upload"}
        </button>
        {msg && <p className={`text-[13px] font-semibold mt-3 m-0 ${/success|Uploaded/i.test(msg) ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg}</p>}
        <p className="m-0 mt-2 text-[12px] text-[#9aa3b2]">Only the selected client (and admins) can see files you upload here.</p>
      </section>

      <div className="flex items-center gap-2 rounded-[10px] bg-[#f5f7fb] px-3 py-2.5 max-w-[360px] mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa3b2" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search client or file..." className="bg-transparent outline-none text-[13px] text-[#5b6472] w-full placeholder-[#9aa3b2]" />
      </div>

      {Object.keys(groups).length === 0 && <p className="text-[#9aa3b2] font-semibold">No files uploaded by any client yet.</p>}

      {Object.values(groups).map(({ client, items }) => (
        <section key={client?._id || "x"} className="mb-6 rounded-[16px] border border-[#eef1f6] p-5 mq450:p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-[#013186] text-white flex items-center justify-center text-[13px] font-bold">
              {(client?.name || "?").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
            </span>
            <div>
              <p className="m-0 text-[15px] font-bold text-[#0b1f44]">{client?.name || "Unknown client"}</p>
              <p className="m-0 text-[12px] text-[#9aa3b2]">{client?.email} · {items.length} file{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 mq800:grid-cols-2 mq450:grid-cols-1 gap-3">
            {items.map((f) => (
              <div key={f._id} className="relative flex items-center gap-3 rounded-[12px] border border-[#eef1f6] p-3 hover:bg-[#fafbfd] transition-colors">
                <a href={f.webViewLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 min-w-0 flex-1 no-underline">
                  <span className="w-9 h-9 rounded-[8px] bg-[#eaf1ff] text-[#013186] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 text-[13px] font-bold text-[#0b1f44] truncate">{f.fileName}</p>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${badge[f.folderType]}`}>{labelOf(f.folderType)}</span>
                  </div>
                </a>
                <button onClick={() => del(f)} title="Delete file"
                  className="shrink-0 text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer p-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6M14 11v6" /></svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
