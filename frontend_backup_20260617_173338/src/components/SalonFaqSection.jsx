import { useState } from "react";
import { Link } from "react-router-dom";

export default function SalonFaqSection() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "Is the content based on my actual work?",
      answer:
        "Yes. We build content around your salon, your services, and your actual client transformations.",
    },
    {
      question: "How quickly do we start?",
      answer:
        "Most salons are onboarded and publishing content within a few days.",
    },
    {
      question: "Will this help me get more appointments?",
      answer:
        "Consistent visibility creates trust, and trust leads to more appointment requests and bookings.",
    },
    {
      question: "Can I request changes to the content?",
      answer:
        "Absolutely. Revisions are included so everything feels right for your brand.",
    },
    {
      question: "Which platforms do you manage?",
      answer:
        "Instagram, Facebook, TikTok, and other major social platforms.",
    },
    {
      question: "Is there a contract?",
      answer:
        "No contracts. Cancel anytime.",
    },
  ];

  return (
    <>
      {/* FAQ SECTION */}
      <section className="py-[80px] md:py-[100px] lg:py-[120px]">
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
          <div className="max-w-[760px] mx-auto">
            {/* Label */}
            <div className="text-center">
              <p
                className="
                  text-[#2C9CEC]
                  uppercase
                  tracking-[1px]
                  text-[11px]
                  font-semibold
                "
              >
                FAQ
              </p>

              <h2
                className="
                  mt-2
                  text-[#013186]
                  font-bold
                  leading-none
                  tracking-[-1px]
                  text-[32px]
                  md:text-[48px]
                "
              >
                Common
                <span
                  className="
                    text-[#0170E0]
                    italic
                    ml-2
                  "
                  style={{
                    fontFamily:
                      "Georgia, Times New Roman, serif",
                  }}
                >
                  Questions
                </span>
              </h2>
            </div>

            {/* FAQ LIST */}
            <div className="mt-10">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-[#E4EBF6]"
                >
                  <button
                    onClick={() =>
                      setOpen(
                        open === index ? null : index
                      )
                    }
                    className="
                      w-full
                      py-5
                      flex
                      items-center
                      justify-between
                      text-left
                    "
                  >
                    <span
                      className="
                        text-[#013186]
                        font-semibold
                        text-[15px]
                        md:text-[16px]
                      "
                    >
                      {faq.question}
                    </span>

                    <span
                      className="
                        text-[#2C9CEC]
                        text-[22px]
                        font-light
                      "
                    >
                      {open === index ? "−" : "+"}
                    </span>
                  </button>

                  {open === index && (
                    <div className="pb-5">
                      <p
                        className="
                          text-[#7C8497]
                          text-[14px]
                          leading-[1.8]
                          pr-8
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLUE CTA SECTION */}
      <section className="bg-[#013186] py-[80px] md:py-[100px]">
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
              max-w-[760px]
              mx-auto
              text-center
            "
          >
            <h2
              className="
                text-white
                font-bold
                leading-[1.05]
                tracking-[-1.5px]
                text-[36px]
                md:text-[58px]
              "
            >
              Right Now, Someone
              <br />

              Nearby Is{" "}
              <span
                className="
                  text-[#7DB7FF]
                  italic
                "
                style={{
                  fontFamily:
                    "Georgia, Times New Roman, serif",
                }}
              >
                Ready to Book.
              </span>
            </h2>

            <p
              className="
                mt-5
                text-white/70
                text-[14px]
                md:text-[15px]
                leading-[1.8]
              "
            >
              They're scrolling. They're deciding.
              Make sure the salon they see and
              remember is yours.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-8
                flex
                flex-col
                sm:flex-row
                justify-center
                gap-3
              "
            >
              <Link
                to="/start-for-99"
                className="
                  h-[46px]
                  px-5
                  bg-white
                  rounded-full
                  text-[#013186]
                  text-[13px]
                  font-semibold
                  inline-flex
                  items-center
                  justify-center
                "
              >
                Start for $99 — No Risk
              </Link>

              <Link
                to="/strategy-call"
                className="
                  h-[46px]
                  px-5
                  rounded-full
                  border
                  border-white/20
                  text-white
                  text-[13px]
                  font-semibold
                  inline-flex
                  items-center
                  justify-center
                "
              >
                📅 Book a Free Strategy Call
              </Link>
            </div>

            <p
              className="
                mt-5
                text-[11px]
                text-white/50
              "
            >
              No contracts • Cancel anytime •
              Start the same day
            </p>
          </div>
        </div>
      </section>
    </>
  );
}