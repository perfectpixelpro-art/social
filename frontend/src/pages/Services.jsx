import Seo from "../components/Seo";
const Services = () => {
  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-20">
      <Seo path="/services" title="Our Services — Social Media, Video & Web Design | The Social 99" description="Explore The Social 99's services: social media management, short-form video creation, and conversion-focused website design for small businesses from $99/month." />
      <h1 className="text-[52px] mq800:text-[38px] mq450:text-[28px] font-bold text-[#013186] mb-6">Our Services</h1>
      <p className="text-xl text-[rgba(0,0,0,0.5)] font-semibold max-w-[600px]">
        We offer end-to-end social media solutions tailored for small businesses — from content creation to full account management.
      </p>
      <div className="mt-14 grid grid-cols-3 gap-6 mq1125:grid-cols-2 mq800:grid-cols-1">
        {[
          { title: "Social Media Management", desc: "Consistent, branded content posted weekly across all your platforms.", icon: "📱" },
          { title: "Short-Form Videos", desc: "Reels, TikToks, and Shorts designed to go viral and drive engagement.", icon: "🎬" },
          { title: "Website Design", desc: "Award-winning, conversion-focused websites built to turn visitors into customers.", icon: "💻" },
        ].map((s) => (
          <div key={s.title} className="rounded-[20px] border border-[rgba(1,49,134,0.15)] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] p-8 flex flex-col gap-4">
            <div className="text-4xl">{s.icon}</div>
            <h3 className="text-xl font-bold text-[#000] m-0">{s.title}</h3>
            <p className="text-sm text-[rgba(0,0,0,0.6)] font-semibold leading-relaxed m-0">{s.desc}</p>
            <button className="mt-auto cursor-pointer bg-[rgba(188,214,255,0.37)] border border-[rgba(1,49,134,0.07)] h-[43px] rounded-[25.5px] flex items-center justify-center font-bold text-[#000] hover:bg-[rgba(188,214,255,0.6)] transition-colors">
              Explore now $99
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
