export default function ContentProcessSection() {
  const steps = [
    {
      number: "1",
      title: "We learn your restaurant",
      text: "Your menu, your style, your crowd. Everything that makes your place worth visiting.",
    },
    {
      number: "2",
      title: "We build your content",
      text: "Structured, consistent, and built around your actual dishes and service experience.",
    },
    {
      number: "3",
      title: "You review",
      text: "Stay involved or stay hands-off. Revisions are included. Your call.",
    },
    {
      number: "4",
      title: "We post without gaps",
      text: "No delays. No last-minute scrambling. Consistent content, every week.",
    },
  ];

  return (
    <section className="py-8 md:py-14 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[420px_1fr]
            gap-16
            lg:gap-[280px]
            xl:gap-[320px]
            items-start
          "
        >
          {/* LEFT SIDE */}
          <div className="max-w-[420px]">
            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-[#DCEEFF]
                text-[#013186]
                text-[10px]
                sm:text-[11px]
                font-semibold
                tracking-[0.08em]
                uppercase
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#013186]" />
              How Your Content Gets Done
            </div>

            {/* Heading */}
            <h2
              className="
                mt-6
                leading-[1]
                tracking-[-1px]
              "
            >
              <span
                className="
                  block
                  text-[#013186]
                  font-black
                  text-[36px]
                  sm:text-[42px]
                  md:text-[48px]
                  lg:text-[52px]
                  lg:whitespace-nowrap
                "
              >
                We keep it simple.
              </span>

              <span
                className="
                  block
                  text-[#2C9CEC]
                  italic
                  font-semibold
                  text-[34px]
                  sm:text-[40px]
                  md:text-[44px]
                  lg:text-[48px]
                  lg:whitespace-nowrap
                "
                style={{
                  fontFamily:
                    "Georgia, Times New Roman, serif",
                }}
              >
                We keep it moving.
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-5
                text-[#7C8497]
                text-[15px]
                md:text-[16px]
                leading-[1.8]
                max-w-[360px]
              "
            >
              No chasing. No last-minute scrambling.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-10 lg:pl-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                {/* Number Circle */}
                <div
                  className="
                    shrink-0
                    w-12
                    h-12
                    rounded-full
                    bg-[#1677E6]
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                    text-[18px]
                  "
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3
                    className="
                      text-[#013186]
                      font-bold
                      text-[24px]
                      leading-tight
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[#7C8497]
                      text-[15px]
                      leading-[1.8]
                      max-w-[520px]
                    "
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}