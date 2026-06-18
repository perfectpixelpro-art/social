import { Link } from "react-router-dom";

export default function RestaurantWhatWeDoSection() {
  const items = [
    {
      title: "Weekly content that builds anticipation",
      desc: "Events, atmosphere, drinks all of it posted consistently to build hype before Friday even arrives.",
    },
    {
      title: "Event promotion that actually drives footfall",
      desc: "DJ nights, happy hours, cocktail launches promoted the right way to the right crowd.",
    },
    {
      title: "Stories, reels and posts that sell the vibe",
      desc: "Content that makes people feel the atmosphere before they've walked through the door.",
    },
    {
      title: "Consistent presence across every platform",
      desc: "Instagram, Facebook, everywhere your crowd is covered, every single week.",
    },
    {
      title: "Content that turns followers into regulars",
      desc: "Not just reach the kind of content that builds loyalty and keeps them coming back.",
    },
  ];

  return (
    <section className="bg-[#013186] py-[80px] md:py-[100px] lg:py-[120px]">
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
            lg:grid-cols-[420px_1fr]
            gap-12
            lg:gap-80
            items-start
          "
        >
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-[1px] bg-white/20" />
              <span
                className="
                  uppercase
                  text-[11px]
                  tracking-[2px]
                  font-semibold
                  text-white/60
                "
              >
                WHAT WE DO
              </span>

              
            </div>

            <h2
              className="
                font-black
                uppercase
                leading-[1.2]
                tracking-[-2px]
                text-white
                text-[40px]
                sm:text-[48px]
                lg:text-[58px]
              "
            >
              <div>YOU RUN THE BAR.</div>

              <div className="text-[#5EA4FF] italic">
                WE PACK IT.
              </div>
            </h2>

            <p
              className="
                mt-5
                text-white/70
                text-[15px]
                leading-[1.8]
                max-w-[350px]
              "
            >
              No more scrambling for last minute posts.
              No more dead Fridays. No more watching the
              place next door get the crowd you deserve.
            </p>
          </div>

          {/* RIGHT */}
          <div>
            {items.map((item, index) => (
              <div
                key={index}
                className="
                  py-5
                  border-b
                  border-white/10
                  flex
                  gap-4
                  items-start
                "
              >
                <div
                  className="
                    w-6
                    h-6
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-[#013186]
                    text-[12px]
                    font-bold
                    flex-shrink-0
                    mt-[2px]
                  "
                >
                  ✓
                </div>

                <div>
                  <h3
                    className="
                      text-white
                      font-semibold
                      text-[20px]
                      leading-tight
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-white/65
                      text-[15px]
                      leading-[1.7]
                    "
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-8">
              <Link
                to="/book-a-call"
                className="
                  inline-flex
                  items-center
                  justify-center
                  h-[54px]
                  px-8
                  bg-[#0B6CFB]
                  text-white
                  font-semibold
                  text-[14px]
                  uppercase
                  tracking-[0.5px]
                  rounded-[4px]
                  hover:opacity-90
                  transition
                "
              >
                ⏳ DONE FOR YOU. EVERY SINGLE WEEK.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}