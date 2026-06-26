import Seo from "../components/Seo";
import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const Bookacall = () => {
  // Render the Cal embed ONLY on the client (not during react-snap pre-render).
  // If react-snap bakes the embed into static HTML, hydration tries to register
  // the <cal-modal-box> custom element a second time -> "already been used" +
  // "Cal is not defined", and the calendar never appears. Mounting client-side
  // only guarantees the embed initialises exactly once.
  const [showCal, setShowCal] = useState(false);

  useEffect(() => {
    if (navigator.userAgent === "ReactSnap") return;
    setShowCal(true);
    (async function () {
      const cal = await getCalApi();
      cal("ui", { hideEventTypeDetails: false });
    })();
  }, []);

  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <Seo path="/book-a-call" title="Book a Free Call | The Social 99" description="Schedule a free, no-obligation call with The Social 99 to discuss how we can grow your business on social media." />
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
          <h1 className="text-[#013186] font-bold leading-tight m-0 mt-8 text-[28px] md:text-[91px]">
            Book a Free Strategy Call
          </h1>

          <p
            className="mt-3 text-[rgba(0,0,0,0.45)] font-semibold"
            style={{ fontSize: "clamp(16px, 2vw, 26px)" }}
          >
            Schedule a call on Zoom to speak with a member of our team.
          </p>

          <div className="w-full mt-10" style={{ minHeight: "650px" }}>
            {showCal && (
              <Cal
                calLink="the-social-99-sstjwg/30min"
                style={{ width: "100%", minHeight: "650px", overflow: "visible" }}
                config={{ useSlotsViewOnSmallScreen: true }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookacall;