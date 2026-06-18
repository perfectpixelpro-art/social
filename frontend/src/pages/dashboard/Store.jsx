import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getStore, createAddonCheckout, confirmAddon } from "../../api";

const SERVICE_LABEL = { marketing: "Social Media", video: "Short-Form Video", website: "Website" };

export default function Store() {
  const [params, setParams] = useSearchParams();
  const [store, setStore] = useState({ service: "marketing", addons: [] });
  const [qty, setQty] = useState({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState({ ok: null, text: "" });

  useEffect(() => {
    (async () => { try { const r = await getStore(); setStore(r.data || { addons: [] }); } catch { /* */ } })();
  }, []);

  // After returning from Stripe, confirm the one-time payment → apply to account.
  useEffect(() => {
    const sid = params.get("session_id");
    if (sid) {
      (async () => {
        try { await confirmAddon(sid); setMsg({ ok: true, text: "Add-on purchased and added to your account!" }); }
        catch (e) { setMsg({ ok: false, text: e.message || "Could not confirm purchase." }); }
        finally { params.delete("session_id"); setParams(params, { replace: true }); }
      })();
    } else if (params.get("canceled")) {
      setMsg({ ok: false, text: "Checkout canceled." });
      params.delete("canceled"); setParams(params, { replace: true });
    }
  }, []); // eslint-disable-line

  const setQ = (k, v) => setQty((q) => ({ ...q, [k]: Math.max(1, Math.min(100, Number(v) || 1)) }));

  const buy = async (key) => {
    setBusy(true); setMsg({ ok: null, text: "" });
    try {
      const r = await createAddonCheckout([{ key, qty: qty[key] || 1 }]);
      window.location.href = r.url; // Stripe one-time checkout
    } catch (e) { setBusy(false); setMsg({ ok: false, text: e.message || "Could not start checkout." }); }
  };

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#013186] font-bold" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>Store</h1>
      <p className="m-0 mt-1 mb-5 text-[13px] text-[#7a8499] font-medium">
        Add-ons for your {SERVICE_LABEL[store.service] || "plan"} package. One-time purchase — added straight to your account.
      </p>

      {msg.text && <p className={`m-0 mb-4 text-[13px] font-semibold ${msg.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{msg.text}</p>}

      <div className="grid grid-cols-3 mq1125:grid-cols-2 mq450:grid-cols-1 gap-5">
        {store.addons.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2]">No add-ons available for your package.</p>}
        {store.addons.map((a) => (
          <div key={a.key} className="rounded-[14px] border border-[#eef1f6] p-5 flex flex-col">
            <h3 className="m-0 text-[16px] font-bold text-[#0b1f44]">{a.label}</h3>
            <p className="m-0 mt-1 text-[12px] text-[#9aa3b2]">{a.hint}</p>
            <p className="m-0 mt-3 text-[28px] font-bold text-[#013186]">${a.price}<span className="text-[13px] text-[#9aa3b2] font-semibold"> / unit</span></p>

            <div className="flex items-center gap-2 mt-4">
              <label className="text-[12px] font-semibold text-[#7a8499]">Qty</label>
              <input type="number" min={1} max={100} value={qty[a.key] || 1} onChange={(e) => setQ(a.key, e.target.value)}
                className="w-[64px] rounded-[8px] border border-[#e3e9f5] px-2 py-1.5 text-[14px] text-center outline-none focus:border-[#013186]" />
              <span className="ml-auto text-[14px] font-bold text-[#0b1f44]">${(a.price * (qty[a.key] || 1)).toFixed(0)}</span>
            </div>

            <button onClick={() => buy(a.key)} disabled={busy}
              className="mt-4 h-[44px] rounded-[10px] bg-[#013186] text-white font-bold text-[14px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
              Buy now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
