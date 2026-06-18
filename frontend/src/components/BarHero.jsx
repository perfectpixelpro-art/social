import React from "react";
import { useNavigate } from "react-router-dom";

import BarImg from "../assets/BarImg.webp";
import BarHero from "../assets/Barhero.png";

const BarHeroSection = () => {
  const navigate = useNavigate();

  const handleBookCall = () => {
    navigate("/book-a-call");
  };

  return (
    <section className="overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12 lg:py-28 xl:px-0">

        <div className="grid lg:grid-cols-[560px_360px] items-center justify-between gap-16 lg:gap-24 ">

          {/* LEFT CONTENT */}
          <div className="max-w-[560px]">
            <h1
              className="
                font-black
                uppercase
                leading-[1.3]
                tracking-[0-2px]
                text-[#0A3D98]
              "
            >
              <div className="text-[38px] md:text-[50px] lg:text-[58px] lg:whitespace-nowrap">
                YOUR BAR IS{" "}
                <span className="text-[#1E73FF]">READY.</span>
              </div>

              <div className="text-[38px] md:text-[50px] lg:text-[58px] lg:whitespace-nowrap">
                YOUR STAGE IS{" "}
                <span className="text-[#1E73FF]">SET.</span>
              </div>

              <div className="text-[38px] md:text-[50px] lg:text-[58px] lg:whitespace-nowrap">
                YOUR SEATS ARE{" "}
                <span className="italic">EMPTY.</span>
              </div>
            </h1>

            <p className="mt-3 max-w-[430px] text-[#757575] text-[14px] leading-7">
              Every weekend, bars across Manchester and Nashville are turning
              people away at the door. Same city. Same night. Same crowd
              available. The only difference? They knew where to go, because
              someone told them online.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={handleBookCall}
                className="
                  bg-[#0057FF]
                  hover:bg-[#0049d9]
                  text-white
                  uppercase
                  font-bold
                  text-[10px]
                  tracking-wide
                  px-6
                  py-3
                  rounded-sm
                  transition-all
                  duration-300
                "
              >
                BOOK A FREE STRATEGY CALL
              </button>

              <button
                onClick={handleBookCall}
                className="
                  bg-white
                  border
                  border-[#E5E5E5]
                  shadow-sm
                  hover:shadow-md
                  text-[#4B4B4B]
                  font-semibold
                  text-[13px]
                  px-6
                  py-3
                  rounded-sm
                  transition-all
                  duration-300
                "
              >
                Start for $99 →
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center lg:justify-end -mt-2">

            {/* Outer glow/shadow wrapper */}
            <div
              className="relative rounded-2xl p-3 shadow-lg"
              style={{ backgroundColor: "#f2f7fe" }}
            >
              {/* Ranking Card with border */}
              <img
                src={BarImg}
                alt="Bar Ranking"
                className="
                  block
                  w-[330px]
                  object-contain
                  rounded-xl
                  border-2
                  border-[#dde8fb]
                "
              />

              {/* Hero Badge - centered at bottom of BarImg, overlapping */}
              <img
                src={BarHero}
                alt="Hero Badge"
                className="
                  absolute
                  bottom-[-18px]
                  left-1/2
                  -translate-x-1/2
                  w-[260px]
                  z-20
                 
                "
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BarHeroSection;



