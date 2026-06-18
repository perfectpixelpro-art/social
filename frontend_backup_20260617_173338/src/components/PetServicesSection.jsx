export default function PetServicesSection() {
  const services = [
    {
      icon: "✍️",
      title: "Content Creation",
      text: "We create every post around your real work — your clients, your cuts, your transformations. Nothing generic.",
    },
    {
      icon: "🎨",
      title: "Graphics & Visuals",
      text: "Clean, branded visuals that look professional and make your grooming shop stand out instantly.",
    },
    {
      icon: "💬",
      title: "Captions That Sound Human",
      text: "We write captions that actually sound like you — not a robot. Warm, engaging, real.",
    },
    {
      icon: "📅",
      title: "Consistent Posting",
      text: "4 posts per week. No gaps. No excuses. Your feed stays active even when you're slammed with appointments.",
    },
    {
      icon: "📱",
      title: "Platform Management",
      text: "We manage Instagram, Facebook, and wherever your pet owner audience is most active.",
    },
    {
      icon: "✨",
      title: "You Just Groom",
      text: "You pick up the scissors. We handle everything else. Zero daily involvement required from you.",
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
        {/* Label */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-4 h-[2px] bg-[#2C9CEC]" />

          <span
            className="
              uppercase
              tracking-[1px]
              text-[11px]
              font-medium
              text-[#8A93A6]
            "
          >
            WHAT WE DO
          </span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2
            className="
              font-bold
              tracking-[-1.5px]
              leading-[1]
              text-[#013186]
              text-[34px]
              md:text-[48px]
              lg:text-[56px]
            "
          >
            <span className="block">
              You Have One Job.
            </span>

            <span className="block">
              So Do <span className="text-[#0170E0]">We.</span>
            </span>
          </h2>

          <p
            className="
              mt-4
              max-w-[700px]
              mx-auto
              text-[#7C8497]
              text-[14px]
              md:text-[15px]
              leading-[1.8]
            "
          >
            Yours: make every pet look incredible. Ours: make sure every pet
            owner sees it.
            <br />
            We handle every piece of your social media — start to finish.
          </p>
        </div>

        {/* Features Grid */}
        <div
          className="
            mt-12
            border
            border-[#DCE5F2]
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {services.map((item, index) => (
            <div
              key={index}
              className="
                p-8
                md:p-10
                border-b
                border-[#DCE5F2]
                lg:border-r
                min-h-[220px]
                flex
                flex-col
              "
            >
              <div className="text-[26px]">
                {item.icon}
              </div>

              <h3
                className="
                  mt-5
                  text-[#013186]
                  font-bold
                  text-[26px]
                  leading-tight
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-3
                  text-[#7C8497]
                  text-[15px]
                  leading-[1.9]
                "
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="
            bg-gradient-to-r
            from-[#013186]
            to-[#0170E0]
            rounded-b-[14px]
            px-6
            md:px-10
            py-8
            md:py-10
            text-center
          "
        >
          <h3
            className="
              text-white
              font-bold
              leading-tight
              text-[24px]
              md:text-[30px]
              lg:text-[38px]
            "
          >
            You pick up the scissors.
            <br />
            We handle everything else.
          </h3>

          <div className="mt-5 flex justify-center">
            <button
              className="
                h-[46px]
                px-7
                bg-white
                text-[#013186]
                rounded-[8px]
                text-[14px]
                font-semibold
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:shadow-lg
              "
            >
              Start for $99 — Book a Free Strategy Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}