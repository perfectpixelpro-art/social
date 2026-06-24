import { Link } from "react-router-dom";

export default function SalonCTA() {
  return (
    <section className="bg-[#013186] py-[80px] md:py-[100px]">
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
            max-w-[760px]
            mx-auto
            text-center
          "
        >
          {/* Heading */}
          <h2
            className="
              text-white
              font-bold
              leading-[1.05]
              tracking-[-1.5px]
              text-[36px]
              sm:text-[44px]
              md:text-[58px]
            "
          >
            Right Now, Someone
            <br />

            Nearby Is{" "}
            <span
              className="
                text-[#7DB7FF]
                italic
              "
              style={{
                fontFamily:
                  "Georgia, Times New Roman, serif",
              }}
            >
              Ready to Book.
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mt-5
              text-white/70
              text-[14px]
              md:text-[15px]
              leading-[1.8]
              max-w-[520px]
              mx-auto
            "
          >
            They're scrolling. They're deciding.
            Make sure the salon they see and
            remember is yours.
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
              gap-3
            "
          >
            <Link
              to="/pricing"
              className="
                h-[46px]
                px-6
                bg-white
                rounded-full
                text-[#013186]
                text-[13px]
                font-semibold
                inline-flex
                items-center
                justify-center
                whitespace-nowrap
                transition
                hover:opacity-90
              "
            >
              Start for $99 — No Risk
            </Link>

            <Link
              to="/book-a-call"
              className="
                h-[46px]
                px-6
                rounded-full
                border
                border-white/20
                text-white
                text-[13px]
                font-semibold
                inline-flex
                items-center
                justify-center
                whitespace-nowrap
                transition
                hover:bg-white/10
              "
            >
              📅 Book a Free Strategy Call
            </Link>
          </div>

          {/* Bottom Text */}
          <p
            className="
              mt-5
              text-[11px]
              text-white/50
            "
          >
            No contracts • Cancel anytime •
            Start the same day
          </p>
        </div>
      </div>
    </section>
  );
}