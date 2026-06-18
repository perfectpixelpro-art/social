import Bar1 from "../assets/Bar1.webp";
import Bar2 from "../assets/Bar2.webp";
import Bar3 from "../assets/Bar3.webp";
import Bar4 from "../assets/Bar4.webp";
import Bar5 from "../assets/Bar5.webp";
import Bar6 from "../assets/Bar6.webp";


export default function WorkExampleSecBar() {
  const bars = [
    Bar1,
    Bar2,
    Bar3,
    Bar4,
    Bar5,
    Bar6,
  ];

  return (<>

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
    {/* LABEL */}
<div className="flex justify-center items-center gap-2 mb-4">
  <div className="w-8 h-[1px] bg-[#2C9CEC]" />

  <span
    className="
      uppercase
      tracking-[2px]
      text-[10px]
      md:text-[11px]
      font-semibold
      text-[#2C9CEC]
    "
  >
    IN YOUR FEED THIS WEEK
  </span>
</div>

{/* HEADING */}
<h2
  className="
    text-center
    uppercase
    font-black
    tracking-[-2px]
    leading-[0.95]
    text-[#011f52]
    text-[34px]
    sm:text-[42px]
    md:text-[52px]
    lg:text-[58px]
  "
>
  CONTENT THAT MAKES PEOPLE{" "}
  <span className="text-[#2C9CEC] italic">
    SHOW UP
  </span>
</h2>

    {/* Grid */}
    <div
      className="
        mt-12
        md:mt-14
        lg:mt-16
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        lg:gap-8
      "
    >
      {bars.map((item, index) => (
        <div
          key={index}
          className="
            rounded-[16px]
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-2
          "
        >
          {/* FIXED SIZE CARD */}
          <div
            className="
              relative
              w-full
              aspect-[4/5]
              bg-white
            "
          >
            <img
              src={item}
              alt={`Work Example ${index + 1}`}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-contain
              "
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* CTA SECTION */}
<section className="py-[60px] md:py-[80px] lg:py-[110px] ">
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
        grid
        grid-cols-1
        lg:grid-cols-[1fr_460px]
        xl:grid-cols-[1fr_500px]
        gap-10
        lg:gap-12
        items-center
      "
    >
  {/* LEFT SIDE */}
<div
  className="
    relative
    min-h-[260px]
    md:min-h-[320px]
    lg:min-h-[420px]
    xl:min-h-[460px]
    flex
    items-center
    justify-center
    lg:justify-start
    overflow-visible
  "
>
  {/* Desktop Circles */}
  <div className="hidden lg:block absolute inset-0 pointer-events-none">

    <div className="absolute -left-[520px] xl:-left-[620px] 2xl:-left-[780px] top-1/2 -translate-y-1/2 w-[1100px] h-[1100px] xl:w-[1350px] xl:h-[1350px] 2xl:w-[1600px] 2xl:h-[1600px] rounded-full border border-[#F5F8FD]" />

    <div className="absolute -left-[450px] xl:-left-[540px] 2xl:-left-[670px] top-1/2 -translate-y-1/2 w-[950px] h-[950px] xl:w-[1160px] xl:h-[1160px] 2xl:w-[1380px] 2xl:h-[1380px] rounded-full border border-[#F5F8FD]" />

    <div className="absolute -left-[380px] xl:-left-[460px] 2xl:-left-[560px] top-1/2 -translate-y-1/2 w-[800px] h-[800px] xl:w-[980px] xl:h-[980px] 2xl:w-[1160px] 2xl:h-[1160px] rounded-full border border-[#F5F8FD]" />

    <div className="absolute -left-[310px] xl:-left-[380px] 2xl:-left-[450px] top-1/2 -translate-y-1/2 w-[650px] h-[650px] xl:w-[800px] xl:h-[800px] 2xl:w-[940px] 2xl:h-[940px] rounded-full border border-[#F5F8FD]" />

    <div className="absolute -left-[240px] xl:-left-[300px] 2xl:-left-[340px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] xl:w-[620px] xl:h-[620px] 2xl:w-[720px] 2xl:h-[720px] rounded-full border border-[#F5F8FD]" />
  </div>

  {/* Pills Desktop Only */}

  <div className="hidden lg:block absolute top-[35px] left-[20px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">
    ⏱️ Time Efficiency
  </div>

  <div className="hidden lg:block absolute top-[70px] left-[180px] xl:left-[220px] 2xl:left-[250px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">
    🌿 Brand Consistency
  </div>

  <div className="hidden lg:block absolute top-[190px] left-[300px] xl:left-[320px] 2xl:left-[380px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">
    📅 Content Scheduling
  </div>

  <div className="hidden lg:block absolute bottom-[90px] left-[150px] xl:left-[190px] 2xl:left-[220px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">
    📈 Platform Reach
  </div>

  <div className="hidden lg:block absolute bottom-[30px] left-[20px] bg-white px-4 py-2 rounded-full border border-[#EEF2F8] shadow-sm text-[11px] whitespace-nowrap">
    🚀 Brand Visibility
  </div>

  {/* Heading */}
  <div
    className="
      relative
      z-10
      text-center
      lg:text-left
      mx-auto
      lg:mx-20
      max-w-[420px]
      lg:ml-[-20px]
      xl:ml-[-20px]
      2xl:ml-[-40px]
    "
  >
    <h2
      className="
        text-[42px]
        md:text-[52px]
        lg:text-[44px]
        xl:text-[54px]
        2xl:text-[62px]
        font-bold
        leading-[0.92]
        tracking-[-2px]
      "
    >
      <span className="block text-[#013186]">
        Smart Social
      </span>

      <span className="block text-[#2C9CEC]">
        Starts at $99
      </span>
    </h2>
  </div>
</div>

      {/* RIGHT SIDE FORM */}
      <div
        className="
          bg-[#F7F9FD]
          border
          border-[#DCE4F2]
          rounded-[20px]
          p-6
          md:p-8
        "
      >
        <h3
          className="
            text-[#013186]
            text-[36px]
            md:text-[44px]
            font-bold
            tracking-[-1px]
            leading-none
          "
        >
          Let's Talk <span className="text-[#2C9CEC]">Strategy.</span>
        </h3>

        <p className="mt-4 text-[#6D7587] text-[15px]">
          Fill in the form and we'll get back with a custom
          plan that actually works.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full h-[52px] px-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-[52px] px-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none"
          />

          <input
            type="text"
            placeholder="Enter Your Phone Number"
            className="w-full h-[52px] px-4 rounded-[8px] border border-[#C7D4EC] bg-white outline-none"
          />

          <textarea
            placeholder="Tell Us About Your Brand..."
            rows={5}
            className="
              w-full
              px-4
              py-4
              rounded-[8px]
              border
              border-[#C7D4EC]
              bg-white
              outline-none
              resize-none
            "
          />

          <button
            className="
              w-full
              h-[56px]
              bg-[#DDE8FF]
              rounded-[12px]
              flex
              items-center
              justify-between
              px-5
              text-[#1D1D1D]
              font-semibold
            "
          >
            <button
  onClick={() => window.location.href = "mailto:support@thesocial99.com"}
>
  <span>Let's get started</span>
</button>

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-[#AFC9FF]
                flex
                items-center
                justify-center
              "
            >
              →
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

  </>
   
  );
}