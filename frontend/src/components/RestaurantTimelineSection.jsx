export default function RestaurantTimelineSection() {
  const timeline = [
    {
      week: "W1",
      label: "WEEK 1",
      title: "Content goes live",
      desc: "Your content starts going out. The vibe, the drinks, the atmosphere all of it.",
    },
    {
      week: "W2",
      label: "WEEK 2",
      title: "Local Crowds Notice",
      desc: "Local crowds start seeing what they're missing. Your bar is on their radar.",
    },
    {
      week: "W4",
      label: "WEEK 4",
      title: "Events Get Anticipated",
      desc: "Your events start getting anticipated before they happen. People are waiting for them.",
    },
    {
      week: "W8",
      label: "WEEK 8",
      title: "Fridays Look Different",
      desc: "Your Friday looks different. Your Saturday looks different. Your regulars bring people.",
    },
  ];

  return (
    <>
      <section className="bg-white pt-[80px] md:pt-[100px] lg:pt-[120px] mb-20">
        <div
          className="
            max-w-[1440px]
            mx-auto
            px-5
            md:px-10
            lg:px-[40px]
            xl:px-[60px]
            2xl:px-0
          "
        >
          {/* LABEL */}
          <div className="flex justify-center items-center gap-2 mb-5">
            <div className="w-8 h-[1px] bg-[#2C9CEC]" />

            <span
              className="
                uppercase
                tracking-[2px]
                text-[11px]
                font-semibold
                text-[#2C9CEC]
              "
            >
              THE TIMELINE
            </span>
          </div>

          {/* HEADING */}
          <h2
            className="
              text-center
              font-black
              uppercase
              leading-[0.95]
              tracking-[-2px]
              text-[#011f52]
              text-[34px]
              sm:text-[44px]
              lg:text-[58px]
            "
          >
            <div>
              WHAT HAPPENS WHEN YOUR
            </div>

            <div>
              BAR SHOWS UP{" "}
              <span className="text-[#0170E0] italic">
                ONLINE EVERY WEEK
              </span>
            </div>
          </h2>

          {/* MOBILE */}
          <div className="mt-14 flex flex-col gap-10 lg:hidden">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-5"
              >
                <div
                  className="
                    w-[54px]
                    h-[54px]
                    rounded-full
                    border-2
                    border-[#2C9CEC]
                    flex
                    items-center
                    justify-center
                    text-[#0B6CFB]
                    font-black
                    flex-shrink-0
                  "
                >
                  {item.week}
                </div>

                <div>
                  <div
                    className="
                      text-[#2C9CEC]
                      text-[11px]
                      font-bold
                      tracking-[1px]
                    "
                  >
                    {item.label}
                  </div>

                  <h3
                    className="
                      mt-1
                      text-[#013186]
                      font-bold
                      text-[22px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[#667085]
                      text-[15px]
                      leading-[1.8]
                    "
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block mt-16">
            <div className="relative">
              <div
                className="
                  absolute
                  top-[23px]
                  left-[10%]
                  right-[10%]
                  h-[2px]
                  bg-[#D9E8FA]
                "
              />

              <div className="grid grid-cols-4 gap-6">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="text-center relative"
                  >
                    <div
                      className="
                        w-[52px]
                        h-[52px]
                        rounded-full
                        border-2
                        border-[#2C9CEC]
                        bg-white
                        flex
                        items-center
                        justify-center
                        mx-auto
                        text-[#0B6CFB]
                        font-black
                        text-[20px]
                        shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                      "
                    >
                      {item.week}
                    </div>

                    <div
                      className="
                        mt-5
                        text-[#2C9CEC]
                        text-[11px]
                        font-bold
                        tracking-[1px]
                      "
                    >
                      {item.label}
                    </div>

                    <h3
                      className="
                        mt-2
                        text-[#203b68]
                        font-bold
                        text-[20px]
                        leading-tight
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[#667085]
                        text-[15px]
                        leading-[1.8]
                      "
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLUE CTA */}
      <section className="bg-[#013186] py-[34px] md:py-[42px]">
        <div
          className="
            max-w-[1440px]
            mx-auto
            px-5
            md:px-10
            lg:px-[40px]
            xl:px-[60px]
            2xl:px-0
          "
        >
          <h3
            className="
              text-center
              font-black
              uppercase
              tracking-[-1px]
              leading-tight
              text-white
              text-[28px]
              md:text-[38px]
            "
          >
            THIS ISN'T LUCK. THIS IS WHAT{" "}
            <span className="text-[#5EA4FF] italic">
              CONSISTENCY
            </span>{" "}
            DOES FOR A BAR.
          </h3>
        </div>
      </section>
    </>
  );
}