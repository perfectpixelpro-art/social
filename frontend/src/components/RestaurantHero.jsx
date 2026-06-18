import { Link } from "react-router-dom";

import Rest1 from "../assets/Rest1.webp";
import Rest2 from "../assets/Rest2.webp";
import Rest3 from "../assets/Rest3.webp";
import Rest4 from "../assets/Rest4.webp";
import Rest5 from "../assets/Rest5.webp";
import Rest6 from "../assets/Rest6.webp";

export default function RestaurantHero() {
  const images = [Rest1, Rest2, Rest3, Rest4, Rest5, Rest6];

  return (
    <section className="overflow-hidden pt-[90px] md:pt-[110px] lg:pt-[120px] pb-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-14 2xl:px-2  ">

        <div className="relative min-h-[480px] lg:min-h-[520px] flex items-center">

          {/* LEFT CONTENT */}
          <div className="relative z-10 w-full max-w-[500px] text-left">

            <h1 className="leading-[1.05] tracking-[-1px] md:tracking-[-1.5px]">
              {/* Line 1 — wraps on mobile, single line on lg+ */}
              <span
                className="
                  block
                  text-[#013186]
                  font-black
                  text-[32px]
                  sm:text-[40px]
                  md:text-[46px]
                  lg:text-[52px]
                  xl:text-[56px]
                  lg:whitespace-nowrap
                "
              >
                Your Food Looks Incredible.
              </span>

              {/* Line 2 — wraps on mobile, single line on lg+ */}
              <span
                className="
                  block
                  text-[#2C9CEC]
                  italic
                  font-semibold
                  text-[24px]
                  sm:text-[32px]
                  md:text-[38px]
                  lg:text-[44px]
                  xl:text-[48px]
                  mt-[4px]
                  lg:whitespace-nowrap
                "
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                People Just Aren't Craving It Yet.
              </span>
            </h1>

            <p
              className="
                mt-5
                text-[#7C8497]
                text-[14px]
                md:text-[15px]
                leading-[1.9]
                max-w-[380px]
              "
            >
              Right now, they're choosing the place they've been seeing all
              week. We make sure your food shows up often enough to be
              remembered—and picked when they're deciding.
            </p>

            {/* BUTTONS */}
            <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
              <Link
                to="/book-a-call"
                className="
                  h-[48px]
                  px-6
                  bg-[#0B6CFB]
                  text-white
                  font-semibold
                  text-[13px]
                  rounded-md
                  inline-flex
                  items-center
                  justify-center
                  shadow-[0_8px_20px_rgba(11,108,251,0.15)]
                  hover:opacity-90
                  transition
                "
              >
                Book a Free Strategy Call
              </Link>

              <Link
                to="/book-a-call"
                className="
                  h-[48px]
                  px-6
                  bg-white
                  border
                  border-[#DDE7F7]
                  text-[#013186]
                  font-semibold
                  text-[13px]
                  rounded-md
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  shadow-[0_8px_20px_rgba(0,0,0,0.05)]
                  hover:opacity-90
                  transition
                "
              >
                Start for $99 →
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-[#A0A9BC] font-medium">
              Start for $99 · Cancel anytime · No contracts
            </p>
          </div>

          {/* DESKTOP GALLERY — absolutely positioned, floats right */}
          <div
            className="
              hidden lg:block
              absolute
              top-1/2
              -translate-y-1/2
              right-[-40px]
              xl:right-[-60px]
              w-[400px]
              xl:w-[440px]
              z-0
            "
          >
            <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="grid grid-cols-2 gap-[10px]">
              {images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-[12px]">
                  <img src={image} alt={`Restaurant ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
          </div>

        </div>

        {/* MOBILE GALLERY — stacks below content */}
        <div className="lg:hidden mt-8 relative">
          <div className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
          <div className="grid grid-cols-2 gap-[8px]">
            {images.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-[10px]">
                <img src={image} alt={`Restaurant ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}