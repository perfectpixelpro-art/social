import { useState, useEffect, useRef, useCallback } from "react";
import { uploadClientFile, getMyFiles, deleteMyFile } from "../../api";

const folderTypes = [
  { key: "logo", label: "Logos" },
  { key: "brand", label: "Brand Guide" },
  { key: "product", label: "Product Images" },
  { key: "other", label: "Other" },
];
const labelOf = (k) => folderTypes.find((f) => f.key === k)?.label || "Other";

const FileIcon = ({ mime }) => {
  const isImg = (mime || "").startsWith("image/");
  return (
    <span className="w-9 h-9 rounded-[8px] bg-[#eaf1ff] text-[#013186] flex items-center justify-center shrink-0">
      {isImg ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
      )}
    </span>
  );
};

export default function Files() {
  const [files, setFiles] = useState([]);
  const [type, setType] = useState("logo");
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const load = useCallback(async () => {
    try { const res = await getMyFiles(); setFiles(res.data || []); } catch { /* */ }
  }, []);
  useEffect(() => { load(); }, [load]);

  const doUpload = async (file) => {
    if (!file) return;
    setUploading(true); setMsg("");
    try {
      await uploadClientFile(file, type);
      setMsg("Uploaded successfully!");
      load();
    } catch (err) {
      setMsg(err.message || "Upload failed.");
    } finally { setUploading(false); }
  };

  const onPick = async (e) => { await doUpload(e.target.files?.[0]); e.target.value = ""; };

  const del = async (file) => {
    if (!window.confirm(`Delete "${file.fileName}"? This can't be undone.`)) return;
    try { await deleteMyFile(file._id); setFiles((x) => x.filter((f) => f._id !== file._id)); }
    catch (err) { setMsg(err.message || "Could not delete file."); }
  };
  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) doUpload(f);
  };

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>My Files</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Upload your logos, brand guides, and product images — your team can access them instantly.</p>

      {/* Upload card */}
      <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4 mb-6">
        <h2 className="m-0 text-[16px] font-bold text-[#0b1f44] mb-3">Upload a file</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {folderTypes.map((f) => (
            <button key={f.key} onClick={() => setType(f.key)}
              className={`text-[13px] font-semibold rounded-[8px] px-4 py-2 border transition-colors cursor-pointer ${type === f.key ? "bg-[#013186] text-white border-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <input ref={inputRef} type="file" className="hidden" onChange={onPick} />
        <button onClick={() => inputRef.current?.click()} disabled={uploading}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`rounded-[12px] border border-dashed w-full py-6 flex flex-col items-center justify-center cursor-pointer disabled:opacity-60 transition-colors ${dragOver ? "border-[#1463ff] bg-[#eaf1ff]" : "border-[#9ec2ff] bg-[#f5f9ff] hover:bg-[#eef6ff]"}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1463ff" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 9l5-5 5 5" /><path d="M12 4v12" /></svg>
          <p className="m-0 mt-2 text-[13px] font-semibold text-[#5b6472]">{uploading ? "Uploading..." : dragOver ? "Drop the file to upload" : <>Click or drag a file to upload to <b className="text-[#013186]">{labelOf(type)}</b></>}</p>
          <p className="m-0 text-[11px] text-[#9aa3b2]">Images, videos, PDFs & docs · stored securely · up to 50MB</p>
        </button>
        {msg && <p className={`text-[13px] font-semibold mt-3 m-0 ${/success|Uploaded/i.test(msg) ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg}</p>}
      </section>

      {/* Files grouped by folder */}
      {folderTypes.map((f) => {
        const group = files.filter((x) => x.folderType === f.key);
        if (!group.length) return null;
        return (
          <section key={f.key} className="mb-6">
            <h3 className="m-0 mb-3 text-[14px] font-bold text-[#0b1f44]">{f.label} <span className="text-[#9aa3b2] font-semibold">({group.length})</span></h3>
            <div className="grid grid-cols-3 mq800:grid-cols-2 mq450:grid-cols-1 gap-3">
              {group.map((file) => (
                <div key={file._id} className="relative flex items-center gap-3 rounded-[12px] border border-[#eef1f6] p-3 hover:bg-[#fafbfd] transition-colors">
                  <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 min-w-0 flex-1 no-underline">
                    <FileIcon mime={file.mimeType} />
                    <div className="min-w-0">
                      <p className="m-0 text-[13px] font-bold text-[#0b1f44] truncate">{file.fileName}</p>
                      <p className="m-0 text-[11px] text-[#9aa3b2]">
                        {new Date(file.uploadedAt).toLocaleDateString()}
                        {file.uploadedBy === "admin" && <span className="ml-2 text-[10px] font-semibold text-[#7c3aed] bg-[#f0eafe] rounded-full px-1.5 py-0.5">From Admin</span>}
                      </p>
                    </div>
                  </a>
                  <button onClick={() => del(file)} title="Delete file"
                    className="shrink-0 text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer p-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6M14 11v6" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {files.length === 0 && <p className="text-[#9aa3b2] font-semibold">No files uploaded yet.</p>}
    </main>
  );
}
