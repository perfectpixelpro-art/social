import { Link } from "react-router-dom";

export default function PetTimelineSection() {
  const timeline = [
    {
      week: "W1",
      title: "WEEK 1",
      text: "Your content starts going out. Clean. Consistent. On brand. Pet owners in your area see your first posts.",
    },
    {
      week: "W2",
      title: "WEEK 2",
      text: "Local pet owners start seeing your work in their feeds. Your name starts registering.",
    },
    {
      week: "W4",
      title: "WEEK 4",
      text: "Your profile starts looking like the groomer people trust. Engagement picks up. Followers grow.",
    },
    {
      week: "W8",
      title: "WEEK 8",
      text: "Your DMs look different. Your calendar looks different. People are coming to you.",
    },
  ];

  const metrics = [
    { label: "Profile visits", value: "+180%", color: "text-[#00B84F]" },
    { label: "Follower growth", value: "+340 avg / mo", color: "text-[#00B84F]" },
    { label: "DM inquiries", value: "+ Week 3+", color: "text-[#00B84F]" },
    { label: "Booking calendar", value: "Filling up", color: "text-[#00B84F]" },
    { label: "Hours spent on social", value: "0 from you", color: "text-[#FF3B30]" },
  ];

  return (
    <>
      {/* TIMELINE SECTION */}
      <section className="py-[60px] md:py-[90px] lg:py-[110px] bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[40px] xl:px-[60px] 2xl:px-0">

          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-[2px] bg-[#2C9CEC]" />
            <span className="uppercase tracking-[1px] text-[11px] font-medium text-[#8C94A7]">
              THE TIMELINE
            </span>
          </div>

          {/* Heading — breaks to two lines on small screens */}
          <h2 className="text-[#013186] font-bold tracking-[-1px] md:tracking-[-1.5px] leading-[1.1] text-[24px] sm:text-[30px] md:text-[38px] lg:text-[48px]">
            What Happens When You Show Up{" "}
            <span className="text-[#0170E0]">Every Week</span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-[#7C8497] text-[14px] md:text-[15px] leading-[1.8] max-w-[500px]">
            This isn't magic. It's just what happens when a great groomer finally gets seen.
          </p>

          {/* Content grid */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_620px] xl:grid-cols-[1fr_700px] gap-10 lg:gap-16 items-start">

            {/* LEFT TIMELINE */}
            <div className="relative">
              <div className="absolute left-[17px] top-[10px] bottom-[10px] w-[2px] bg-[#DCE5F2]" />

              <div className="space-y-6 md:space-y-7">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4 md:gap-5">
                    <div className="relative z-10 w-9 h-9 rounded-full bg-[#0170E0] border-[3px] border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {item.week}
                    </div>
                    <div>
                      <h3 className="text-[#0170E0] font-bold text-[12px] tracking-[0.5px]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[#64748B] text-[14px] leading-[1.7]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-white rounded-[16px] border border-[#E5EBF5] shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-2 mb-6 md:mb-7">
                <div className="w-4 h-[2px] bg-[#2C9CEC]" />
                <span className="uppercase tracking-[1px] text-[10px] font-semibold text-[#8C94A7]">
                  WHAT GROOMERS TYPICALLY SEE
                </span>
              </div>

              <div className="space-y-5 md:space-y-7">
                {metrics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <span className="text-[#64748B] text-[14px] md:text-[15px]">
                      {item.label}
                    </span>
                    <span className={`text-[14px] md:text-[15px] font-bold ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BLUE CTA SECTION */}
      <section className="bg-[#023186]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[40px] xl:px-[60px] 2xl:px-0 py-[70px] md:py-[110px] lg:py-[130px]">
          <div className="text-center">

            {/* Label */}
            <div className="flex justify-center items-center gap-2 mb-5 md:mb-6">
              <div className="w-4 h-[2px] bg-white/40" />
              <span className="uppercase tracking-[1px] text-[11px] font-medium text-white/60">
                DON'T LET THEM SCROLL PAST YOU
              </span>
            </div>

            {/* Heading — fully fluid across all sizes */}
            <h2 className="text-white font-bold tracking-[-1.5px] md:tracking-[-2px] leading-[1.05] text-[30px] sm:text-[38px] md:text-[50px] lg:text-[64px] max-w-[1100px] mx-auto">
              Somewhere in Austin,{" "}
              <br className="hidden sm:block" />
              a Pet Owner Is{" "}
              <span className="text-[#6FAEFF]">
                Looking for a Groomer
              </span>{" "}
              Right Now.
            </h2>

            {/* Description */}
            <p className="mt-5 text-white/70 text-[14px] md:text-[15px] leading-[1.8] max-w-[500px] mx-auto">
              They're scrolling. They're comparing.
              They're about to book someone.
              Make sure it's you.
            </p>

            {/* Buttons — stack on mobile, row on sm+ */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3">
              <Link
                to="/book-a-call"
                className="w-full sm:w-auto h-[48px] px-6 bg-white text-[#013186] rounded-[6px] text-[13px] font-semibold inline-flex items-center justify-center transition hover:opacity-90"
              >
                Start for $99 — No Risk
              </Link>

              <Link
                to="/book-a-call"
                className="w-full sm:w-auto h-[48px] px-6 border border-white/20 text-white rounded-[6px] text-[13px] font-semibold inline-flex items-center justify-center transition hover:bg-white/5"
              >
                📅 Book a Free Strategy Call
              </Link>
            </div>

            {/* Footnote */}
            <p className="mt-5 text-[11px] text-white/50">
              No contracts • Cancel anytime • Start the same day
            </p>

          </div>
        </div>
      </section>
    </>
  );
}