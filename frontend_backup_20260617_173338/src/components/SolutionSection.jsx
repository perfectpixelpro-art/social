import SolutionImg from "../assets/SolutionImg.png";

export default function SolutionSection() {
const solutions = [
{
title: "Content Creation",
description:
"Branded, on point content made for your specific treatments and audience.",
icon: "✎",
},
{
title: "Graphics & Visuals",
description:
"Clean, premium visuals that match your brand aesthetic and attract high value clients.",
icon: "✦",
},
{
title: "Video Editing",
description:
"Short form video content ready for Reels, TikTok, and Stories that drives engagement.",
icon: "◉",
},
{
title: "Captions & Posting",
description:
"Optimized copy and consistent scheduling posted at peak times, every time.",
icon: "▣",
},
{
title: "Platform Management",
description:
"Instagram, Facebook, TikTok fully managed, fully consistent, fully hands-free for you.",
icon: "⌂",
},
];

return ( <section className="py-[70px] md:py-[90px] lg:py-[110px]"> <div
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
{/* Label */} <div className="flex items-center gap-2 mb-4"> <div className="w-4 h-[2px] bg-[#2C9CEC]" />


      <span className="text-[11px] uppercase tracking-[1px] text-[#7C8497] font-medium">
        THE SOLUTION
      </span>
    </div>

    {/* Heading */}
    <h2
      className="
        text-[#013186]
        font-bold
        leading-[1.05]
        tracking-[-1.5px]
        text-[34px]
        md:text-[48px]
        lg:text-[56px]
        max-w-[1000px]
      "
    >
      What Running Your Social Media Should Feel Like
    </h2>

    <p
      className="
        mt-4
        text-[#6D7587]
        text-[16px]
        leading-[1.8]
        max-w-[760px]
      "
    >
      We handle your social media so your business stays visible.
      No guessing. No inconsistency. No wasted time.
    </p>

    <div className="mt-12 lg:mt-16 grid lg:grid-cols-[1fr_580px] gap-10 lg:gap-16 items-center">
      {/* Left Content */}
      <div>
        {solutions.map((item, index) => (
          <div
            key={index}
            className="
              flex
              gap-5
              py-6
              border-b
              border-[#E1E6EE]
              last:border-0
            "
          >
            <div
              className="
                flex-shrink-0
                w-[36px]
                h-[36px]
                rounded-full
                border
                border-[#BFD5FF]
                bg-[#EEF5FF]
                flex
                items-center
                justify-center
                text-[#2C9CEC]
                text-[16px]
              "
            >
              {item.icon}
            </div>

            <div>
              <h3
                className="
                  text-[#013186]
                  font-semibold
                  text-[17px]
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-1
                  text-[#6D7587]
                  text-[15px]
                  leading-[1.8]
                  max-w-[420px]
                "
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Image */}
      <div className="flex justify-center lg:justify-end">
        <img
          src={SolutionImg}
          alt="Solution"
          className="
            w-full
            max-w-[585px]
            h-auto
            object-contain
          "
        />
      </div>
    </div>
  </div>
</section>


);
}
