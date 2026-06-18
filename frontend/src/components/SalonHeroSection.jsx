import { Link } from "react-router-dom";

export default function SalonHeroSection() {
  const cards = [
    {
      title: "Weekly Reels = top of mind",
      desc: "Salons that post consistently stay visible. And visible means booked — even before a client knows they need you.",
    },
    {
      title: "Familiarity builds trust",
      desc: "People don't book after seeing you once. They book after seeing your transformations four, five, six times in their scroll.",
    },
    {
      title: "Real work, real results",
      desc: "Generic stock content doesn't convert. Your cuts, your color work, your actual clients — that's what makes someone pick up the phone.",
    },
  ];

  return (
    <section className="overflow-hidden pt-[70px] md:pt-[90px] lg:pt-[110px] pb-[80px] md:pb-[100px] lg:pb-[120px]">
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
        {/* HERO */}
        <div className="text-center max-w-[1000px] mx-auto">
          {/* LABEL */}
          <div className="flex justify-center mb-6">
            <div
              className="
                bg-[#DDE8FF]
                rounded-full
                px-4
                py-2
                text-[10px]
                font-semibold
                tracking-[1px]
                uppercase
                text-[#013186]
              "
            >
              ✦ Social Media For Salons
            </div>
          </div>

          {/* HEADING */}
          <h1
            className="
              text-[#013186]
              font-bold
              tracking-[-2px]
              leading-[0.95]
              text-[34px]
              sm:text-[46px]
              md:text-[58px]
              lg:text-[68px]
            "
          >
            Social Media for Salons
          </h1>

          <h2
            className="
              mt-1
              text-[#0170E0]
              italic
              font-semibold
              leading-none
              text-[26px]
              sm:text-[34px]
              md:text-[44px]
              lg:text-[56px]
            "
            style={{
              fontFamily:
                "Georgia, Times New Roman, serif",
            }}
          >
            <span className="hidden sm:inline">
              That Don't Have Empty Slots
            </span>

            <span className="sm:hidden">
              That Don't Have
              <br />
              Empty Slots
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-7
              text-[#7C8497]
              text-[15px]
              md:text-[16px]
              leading-[1.8]
              max-w-[520px]
              mx-auto
            "
          >
            Done-for-you content and posting so your work
            is seen regularly and picked when clients are
            ready.
          </p>

          {/* BUTTONS */}
<div
  className="
    mt-8
    flex
    flex-col
    sm:flex-row
    items-center
    justify-center
    gap-3
    sm:gap-2
  "
>
  <Link
    to="/book-a-call"
    className="
      h-[46px]
      px-4
      bg-[#DDE8FF]
      rounded-full
      text-[#013186]
      text-[13px]
      font-medium
      inline-flex
      items-center
      justify-center
      gap-2
      w-fit
      self-center
      transition
      hover:opacity-90
    "
  >
    Book a Free Strategy Call

    <span
      className="
        w-8
        h-8
        rounded-full
        bg-[#BFD3FF]
        flex
        items-center
        justify-center
        text-[14px]
      "
    >
      →
    </span>
  </Link>

  <Link
    to="/book-a-call"
    className="
      h-[46px]
      px-4
      bg-[#DDE8FF]
      rounded-full
      text-[#013186]
      text-[13px]
      font-medium
      inline-flex
      items-center
      justify-center
      gap-2
      w-fit
      self-center
      transition
      hover:opacity-90
    "
  >
    Start for $99

    <span
      className="
        w-8
        h-8
        rounded-full
        bg-[#BFD3FF]
        flex
        items-center
        justify-center
        text-[14px]
      "
    >
      →
    </span>
  </Link>
</div>
        </div>

        {/* BOTTOM SECTION */}
        <div
          className="
            mt-[80px]
            md:mt-[100px]
            lg:mt-[120px]
            grid
            grid-cols-1
            lg:grid-cols-[1fr_560px]
            xl:grid-cols-[1fr_620px]
            gap-10
            lg:gap-16
            items-center
          "
        >
          {/* LEFT SIDE */}
          <div className="max-w-[620px]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-[2px] bg-[#2C9CEC]" />

              <span
                className="
                  uppercase
                  tracking-[1px]
                  text-[11px]
                  font-semibold
                  text-[#0170E0]
                "
              >
                WHY IT MATTERS
              </span>
            </div>

            <h2
              className="
                text-[#013186]
                font-bold
                tracking-[-1.5px]
                leading-[1]
                text-[30px]
                sm:text-[36px]
                md:text-[44px]
                lg:text-[50px]
                xl:text-[56px]
              "
            >
              It's Not the Best Stylist Who Wins.
            </h2>

            <h3
              className="
                mt-4
                text-[#0170E0]
                italic
                font-semibold
                leading-none
                text-[28px]
                sm:text-[34px]
                md:text-[40px]
                lg:text-[46px]
              "
              style={{
                fontFamily:
                  "Georgia, Times New Roman, serif",
              }}
            >
              It's the One People Keep
              <br />
              Seeing.
            </h3>

            <p
              className="
                mt-7
                text-[#7C8497]
                text-[15px]
                md:text-[16px]
                leading-[1.9]
                max-w-[500px]
              "
            >
              When someone decides it's time for a haircut
              or color refresh, they don't search for
              hours. They go with whoever's been showing
              up in their feed.
            </p>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="space-y-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="
                  bg-[#F6F9FF]
                  border-l-[3px]
                  border-[#0170E0]
                  rounded-[14px]
                  px-6
                  py-5
                  shadow-[0_2px_12px_rgba(0,0,0,0.03)]
                "
              >
                <h3
                  className="
                    text-[#013186]
                    font-bold
                    text-[18px]
                    md:text-[20px]
                    leading-none
                  "
                >
                  {card.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-[#7C8497]
                    text-[14px]
                    leading-[1.7]
                  "
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}