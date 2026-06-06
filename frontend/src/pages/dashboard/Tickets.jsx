import { useState, useRef } from "react";

const labelCls = "text-[13px] font-bold text-[#0b1f44] mb-2 block";
const inputCls =
  "w-full rounded-[10px] bg-white border border-[#e3e9f5] px-4 py-3 text-[14px] text-[#1a2233] outline-none focus:border-[#013186] transition-colors placeholder-[#9aa3b2]";

const categories = [
  { label: "Content Request", d: <><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h5" /></> },
  { label: "Project Issue", d: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></> },
  { label: "Billing & Payments", d: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></> },
  { label: "Account Access", d: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></> },
  { label: "Technical Support", d: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.4-.6-.6-2.4z" /></> },
  { label: "Other", d: <><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></> },
];

const priorities = [
  { label: "Low", color: "#16a34a" },
  { label: "Medium", color: "#f59e0b" },
  { label: "High", color: "#1463ff" },
];

const recent = [
  { title: "Content not received for this week", id: "#TKT-1245", date: "May 20, 2024", status: "In Progress", cls: "amber" },
  { title: "Change in Instagram post design", id: "#TKT-1244", date: "May 18, 2024", status: "Resolved", cls: "green" },
  { title: "Billing invoice not received", id: "#TKT-1244", date: "May 18, 2024", status: "Resolved", cls: "green" },
  { title: "Access to Ad account", id: "#TKT-1242", date: "May 12, 2024", status: "Closed", cls: "gray" },
];

const statusColors = {
  amber: "bg-[#fef3c7] text-[#92710a]",
  green: "bg-[#dcfce7] text-[#15803d]",
  gray: "bg-[#eef1f6] text-[#5b6472]",
};

export default function Tickets() {
  const [form, setForm] = useState({ subject: "", category: "", description: "" });
  const [activeCat, setActiveCat] = useState("");
  const [priority, setPriority] = useState("High");
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const MAX = 10 * 1024 * 1024; // 10MB
  const addFiles = (list) => {
    const accepted = Array.from(list).filter((f) => f.size <= MAX);
    setFiles((prev) => [...prev, ...accepted]);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const fmtSize = (b) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <div className="grid grid-cols-[1fr_360px] mq1125:grid-cols-1 gap-6 items-start">

        {/* ── Raise a Ticket ── */}
        <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
          <div className="flex items-start gap-3 mb-6">
            <span className="w-9 h-9 rounded-[10px] bg-[#eaf1ff] text-[#013186] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" /></svg>
            </span>
            <div>
              <h2 className="m-0 text-[17px] font-bold text-[#0b1f44]">Raise a Ticket</h2>
              <p className="m-0 text-[13px] text-[#9aa3b2]">Need help? Submit a ticket and our team will get back to you as soon as possible.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className={labelCls}>Subject</label>
              <input value={form.subject} onChange={upd("subject")} className={inputCls} placeholder="Briefly describe your issue" />
            </div>

            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={upd("category")} className={`${inputCls} appearance-none cursor-pointer`}>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
              </select>

              <div className="grid grid-cols-3 mq450:grid-cols-2 gap-3 mt-3">
                {categories.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => { setActiveCat(c.label); setForm((f) => ({ ...f, category: c.label })); }}
                    className={`flex items-center gap-2 rounded-[10px] border px-3 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                      activeCat === c.label ? "border-[#1463ff] bg-[#f0f6ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1463ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.d}</svg>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Priority</label>
              <div className="flex gap-3 flex-wrap">
                {priorities.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPriority(p.label)}
                    className={`flex items-center gap-2 rounded-[10px] border px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                      priority === p.label ? "border-[#1463ff] bg-[#f0f6ff]" : "border-[#e3e9f5] hover:bg-[#f5f7fb]"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: p.color }}>
                      {priority === p.label && <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />}
                    </span>
                    <span className="text-[#0b1f44]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea value={form.description} onChange={upd("description")} rows={5} className={`${inputCls} resize-none`} placeholder="Please provide detailed information about your issue...." />
              <p className="m-0 mt-1.5 text-[12px] text-[#9aa3b2]">Minimum 20 characters</p>
            </div>

            <div>
              <label className={labelCls}>Attachments <span className="text-[#9aa3b2] font-medium">(Optional)</span></label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.docx"
                className="hidden"
                onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`rounded-[12px] border border-dashed py-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  dragging ? "border-[#1463ff] bg-[#e8f1ff]" : "border-[#9ec2ff] bg-[#f5f9ff] hover:bg-[#eef6ff]"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1463ff" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 9l5-5 5 5" /><path d="M12 4v12" /></svg>
                <p className="m-0 mt-2 text-[13px] text-[#5b6472] font-semibold">Drag and drop files here or <span className="text-[#1463ff]">click to upload</span></p>
                <p className="m-0 text-[11px] text-[#9aa3b2]">Max file size: 10MB (PDF, PNG, JPG, DOCX)</p>
              </div>

              {files.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-[10px] border border-[#eef1f6] bg-[#fbfcfe] px-3 py-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1463ff" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-[13px] font-semibold text-[#0b1f44] truncate">{f.name}</p>
                        <p className="m-0 text-[11px] text-[#9aa3b2]">{fmtSize(f.size)}</p>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <button className="text-[14px] font-bold text-[#5b6472] border border-[#e3e9f5] rounded-[10px] px-5 py-2.5 hover:bg-[#f5f7fb] transition-colors cursor-pointer">Cancel</button>
              <button className="text-[14px] font-bold text-white bg-[#1463ff] rounded-[10px] px-6 py-2.5 hover:bg-[#0d50d8] transition-colors cursor-pointer">Submit Ticket</button>
            </div>
          </div>
        </section>

        {/* ── Recent Tickets ── */}
        <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="m-0 text-[16px] font-bold text-[#0b1f44]">Your Recent Tickets</h2>
            <button className="text-[13px] font-bold text-[#1463ff] cursor-pointer">View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {recent.map((t, i) => (
              <div key={i} className="rounded-[12px] border border-[#eef1f6] px-4 py-3.5 hover:bg-[#fafbfd] transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-3">
                  <p className="m-0 text-[14px] font-bold text-[#0b1f44]">{t.title}</p>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${statusColors[t.cls]}`}>{t.status}</span>
                </div>
                <p className="m-0 mt-1 text-[12px] text-[#9aa3b2]">{t.id} · {t.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
