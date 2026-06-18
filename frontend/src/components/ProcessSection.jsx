export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      step: "STEP ONE",
      title: "Discovery",
      description:
        "We learn your services, goals, aesthetic, and client base. No generic content—everything is built around your clinic.",
    },
    {
      number: "2",
      step: "STEP TWO",
      title: "Content Creation",
      description:
        "Our team creates a full month of branded, treatment-specific content, graphics, captions, videos, and scheduling plans.",
    },
    {
      number: "3",
      step: "STEP THREE",
      title: "Review",
      description:
        "You review every post before it goes live. Revisions included. You approve—we take it from there.",
    },
    {
      number: "4",
      step: "STEP FOUR",
      title: "Posting",
      description:
        "Content goes live on a consistent schedule. 4+ posts per week, optimized for timing, platform, and engagement.",
    },
  ];

  const benefits = [
    {
      title: "Start Same Day",
      description: "No waiting period. We move fast.",
    },
    {
      title: "No Long Onboarding",
      description: "Simple setup. Fast discovery call.",
    },
    {
      title: "Cancel Anytime",
      description: "No penalties. No awkward calls.",
    },
    {
      title: "No Contracts",
      description: "Month-to-month. Your call, always.",
    },
    {
      title: "Simple and Fast",
      description: "Streamlined to reduce your effort.",
    },
    {
      title: "Transparent Pricing",
      description: "Know what you pay. No surprises.",
    },
  ];

  return (
    <section className="bg-[#F4F5F7] py-[70px] md:py-[90px] lg:py-[110px]">
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
        {/* TOP LABEL */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-4 h-[2px] bg-[#2C9CEC]" />

          <span className="text-[11px] uppercase tracking-[1px] text-[#7C8497] font-medium">
            HOW IT WORKS
          </span>
        </div>

        {/* MAIN HEADING */}
        <h2
          className="
            text-center
            text-[#013186]
            font-bold
            tracking-[-1.5px]
            leading-[1.05]
            text-[34px]
            md:text-[48px]
            lg:text-[56px]
          "
        >
          How It Starts and{" "}
          <span className="text-[#0170E0]">
            Moves Forward
          </span>
        </h2>

        <p
          className="
            mt-4
            text-center
            text-[#6D7587]
            text-[16px]
            md:text-[18px]
            max-w-[800px]
            mx-auto
          "
        >
          A simple, fast process—from your first call to content
          live on your feed.
        </p>

        {/* DESKTOP PROCESS */}
        <div className="mt-20 relative hidden lg:block">
          {/* LINE */}
          <div
            className="
              absolute
              top-[21px]
              left-[80px]
              right-[80px]
              h-[1px]
              bg-[#D8E2F3]
            "
          />

          <div className="grid grid-cols-4 gap-10 relative">
            {steps.map((item) => (
              <div key={item.number} className="text-center">
                {/* Circle */}
                <div
                  className="
                    mx-auto
                    w-[44px]
                    h-[44px]
                    rounded-full
                    bg-[#EEF4FF]
                    border
                    border-[#BFD2F5]
                    flex
                    items-center
                    justify-center
                    text-[#013186]
                    font-bold
                    text-[22px]
                    relative
                    z-10
                  "
                >
                  {item.number}
                </div>

                {/* Step */}
                <p
                  className="
                    mt-5
                    text-[11px]
                    tracking-[1px]
                    uppercase
                    text-[#7C8497]
                  "
                >
                  {item.step}
                </p>

                {/* Title */}
                <h3
                  className="
                    mt-2
                    text-[#013186]
                    font-bold
                    text-[20px]
                  "
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-3
                    text-[#6D7587]
                    text-[15px]
                    leading-[1.8]
                  "
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE + TABLET PROCESS */}
        <div className="mt-12 lg:hidden space-y-5">
          {steps.map((item) => (
            <div
              key={item.number}
              className="
                bg-white
                border
                border-[#D9E4F6]
                rounded-[16px]
                p-5
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#EEF4FF]
                    border
                    border-[#BFD2F5]
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-[#013186]
                  "
                >
                  {item.number}
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[1px] text-[#7C8497]">
                    {item.step}
                  </p>

                  <h3 className="text-[#013186] font-bold text-[18px]">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p
                className="
                  mt-4
                  text-[#6D7587]
                  text-[15px]
                  leading-[1.8]
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ZERO RISK */}
        <div className="mt-24 md:mt-28">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-4 h-[2px] bg-[#2C9CEC]" />

            <span className="text-[11px] uppercase tracking-[1px] text-[#7C8497] font-medium">
              ZERO RISK
            </span>
          </div>

          {/* HEADING */}
          <h2
            className="
              text-center
              text-[#013186]
              font-bold
              tracking-[-1.5px]
              leading-[1.05]
              text-[34px]
              md:text-[48px]
              lg:text-[56px]
              max-w-[800px]
              mx-auto
            "
          >
            <span className="text-[#0170E0]">
             Get Started 
            </span> Without
            <br />

            Delays or Risk
          </h2>

          {/* BENEFITS GRID */}
          <div
            className="
              mt-14
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
            "
          >
            {benefits.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-[#D9E4F6]
                  rounded-[14px]
                  p-6
                "
              >
                <div className="flex gap-4">
                  {/* Check */}
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      border
                      border-[#BFD2F5]
                      flex
                      items-center
                      justify-center
                      text-[#2C9CEC]
                      font-bold
                      shrink-0
                    "
                  >
                    ✓
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-[#013186]
                        text-[18px]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[#6D7587]
                        text-[15px]
                        leading-[1.8]
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}