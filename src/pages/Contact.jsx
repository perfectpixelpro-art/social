const Contact = () => {
  return (
    <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-20">
      <div className="max-w-[600px] mx-auto">
        <h1 className="text-[52px] mq800:text-[38px] mq450:text-[28px] font-bold text-[#013186] mb-4 text-center">Book A Call</h1>
        <p className="text-xl text-[rgba(0,0,0,0.5)] font-semibold text-center mb-12">
          Let's talk about growing your business on social media.
        </p>
        <div className="rounded-[20px] border border-[rgba(1,49,134,0.15)] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] p-10 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Full Name</label>
            <input type="text" placeholder="Your name" className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none focus:border-[#013186] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Email Address</label>
            <input type="email" placeholder="you@example.com" className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none focus:border-[#013186] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Business Name</label>
            <input type="text" placeholder="Your business" className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none focus:border-[#013186] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#000]">Message</label>
            <textarea rows={4} placeholder="Tell us about your goals..." className="rounded-[14px] bg-[#f3f8ff] border border-[#b0c5e7] px-5 py-3 text-sm font-[Montserrat] outline-none resize-none focus:border-[#013186] transition-colors" />
          </div>
          <button className="cursor-pointer bg-[rgba(188,214,255,0.37)] border border-[rgba(1,49,134,0.07)] h-[50px] rounded-[25.5px] flex items-center justify-center font-bold text-[#000] text-base hover:bg-[rgba(188,214,255,0.6)] transition-colors mt-2">
            Send Message ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
