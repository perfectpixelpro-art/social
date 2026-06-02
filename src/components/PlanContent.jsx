import PropTypes from "prop-types";

const PlanContent = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start gap-[17px] max-w-full text-left text-[23px] text-[rgba(0,0,0,0.5)] font-[Montserrat] ${className}`}
    >
      <div className="self-stretch h-11 flex items-start gap-[848px] mq1350:gap-[424px] mq1125:flex-wrap mq800:gap-[212px] mq450:gap-[106px]">
        <div className="flex flex-col items-start pt-4 px-0 pb-0">
          <h3 className="m-0 relative text-[length:inherit] font-semibold font-[inherit] z-[1] mq450:text-lg">
            Select Your Plan
          </h3>
        </div>
        <div className="flex-1 relative text-sm leading-5 font-semibold text-right z-[4] text-[#000]">
          <span className="leading-5">{`Trusted by `}</span>
          <span className="text-[#3db100] leading-5">1450+ Businesses</span>
          <span className="leading-5"> to Boost Engagement and Followers.</span>
        </div>
      </div>
      <section className="self-stretch flex items-start gap-6 max-w-full text-left text-2xl text-[#000] font-[Montserrat] mq1125:flex-wrap mq1125:justify-center mq1125:grid-cols-[repeat(2,_minmax(316px,_549px))] mq800:grid-cols-[minmax(316px,_1fr)]">
        <div className="flex-1 [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border flex flex-col items-start py-[21px] pl-7 pr-5 relative isolate gap-12 min-w-[316px] max-w-full z-[1] mq450:gap-6">
          <div className="w-[422px] h-[328px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[0] shrink-0" />
          <img
            className="w-full h-full absolute !!m-[0 important] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full z-[1] shrink-0"
            alt=""
            src="/Mask-group3.svg"
          />
          <h3 className="m-0 relative text-[length:inherit] font-bold font-[inherit] inline-block max-w-full z-[2] shrink-0 mq450:text-[19px]">
            Social Media Management
          </h3>
          <div className="w-[223px] flex flex-col items-start gap-[26px] shrink-0 text-[10.5px]">
            <div className="flex flex-col items-start gap-3.5">
              <div className="w-[177px] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#9ecaff] overflow-hidden flex items-center py-2 px-5 box-border">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  📈 Results-Driven Growth
                </div>
              </div>
              <div className="w-[175px] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#171717] overflow-hidden flex items-center py-2 px-[19px] box-border text-[#020202]">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  🎯 Tailored Content Ideas
                </div>
              </div>
              <div className="self-stretch shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#171717] overflow-hidden flex items-center py-2 px-[19px]">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  🔥 Attention-Grabbing Posts
                </div>
              </div>
            </div>
            <button className="cursor-pointer border-[rgba(1,49,134,0.07)] border-solid border-[1px] py-0.5 pl-7 pr-[9px] bg-[rgba(188,214,255,0.37)] self-stretch h-[43px] rounded-[25.5px] box-border flex items-start justify-between gap-5 z-[2]">
              <div className="h-[43px] w-[223px] relative rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border hidden shrink-0" />
              <div className="flex flex-col items-start pt-[9px] px-0 pb-0 shrink-0">
                <b className="relative text-[15px] font-[Montserrat] text-[#000] text-left z-[1]">
                  Let's Go
                </b>
              </div>
              <div className="h-[35px] w-[35px] relative rounded-[21px] bg-[rgba(158,202,255,0.39)] z-[1] shrink-0">
                <div className="absolute top-[0px] left-[0px] rounded-[21px] bg-[rgba(158,202,255,0.39)] w-full h-full hidden" />
                <img
                  className="absolute top-[9px] left-[9px] w-[18px] h-[18px] object-contain z-[2]"
                  alt=""
                  src="/image-1@2x.png"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="flex-[1.0215] [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border flex flex-col items-start py-[21px] px-5 relative isolate gap-[39px] min-w-[316px] max-w-full z-[1] mq450:gap-[19px]">
          <div className="w-[422px] h-[328px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[0] shrink-0" />
          <div className="w-[422px] h-[328px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[1] shrink-0" />
          <img
            className="w-full h-full absolute !!m-[0 important] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full z-[1] shrink-0"
            alt=""
            src="/Mask-group4.svg"
          />
          <div className="flex items-start py-0 px-1 shrink-0">
            <h3 className="m-0 relative text-[length:inherit] font-bold font-[inherit] z-[2] mq450:text-[19px]">
              Short-Form Videos
            </h3>
          </div>
          <div className="w-[242px] h-[214px] flex flex-col items-start gap-[27px] shrink-0 text-[10.5px]">
            <div className="self-stretch flex items-start justify-end py-0 px-[19px]">
              <div className="w-[165px] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#9ecaff] overflow-hidden shrink-0 flex items-center py-[5px] px-3.5 box-border">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  ⚡️ Videos Built for Virality
                </div>
              </div>
            </div>
            <div className="w-[152px] h-[30px] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#171717] overflow-hidden shrink-0 flex items-center py-[5px] px-3.5 box-border">
              <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                🎬 Stories That Convert
              </div>
            </div>
            <div className="self-stretch flex items-start justify-end text-[#020202]">
              <div className="w-[188px] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#171717] overflow-hidden shrink-0 flex items-center py-[5px] px-[13px] box-border">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  📊 Proven Engagement Boost
                </div>
              </div>
            </div>
            <div className="self-stretch flex-1 flex items-start py-0 pl-[5px] pr-3.5">
              <button className="cursor-pointer border-[rgba(1,49,134,0.07)] border-solid border-[1px] py-0.5 pl-7 pr-[9px] bg-[rgba(188,214,255,0.37)] self-stretch flex-1 rounded-[25.5px] flex items-start justify-between gap-5 z-[2]">
                <div className="h-[43px] w-[223px] relative rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border hidden shrink-0" />
                <div className="flex flex-col items-start pt-[9px] px-0 pb-0 shrink-0">
                  <b className="relative text-[15px] font-[Montserrat] text-[#000] text-left z-[1]">
                    Let's Go
                  </b>
                </div>
                <div className="h-[35px] w-[35px] relative rounded-[21px] bg-[rgba(158,202,255,0.39)] z-[1] shrink-0">
                  <div className="absolute top-[0px] left-[0px] rounded-[21px] bg-[rgba(158,202,255,0.39)] w-full h-full hidden" />
                  <img
                    className="absolute top-[9px] left-[9px] w-[18px] h-[18px] object-contain z-[2]"
                    alt=""
                    src="/image-1@2x.png"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-[1.0322] [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border flex flex-col items-start py-[21px] px-[18px] relative isolate gap-[47px] min-w-[316px] max-w-full z-[1] mq450:gap-[23px]">
          <div className="w-[422px] h-[328px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[0] shrink-0" />
          <div className="w-[422px] h-[328px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[1] shrink-0" />
          <img
            className="w-full h-full absolute !!m-[0 important] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full z-[1] shrink-0"
            alt=""
            src="/Mask-group2.svg"
          />
          <img
            className="w-[422px] h-[328px] relative object-cover hidden max-w-full z-[3] shrink-0"
            alt=""
            src="/Mask-group@2x.png"
          />
          <div className="flex items-start py-0 px-1.5 shrink-0">
            <h3 className="m-0 relative text-[length:inherit] font-bold font-[inherit] z-[2] mq450:text-[19px]">
              Award-winning website
            </h3>
          </div>
          <div className="w-[230px] h-[206px] flex flex-col items-end gap-[25.5px] shrink-0 text-[10.5px]">
            <div className="flex items-start justify-end py-0 pl-[7px] pr-[25px]">
              <div className="flex-1 shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#9ecaff] overflow-hidden flex items-center py-[5px] px-[13px]">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  💼 Conversion-Focused Designs
                </div>
              </div>
            </div>
            <div className="flex items-start justify-end py-0 px-2">
              <div className="flex-1 shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#171717] overflow-hidden flex items-center py-[5px] px-[13px]">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  🚀 Seamless User Experience
                </div>
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-col items-start gap-[22px] text-[#020202]">
              <div className="w-[149px] h-[30px] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#171717] overflow-hidden shrink-0 flex items-center py-[5px] px-[13px] box-border">
                <div className="relative tracking-[-0.1px] leading-5 font-semibold">
                  💰 ROI-Backed Results
                </div>
              </div>
              <div className="self-stretch flex-1 flex items-start py-0 pl-[7px] pr-0">
                <button className="cursor-pointer border-[rgba(1,49,134,0.07)] border-solid border-[1px] py-0.5 pl-7 pr-[9px] bg-[rgba(188,214,255,0.37)] self-stretch flex-1 rounded-[25.5px] flex items-start justify-between gap-5 z-[2]">
                  <div className="h-[43px] w-[223px] relative rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border hidden shrink-0" />
                  <div className="flex flex-col items-start pt-[9px] px-0 pb-0 shrink-0">
                    <b className="relative text-[15px] font-[Montserrat] text-[#000] text-left z-[1]">
                      Let's Go
                    </b>
                  </div>
                  <div className="h-[35px] w-[35px] relative rounded-[21px] bg-[rgba(158,202,255,0.39)] z-[1] shrink-0">
                    <div className="absolute top-[0px] left-[0px] rounded-[21px] bg-[rgba(158,202,255,0.39)] w-full h-full hidden" />
                    <img
                      className="absolute top-[9px] left-[9px] w-[18px] h-[18px] object-contain z-[2]"
                      alt=""
                      src="/image-1@2x.png"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <img
            className="w-[95px] h-[95px] relative hidden z-[6] shrink-0"
            alt=""
            src="/mail.svg"
          />
        </div>
      </section>
    </div>
  );
};

PlanContent.propTypes = {
  className: PropTypes.string,
};

export default PlanContent;
