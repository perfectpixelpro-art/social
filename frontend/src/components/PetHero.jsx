import GrowthImg from "../assets/GrowthImg.webp";
import NewBooking from "../assets/NewBooking.png";

export default function PetHero() {
  return (
    <section className="overflow-hidden pt-[10px] md:pt-[70px] lg:pt-[80px] pb-[90px]">
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
        <div className="relative text-center pt-[120px] md:pt-[80px]">

          {/* LEFT IMAGE */}
          <img
            src={NewBooking}
            alt="New Booking"
            className="
              absolute
              left-[-10px]
              lg:left-[-20px]
              xl:left-0
              top-[20px]
              w-[140px]
              sm:w-[170px]
              md:w-[200px]
              lg:w-[220px]
              xl:w-[260px]
              2xl:w-[300px]
              rotate-[-7deg]
              z-10
              pointer-events-none
            "
          />

          {/* RIGHT IMAGE */}
          <img
            src={GrowthImg}
            alt="Growth Stats"
            className="
              absolute
              right-[-10px]
              lg:right-[-20px]
              xl:right-0
              top-[10px]
              w-[140px]
              sm:w-[170px]
              md:w-[200px]
              lg:w-[220px]
              xl:w-[260px]
              2xl:w-[300px]
              rotate-[6deg]
              z-10
              pointer-events-none
            "
          />

          {/* HEADING */}
          <div
            className="
              max-w-[560px]
              md:max-w-[650px]
              lg:max-w-[720px]
              mx-auto
              relative
              z-20
            "
          >
            <h1
              className="
                font-bold
                tracking-[-1.5px]
                leading-[1.08]
                text-[34px]
                sm:text-[42px]
                md:text-[48px]
                lg:text-[56px]
                xl:text-[64px]
              "
            >
              <span className="text-[#013186]">
                Your Best Groom
              </span>

              <br />

              <span className="text-[#013186]">
                Ever.
              </span>{" "}

              <span className="text-[#0170E0]">
                Nobody Saw It.
              </span>
            </h1>
          </div>

          {/* DESCRIPTION */}
          <p
            className="
              mt-6
              max-w-[750px]
              mx-auto
              text-[#7C8497]
              text-[15px]
              md:text-[16px]
              leading-[1.9]
              relative
              z-20
            "
          >
            <span className="block">
              That perfectly trimmed Golden Retriever. That before & after
              that would've stopped every pet
            </span>

            <span className="block">
              owner in Austin mid-scroll. Gone. Because you're too busy
              doing the work to show the work.
            </span>
          </p>

          {/* SUB TEXT */}
          <p
            className="
              mt-4
              text-[14px]
              text-[#7C8497]
              relative
              z-20
            "
          >
            That's not a content problem.

            <span className="font-semibold text-[#013186]">
              {" "}
              That's a bookings problem.
            </span>
          </p>

          {/* BUTTONS */}
          <div
            className="
              mt-5
              flex
              flex-wrap
              justify-center
              gap-3
              relative
              z-20
            "
          >
            <button
              className="
                h-[46px]
                px-5
                bg-[#DDE8FF]
                rounded-full
                flex
                items-center
                gap-2
                text-[14px]
                text-[#013186]
                font-medium
                hover:opacity-90
                transition
              "
            >
            <a href="book-a-call"> Book a Free Strategy Call</a>

              <div
                className="
                  w-8
                  h-8
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

            <button
              className="
                h-[46px]
                px-5
                bg-[#DDE8FF]
                rounded-full
                flex
                items-center
                gap-2
                text-[14px]
                text-[#013186]
                font-medium
                hover:opacity-90
                transition
              "
            >
          <a href="book-a-call"> Start for $99</a>     

              <div
                className="
                  w-8
                  h-8
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

          {/* FOOTNOTE */}
          <p
            className="
              mt-5
              text-[11px]
              text-[#9AA3B5]
              relative
              z-20
            "
          >
            ▪ Start for $99. Cancel anytime.
          </p>

        </div>
      </div>
    </section>
  );
}