import { useState, useEffect, useRef } from "react";
import { getEmailTemplates, saveEmailTemplate, sendTestEmail, sendCustomEmail } from "../../api";

const META = {
  newsletter: { label: "Newsletter", desc: "Sent to every subscriber every 15 days." },
  trial: { label: "Free Trial", desc: "Sent daily for the 7 days of a free trial." },
  cart: { label: "Abandoned Cart", desc: "Sent ~1 hour after someone leaves checkout without paying." },
  plan_expiry: { label: "Plan Expiring", desc: "Sent 15, 7, and 1 day before a plan ends." },
  custom: { label: "Custom", desc: "Compose a one-off email and send it now to specific recipients." },
};

export default function AdminEmail() {
  const [templates, setTemplates] = useState([]);
  const [activeKey, setActiveKey] = useState("newsletter");
  const [form, setForm] = useState({ subject: "", html: "", enabled: true });
  const [status, setStatus] = useState({ ok: null, text: "" });
  const [testEmail, setTestEmail] = useState("");
  const [recipients, setRecipients] = useState("");
  const fileRef = useRef(null);
  const isCustom = activeKey === "custom";

  const sendCustom = async () => {
    if (!recipients.trim()) { setStatus({ ok: false, text: "Add at least one recipient." }); return; }
    if (!form.subject.trim() || !form.html.trim()) { setStatus({ ok: false, text: "Subject and HTML are required." }); return; }
    try {
      const r = await sendCustomEmail({ to: recipients, subject: form.subject, html: form.html, saveAsTemplate: true });
      setStatus({ ok: true, text: `Sent to ${r.sent} recipient${r.sent === 1 ? "" : "s"}.` });
    } catch (e) { setStatus({ ok: false, text: e.message || "Could not send." }); }
  };

  useEffect(() => {
    (async () => {
      try {
        const r = await getEmailTemplates();
        setTemplates(r.data || []);
        const first = (r.data || []).find((t) => t.key === activeKey);
        if (first) setForm({ subject: first.subject, html: first.html, enabled: first.enabled });
      } catch { /* */ }
    })();
  }, []);

  const pick = (key) => {
    setActiveKey(key);
    const t = templates.find((x) => x.key === key);
    if (t) setForm({ subject: t.subject, html: t.html, enabled: t.enabled });
    setStatus({ ok: null, text: "" });
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm((s) => ({ ...s, html: String(reader.result) }));
    reader.readAsText(f);
    e.target.value = "";
  };

  const save = async () => {
    setStatus({ ok: null, text: "" });
    try {
      await saveEmailTemplate(activeKey, form);
      setTemplates((ts) => ts.map((t) => (t.key === activeKey ? { ...t, ...form, customized: true } : t)));
      setStatus({ ok: true, text: "Template saved — this design is now used for automation." });
    } catch (e) { setStatus({ ok: false, text: e.message || "Could not save." }); }
  };

  const test = async () => {
    if (!testEmail.trim()) { setStatus({ ok: false, text: "Enter a test recipient email." }); return; }
    try { await sendTestEmail(activeKey, testEmail); setStatus({ ok: true, text: `Test email sent to ${testEmail}` }); }
    catch (e) { setStatus({ ok: false, text: e.message || "Could not send test." }); }
  };

  const inputCls = "w-full rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186]";

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Email Automation</h1>
      <p className="m-0 mt-1 mb-5 text-[14px] text-[#7a8499] font-medium">Design each automated email (paste/upload a single HTML file). Use <code>{"{{name}}"}</code> to insert the recipient's name.</p>

      {/* automation tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {Object.keys(META).map((k) => {
          const t = templates.find((x) => x.key === k);
          return (
            <button key={k} onClick={() => pick(k)}
              className={`text-[13px] font-bold rounded-full px-4 py-2 cursor-pointer border ${activeKey === k ? "border-[#013186] bg-[#eaf1ff] text-[#013186]" : "border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb]"}`}>
              {META[k].label}{t?.customized ? " ✓" : ""}
            </button>
          );
        })}
      </div>
      <p className="m-0 mb-4 text-[12px] text-[#9aa3b2]">{META[activeKey].desc}</p>

      <div className="flex gap-6 mq1125:flex-col items-start">
        {/* editor */}
        <section className="flex-1 min-w-0 flex flex-col gap-4">
          {isCustom ? (
            <div>
              <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Recipients (comma or space separated)</label>
              <input value={recipients} onChange={(e) => setRecipients(e.target.value)} placeholder="a@x.com, b@y.com" className={inputCls} />
            </div>
          ) : (
            <label className="flex items-center gap-2 text-[13px] font-semibold text-[#0b1f44]">
              <input type="checkbox" checked={form.enabled} onChange={(e) => setForm((s) => ({ ...s, enabled: e.target.checked }))} className="accent-[#013186]" />
              Automation enabled
            </label>
          )}
          <div>
            <label className="block text-[12px] font-semibold text-[#7a8499] mb-1">Subject</label>
            <input value={form.subject} onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] font-semibold text-[#7a8499]">HTML (single file)</label>
              <button onClick={() => fileRef.current?.click()} className="text-[12px] font-semibold text-[#013186] hover:underline cursor-pointer">Upload .html file</button>
              <input ref={fileRef} type="file" accept=".html,.htm,text/html" className="hidden" onChange={onFile} />
            </div>
            <textarea value={form.html} onChange={(e) => setForm((s) => ({ ...s, html: e.target.value }))} rows={16} spellCheck={false}
              className={`${inputCls} font-mono text-[12px] resize-y`} placeholder="<html>…</html>" />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {isCustom ? (
              <button onClick={sendCustom} className="h-[44px] px-6 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer">Send now</button>
            ) : (
              <>
                <button onClick={save} className="h-[44px] px-6 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer">Save template</button>
                <input value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="you@email.com" className={`${inputCls} max-w-[220px]`} />
                <button onClick={test} className="h-[44px] px-5 rounded-[10px] border border-[#cfe0ff] text-[#013186] font-bold text-[14px] hover:bg-[#f0f6ff] cursor-pointer">Send test</button>
              </>
            )}
          </div>
          {status.text && <p className={`m-0 text-[13px] font-semibold ${status.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{status.text}</p>}
        </section>

        {/* live preview */}
        <section className="w-[460px] shrink-0 mq1125:w-full">
          <p className="m-0 mb-3 text-[12px] font-bold tracking-wider text-[#9aa3b2]">PREVIEW</p>
          <div className="rounded-[14px] border border-[#eef1f6] overflow-hidden bg-white">
            <div className="px-4 py-2 border-b border-[#eef1f6] text-[12px] text-[#5b6472]"><strong>Subject:</strong> {form.subject || "—"}</div>
            <iframe title="email-preview" srcDoc={form.html} className="w-full h-[560px] border-0 bg-white" sandbox="allow-same-origin" />
          </div>
        </section>
      </div>
    </main>
  );
}
