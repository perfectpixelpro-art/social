import Seo from "../components/Seo";
import Work1 from "../assets/Work1.webp";
import Work2 from "../assets/Work2.webp";
import Work3 from "../assets/Work3.webp";
import Work4 from "../assets/Work4.webp";
import Work5 from "../assets/Work5.webp";
import Work6 from "../assets/Work6.webp";


export default function ContactUs() {
  const works = [
    Work1,
    Work2,
    Work3,
    Work4,
    Work5,
    Work6,
  ];

  return (<>
      <Seo path="/contact" title="Contact The Social 99 - Get in Touch" description="Have questions? Contact The Social 99 to start growing your business with affordable social media management, short-form video, and website design." breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />



{/* Contact Us  */}
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

{/* Support Section */}
<section className="mt-6 md:mt-8">
  <div
    className="
      p-5
      md:p-6
      text-center
    "
  >
    <h4
      className="
        text-[#013186]
        text-[18px]
        md:text-[22px]
        font-bold
      "
    >
      Need Help?
    </h4>

    <p
      className="
        mt-2
        text-[#6D7587]
        text-[14px]
        md:text-[15px]
        leading-relaxed
      "
    >
      For any questions, support requests, or partnership inquiries,
      feel free to reach out to us.
    </p>

    <a
      href="mailto:chirag@thesocial99.com"
      className="
        mt-4
        inline-block
        text-[#2C9CEC]
        text-[16px]
        md:text-[20px]
        font-semibold
        hover:text-[#013186]
        transition-colors
        break-all
      "
    >
      support@thesocial99.com
    </a>
  </div>
</section>



  </>
   
  );
}