export default function PetTrustSection() {
  return (
    <section className="py-[70px] md:py-[90px] lg:py-[110px]">
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
            lg:grid-cols-[620px_1fr]
            xl:grid-cols-[660px_1fr]
            gap-10
            lg:gap-16
            items-center
          "
        >
          {/* LEFT TRUST CARD */}
          <div
            className="
              bg-[#F6F9FF]
              border
              border-[#DDE7F7]
              rounded-[22px]
              p-8
              md:p-10
            "
          >
            <h3
              className="
                text-[#031F52]
                font-bold
                leading-[1.08]
                tracking-[-1px]
                text-[32px]
                md:text-[38px]
              "
            >
              Trust isn't built in a{" "}
              <span className="text-[#0170E0]">
                booking.
              </span>

              <br />

              It's built{" "}
              <span className="text-[#0170E0]">
                before one.
              </span>
            </h3>

            <p
              className="
                mt-5
                text-[#6F778A]
                text-[15px]
                leading-[1.9]
              "
            >
              Nobody Googles "best groomer in Austin"
              and reads 10 websites.
            </p>

            <p
              className="
                mt-2
                text-[#6F778A]
                text-[15px]
                leading-[1.9]
              "
            >
              They book whoever has been showing up in
              their feed for the last 3 weeks — the one
              whose content made them think "okay, I trust
              these people with my dog."
            </p>

            {/* STATS */}
            <div
              className="
                mt-8
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
              "
            >
              {/* CARD 1 */}
              <div
                className="
                  bg-white
                  rounded-[14px]
                  py-6
                  px-4
                  text-center
                  shadow-[0_8px_30px_rgba(1,49,134,0.06)]
                "
              >
                <h4
                  className="
                    text-[#0170E0]
                    font-bold
                    text-[34px]
                    leading-none
                  "
                >
                  3 wks
                </h4>

                <p
                  className="
                    mt-2
                    text-[11px]
                    text-[#8892A7]
                    leading-[1.5]
                  "
                >
                  average time to
                  <br />
                  trust online
                </p>
              </div>

              {/* CARD 2 */}
              <div
                className="
                  bg-white
                  rounded-[14px]
                  py-6
                  px-4
                  text-center
                  shadow-[0_8px_30px_rgba(1,49,134,0.06)]
                "
              >
                <h4
                  className="
                    text-[#0170E0]
                    font-bold
                    text-[34px]
                    leading-none
                  "
                >
                  0×
                </h4>

                <p
                  className="
                    mt-2
                    text-[11px]
                    text-[#8892A7]
                    leading-[1.5]
                  "
                >
                  people read groomer
                  <br />
                  websites before booking
                </p>
              </div>

              {/* CARD 3 */}
              <div
                className="
                  bg-white
                  rounded-[14px]
                  py-6
                  px-4
                  text-center
                  shadow-[0_8px_30px_rgba(1,49,134,0.06)]
                "
              >
                <h4
                  className="
                    text-[#0170E0]
                    font-bold
                    text-[34px]
                    leading-none
                  "
                >
                  Daily
                </h4>

                <p
                  className="
                    mt-2
                    text-[11px]
                    text-[#8892A7]
                    leading-[1.5]
                  "
                >
                  trust is built online,
                  <br />
                  every single day
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="max-w-[620px]">
            {/* LABEL */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-[2px] bg-[#0170E0]" />

              <span
                className="
                  uppercase
                  text-[12px]
                  tracking-[1px]
                  font-medium
                  text-[#0170E0]
                "
              >
                HOW TRUST WORKS
              </span>
            </div>

            {/* HEADING */}
            <h2
              className="
                text-[#031F52]
                font-bold
                leading-[0.95]
                tracking-[-2px]
                text-[38px]
                md:text-[52px]
                lg:text-[58px]
                xl:text-[64px]
              "
            >
              <span className="block">
                Pet Owners Don't
              </span>

              <span className="block">
                Research.
              </span>

              <span className="block">
                They{" "}
                <span className="text-[#0170E0]">
                  Remember.
                </span>
              </span>
            </h2>

            {/* CONTENT */}
            <p
              className="
                mt-7
                text-[#6F778A]
                text-[16px]
                leading-[2]
              "
            >
              And it's built online. Every single day.
              When a pet owner sees your work consistently
              — the gorgeous trims, the happy dogs, the
              real transformations — your name becomes
              the first and only one they think of when
              it's time to book.
            </p>

            <p
              className="
                mt-5
                text-[#6F778A]
                text-[16px]
                leading-[2]
              "
            >
              That's what we build for you.
              <span className="font-bold text-[#031F52]">
                {" "}
                While you groom, we make sure the world
                notices.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}