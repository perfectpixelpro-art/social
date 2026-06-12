import { useState, useEffect, useCallback } from "react";
import {
  adminCreateManager, adminListManagers, adminListClients, adminAssignClient,
  adminResetManagerPassword, adminDeleteManager,
} from "../../api";

const initialsOf = (n = "?") => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [pickClients, setPickClients] = useState([]); // client ids to assign on create
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const [expanded, setExpanded] = useState(null); // manager id whose "manage clients" is open

  const load = useCallback(async () => {
    try {
      const [m, c] = await Promise.all([adminListManagers(), adminListClients()]);
      setManagers(m.data || []);
      setClients(c.data || []);
    } catch { /* */ }
  }, []);
  useEffect(() => { load(); }, [load]);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const togglePick = (id) => setPickClients((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const create = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      await adminCreateManager({ ...form, clientIds: pickClients });
      setStatus({ loading: false, ok: true, msg: "Manager created!" });
      setForm({ name: "", email: "", password: "" });
      setPickClients([]);
      load();
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Could not create." });
    }
  };

  const assign = async (clientId, managerId) => {
    try { await adminAssignClient(clientId, managerId || null); load(); } catch { /* */ }
  };

  const resetPw = async (m) => {
    const pw = window.prompt(`New password for ${m.name} (min 8 chars):`);
    if (!pw) return;
    try { await adminResetManagerPassword(m.id, pw); alert("Password updated."); }
    catch (err) { alert(err.message || "Failed."); }
  };

  const removeAccess = async (m) => {
    if (!window.confirm(`Remove access for ${m.name}? Their clients become unassigned.`)) return;
    try { await adminDeleteManager(m.id); load(); }
    catch (err) { alert(err.message || "Failed."); }
  };

  return (
    <main className="h-full overflow-y-auto p-6 mq450:p-4">
      <h1 className="m-0 text-[#0b1f44] font-bold" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>Team & Clients</h1>
      <p className="m-0 mt-1 mb-6 text-[14px] text-[#7a8499] font-medium">Create managers, assign clients, and manage their access.</p>

      {/* Add a manager */}
      <section className="rounded-[16px] border border-[#eef1f6] p-6 mq450:p-4 mb-6 max-w-[640px]">
        <h2 className="m-0 text-[16px] font-bold text-[#0b1f44] mb-4">Add a Manager</h2>
        <form onSubmit={create} className="flex flex-col gap-4">
          <input value={form.name} onChange={upd("name")} required placeholder="Full name" className="rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186]" />
          <input value={form.email} onChange={upd("email")} required type="email" placeholder="Email" className="rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186]" />
          <input value={form.password} onChange={upd("password")} required type="password" placeholder="Password (min 8 chars)" className="rounded-[10px] border border-[#e3e9f5] px-4 py-2.5 text-[14px] outline-none focus:border-[#013186]" />

          {/* assign clients on create */}
          <div>
            <p className="m-0 mb-2 text-[13px] font-bold text-[#0b1f44]">Assign clients <span className="text-[#9aa3b2] font-medium">(optional)</span></p>
            <div className="max-h-[160px] overflow-y-auto rounded-[10px] border border-[#e3e9f5] p-2 flex flex-col gap-1">
              {clients.length === 0 && <p className="m-0 text-[13px] text-[#9aa3b2] px-1">No clients yet.</p>}
              {clients.map((c) => (
                <label key={c._id} className="flex items-center gap-2 px-2 py-1.5 rounded-[8px] hover:bg-[#f5f7fb] cursor-pointer text-[13px]">
                  <input type="checkbox" checked={pickClients.includes(c._id)} onChange={() => togglePick(c._id)} className="accent-[#013186]" />
                  <span className="font-semibold text-[#0b1f44]">{c.name}</span>
                  <span className="text-[#9aa3b2]">{c.email}</span>
                  {c.assignedManager && <span className="ml-auto text-[11px] text-[#9aa3b2]">→ {c.assignedManager.name}</span>}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={status.loading} className="h-[46px] rounded-[10px] bg-[#013186] text-white font-bold text-[15px] hover:bg-[#012270] cursor-pointer disabled:opacity-60">
            {status.loading ? "Creating..." : "Create Manager"}
          </button>
          {status.msg && <p className={`text-[13px] font-semibold m-0 ${status.ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{status.msg}</p>}
        </form>
      </section>

      {/* Managers list with actions */}
      <h2 className="m-0 mb-3 text-[16px] font-bold text-[#0b1f44]">Managers ({managers.length})</h2>
      <div className="grid grid-cols-2 mq1125:grid-cols-1 gap-4">
        {managers.map((m) => (
          <section key={m.id} className="rounded-[16px] border border-[#eef1f6] p-5 mq450:p-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-[14px] font-bold">{initialsOf(m.name)}</span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[15px] font-bold text-[#0b1f44] truncate">{m.name}</p>
                <p className="m-0 text-[12px] text-[#9aa3b2] truncate">{m.email} · {m.clientCount} client{m.clientCount !== 1 ? "s" : ""}</p>
              </div>
            </div>

            {/* assigned clients chips */}
            {m.clients.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {m.clients.map((c) => (
                  <span key={c.id} className="text-[11px] font-semibold text-[#013186] bg-[#eaf1ff] rounded-full px-2.5 py-1 flex items-center gap-1">
                    {c.name}
                    <button onClick={() => assign(c.id, null)} title="Unassign" className="text-[#9aa3b2] hover:text-[#dc2626] cursor-pointer">✕</button>
                  </span>
                ))}
              </div>
            )}

            {/* actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => setExpanded(expanded === m.id ? null : m.id)} className="text-[13px] font-semibold text-[#013186] border border-[#cfe0ff] rounded-[8px] px-3 py-2 hover:bg-[#f0f6ff] cursor-pointer">Assign clients</button>
              <button onClick={() => resetPw(m)} className="text-[13px] font-semibold text-[#5b6472] border border-[#e3e9f5] rounded-[8px] px-3 py-2 hover:bg-[#f5f7fb] cursor-pointer">Reset password</button>
              <button onClick={() => removeAccess(m)} className="text-[13px] font-semibold text-[#dc2626] border border-[#f3c0c0] rounded-[8px] px-3 py-2 hover:bg-[#fdf2f2] cursor-pointer">Remove access</button>
            </div>

            {/* expandable assign list */}
            {expanded === m.id && (
              <div className="mt-3 rounded-[10px] border border-[#eef1f6] p-2 max-h-[200px] overflow-y-auto flex flex-col gap-1">
                {clients.map((c) => {
                  const assignedHere = c.assignedManager?._id === m.id;
                  return (
                    <div key={c._id} className="flex items-center gap-2 px-2 py-1.5 rounded-[8px] hover:bg-[#f5f7fb] text-[13px]">
                      <span className="font-semibold text-[#0b1f44] flex-1 truncate">{c.name}</span>
                      {assignedHere ? (
                        <button onClick={() => assign(c._id, null)} className="text-[12px] font-semibold text-[#dc2626] cursor-pointer">Unassign</button>
                      ) : (
                        <button onClick={() => assign(c._id, m.id)} className="text-[12px] font-semibold text-[#013186] cursor-pointer">
                          Assign{c.assignedManager ? ` (from ${c.assignedManager.name})` : ""}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
        {managers.length === 0 && <p className="text-[13px] text-[#9aa3b2]">No managers yet.</p>}
      </div>
    </main>
  );
}
