import Seo from "../components/Seo";
import facial from "../assets/facial.webp";
import skin from "../assets/skin.webp";
import facial3 from "../assets/facial_33.webp";

import facialBtn from "../assets/skin_btn.webp";
import skinBtn from "../assets/facial3_btn.png";
import facial3Btn from "../assets/facial_btn.webp";

import ProblemSection from "../components/ProblemSection";
import SolutionSection from "../components/SolutionSection";
import WorkExamplesSection from "../components/WorkExamplesSection";
import ProcessSection from "../components/ProcessSection";
import ResultsFaqSection from "../components/ResultsFaqSection";
import SalonPricingSection from "../components/SalonPricingSection";



export default function MedSpaLandingPage() {
  return (
    <>
      <Seo path="/med-spa" title="Social Media Marketing for Med Spas | The Social 99" description="Specialized social media management and content for med spas. Attract more clients with done-for-you posts, videos, and campaigns from $99/month." />

      {/* Hero Section */}
  <section className="w-full  h-[500px] max-[1000px]:min-h-[950px] max-[768px]:min-h-[820px] overflow-hidden mt-20 md:mt-20 max-[750px]:mt-0">
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
    <div className="relative min-h-[620px]">

      {/* LEFT CONTENT */}
      <div
        className="
          pt-[70px]
          lg:pt-[95px]
          max-w-[560px]
          relative
          z-20
        "
      >
        <h1
          className="
            font-bold
            tracking-[-2px]
            leading-[0.95]
            text-[48px]
            md:text-[60px]
            lg:text-[66px]
          "
        >
          <span className="block text-[#013186]">
            Social Media for
          </span>

          <span className="block text-[#013186]">
            Med Spas That
          </span>

          <span className="block text-[#2C9CEC]">
            Drives Bookings
          </span>
        </h1>

        <p
          className="
            mt-5
            text-[#6D7587]
            text-[16px]
            leading-[1.7]
            max-w-[520px]
          "
        >
          Done for you content, posting, and management so your
          pet grooming stays consistent, trusted, and fully booked.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <button
            className="
              bg-[#013186]
              text-white
              h-[54px]
              px-7
              rounded-full
              font-medium
              hover:opacity-90
              transition
            "
          >
            <a
  href="/book-a-call"
>
  Book a Free Strategy Call
</a>
          </button>

          <button
            className="
              bg-[#E7EEFF]
              text-[#013186]
              h-[54px]
              px-7
              rounded-full
              font-medium
              hover:bg-[#dbe7ff]
              transition
            "
          >
            <a href="book-a-call">Start for $99 →</a>
          </button>
        </div>

        <p className="mt-4 text-[#8A94A7] text-[14px]">
          ★ Start for $99. Cancel anytime.
        </p>
      </div>

      {/* DESKTOP IMAGE CLUSTER */}
      <div
        className="
          hidden
          lg:flex
          absolute
          right-[70px]
          top-[110px]
          items-center
          z-10
        "
      >
        {/* LEFT CARD */}
        <div className="relative w-[320px]">
          <img
            src={facial}
            alt="Med spa facial treatment result by The Social 99"
            className="w-full object-contain"
          />

          <img
            src={facialBtn}
            alt=""
            className="
              absolute
              top-8
              -left-10
              w-[150px]
            "
          />
        </div>

        {/* CENTER CARD */}
        <div
          className="
            relative
            w-[200px]
            right-[30px]
          -top-[150px]
            -mx-6
            z-30
          "
        >
          <img
            src={skin}
            alt="Med spa skincare treatment result by The Social 99"
            className="w-full object-contain"
          />

          <img
            src={skinBtn}
            alt=""
            className="
              absolute
              -top-5
              -right-15
              w-[130px]
            "
          />
        </div>

        {/* RIGHT CARD */}
        <div className="relative w-[200px]">
          <img
            src={facial3}
            alt="Med spa aesthetic treatment result by The Social 99"
            className="w-full object-contain relative  -right-[5px]
          -top-[100px] "
            
          />

          <img
            src={facial3Btn}
            alt=""
            className="
              absolute
              top-[44%]
              -left-20
              w-[135px] 
              z-50
            "
          />
        </div>
      </div>

      {/* TABLET */}
      <div className="hidden md:flex lg:hidden justify-center mt-12 pb-12">
        <div className="relative flex items-center">
          <img
            src={facial}
            alt="Med spa facial treatment result by The Social 99"
            className="w-[280px] relative left-0 z-10"
          />

          <img
            src={skin}
            alt="Med spa skincare treatment result by The Social 99"
            className="
              w-[220px]
              relative
              -left-10
              z-30
              -mx-8
            "
          />

          <img
            src={facial3}
            alt="Med spa aesthetic treatment result by The Social 99"
            className="w-[160px] relative z-20 relative -left-5 top-25"
          />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden mt-12 pb-10">
        <div className="relative flex justify-center items-center h-[260px]">

          <img
            src={facial}
            alt="Med spa facial treatment result by The Social 99"
            className="
              absolute
              -left-13
              -top-6
              
              bottom-0
              w-[200px]
              z-10
            "
          />

          <img
            src={skin}
            alt="Med spa skincare treatment result by The Social 99"
            className="
              absolute
              left-1/2
              -translate-x-1/2
              top-0
              w-[170px]
              z-30
            "
          />

          <img
            src={facial3}
            alt="Med spa aesthetic treatment result by The Social 99"
            className="
              absolute
              right-0
              bottom-0
              w-[110px]
              z-20
            "
          />
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Problem Section */}\
      <ProblemSection/>

      {/* Solution Section */}
      <SolutionSection />

      {/* WorkExample Section */}
      <WorkExamplesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* ResultFaq Section */}
      <ResultsFaqSection />
      <SalonPricingSection />

      
      {/* FINAL CTA SECTION */}
<section className="">
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
    <div className="text-center">

      {/* Label */}
      <div className="flex justify-center items-center gap-2 mb-5">
        <div className="w-4 h-[2px] bg-[#2C9CEC]" />
        <span
          className="
            uppercase
            tracking-[1px]
            text-[11px]
            text-[#8C94A7]
            font-medium
          "
        >
          DON'T WAIT
        </span>
      </div>

      {/* Heading */}
      <div className="max-w-[800px] mx-auto">
        <h2
          className="
            font-bold
            tracking-[-1.5px]
            leading-[1.15]
            text-[36px]
            md:text-[42px]
            lg:text-[52px]
          "
        >
          <span className="text-[#013186]">Your med spa needs visibility to grow. </span>
          <span className="text-[#0170E0]">We make sure you stay consistent.</span>
        </h2>
      </div>

      {/* Description */}
      <p
        className="
          mt-5
          max-w-[540px]
          mx-auto
          text-[#7C8497]
          text-[14px]
          md:text-[15px]
          leading-[1.9]
        "
      >
        Start for $99. No contracts. No complicated onboarding.
        Just consistent social media that works for your clinic
        every single week.
      </p>

      {/* Buttons */}
      <div
        className="
          mt-7
          flex
          flex-wrap
          justify-center
          gap-3
        "
      >
        {/* Start For $99 */}
        <button
          className="
            h-[42px]
            px-4
            bg-[#DDE8FF]
            rounded-full
            flex
            items-center
            gap-3
            text-[#013186]
            text-[14px]
            font-medium
            transition
            hover:opacity-90
          "
        >
          <span><a href="book-a-call">Start for $99</a></span>
          <div
            className="
              w-7
              h-7
              rounded-full
              bg-[#AFC9FF]
              flex
              items-center
              justify-center
              text-[16px]
            "
          >
            →
          </div>
        </button>

        {/* Strategy Call */}
        <button
          className="
            h-[42px]
            px-4
            bg-[#DDE8FF]
            rounded-full
            flex
            items-center
            gap-3
            text-[#013186]
            text-[14px]
            font-medium
            transition
            hover:opacity-90
          "
        >
          <span><a href="book-a-call">Book a Free Strategy Call</a></span>
          <div
            className="
              w-7
              h-7
              rounded-full
              bg-[#AFC9FF]
              flex
              items-center
              justify-center
              text-[16px]
            "
          >
            →
          </div>
        </button>
      </div>

      {/* Bottom Text */}
      <p
        className="
          mt-5
          text-[11px]
          text-[#A0A8B8]
        "
      >
        No credit card required for strategy call ·
        Cancel anytime · Start same day
      </p>

    </div>
  </div>
</section>
    </>
  );
}