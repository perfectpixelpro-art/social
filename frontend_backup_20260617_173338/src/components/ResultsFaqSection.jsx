import { useState } from "react";

export default function ResultsFaqSection() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      question: "Is the content tailored to my treatments?",
      answer:
        "Yes—completely. During discovery we learn your specific services, brand voice, target clients, and aesthetic. Every piece of content is created specifically for your clinic, not repurposed from templates.",
    },
    {
      question: "Do I need to create anything or be involved daily?",
      answer:
        "No. We handle strategy, content creation, captions, design, and scheduling. You simply review and approve.",
    },
    {
      question: "How soon do we get started?",
      answer:
        "Most clients are onboarded within a few days and content production begins immediately.",
    },
    {
      question: "Will this help me get more bookings?",
      answer:
        "That's the goal. Consistent visibility, trust-building content, and strong calls-to-action help generate more inquiries.",
    },
    {
      question: "Can I request changes to the content?",
      answer:
        "Absolutely. Revisions are included before anything goes live.",
    },
    {
      question: "Which platforms do you manage?",
      answer:
        "Instagram, Facebook, TikTok, LinkedIn, and other major social platforms.",
    },
    {
      question: "Is there a contract or long-term commitment?",
      answer:
        "No long-term contracts. Stay because it works, not because you're locked in.",
    },
  ];

  const results = [
    {
      icon: "📈",
      title: "Increased Reach",
      description:
        "Consistent posting signals the algorithm. Your content gets pushed to new audiences week after week.",
    },
    {
      icon: "💬",
      title: "Better Engagement",
      description:
        "Quality content drives saves, shares, and comments—signals that expand your organic reach further.",
    },
    {
      icon: "🛡️",
      title: "Stronger Trust",
      description:
        "Regular proof-of-results content positions your clinic as the trusted authority in aesthetics.",
    },
    {
      icon: "📞",
      title: "More Inquiries & Bookings",
      description:
        "Visible, trusted clinics get the DMs, calls, and appointments. Visibility converts.",
    },
  ];

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
        {/* RESULTS */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-[2px] bg-[#2C9CEC]" />

            <span className="text-[11px] uppercase tracking-[1px] text-[#7C8497]">
              WHAT HAPPENS
            </span>
          </div>

          <h2
            className="
              text-[#013186]
              font-bold
              tracking-[-1.5px]
              leading-[1.05]
              text-[34px]
              md:text-[48px]
              lg:text-[56px]
              max-w-[1100px]
            "
          >
            What Med Spas See After{" "}
            <span className="text-[#0170E0]">
              Staying Consistent
            </span>
          </h2>

          <p
            className="
              mt-4
              text-[#6D7587]
              text-[16px]
              md:text-[18px]
            "
          >
            The results of consistent, strategic social media are
            compounding. They build on each other.
          </p>

          <div
            className="
              mt-14
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-10
            "
          >
            {results.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="
                    mx-auto
                    w-[64px]
                    h-[64px]
                    rounded-full
                    bg-[#EEF4FF]
                    border
                    border-[#C8D8F7]
                    flex
                    items-center
                    justify-center
                    text-[28px]
                  "
                >
                  {item.icon}
                </div>

                <h3 className="mt-5 text-[#013186] font-bold text-[20px]">
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-[#6D7587]
                    text-[15px]
                    leading-[1.9]
                  "
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-[2px] bg-[#2C9CEC]" />

            <span className="text-[11px] uppercase tracking-[1px] text-[#7C8497]">
              FAQ
            </span>
          </div>

          <h2
            className="
              text-[#013186]
              font-bold
              tracking-[-1.5px]
              leading-[1.05]
              text-[34px]
              md:text-[48px]
              lg:text-[56px]
            "
          >
            Everything You{" "}
            <span className="text-[#0170E0]">
              Need to Know
            </span>
          </h2>

          <div
            className="
              mt-12
              grid
              lg:grid-cols-[1fr_420px]
              gap-12
              lg:gap-20
            "
          >
            {/* FAQ LEFT */}
            <div>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-[#D9E4F6]"
                >
                  <button
                    onClick={() =>
                      setOpen(open === index ? -1 : index)
                    }
                    className="
                      w-full
                      py-5
                      flex
                      justify-between
                      items-center
                      text-left
                    "
                  >
                    <span className="text-[#013186] font-medium">
                      {faq.question}
                    </span>

                    <span
                      className="
                        text-[#0170E0]
                        text-[22px]
                        font-light
                      "
                    >
                      {open === index ? "×" : "+"}
                    </span>
                  </button>

                  {open === index && (
                    <div className="pb-5">
                      <p
                        className="
                          text-[#6D7587]
                          text-[15px]
                          leading-[1.9]
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA CARD */}
            <div
              className="
                bg-[#EEF4FF]
                border
                border-[#D8E5FF]
                rounded-[16px]
                p-8
                h-fit
              "
            >
              <p
                className="
                  uppercase
                  text-[11px]
                  tracking-[1px]
                  text-[#7C8497]
                "
              >
                Ready To Start?
              </p>

              <h3
                className="
                  mt-4
                  text-[#013186]
                  font-bold
                  leading-[1.15]
                  text-[32px]
                "
              >
                Your competitors
                <br />
                are already posting.
                <span className="text-[#0170E0]">
                  {" "}
                  Are you?
                </span>
              </h3>

              <p
                className="
                  mt-5
                  text-[#6D7587]
                  leading-[1.9]
                "
              >
                Every week you're not consistent online is a week
                a potential client is choosing someone else.
              </p>

              <button
                className="
                  mt-8
                  w-full
                  h-[56px]
                  bg-[#013186]
                  text-white
                  rounded-[8px]
                  font-medium
                "
              >
                BOOK A FREE STRATEGY CALL
              </button>

              <div className="mt-6 pt-6 border-t border-[#D8E5FF]">
                <p className="text-[12px] text-[#7C8497]">
                  No commitment. No credit card. Just a quick
                  strategy call to see if we're a fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}