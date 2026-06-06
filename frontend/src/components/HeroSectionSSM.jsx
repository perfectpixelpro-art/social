import bgImage from "../assets/light-gradient-bg.png";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[500px] overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1
          className="
            font-montserrat
            font-extrabold
            text-[#013186]
            leading-[0.9]
            tracking-[-0.04em]
            text-[56px]
            md:text-[80px]
            lg:text-[96px]
            xl:text-[110px]
          "
        >
          Scroll-Stopping Content
          <br />
          Built for Your Brand
        </h1>
      </div>
    </section>
  );
}