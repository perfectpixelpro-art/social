const StartStrongCTA = () => {
  return (
    <section className="w-full px-[100px] mq800:px-10 mq450:px-5 py-16 flex flex-col items-center text-center font-[Montserrat]">
      <img src="/Logo2@2x.png" alt="The Social 99" className="h-[56px] w-auto object-contain mq450:h-[44px]" onError={(e) => { e.target.src = "/Logo@2x.png"; }} />
      <h2 className="mt-5 text-black font-bold" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>
        Start Strong. Just $99.
      </h2>
      <a
        href="/checkout?plan=Starter"
        className="mt-6 flex items-center gap-2 no-underline border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] hover:bg-[rgba(188,214,255,0.6)] transition-colors h-[48px] rounded-[25.5px] pl-6 pr-[6px]"
      >
        <b className="text-base text-[#000]">Join 760+ Others</b>
        <span className="h-[36px] w-[36px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
        </span>
      </a>
    </section>
  );
};

export default StartStrongCTA;
