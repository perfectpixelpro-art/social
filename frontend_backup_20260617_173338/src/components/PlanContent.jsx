import PropTypes from "prop-types";
import Card1 from "../assets/Card1.avif";
import Card2 from "../assets/Card2.avif";
import Card3 from "../assets/Card3.avif";

const Pill = ({ emoji, text }) => (
  <div
    className="
      flex
      items-center
      gap-2
      bg-white/90
      border
      border-[rgba(1,49,134,0.10)]
      shadow-sm
      rounded-full
      px-4
      py-2.5
      mq450:px-2
      mq450:py-1.5
      w-fit
      max-w-full
      overflow-hidden
    "
  >
    <span className="text-[16px] mq450:text-[13px] shrink-0">
      {emoji}
    </span>

    <span
      className="
        text-[14px]
        mq450:text-[10px]
        font-semibold
        text-[#111]
        leading-none
        truncate
      "
    >
      {text}
    </span>
  </div>
);

const cards = [
  {
    title: "Social Media Management",
    pills: [
      { emoji: "📈", text: "Results-Driven Growth" },
      { emoji: "🎯", text: "Tailored Content Ideas" },
      { emoji: "🔥", text: "Attention-Grabbing Posts" },
    ],
    image: Card1,
  },
  {
    title: "Short-Form Videos",
    pills: [
      { emoji: "⚡️", text: "Videos Built for Virality" },
      { emoji: "🎬", text: "Stories That Convert" },
      { emoji: "📊", text: "Proven Engagement Boost" },
    ],
    image: Card2,
  },
  {
    title: "Award-winning Website",
    pills: [
      { emoji: "🛍️", text: "Conversion-Focused Designs" },
      { emoji: "🚀", text: "Seamless User Experience" },
      { emoji: "💰", text: "ROI-Backed Results" },
    ],
    image: Card3,
  },
];

const PlanContent = ({ className = "" }) => {
  return (
    <div className={`w-full font-[Montserrat] ${className}`}>
      <div className="grid grid-cols-3 gap-5 mq1125:grid-cols-2 mq800:grid-cols-1">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[rgba(1,49,134,0.18)]
              bg-gradient-to-b
              from-[#F2F7FF]
              to-[#DCEAFF]
              shadow-[0_4px_24px_rgba(1,49,134,0.08)]

              min-h-[385px]
              mq450:min-h-[220px]
            "
          >
            {/* IMAGE */}
            <div
              className="
                absolute
                right-0
                bottom-0

                w-[90%]
                h-[150%]

                mq1125:w-[95%]

                mq450:w-[90%]
                mq450:h-[145%]
                mq450:right-[-2px]
                mq450:bottom-[-15px]

                pointer-events-none
              "
            >
              <img
                src={card.image}
                alt={card.title}
                className="
                  w-full
                  h-full
                  object-contain
                  object-bottom-right
                "
              />
            </div>

            {/* CONTENT */}
            <div
              className="
                relative
                z-10
                flex
                flex-col
                gap-8
                h-full

                p-8

                mq450:px-4
                mq450:py-4

                w-[59%]
                mq450:w-[60%]
              "
            >
              <h3
                className="
                  text-[28px]
                  mq1125:text-[24px]
                  mq450:text-[17px]

                  font-bold
                  text-black

                  leading-[1.1]
                  mb-5

                  whitespace-nowrap
                "
              >
                {card.title}
              </h3>

              <div className="flex flex-col gap-2 mq450:gap-1.5">
                {card.pills.map((pill) => (
                  <Pill
                    key={pill.text}
                    emoji={pill.emoji}
                    text={pill.text}
                  />
                ))}
              </div>

              <button
                className="
                  mt-2
                  mq450:mt-2

                  flex
                  items-center
                  justify-between

                  w-full

                  rounded-full
                  border
                  border-[rgba(1,49,134,0.12)]

                  bg-[rgba(188,214,255,0.35)]

                  px-3
                  py-2

                  mq450:px-2.5
                  mq450:py-1.5

                  transition-all
                  duration-300

                  hover:bg-[rgba(188,214,255,0.55)]
                "
              >
                <span
                  className="
                    text-[20px]
                    mq450:text-[10px]

                    font-bold
                    text-black

                    whitespace-nowrap
                  "
                >
                  Explore now $99
                </span>

                <span
                  className="
                    w-8
                    h-8

                    mq450:w-6
                    mq450:h-6

                    rounded-full
                    bg-[rgba(158,202,255,0.6)]

                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#013186"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PlanContent.propTypes = {
  className: PropTypes.string,
};

export default PlanContent;