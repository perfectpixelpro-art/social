export default function SalonServicesSection() {
  const services = [
    {
      icon: "🎬",
      title: "Video Editing",
      desc: "We cut and edit transformation videos that stop the scroll — before-and-afters, styling reels, and client results that actually get saved and shared.",
    },
    {
      icon: "🎨",
      title: "Visual Design",
      desc: "Clean, scroll-stopping graphics designed around your brand. Every post looks intentional, not thrown together at the end of a long day.",
    },
    {
      icon: "✍️",
      title: "Caption Writing",
      desc: "Captions that sound like you — not a robot. Natural, on-brand copy that speaks directly to the clients you want to attract.",
    },
    {
      icon: "📅",
      title: "Consistent Posting",
      desc: "We handle the schedule. Your content goes out on time, every time, so your page always looks active and in demand.",
    },
    {
      icon: "📱",
      title: "Multi-Platform",
      desc: "Instagram, Facebook, and wherever else your clients are watching. We post where visibility actually turns into bookings.",
    },
    {
      icon: "🔄",
      title: "Revisions Included",
      desc: "Don't love something? Request changes and we'll adjust. Your page should feel exactly right for your salon and style.",
    },
  ];

  return (
    <section className="bg-[#F7FAFE] py-[80px] md:py-[100px] lg:py-[120px]">
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
        <div className="text-center max-w-[1000px] mx-auto">
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
              WHAT'S HANDLED
            </span>
          </div>

          <h2
            className="
              font-bold
              tracking-[-1.5px]
              text-[#013186]
              leading-none
              text-[28px]
              sm:text-[38px]
              md:text-[48px]
              lg:text-[56px]
            "
          >
            Everything Your Page Needs.
            <span
              className="
                text-[#0170E0]
                italic
                font-semibold
                ml-2
                block
                lg:inline
              "
              style={{
                fontFamily:
                  "Georgia, Times New Roman, serif",
              }}
            >
              Every Week.
            </span>
          </h2>

          <p
            className="
              mt-4
              text-[#7C8497]
              text-[14px]
              md:text-[15px]
              leading-[1.7]
              max-w-[500px]
              mx-auto
            "
          >
            <span className="block">
              No gaps. No last-minute scrambling. No "we should post
            </span>

            <span className="block">
              something today."
            </span>
          </p>
        </div>

        {/* CARDS */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            lg:gap-5
          "
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="
                bg-white
                border
                border-[#EEF2F7]
                rounded-[12px]
                px-5
                py-5
                min-h-[190px]
                shadow-[0_2px_12px_rgba(0,0,0,0.03)]
                relative
                overflow-hidden
              "
            >
              {/* TOP BLUE LINE */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-[3px]
                  bg-[#2C9CEC]
                "
              />

              {/* ICON */}
              <div
                className="
                  w-8
                  h-8
                  rounded-[8px]
                  bg-[#F7FAFE]
                  flex
                  items-center
                  justify-center
                  text-[14px]
                "
              >
                {service.icon}
              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-5
                  text-[#013186]
                  font-bold
                  text-[16px]
                  md:text-[17px]
                  leading-none
                "
              >
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-3
                  text-[#7C8497]
                  text-[13px]
                  leading-[1.7]
                "
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

