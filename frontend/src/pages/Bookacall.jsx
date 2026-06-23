import Seo from "../components/Seo";
import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const Bookacall = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();

      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
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

          <div className="w-full mt-10">
            <Cal
              calLink="the-social-99-sstjwg/30min"
              style={{
                width: "100%",
                minHeight: "800px",
                overflow: "hidden",
              }}
              config={{
                layout: "month_view",
                useSlotsViewOnSmallScreen: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookacall;