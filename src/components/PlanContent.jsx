import PropTypes from "prop-types";
import Card1 from "../assets/Card1.avif";
import Card2 from "../assets/Card2.avif";
import Card3 from "../assets/Card3.avif";

const Pill = ({ emoji, text }) => (
  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[rgba(0,0,0,0.08)] w-fit whitespace-nowrap">
    <span className="text-xs">{emoji}</span>
    <span className="text-[12.5px] font-semibold text-[#111]">{text}</span>
  </div>
);

const cards = [
  {
    title: "Social Media Management",
    badge: { text: "+44k", green: false },
    pills: [
      { emoji: "📈", text: "Results-Driven Growth" },
      { emoji: "🎯", text: "Tailored Content Ideas" },
      { emoji: "🔥", text: "Attention-Grabbing Posts" },
    ],
    image: Card1,
    alt: "Social Media Management",
  },
  {
    title: "Short-Form Videos",
    badge: { text: "1.2M Impressions", green: true },
    pills: [
      { emoji: "⚡️", text: "Videos Built for Virality" },
      { emoji: "🎬", text: "Stories That Convert" },
      { emoji: "📊", text: "Proven Engagement Boost" },
    ],
    image: Card2,
    alt: "Short-Form Videos",
  },
  {
    title: "Award-winning Website",
    badge: { text: "500k in sales", green: true },
    pills: [
      { emoji: "💼", text: "Conversion-Focused Designs" },
      { emoji: "🚀", text: "Seamless User Experience" },
      { emoji: "💰", text: "ROI-Backed Results" },
    ],
    image: Card3,
    alt: "Award-winning Website",
  },
];

const PlanContent = ({ className = "" }) => {
  return (
    <div className={`w-full font-[Montserrat] ${className}`}>
      <div className="flex gap-5 mq1125:flex-col">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex-1 overflow-hidden flex flex-col relative"
            style={{
              height: "380px",
              background: "linear-gradient(180deg, #F2F7FF 0%, #DCEAFF 100%)",
              border: "1.5px solid rgba(1, 49, 134, 0.18)",
              borderRadius: "28px",
              boxShadow: "0 4px 24px rgba(1,49,134,0.08)",
            }}
          >
            {/* Badge */}
            <div className="absolute top-4 right-4 z-20">
              {card.badge.green ? (
                <span className="bg-[#22c55e] text-white text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm">
                  {card.badge.text}
                </span>
              ) : (
                <span className="bg-white text-[#000] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[rgba(0,0,0,0.1)] whitespace-nowrap shadow-sm">
                  {card.badge.text}
                </span>
              )}
            </div>

            {/* Image — large, fills right, overflows top */}
            <div
              className="absolute right-0 z-10 pointer-events-none"
              style={{ width: "90%", top: "-25px", bottom: 0 }}
            >
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-contain"
                style={{ objectPosition: "right bottom" }}
              />
            </div>

            {/* Left content */}
            <div
              className="flex flex-col h-full p-5 relative z-20"
              style={{ width: "52%" }}
            >
              <h3 className="text-[15px] font-bold text-[#000] m-0 mb-4 leading-snug">
                {card.title}
              </h3>
              <div className="flex flex-col gap-2 flex-1">
                {card.pills.map((p) => (
                  <Pill key={p.text} emoji={p.emoji} text={p.text} />
                ))}
              </div>
              <button className="mt-4 flex items-center gap-2 bg-white/70 border border-[rgba(1,49,134,0.15)] rounded-full px-4 py-2 w-fit cursor-pointer hover:bg-white transition-all">
                <span className="text-[12px] font-bold text-[#000]">Explore now $99</span>
                <span className="w-[18px] h-[18px] rounded-full bg-[rgba(158,202,255,0.6)] flex items-center justify-center text-[9px] font-bold text-[#013186] flex-shrink-0">↗</span>
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
