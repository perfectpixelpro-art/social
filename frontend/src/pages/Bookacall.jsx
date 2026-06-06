import { useEffect } from "react";

const Bookacall = () => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">

      {/* ── Hero ── */}
      <div
        className="w-full"
        style={{
          backgroundImage: "url('/Light-Gradient-BG.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-16 mq450:pt-10 pb-12 flex flex-col items-center text-center">

          {/* Heading */}
          <h1 className="text-[#013186] font-bold leading-tight m-0 mt-8" style={{ fontSize: "clamp(40px, 7vw, 96px)" }}>
            Book a Free Strategy Call
          </h1>
          <p className="mt-3 text-[rgba(0,0,0,0.45)] font-semibold" style={{ fontSize: "clamp(16px, 2vw, 26px)" }}>
            Schedule a call on Zoom to speak with a member of our team.
          </p>

          {/* ── Calendly Widget ── */}
          <div
            className="calendly-inline-widget w-full mt-10"
            data-url="https://calendly.com/chirag-thesocial99/30min"
            style={{ minWidth: "320px", height: "700px" }}
          />

        </div>
      </div>

    </div>
  );
};

export default Bookacall;