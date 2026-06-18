import PropTypes from "prop-types";
import Card1 from "../assets/Card1.avif";
import Card2 from "../assets/Card2.avif";
import Card3 from "../assets/Card3.avif";

const cards = [
  {
    title: "Social Media Management",
    pills: [
      { emoji: "📈", text: "Results-Driven Growth" },
      { emoji: "🎯", text: "Tailored Content Ideas" },
      { emoji: "🔥", text: "Attention-Grabbing Posts" },
    ],
    image: Card1,
    link: "/social-media-management",
  },
  {
    title: "Short-Form Videos",
    pills: [
      { emoji: "⚡️", text: "Videos Built for Virality" },
      { emoji: "🎬", text: "Stories That Convert" },
      { emoji: "📊", text: "Proven Engagement Boost" },
    ],
    image: Card2,
    link: "/short-form-videos",
  },
  {
    title: "Award-winning Website",
    pills: [
      { emoji: "🛍️", text: "Conversion-Focused Designs" },
      { emoji: "🚀", text: "Seamless User Experience" },
      { emoji: "💰", text: "ROI-Backed Results" },
    ],
    image: Card3,
    link: "/services/website",
  },
];

const styles = `
  .service-card {
    transition: all 0.3s ease;
  }
  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(1, 49, 134, 0.15);
  }

  /* MacBook range */
  @media (min-width: 1024px) and (max-width: 1440px) {
    .service-card {
      height: 360px !important;
      min-height: 360px !important;
      max-height: 360px !important;
    }
    .card-content {
      width: 55% !important;
      padding: 22px !important;
      height: 360px !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }
    .card-image-wrapper {
      width: 95% !important;
      height: 140% !important;
      bottom: -0px !important;
      top: auto !important;
      right: -0px !important;
    }
    .card-title {
      font-size: 22px !important;
      margin-bottom: 14px !important;
      line-height: 1.2 !important;
    }
    .card-pills {
      gap: 8px !important;
    }
    .card-pill-item {
      padding: 7px 14px !important;
    }
    .card-pill-emoji {
      font-size: 15px !important;
    }
    .card-pill-text {
      font-size: 12px !important;
    }
    .explore-btn {
      padding: 10px 14px !important;
      width: 100% !important;
    }
    .explore-btn-text {
      font-size: 14px !important;
    }
    .explore-btn-icon {
      width: 28px !important;
      height: 28px !important;
      flex-shrink: 0 !important;
    }
    .explore-btn-icon svg {
      width: 12px !important;
      height: 12px !important;
    }
    .card-cta {
      padding-top: 14px !important;
      margin-top: auto !important;
    }
  }

  /* Mobile fix */
  @media (max-width: 800px) {
    .service-card {
      min-height: 260px !important;
    }
    .card-content {
      width: 50% !important;
      padding: 18px 14px !important;
    }
    .card-image-wrapper {
      width: 80% !important;
      height: 140% !important;
      bottom: 0px !important;
      top: auto !important;
      right: 0px !important;
    }
    .card-title {
      font-size: 17px !important;
      margin-bottom: 8px !important;
    }
    .card-cta {
      padding-top: 10px !important;
    }
    .explore-btn {
      padding: 8px 10px !important;
      width: 100% !important;
    }
    .explore-btn-text {
      font-size: 13px !important;
      white-space: nowrap !important;
    }
    .explore-btn-icon {
      width: 22px !important;
      height: 22px !important;
      flex-shrink: 0 !important;
    }
  }
`;

const PlanContent = ({ className = "" }) => {
  return (
    <div className={"w-full font-[Montserrat] " + className}>
      <style>{styles}</style>

      <div className="grid grid-cols-3 gap-3 mq1125:grid-cols-2 mq800:grid-cols-1">
        {cards.map((card) => (
          <a key={card.title} href={card.link} className="block no-underline">
            <div className="service-card relative overflow-hidden rounded-[24px] border border-[rgba(1,49,134,0.18)] bg-gradient-to-b from-[#F2F7FF] to-[#DCEAFF] shadow-[0_4px_24px_rgba(1,49,134,0.08)] min-h-[320px] cursor-pointer">

              {/* IMAGE */}
              <div className="card-image-wrapper absolute right-0 bottom-0 w-[90%] h-[150%] pointer-events-none">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain object-bottom-right"
                />
              </div>

              {/* CONTENT */}
              <div className="card-content relative z-10 flex flex-col h-full p-5 w-[58%]">

                {/* TITLE */}
                <h3 className="card-title text-[29px] font-bold text-black leading-[1.2] mb-4">
                  {card.title}
                </h3>

                {/* PILLS */}
                <div className="card-pills flex flex-col gap-2">
                  {card.pills.map((pill) => (
                    <div
                      key={pill.text}
                      className="card-pill-item flex items-center gap-2 bg-white/90 border border-[rgba(1,49,134,0.10)] shadow-sm rounded-full px-3 py-2 w-fit max-w-full overflow-hidden"
                    >
                      <span className="card-pill-emoji text-[14px] shrink-0">{pill.emoji}</span>
                      <span className="card-pill-text text-[12px] font-semibold text-[#111] leading-none truncate">
                        {pill.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="card-cta mt-auto pt-6">
                  <div className=" explore-btn flex items-center gap-1 rounded-full border border-[rgba(1,49,134,0.18)] bg-[rgba(188,214,255,0.45)] px-6 py-2 w-full justify-between">
                    <span className="explore-btn-text text-[18px] font-bold text-[#013186] whitespace-nowrap leading-none">
                      Explore now $99
                    </span>
                    <span className="explore-btn-icon w-8 h-8 rounded-full bg-[rgba(1,49,134,0.10)] flex items-center justify-center shrink-0">
                      <svg
                        width="14"
                        height="14"
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
                  </div>
                </div>

              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

PlanContent.propTypes = {
  className: PropTypes.string,
};

export default PlanContent;