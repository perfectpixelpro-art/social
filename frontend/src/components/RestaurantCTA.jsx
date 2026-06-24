import { Link } from "react-router-dom";

export default function RestaurantCTA() {
  return (
    <section className="bg-[#07338C] py-20 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="max-w-[760px] mx-auto text-center">
          {/* Heading */}
          <h2 className="leading-[1.2]">
            <span
              className="
                block
                text-white
                font-black
                tracking-[-2px]
                text-[42px]
                sm:text-[56px]
                md:text-[68px]
                lg:text-[76px]
              "
            >
              They’re scrolling.
            </span>

            <span
              className="
                block
                text-[#4F97FF]
                italic
                font-semibold
                text-[40px]
                sm:text-[52px]
                md:text-[62px]
                lg:text-[70px]
                -mt-2
              "
              style={{
                fontFamily:
                  "Georgia, Times New Roman, serif",
              }}
            >
              They’re hungry.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="
              mt-5
              text-white/90
              text-[15px]
              md:text-[18px]
              leading-[1.8]
            "
          >
            Make sure your food is what they remember.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-8
              flex
              flex-col
              sm:flex-row
              justify-center
              items-center
              gap-4
            "
          >
            <Link
              to="/pricing"
              className="
                h-[56px]
                min-w-[260px]
                px-8
                rounded-[10px]
                bg-white
                text-[#07338C]
                font-bold
                text-[15px]
                inline-flex
                items-center
                justify-center
                shadow-[0_15px_35px_rgba(0,0,0,0.15)]
                hover:opacity-90
                transition
              "
            >
              Start for $99 — No Risk
            </Link>

            <Link
              to="/book-a-call"
              className="
                h-[56px]
                min-w-[260px]
                px-8
                rounded-[10px]
                border
                border-white/20
                text-white
                font-semibold
                text-[15px]
                inline-flex
                items-center
                justify-center
                hover:bg-white/5
                transition
              "
            >
              📅 Book a Free Strategy Call
            </Link>
          </div>

          {/* Bottom Text */}
          <p
            className="
              mt-6
              text-white/70
              text-[12px]
              md:text-[13px]
            "
          >
            No contracts • Cancel anytime • Start the same day
          </p>
        </div>
      </div>
    </section>
  );
}