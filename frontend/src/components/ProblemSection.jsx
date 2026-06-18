export default function ProblemSection() {
  const problems = [
    {
      number: "01",
      title: "Inconsistent Posting",
      description:
        "Weeks go by without a post. Your audience forgets you exist — and so does the algorithm. Inconsistency kills momentum.",
    },
    {
      number: "02",
      title: "No Trust Built Online",
      description:
        "Results, testimonials, and before/afters are what convert followers into clients. Without them, you're just another clinic.",
    },
    {
      number: "03",
      title: "No Time to Create",
      description:
        "You're running a clinic, not a content studio. Every hour you spend on captions is an hour not spent with clients.",
    },
  ];

  return (
    <section className=" py-[70px] md:py-[90px] lg:py-[110px]">
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
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-[2px] bg-[#2C9CEC]" />

          <span className="text-[11px] uppercase tracking-[1px] text-[#7C8497] font-medium">
            THE REAL PROBLEM
          </span>
        </div>

        {/* Heading */}
        <h2
          className="
            text-[#013186]
            font-bold
            leading-[1.05]
            tracking-[-1.5px]
            text-[34px]
            md:text-[48px]
            lg:text-[56px]
            max-w-[900px]
          "
        >
          Why Most Med Spas Struggle to Get Bookings
        </h2>

        {/* Content */}
        <div className="mt-10 lg:mt-14 grid lg:grid-cols-[360px_1fr] gap-10 lg:gap-[70px]">
          {/* Left Content */}
          <div>
            <h3
              className="
                text-[#013186]
                font-semibold
                text-[22px]
                lg:text-[24px]
                leading-[1.3]
              "
            >
              It's not your treatments. It's not your prices.
              It's not even your location.
            </h3>

            <p
              className="
                mt-5
                text-[#6D7587]
                text-[16px]
                leading-[1.9]
              "
            >
              Clients choose the med spa they see most often —
              the one they trust through consistent content and
              visible results. If you're invisible online,
              they're booking someone else.
            </p>
          </div>

          {/* Cards */}
          <div className="max-w-[560px] lg:ml-auto space-y-4">
            {problems.map((item) => (
              <div
                key={item.number}
                className="
                  relative
                  bg-[#EAF1FF]
                  border
                  border-[#C9D9FF]
                  rounded-[14px]
                  px-7
                  py-6
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[6px]
                    bg-[#2C9CEC]
                    rounded-l-[14px]
                  "
                />

                <div className="pl-3">
                  <div
                    className="
                      text-[#013186]
                      font-bold
                      text-[42px]
                      lg:text-[48px]
                      leading-none
                    "
                  >
                    {item.number}
                  </div>

                  <h4
                    className="
                      mt-2
                      text-[#013186]
                      font-semibold
                      text-[18px]
                    "
                  >
                    {item.title}
                  </h4>

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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}