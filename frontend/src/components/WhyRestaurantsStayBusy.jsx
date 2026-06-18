export default function WhyRestaurantsStayBusy() {
  const cards = [
    {
      icon: "🎬",
      title: "Seen at the right moment",
      text: "The place they keep seeing at 7 PM. Fresh plates, close-up shots, steam, texture. That's what triggers a craving.",
    },
    {
      icon: "🎨",
      title: "The pause-and-pick effect",
      text: "When your food makes someone stop mid-scroll and think 'that looks good'—that's when the decision gets made.",
    },
    {
      icon: "✍️",
      title: "Consistency creates cravings",
      text: "Restaurants that show up regularly build a presence that turns casual scrollers into loyal regulars.",
    },
  ];

  return (
    <section className="py-24 md:py-28 lg:py-32">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Badge */}
        <div className="flex justify-center">
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
              text-[11px]
              font-semibold
              tracking-[0.08em]
              uppercase
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#013186]" />
            Why Some Restaurants Stay Busy
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-[760px] mx-auto text-center mt-8">
          <div className="flex justify-center">
            <div className="inline-block text-center">
              <h2
                className="
                  text-[#013186]
                  font-black
                  leading-[1.05]
                  tracking-[-1px]
                  text-[34px]
                  sm:text-[42px]
                  md:text-[52px]
                  lg:text-[58px]
                "
              >
                <span
                  className="
                    block
                    max-w-max
                    mx-auto
                    lg:whitespace-nowrap
                  "
                >
                  It's not always who cooks better. It's who
                </span>

                <span
                  className="
                    block
                    text-[#2C9CEC]
                    italic
                    font-semibold
                  "
                  style={{
                    fontFamily:
                      "Georgia, Times New Roman, serif",
                  }}
                >
                  stays on people's minds.
                </span>
              </h2>
            </div>
          </div>

          <p
            className="
              mt-7
              mx-auto
              max-w-[620px]
              text-[#7C8497]
              text-[16px]
              md:text-[18px]
              leading-[1.8]
            "
          >
            When someone is hungry, they don't research.
            They react. And they go where the craving
            already exists.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            mt-16
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-[18px]
                p-8
                border
                border-[#EEF2F7]
                shadow-[0_4px_24px_rgba(0,0,0,0.03)]
                relative
              "
            >
              {/* Top Blue Line */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-[3px]
                  bg-[#3D9BFF]
                  rounded-t-[18px]
                "
              />

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#F7F9FC]
                  flex
                  items-center
                  justify-center
                  text-lg
                "
              >
                {card.icon}
              </div>

              <h3
                className="
                  mt-5
                  text-[#013186]
                  font-bold
                  text-[18px]
                  leading-[1.3]
                "
              >
                {card.title}
              </h3>

              <p
                className="
                  mt-4
                  text-[#7C8497]
                  text-[15px]
                  leading-[1.9]
                "
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}