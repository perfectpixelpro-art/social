import { useState } from "react";
import { subscribeNewsletter } from "../api";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const res = await subscribeNewsletter(email);
      setStatus({ loading: false, ok: true, msg: res.message || "Subscribed!" });
      setEmail("");
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Failed to subscribe." });
    }
  };

  return (
    <section
      className="w-full py-20 font-[Montserrat] relative overflow-hidden"
      style={{
        backgroundColor: "#f8fbff",
        backgroundImage: `
          linear-gradient(rgba(1, 49, 134, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(1, 49, 134, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    >
      <div className="relative z-10 w-full px-[100px] mq800:px-10 mq450:px-5 flex flex-col items-center text-center gap-5">
        <h2
          className="font-bold text-[#013186] m-0 leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          Subscribe to The Social 99 Newsletter 🗞️
        </h2>
        <p className="text-[19px] mq800:text-base text-[rgba(0,0,0,0.45)] font-semibold m-0">
          Get weekly content ideas, trends, and execution insights.
        </p>

        {/* Input pill — stacks on mobile so nothing is cut off */}
        <form onSubmit={handleSubscribe} className="w-full max-w-[680px] flex items-center rounded-[32px] border border-[rgba(1,49,134,0.15)] bg-white shadow-[0_2px_16px_rgba(1,49,134,0.08)] overflow-hidden pl-6 pr-1.5 py-1.5 mt-2 mq450:flex-col mq450:rounded-[20px] mq450:p-2 mq450:gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="flex-1 w-full bg-transparent border-none outline-none text-base font-[Montserrat] text-[#000] placeholder-[rgba(0,0,0,0.35)] py-2 mq450:text-center"
          />
          <button type="submit" disabled={status.loading} className="flex-shrink-0 cursor-pointer bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors border border-[rgba(1,49,134,0.1)] text-[#000] font-bold text-base rounded-[28px] h-[46px] px-6 flex items-center justify-center gap-2 whitespace-nowrap mq450:w-full mq450:rounded-[16px] disabled:opacity-60">
            {status.loading ? "..." : "Subscribe Now"}
            <span className="text-base">↗</span>
          </button>
        </form>
        {status.msg && (
          <p className={`text-sm font-semibold m-0 ${status.ok ? "text-[#1a8f00]" : "text-[#c0392b]"}`}>{status.msg}</p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
