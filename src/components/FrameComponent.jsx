import { useState } from "react";
import PropTypes from "prop-types";

const FAQS = [
  { q: "How do I get started with Social 99?", a: "Getting started is simple. Choose a social media management plan and complete the onboarding form where we collect key brand and business details. Once submitted, our team reviews everything and begins execution shortly after." },
  { q: "Which platforms do you manage?", a: "Our affordable social media marketing services currently support major platforms including Instagram, Facebook, LinkedIn, YouTube, and others depending on your plan and audience." },
  { q: "Is the content tailored to my business?", a: "Yes, every piece of content in our affordable social media marketing services is created specifically for your brand, industry, and goals. We don't reuse templates or generic assets. Your messaging, tone, and positioning are considered before anything is produced." },
  { q: "Is there a setup or onboarding fee?", a: "No, there are no setup or onboarding fees. You pay a simple monthly subscription with no hidden costs." },
  { q: "Can I review content before it goes live?", a: "All content within our social media marketing packages is shared with you for review prior to publishing. We ensure alignment through clear communication and collaborative feedback." },
  { q: "What is your cancellation policy?", a: "The Social 99 is a month-to-month service. You can cancel anytime before the next billing cycle with no long-term commitment." },
  { q: "Do you offer revisions?", a: "Yes, revisions are included in our social media management pricing plans to ensure the content accurately reflects your brand and expectations. We keep the process streamlined while maintaining quality and consistency." },
  { q: "Can I upgrade, downgrade, or cancel my plan?", a: "Yes, The Social 99 offers flexible social media management pricing on a month-to-month basis." },
];

const FrameComponent = ({ className = "" }) => {
  const [open, setOpen] = useState(null);

  return (
    <section className={`w-full flex justify-center px-2 font-[Montserrat] ${className}`}>
      <div className="w-full max-w-[1500px] grid grid-cols-2 gap-x-16 gap-y-2 mq800:grid-cols-1 mq800:gap-x-0">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-[rgba(0,0,0,0.08)]">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer bg-transparent border-none"
              >
                <span className="text-[20px] mq800:text-[17px] mq450:text-[15px] font-bold text-[#111]">
                  {item.q}
                </span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="pb-6 m-0 text-[15px] text-[rgba(0,0,0,0.6)] font-medium leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
