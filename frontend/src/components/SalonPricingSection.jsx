import { Link } from "react-router-dom";

export default function SalonPricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      features: [
        "4 custom graphics / month",
        "2 custom videos / month",
        "1 revision per deliverable",
        "Creative execution",
        "Content strategy",
        "Reliable turnaround",
      ],
      featured: false,
    },
    {
      name: "Growth",
      price: "$199",
      features: [
        "8 custom graphics / month",
        "4 custom videos / month",
        "2 revisions per deliverable",
        "Creative execution",
        "Consistent brand presence",
        "Captions",
        "Scheduling",
      ],
      featured: true,
    },
    {
      name: "Premium",
      price: "$299",
      features: [
        "12 custom graphics / month",
        "4 carousels (up to 3 slides)",
        "6 custom videos / month",
        "Unlimited revisions",
        "Creative execution",
        "Consistent brand presence",
      ],
      featured: false,
    },
  ];

  return (
    <section className="bg-[#F2F7FE] py-[80px] md:py-[100px] lg:py-[120px]">
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
        {/* HEADER */}
        <div className="text-center max-w-[1100px] mx-auto">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-4 h-[2px] bg-[#2C9CEC]" />

            <span
              className="
                uppercase
                tracking-[1px]
                text-[11px]
                font-semibold
                text-[#2C9CEC]
              "
            >
              PRICING
            </span>
          </div>

          <h2
            className="
              text-[#013186]
              font-bold
              tracking-[-1.5px]
              leading-[1.05]
              text-[30px]
              sm:text-[42px]
              md:text-[56px]
              lg:text-[64px]
            "
          >
            <span className="inline-block">
              Straight-Forward.
            </span>

            <span
              className="
                text-[#0170E0]
                italic
                font-semibold
                ml-2
                inline-block
              "
              style={{
                fontFamily:
                  "Georgia, Times New Roman, serif",
              }}
            >
              No Contracts.
            </span>
          </h2>

          <p
            className="
              mt-4
              text-[#7C8497]
              text-[14px]
              md:text-[15px]
            "
          >
            Cancel anytime. Start the same day. No risk.
          </p>
        </div>

        {/* CARDS */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            max-w-[1100px]
            mx-auto
          "
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative
                rounded-[18px]
                overflow-visible
                transition-all
                duration-300

                ${
                  plan.featured
                    ? "bg-[#013186] text-white shadow-[0_20px_50px_rgba(1,49,134,0.25)] scale-[1.03]"
                    : "bg-white border border-[#E8EDF7]"
                }
              `}
            >
              {/* MOST POPULAR */}
              {plan.featured && (
                <div
                  className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    top-[-14px]
                    z-30
                    bg-[#0B6CFB]
                    text-white
                    text-[10px]
                    font-bold
                    px-4
                    py-[6px]
                    rounded-full
                    whitespace-nowrap
                    shadow-md
                  "
                >
                  MOST POPULAR
                </div>
              )}

              <div className={plan.featured ? "p-8 pt-12" : "p-8"}>
                {/* PLAN */}
                <p
                  className={`
                    text-[12px]
                    font-semibold
                    mb-4

                    ${
                      plan.featured
                        ? "text-white"
                        : "text-[#0B6CFB]"
                    }
                  `}
                >
                  {plan.name}
                </p>

                {/* PRICE */}
                <div className="flex items-end gap-1">
                  <span
                    className={`
                      text-[42px]
                      font-bold
                      leading-none

                      ${
                        plan.featured
                          ? "text-white"
                          : "text-[#013186]"
                      }
                    `}
                  >
                    {plan.price}
                  </span>

                  <span
                    className={`
                      text-[12px]
                      mb-1

                      ${
                        plan.featured
                          ? "text-white/60"
                          : "text-[#7C8497]"
                      }
                    `}
                  >
                    /mo
                  </span>
                </div>

                {/* DIVIDER */}
                <div
                  className={`
                    my-6
                    h-px

                    ${
                      plan.featured
                        ? "bg-white/10"
                        : "bg-[#EEF2F7]"
                    }
                  `}
                />

                {/* FEATURES */}
                <ul className="space-y-3">
                  {plan.features.map(
                    (feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className={`
                            mt-[2px]
                            text-[12px]

                            ${
                              plan.featured
                                ? "text-[#4FD1FF]"
                                : "text-[#0B6CFB]"
                            }
                          `}
                        >
                          ✓
                        </span>

                        <span
                          className={`
                            text-[13px]
                            leading-[1.7]

                            ${
                              plan.featured
                                ? "text-white/80"
                                : "text-[#7C8497]"
                            }
                          `}
                        >
                          {feature}
                        </span>
                      </li>
                    )
                  )}
                </ul>

                {/* BUTTON */}
                <Link
                  to={`/checkout?tab=Marketing&plan=${encodeURIComponent(plan.name)}`}
                  className={`
                    mt-8
                    h-[46px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[13px]
                    font-semibold
                    transition
                    hover:opacity-90

                    ${
                      plan.featured
                        ? "bg-[#0B6CFB] text-white"
                        : "border border-[#D8E3F5] text-[#013186]"
                    }
                  `}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}