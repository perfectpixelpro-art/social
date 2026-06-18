export default function RestaurantTruthSection() {
  const cards = [
    {
      number: "01",
      title: "THEY PLAN ONLINE",
      desc: "Thursday night, they're scrolling. Deciding. Saving. The bar they've seen all week gets the booking Friday night.",
    },
    {
      number: "02",
      title: "THEY CHOOSE FAMILIARITY",
      desc: "The vibe they've already seen. The drinks they've already drooled over. They walk in feeling like they already know the place.",
    },
    {
      number: "03",
      title: "SILENCE = INVISIBLE",
      desc: "If you're not showing up in their feed, you don't exist on Friday night. The bar down the street is louder — and fuller.",
    },
  ];

  return (
    <section className="bg-white py-[80px] md:py-[100px] lg:py-[120px]">
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
            THE TRUTH
          </span>
        </div>

        {/* HEADING */}
        <h2
          className="
            text-center
            font-black
            uppercase
            leading-[1.2]
            tracking-[-2px]
            text-[#011f52]
            text-[34px]
            sm:text-[44px]
            lg:text-[58px]
          "
        >
          <div>
            PEOPLE DON'T STUMBLE INTO
          </div>

          <div className="text-[#0170E0] italic">
            BARS ANYMORE.
          </div>
        </h2>

        {/* DESCRIPTION */}
        <div className="max-w-[820px] mx-auto text-center">
          <p
            className="
              mt-6
              text-[#6F7B90]
              text-[15px]
              md:text-[17px]
              leading-[1.9]
            "
          >
            They plan. They scroll. They decide on Thursday where they're going Friday.
            And they choose the place that's been showing up in their feed all week —
            the one with the atmosphere they've already seen, the drinks they've already
            drooled over, the vibe they've already felt before walking through the door.
          </p>

          <p
            className="
              mt-6
              font-semibold
              text-[#013186]
              text-[16px]
            "
          >
            If that's not your bar,
            <span className="text-[#0170E0]">
              {" "}it needs to be.
            </span>
          </p>
        </div>

        {/* CARDS */}
        <div
          className="
            mt-12
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
            lg:gap-6
          "
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="
                bg-[#F7FAFE]
                border
                border-[#DCE6F7]
                rounded-[8px]
                p-6
                md:p-7
                min-h-[230px]
              "
            >
              <div
                className="
                  text-[#0B6CFB]
                  font-black
                  text-[42px]
                  leading-none
                "
              >
                {card.number}
              </div>

              <h3
                className="
                  mt-3
                  text-[#011f52]
                  font-black
                  uppercase
                  text-[24px]
                  leading-[1.05]
                "
              >
                {card.title}
              </h3>

              <p
                className="
                  mt-4
                  text-[#5E6A7F]
                  text-[15px]
                  leading-[1.8]
                "
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}