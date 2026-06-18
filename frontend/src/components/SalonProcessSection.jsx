export default function SalonProcessSection() {
  const results = [
    {
      number: "01",
      icon: "📈",
      title: "3 wks",
      desc: "More profile visits from local clients actively looking for a stylist.",
    },
    {
      number: "02",
      icon: "💬",
      title: "More DMs",
      desc: "More DMs asking about services, pricing, and availability.",
    },
    {
      number: "03",
      icon: "✅",
      title: "More Bookings",
      desc: "A page that looks active and in demand the moment someone lands on it.",
    },
  ];

  const process = [
    {
      step: "1",
      title: "We understand your salon",
      desc: "We learn your services, your style, and your clients — so everything we create feels like it actually came from you, not a template.",
    },
    {
      step: "2",
      title: "We build your weekly content",
      desc: "Your daily work becomes structured, scroll-ready content. Transformations, cuts, color work — turned into posts that perform.",
    },
    {
      step: "3",
      title: "You review (if you want to)",
      desc: "You're in control. Review everything before it goes out, or let us handle it entirely. Either way, nothing gets posted without being exactly right.",
    },
    {
      step: "4",
      title: "We post — every single week",
      desc: "Consistent. On time. No reminders needed. Your page stays active while you focus on the chair.",
    },
  ];

  return (
    <section className="py-[80px] md:py-[100px] lg:py-[120px]">
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
        {/* TOP SECTION */}
        <div className="text-center max-w-[900px] mx-auto">
          {/* Label */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-4 h-[2px] bg-[#2C9CEC]" />

            <span
              className="
                uppercase
                tracking-[1px]
                text-[11px]
                font-semibold
                text-[#2C9CEC]
              "
            >
              WHAT CHANGES
            </span>
          </div>

          {/* Heading */}
          <h2
            className="
              text-[#013186]
              font-bold
              tracking-[-1.5px]
              leading-none
              text-[30px]
              sm:text-[38px]
              md:text-[48px]
              lg:text-[56px]
            "
          >
            What Salons Start
            <span
              className="
                text-[#0170E0]
                italic
                font-semibold
                ml-2
              "
              style={{
                fontFamily:
                  "Georgia, Times New Roman, serif",
              }}
            >
              Seeing.
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mt-4
              text-[#7C8497]
              text-[14px]
              md:text-[15px]
              leading-[1.7]
            "
          >
            We don't overcomplicate it. Here's exactly
            how it works — start to finish.
          </p>
        </div>

        {/* RESULTS CARDS */}
        <div
          className="
            mt-12
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >
          {results.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-[14px]
                border
                border-[#EEF2F7]
                shadow-[0_2px_12px_rgba(0,0,0,0.03)]
                p-6
                relative
                text-center
              "
            >
              {/* Number */}
              <div
                className="
                  absolute
                  top-4
                  left-4
                  bg-[#0B6CFB]
                  text-white
                  text-[10px]
                  font-bold
                  px-2
                  py-1
                  rounded-[6px]
                "
              >
                {item.number}
              </div>

              {/* Icon */}
              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  rounded-full
                  bg-[#F3F7FD]
                  flex
                  items-center
                  justify-center
                  text-[22px]
                "
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  mt-5
                  text-[#0B5ED7]
                  font-bold
                  text-[26px]
                "
              >
                {item.title}
              </h3>

              <div className="w-10 h-[3px] bg-[#2C9CEC] mx-auto mt-3" />

              {/* Desc */}
              <p
                className="
                  mt-4
                  text-[#7C8497]
                  text-[13px]
                  leading-[1.8]
                "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* PROCESS */}
        <div className="mt-[80px]">
          {/* Label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-[2px] bg-[#2C9CEC]" />

            <span
              className="
                uppercase
                tracking-[1px]
                text-[11px]
                font-semibold
                text-[#2C9CEC]
              "
            >
              THE PROCESS
            </span>
          </div>

          {/* Heading */}
          <h2
            className="
              text-[#013186]
              font-bold
              tracking-[-1.5px]
              leading-none
              text-[30px]
              sm:text-[40px]
              md:text-[50px]
            "
          >
            Simple. Handled.
            <span
              className="
                text-[#0170E0]
                italic
                font-semibold
                ml-2
              "
              style={{
                fontFamily:
                  "Georgia, Times New Roman, serif",
              }}
            >
              Done.
            </span>
          </h2>

          <p
            className="
              mt-3
              text-[#7C8497]
              text-[14px]
              md:text-[15px]
            "
          >
            We don't overcomplicate it. Here's exactly
            how it works — start to finish.
          </p>

          {/* Timeline */}
          <div className="mt-10 border-t border-[#DDE8FF]">
            {process.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  gap-4
                  md:gap-6
                  py-6
                  border-b
                  border-[#DDE8FF]
                "
              >
                {/* Number */}
                <div
                  className="
                    w-10
                    h-10
                    min-w-[40px]
                    rounded-full
                    border
                    border-[#9BC5FF]
                    bg-[#F3F8FF]
                    flex
                    items-center
                    justify-center
                    text-[#0B6CFB]
                    font-bold
                  "
                >
                  {item.step}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="
                      text-[#013186]
                      font-bold
                      text-[16px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[#7C8497]
                      text-[14px]
                      leading-[1.8]
                    "
                  >
                    {item.desc}
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