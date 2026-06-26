import { useState } from "react";
import { submitContact } from "../api";

// "Let's Talk Strategy" lead form. Posts to the backend /contact endpoint,
// which stores the lead and emails it to support@thesocial99.com (Resend).
export default function StrategyForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!form.email.trim()) return setError("Please enter your email.");
    if (!form.message.trim()) return setError("Please tell us about your brand.");

    setStatus("loading");
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        source: "strategy",
      });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Strategy form error:", err);
      setStatus("error");
      setError("Something went wrong. Please try again or email support@thesocial99.com.");
    }
  };

  const inputCls =
    "w-full h-[52px] px-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none";

  if (status === "sent") {
    return (
      <div className="mt-6 rounded-[12px] border border-[#C7D4EC] bg-white p-6 text-center">
        <p className="m-0 text-[#013186] font-bold text-[18px]">Thank you! ✅</p>
        <p className="mt-2 m-0 text-[#6D7587] text-[14px]">
          We&#39;ve received your details and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <input type="text" placeholder="Enter Your Full Name" value={form.name} onChange={update("name")} className={inputCls} />
      <input type="email" placeholder="Enter your email" value={form.email} onChange={update("email")} className={inputCls} />
      <input type="text" placeholder="Enter Your Phone Number" value={form.phone} onChange={update("phone")} className={inputCls} />
      <textarea
        placeholder="Tell Us About Your Brand..."
        rows={5}
        value={form.message}
        onChange={update("message")}
        className="w-full px-4 py-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none resize-none"
      />

      {error && <p className="m-0 text-[#B00020] text-[13px] font-semibold">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="w-full h-[56px] bg-[#DDE8FF] rounded-[12px] flex items-center justify-between px-5 text-[#1D1D1D] font-semibold disabled:opacity-60 cursor-pointer"
      >
        <span>{status === "loading" ? "Sending…" : "Let's get started"}</span>
        <div className="w-10 h-10 rounded-full bg-[#AFC9FF] flex items-center justify-center">→</div>
      </button>
    </div>
  );
}
