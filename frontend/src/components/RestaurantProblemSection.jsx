export default function RestaurantProblemSection() {
  return (
    <section className="bg-[#F2F7FE] py-[80px] md:py-[100px] lg:py-[120px]">
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
            gap-10
            lg:gap-84
            items-start
          "
        >
          {/* LEFT SIDE */}
          <div>
            {/* LABEL */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="
                  uppercase
                  text-[#2C9CEC]
                  tracking-[2px]
                  text-[11px]
                  font-semibold
                "
              >
                THE PROBLEM
              </span>

              <div className="w-10 h-[1px] bg-[#C8D8F3]" />
            </div>

           {/* HEADING */}
<h2
  className="
    font-black
    uppercase
    leading-[0.92]
    tracking-[-1.5px]
    text-[#013186]
    text-[34px]
    sm:text-[42px]
    lg:text-[52px]
  "
>
  <div className="whitespace-nowrap">
    YOU PUT IN THE
  </div>

  <div className="whitespace-nowrap">
    WORK{" "}
    <span className="text-[#0170E0]">
      NOBODY SEES.
    </span>
  </div>
</h2>

            {/* BLUE TEXT */}
            <p
              className="
                mt-5
                text-[#3d63a4]
                text-[15px]
                leading-[1.8]
                max-w-[450px]
              "
            >
              New cocktail menu. Live DJ. Happy hour
              deals that would pull a crowd, if anyone
              knew about them.
            </p>

            {/* SMALL TEXT */}
            <p
              className="
                mt-5
                text-black
                text-[13px]
              "
            >
              That's not a footfall problem.
              That's a visibility problem.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              border-t
              lg:border-t-0
              lg:border-l
              border-[#DCE6F7]
              pt-8
              lg:pt-0
              lg:pl-10
            "
          >
            {/* MAIN CONTENT */}
            <div
              className="
                text-[#303949]
                text-[18px]
                md:text-[20px]
                lg:text-[22px]
                leading-[1.8]
                font-medium
              "
            >
              <p>
                Friday comes. You're ready.
                The bar looks incredible.
              </p>

              <p className="mt-2">
                The playlist is perfect.
              </p>

              <p className="mt-6">
                And then you wait.
              </p>

              <p className="mt-10">
                Because nobody knew.
                Nobody saw.
                Nobody showed up.
              </p>
            </div>

            {/* DIVIDER */}
            <div
              className="
                mt-8
                pt-8
                border-t
                border-[#DCE6F7]
              "
            >
              <h3
                className="
                  text-[#2C7EF8]
                  font-semibold
                  text-[18px]
                  md:text-[22px]
                  lg:text-[24px]
                  leading-tight
                "
              >
                Not because your bar isn't good enough.
              </h3>

              <p
                className="
                  mt-3
                  text-[#1E4FB8]
                  text-[15px]
                  md:text-[16px]
                  leading-[1.8]
                  max-w-[520px]
                "
              >
                Because the bar down the street posted
                about their night three times this week,
                and you posted nothing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}