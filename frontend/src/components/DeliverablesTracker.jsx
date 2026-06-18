// Descriptions per deliverable key (shown under the name).
const DESC = {
  graphics: "Branded social graphics and templates",
  videos: "Short-form videos for social channels",
  carousels: "Multi-slide carousel posts",
  changes: "Rounds of revisions included",
  pages: "Website pages delivered",
};
const ICONS = {
  graphics: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
  videos: <><rect x="2" y="5" width="14" height="14" rx="2" /><path d="m22 8-6 4 6 4z" /></>,
  carousels: <><rect x="3" y="5" width="14" height="14" rx="2" /><path d="M19 7v10" /></>,
  changes: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  pages: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>,
};

export default function DeliverablesTracker({ tracker, editable = false, onChange, className = "" }) {
  if (!tracker) return null;
  const items = tracker.items || [];
  const serviceLabel = { marketing: "Social Media", video: "Short-Form Video", website: "Website" }[tracker.service] || "Service";

  // ── Editable (manager/admin): rows with +/- and Mark done ──
  if (editable) {
    return (
      <div className={`rounded-[14px] border border-[#eef1f6] bg-white p-5 ${className}`}>
        <h3 className="m-0 mb-1 text-[16px] font-bold text-[#013186]">Deliverables Tracker</h3>
        <p className="m-0 mb-4 text-[12px] text-[#7a8499] font-medium">{serviceLabel}{tracker.plan ? ` · ${tracker.plan}` : ""}{tracker.period ? ` · ${tracker.period}` : ""}</p>
        <div className="flex flex-col gap-3">
          {items.map((i) => {
            const complete = i.done >= i.total;
            return (
              <div key={i.key} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-semibold text-[#0b1f44] truncate">{i.label}{i.addon && <span className="ml-2 text-[9px] font-bold text-[#7c3aed] bg-[#f0eafe] rounded-full px-1.5 py-0.5">ADD-ON</span>}</span>
                    <span className="text-[12px] font-bold shrink-0" style={{ color: complete ? "#16a34a" : "#9aa3b2" }}>{i.done}/{i.total}</span>
                  </div>
                  <div className="h-[6px] rounded-full bg-[#eef1f6] overflow-hidden">
                    <div className="h-full transition-all" style={{ width: `${i.total ? (Math.min(i.done, i.total) / i.total) * 100 : 0}%`, background: complete ? "#16a34a" : "#1463ff" }} />
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => onChange(i.key, { delta: -1 })} disabled={i.done <= 0} className="w-7 h-7 rounded-[7px] border border-[#e3e9f5] text-[#5b6472] hover:bg-[#f5f7fb] cursor-pointer disabled:opacity-40">−</button>
                  <button onClick={() => onChange(i.key, { delta: 1 })} disabled={i.done >= i.total} className="w-7 h-7 rounded-[7px] border border-[#cfe0ff] text-[#013186] hover:bg-[#f0f6ff] cursor-pointer disabled:opacity-40">+</button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No deliverables for this plan.</p>}
        </div>
      </div>
    );
  }

  // ── Read-only (client): table layout ──
  return (
    <div className={`rounded-[14px] border border-[#eef1f6] bg-white p-5 ${className}`}>
      <h3 className="m-0 mb-1 text-[18px] font-bold text-[#013186]">Deliverables Tracker</h3>
      <p className="m-0 mb-4 text-[12px] text-[#7a8499] font-medium">
        {serviceLabel}{tracker.plan ? ` · ${tracker.plan}` : ""}{tracker.period ? ` · ${tracker.period}` : ""}{tracker.updatedByName ? ` · updated by ${tracker.updatedByName}` : ""}
      </p>

      {items.length === 0 ? (
        <p className="m-0 text-[13px] text-[#9aa3b2]">No deliverables for this plan.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="text-left text-[12px] text-[#7a8499] border-b border-[#eef1f6]">
                <th className="py-2 font-semibold">Deliverable</th>
                <th className="py-2 font-semibold w-[40%]">Progress</th>
                <th className="py-2 font-semibold text-center">Completed</th>
                <th className="py-2 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => {
                const pct = i.total ? Math.round((Math.min(i.done, i.total) / i.total) * 100) : 0;
                const complete = i.done >= i.total;
                return (
                  <tr key={i.key} className="border-b border-[#f4f6fb] last:border-0">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-[9px] bg-[#eaf1ff] text-[#013186] flex items-center justify-center shrink-0">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONS[i.key] || ICONS.graphics}</svg>
                        </span>
                        <div className="min-w-0">
                          <p className="m-0 text-[14px] font-bold text-[#0b1f44]">{i.label}{i.addon && <span className="ml-2 text-[9px] font-bold text-[#7c3aed] bg-[#f0eafe] rounded-full px-1.5 py-0.5 align-middle">ADD-ON</span>}</p>
                          <p className="m-0 text-[11px] text-[#9aa3b2]">{DESC[i.key] || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-[7px] rounded-full bg-[#eef1f6] overflow-hidden">
                          <div className="h-full" style={{ width: `${pct}%`, background: complete ? "#16a34a" : "#1463ff" }} />
                        </div>
                        <span className="text-[12px] font-bold text-[#0b1f44] w-[34px] text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-center text-[13px] font-semibold text-[#5b6472]">{i.done} of {i.total}</td>
                    <td className="py-3 text-right">
                      <span className="text-[11px] font-bold rounded-full px-2.5 py-1" style={{ background: complete ? "#dcfce7" : "#eaf1ff", color: complete ? "#15803d" : "#1463ff" }}>
                        {complete ? "Completed" : "On Track"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
