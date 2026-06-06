import { useState } from "react";
import { submitContact } from "../api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        message: `Business: ${form.business || "—"}\n\n${form.message}`,
      });
      setStatus({ loading: false, ok: true, msg: "Thanks! We'll be in touch shortly." });
      setForm({ name: "", email: "", business: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Failed to send. Try again." });
    }
  };

  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-20">
      <div className="max-w-[600px] mx-auto">
        <h1 className="text-[52px] mq800:text-[38px] mq450:text-[28px] font-bold text-[#013186] mb-4 text-center">Book A Call</h1>
        <p className="text-xl text-[rgba(0,0,0,0.5)] font-semibold text-center mb-12">
          Let's talk about growing your business on social media.
        </p>
        <form onSubmit={handleSubmit} className="rounded-[20px] border border-[rgba(1,49,134,0.15)] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] p-10 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Full Name</label>
            <input value={form.name} onChange={update("name")} required type="text" placeholder="Your name" className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none focus:border-[#013186] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Email Address</label>
            <input value={form.email} onChange={update("email")} required type="email" placeholder="you@example.com" className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none focus:border-[#013186] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Business Name</label>
            <input value={form.business} onChange={update("business")} type="text" placeholder="Your business" className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none focus:border-[#013186] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Message</label>
            <textarea value={form.message} onChange={update("message")} required rows={4} placeholder="Tell us about your goals..." className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none resize-none focus:border-[#013186] transition-colors" />
          </div>
          <button type="submit" disabled={status.loading} className="cursor-pointer bg-[rgba(188,214,255,0.37)] border border-[rgba(1,49,134,0.07)] h-[50px] rounded-[25.5px] flex items-center justify-center font-bold text-[#000] text-base hover:bg-[rgba(188,214,255,0.6)] transition-colors mt-2 disabled:opacity-60">
            {status.loading ? "Sending..." : "Send Message ↗"}
          </button>
          {status.msg && (
            <p className={`text-sm font-semibold text-center m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
