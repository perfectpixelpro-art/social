export default function PetCompetitionSection() {
  const cards = [
    {
      icon: "👁️",
      title: "Visibility = Bookings",
      desc: "Pet owners book who they see most. If you're not in their feed, you don't exist at booking time.",
    },
    {
      icon: "🗓️",
      title: "Their calendar is full. Yours has gaps.",
      desc: "The difference isn't skill or price. It's consistent online presence — week after week.",
    },
    {
      icon: "⚡",
      title: "Right now — that's not you. Yet.",
      desc: "We fix that. Fully done-for-you, starting the same day you sign up.",
    },
  ];

  return (
    <section className="bg-[#023186] py-[70px] md:py-[85px] lg:py-[95px]">
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
        <div
          className="
            grid
            lg:grid-cols-[520px_460px]
            xl:grid-cols-[560px_500px]
            justify-between
            gap-12
            lg:gap-16
            items-start
          "
        >
          {/* LEFT CONTENT */}
          <div className="max-w-[560px]">
            <h2
              className="
                text-white
                font-bold
                tracking-[-2px]
                leading-[0.92]
                text-[40px]
                md:text-[48px]
                lg:text-[56px]
              "
            >
              <span className="block">
                The Groomer Down
              </span>

              <span className="block">
                the Street Isn't{" "}
                <span className="text-[#6FAEFF]">
                  Better
                </span>
              </span>

              <span className="block">
                Than You.
              </span>
            </h2>

            <p
              className="
                mt-7
                text-white/85
                text-[14px]
                leading-[1.9]
                max-w-[470px]
              "
            >
              They're just louder. Their work is average.
              Their prices are the same. But their booking
              calendar is full — and yours has gaps.
            </p>

            <p
              className="
                mt-5
                text-white/85
                text-[14px]
                leading-[1.9]
                max-w-[470px]
              "
            >
              Every single week, pet owners in your city
              are seeing their content. Their happy dogs.
              Their clean cuts. When it's time to book?
              <span className="font-bold text-white">
                {" "}
                They don't think twice.
              </span>{" "}
              <span className="font-bold text-white">
                They go with who they know.
              </span>
            </p>
          </div>

          {/* RIGHT CARDS */}
          <div className="space-y-4 lg:pt-2">
            {cards.map((card, index) => (
              <div
                key={index}
                className="
                  w-full
                  rounded-[12px]
                  border
                  border-white/20
                  bg-white/[0.03]
                  backdrop-blur-sm
                  px-5
                  py-4
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      text-[14px]
                      flex-shrink-0
                    "
                  >
                    {card.icon}
                  </div>

                  <div className="flex-1">
                    <h3
                      className="
                        text-white
                        font-semibold
                        text-[16px]
                        lg:text-[17px]
                        leading-[1.2]
                      "
                    >
                      {card.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-white/55
                        text-[12px]
                        leading-[1.7]
                      "
                    >
                      {card.desc}
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