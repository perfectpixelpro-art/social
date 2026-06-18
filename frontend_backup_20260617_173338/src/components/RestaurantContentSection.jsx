import { Check } from "lucide-react";

export default function RestaurantContentSection() {
  const items = [
    "We turn your dishes into content people stop on",
    "We highlight texture, freshness, and detail not just photos",
    "We create videos that show the sizzle, the pour, the finish",
    "We write captions that sound like your place not an ad",
    "We post consistently across your platforms",
  ];

  return (
    <section className="py-0 md:py-0 lg:py-8">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-0">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_460px]
            gap-10
            lg:gap-20
            xl:gap-28
            items-start
          "
        >
          {/* LEFT */}
          <div className="min-w-0 overflow-hidden">
            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-[#DCEEFF]
                text-[#013186]
                text-[11px]
                font-semibold
                tracking-[0.08em]
                uppercase
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#013186]" />
              What Running Your Social Media Should Feel Like
            </div>

            {/* Heading */}
            <h2 className="mt-6 leading-[1.08]">
              <span
                className="
                  block
                  text-[#013186]
                  font-extrabold
                  tracking-[-0.5px]
                  text-[26px]
                  sm:text-[30px]
                  md:text-[34px]
                  lg:text-[28px]
                  xl:text-[34px]
                  2xl:text-[40px]
                "
              >
                You focus on the kitchen,
              </span>

              <span
                className="
                  block
                  text-[#013186]
                  font-extrabold
                  tracking-[-0.5px]
                  text-[26px]
                  sm:text-[30px]
                  md:text-[34px]
                  lg:text-[28px]
                  xl:text-[34px]
                  2xl:text-[40px]
                "
              >
                the service, the experience.
              </span>

              <span
                className="
                  block
                  text-[#2C9CEC]
                  italic
                  font-semibold
                  tracking-[-0.5px]
                  text-[20px]
                  sm:text-[24px]
                  md:text-[28px]
                  lg:text-[22px]
                  xl:text-[26px]
                  2xl:text-[32px]
                  mt-2
                "
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                We make sure people feel it before
              </span>

              <span
                className="
                  block
                  text-[#2C9CEC]
                  italic
                  font-semibold
                  tracking-[-0.5px]
                  text-[20px]
                  sm:text-[24px]
                  md:text-[28px]
                  lg:text-[22px]
                  xl:text-[26px]
                  2xl:text-[32px]
                "
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                they walk in.
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-6
                text-[#7C8497]
                text-[14px]
                md:text-[15px]
                leading-[1.8]
                max-w-[420px]
              "
            >
              No rushed posts. No gaps. No "we'll post tomorrow."
              Everything handled, every week.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3 min-w-0">
            {items.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  bg-white
                  border
                  border-[#E6EAF1]
                  rounded-[10px]
                "
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#1677E6] flex items-center justify-center">
                  <Check size={18} color="white" strokeWidth={3} />
                </div>
                <p className="text-[#013186] font-semibold text-[14px] md:text-[15px] leading-[1.4]">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}