import RestW1 from "../assets/RestW1.webp";
import RestW2 from "../assets/RestW2.webp";
import RestW3 from "../assets/RestW3.webp";
import RestW4 from "../assets/RestW4.webp";
import RestW5 from "../assets/RestW5.webp";
import RestW6 from "../assets/RestW6.webp";
import RestD from "../assets/RestD.webp";

export default function WorkExampleSecBar() {
  const restws = [RestW1, RestW2, RestW3, RestW4, RestW5, RestW6];

  return (
    <>
      <section className="py-[70px] md:py-[90px] lg:py-[110px]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[40px] xl:px-[60px] 2xl:px-0">

          {/* HEADING */}
          <div className="max-w-[900px] mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DCEEFF] text-[#013186] text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#013186]" />
              What Your Page Becomes
            </div>

            <h2 className="leading-[1.05]">
              <span className="block text-[#013186] font-extrabold tracking-[-1px] text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px]">
                Not random uploads. Not empty weeks.
              </span>
              <span
                className="block mt-1 text-[#2C9CEC] italic font-semibold tracking-[-0.5px] text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px]"
                style={{ fontFamily: "Georgia, Times New Roman, serif" }}
              >
                A page that makes people want to eat.
              </span>
            </h2>
          </div>

          {/* PLAIN IMAGE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {restws.map((item, index) => (
              <div
                key={index}
                className="rounded-[14px] overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={item}
                  alt={`Work Example ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

<section className="py-5 md:py-12 lg:py-12 overflow-hidden">
  <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-[470px_1fr]
        gap-14
        lg:gap-[120px]
        items-center
      "
    >
      {/* LEFT CONTENT */}
      <div className="max-w-[470px]">
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
            text-[10px]
            sm:text-[11px]
            font-semibold
            tracking-[0.08em]
            uppercase
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#013186]" />
          Why This Brings People In
        </div>

        {/* Heading */}
        <h2
          className="
            mt-8
            text-[#013186]
            font-black
            leading-[1.05]
            tracking-[-1.5px]
          "
        >
          <span
            className="
              block
              text-[34px]
              sm:text-[40px]
              md:text-[44px]
              lg:text-[48px]
              lg:whitespace-nowrap
            "
          >
            People don't decide
          </span>

          <span
            className="
              block
              text-[#2C9CEC]
              italic
              font-semibold
              text-[32px]
              sm:text-[38px]
              md:text-[44px]
              lg:text-[50px]
              lg:whitespace-nowrap
            "
            style={{
              fontFamily:
                "Georgia, Times New Roman, serif",
            }}
          >
            where to eat logically.
          </span>
        </h2>

        {/* Description */}
        <p
          className="
            mt-5
            text-[#7C8497]
            text-[15px]
            md:text-[17px]
            leading-[1.8]
            max-w-[420px]
          "
        >
          The restaurants that show up regularly create
          that urge. And when it hits that's where
          people go.
        </p>

        {/* Button */}
        <button
          className="
            mt-8
            h-[50px]
            px-8
            rounded-md
            bg-[#0B6CFB]
            text-white
            text-[14px]
            font-semibold
            whitespace-nowrap
            shadow-[0_10px_25px_rgba(11,108,251,0.15)]
            hover:opacity-90
            transition
          "
        >
          <a href="book-a-call">Book a Free Strategy Call</a>
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center lg:justify-end">
        <img
          src={RestD}
          alt="Restaurant Demo"
          className="
            w-full
            max-w-[380px]
            sm:max-w-[420px]
            md:max-w-[460px]
            lg:max-w-[500px]
            h-auto
            object-contain
          "
        />
      </div>
    </div>
  </div>
</section>



      {/* CTA SECTION */}
      <section className="py-[60px] md:py-[80px] lg:py-[110px]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[40px] xl:px-[60px] 2xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-10 lg:gap-12 items-center">

            {/* LEFT SIDE */}
            <div className="relative min-h-[260px] md:min-h-[320px] lg:min-h-[420px] xl:min-h-[460px] flex items-center justify-center lg:justify-start overflow-visible">
              <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <div className="absolute -left-[520px] xl:-left-[620px] 2xl:-left-[780px] top-1/2 -translate-y-1/2 w-[1100px] h-[1100px] xl:w-[1350px] xl:h-[1350px] 2xl:w-[1600px] 2xl:h-[1600px] rounded-full border border-[#F5F8FD]" />
                <div className="absolute -left-[450px] xl:-left-[540px] 2xl:-left-[670px] top-1/2 -translate-y-1/2 w-[950px] h-[950px] xl:w-[1160px] xl:h-[1160px] 2xl:w-[1380px] 2xl:h-[1380px] rounded-full border border-[#F5F8FD]" />
                <div className="absolute -left-[380px] xl:-left-[460px] 2xl:-left-[560px] top-1/2 -translate-y-1/2 w-[800px] h-[800px] xl:w-[980px] xl:h-[980px] 2xl:w-[1160px] 2xl:h-[1160px] rounded-full border border-[#F5F8FD]" />
                <div className="absolute -left-[310px] xl:-left-[380px] 2xl:-left-[450px] top-1/2 -translate-y-1/2 w-[650px] h-[650px] xl:w-[800px] xl:h-[800px] 2xl:w-[940px] 2xl:h-[940px] rounded-full border border-[#F5F8FD]" />
                <div className="absolute -left-[240px] xl:-left-[300px] 2xl:-left-[340px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] xl:w-[620px] xl:h-[620px] 2xl:w-[720px] 2xl:h-[720px] rounded-full border border-[#F5F8FD]" />
              </div>
              <div className="hidden lg:block absolute top-[35px] left-[20px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">⏱️ Time Efficiency</div>
              <div className="hidden lg:block absolute top-[70px] left-[180px] xl:left-[220px] 2xl:left-[250px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">🌿 Brand Consistency</div>
              <div className="hidden lg:block absolute top-[190px] left-[300px] xl:left-[320px] 2xl:left-[380px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">📅 Content Scheduling</div>
              <div className="hidden lg:block absolute bottom-[90px] left-[150px] xl:left-[190px] 2xl:left-[220px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">📈 Platform Reach</div>
              <div className="hidden lg:block absolute bottom-[30px] left-[20px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">🚀 Brand Visibility</div>
              <div className="relative z-10 text-center lg:text-left mx-auto lg:mx-20 max-w-[420px] lg:ml-[-20px] xl:ml-[-20px] 2xl:ml-[-40px]">
                <h2 className="text-[42px] md:text-[52px] lg:text-[44px] xl:text-[54px] 2xl:text-[62px] font-bold leading-[0.92] tracking-[-2px]">
                  <span className="block text-[#013186]">Smart Social</span>
                  <span className="block text-[#2C9CEC]">Starts at $99</span>
                </h2>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="bg-[#F7F9FD] border border-[#DCE4F2] rounded-[20px] p-6 md:p-8">
              <h3 className="text-[#013186] text-[36px] md:text-[44px] font-bold tracking-[-1px] leading-none">
                Let's Talk <span className="text-[#2C9CEC]">Strategy.</span>
              </h3>
              <p className="mt-4 text-[#6D7587] text-[15px]">Fill in the form and we'll get back with a custom plan that actually works.</p>
              <div className="mt-6 space-y-4">
                <input type="text" placeholder="Enter Your Full Name" className="w-full h-[52px] px-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none" />
                <input type="email" placeholder="Enter your email" className="w-full h-[52px] px-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none" />
                <input type="text" placeholder="Enter Your Phone Number" className="w-full h-[52px] px-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none" />
                <textarea placeholder="Tell Us About Your Brand..." rows={5} className="w-full px-4 py-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none resize-none" />
                <button className="w-full h-[56px] bg-[#DDE8FF] rounded-[12px] flex items-center justify-between px-5 text-[#1D1D1D] font-semibold">
                  <button
  onClick={() => window.location.href = "mailto:support@thesocial99.com"}
>
  <span>Let's get started</span>
</button>
                  <div className="w-10 h-10 rounded-full bg-[#AFC9FF] flex items-center justify-center">→</div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}