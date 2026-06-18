import { Link } from "react-router-dom";

export default function RestaurantFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#013186] py-[90px] md:py-[110px] lg:py-[130px]">
      {/* BACKGROUND WORD */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
          select-none
        "
      >
        <span
          className="
            font-black
            uppercase
            text-white/[0.04]
            leading-none
            tracking-[-8px]
            text-[180px]
            md:text-[280px]
            lg:text-[380px]
          "
        >
          FRIDAY
        </span>
      </div>

      <div
        className="
          relative
          z-10
          max-w-[1440px]
          mx-auto
          px-5
          md:px-10
          lg:px-[40px]
          xl:px-[60px]
          2xl:px-0
          text-center
        "
      >
        {/* TOP LABEL */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <span className="text-[12px]">📍</span>

          <span
            className="
              uppercase
              text-white/80
              text-[11px]
              md:text-[12px]
              tracking-[3px]
              font-semibold
            "
          >
            Manchester • Nashville • Your City
          </span>
        </div>

        {/* HEADING */}
        <h2
          className="
            font-black
            uppercase
            leading-[0.9]
            tracking-[-2px]
            text-white
            text-[42px]
            sm:text-[56px]
            md:text-[72px]
            lg:text-[92px]
          "
        >
          <div>
            SOMEONE IS DECIDING
          </div>

          <div>
            WHERE TO GO
          </div>

          <div className="text-[#5EA4FF] italic">
            THIS FRIDAY.
          </div>
        </h2>

        {/* SUBTEXT */}
        <p
          className="
            mt-5
            text-white/70
            text-[15px]
            md:text-[18px]
          "
        >
          Somewhere in Manchester. Somewhere in Nashville.
        </p>

        {/* BUTTONS */}
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
            to="/start-for-99"
            className="
              h-[54px]
              px-8
              bg-[#0B6CFB]
              text-white
              font-semibold
              text-[14px]
              uppercase
              inline-flex
              items-center
              justify-center
              hover:opacity-90
              transition
            "
          >
            START FOR $99
          </Link>

          <Link
            to="/strategy-call"
            className="
              h-[54px]
              px-8
              bg-white
              text-[#013186]
              font-semibold
              text-[14px]
              inline-flex
              items-center
              justify-center
              border
              border-white
              hover:opacity-90
              transition
            "
          >
            Book a Free Strategy Call →
          </Link>
        </div>

        {/* FOOTNOTE */}
        <p
          className="
            mt-6
            text-white/40
            text-[11px]
            uppercase
            tracking-[1px]
          "
        >
          No contracts • Cancel anytime • Start the same day
        </p>
      </div>
    </section>
  );
}