import PropTypes from "prop-types";

const ChallengeCard = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border flex flex-col items-start pt-[19px] pb-6 pl-12 pr-[39px] gap-[37px] max-w-full text-left text-[31px] text-[#000] font-[Montserrat] mq1350:pl-6 mq1350:box-border mq800:gap-[18px] ${className}`}
    >
      <div className="w-[1313px] h-[246px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(180deg,_#f2f7ff,_#dceaff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full shrink-0" />
      <div className="self-stretch flex flex-col items-start gap-2.5 max-w-full shrink-0">
        <div className="self-stretch flex items-start justify-between gap-5 max-w-full mq1125:flex-wrap mq1125:gap-5">
          <h2 className="m-0 relative text-[length:inherit] font-bold font-[inherit] inline-block max-w-full z-[1] mq800:text-[25px] mq450:text-[19px]">
            Get Results in Just 2 weeks – Risk-Free!
          </h2>
          <div className="flex flex-col items-start pt-[7px] px-0 pb-0 text-xs text-[#797979]">
            <div className="relative font-semibold inline-block min-w-[110px] z-[1]">
              <span>the</span>
              <span className="text-xl">Social99</span>
            </div>
          </div>
        </div>
        <div className="flex items-start py-0 px-px box-border max-w-full text-[15px] text-[rgba(0,0,0,0.6)]">
          <div className="h-5 w-[554px] relative inline-block">
            <span className="font-semibold">
              Experience amazing results or your money back—
            </span>
            <b className="text-[#000]">no questions asked.*</b>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[94px] flex items-end justify-between gap-5 max-w-full shrink-0 text-[22px] mq1350:flex-wrap mq1350:gap-5">
        <button className="cursor-pointer [border:none] pt-0 px-0 pb-[7px] bg-[transparent] h-[50px] w-[223px] flex flex-col items-start justify-end box-border">
          <div className="self-stretch flex-1 rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] flex items-start justify-between py-0.5 pl-7 pr-[9px] gap-5 z-[1]">
            <div className="h-[43px] w-[223px] relative rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border hidden shrink-0" />
            <div className="flex flex-col items-start pt-[9px] px-0 pb-0 shrink-0">
              <b className="relative text-[15px] font-[Montserrat] text-[#000] text-left z-[1]">
                Explore Now
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
          </div>
        </button>
        <div className="self-stretch w-[855px] flex items-end gap-[0.1px] max-w-full z-[1] mq800:flex-wrap">
          <div className="h-[64.6px] flex-1 shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1),_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-t-[20px] rounded-b-none [background:#171717,_rgba(172,_172,_172,_0.2)] overflow-hidden flex flex-col items-start justify-center pt-3.5 pb-0 pl-[21px] pr-5 box-border gap-px mq450:flex-1">
            <h3 className="m-0 relative text-[length:inherit] tracking-[-0.1px] leading-5 font-bold font-[inherit] mq450:text-lg mq450:leading-4">
              01
            </h3>
            <div className="relative text-[10px] tracking-[-0.1px] leading-5 font-semibold text-[#5e6266]">
              Engaging Post
            </div>
          </div>
          <div className="self-stretch flex-1 shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1),_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-t-[20px] rounded-b-none [background:#1e3555,_#acacac] overflow-hidden flex flex-col items-start justify-center pt-3.5 pb-0 pl-[21px] pr-5 gap-2 z-[7] text-[35px] mq450:flex-1">
            <h2 className="m-0 relative text-[length:inherit] tracking-[-0.1px] leading-5 font-bold font-[inherit] mq800:text-[28px] mq800:leading-4 mq450:text-[21px] mq450:leading-3">
              02
            </h2>
            <div className="w-[49px] h-[13px] relative text-[10px] tracking-[-0.1px] leading-5 font-semibold text-[#5e6266] inline-block shrink-0">
              Viral Reel
            </div>
          </div>
          <div className="flex-[1.111] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1),_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-t-[20px] rounded-b-none [background:#171717,_rgba(172,_172,_172,_0.2)] overflow-hidden flex flex-col items-start pt-3.5 px-4 pb-[9.6px] gap-px mq450:flex-1">
            <h3 className="m-0 relative text-[length:inherit] tracking-[-0.1px] leading-5 font-bold font-[inherit] mq450:text-lg mq450:leading-4">
              03
            </h3>
            <div className="relative text-[10px] tracking-[-0.1px] leading-5 font-semibold text-[#5e6266]">
              Compelling Post
            </div>
          </div>
          <div className="flex-[1.2096] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1),_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-t-[20px] rounded-b-none [background:#171717,_rgba(172,_172,_172,_0.2)] overflow-hidden flex flex-col items-start pt-3.5 px-3 pb-[9.6px] gap-px">
            <h3 className="m-0 relative text-[length:inherit] tracking-[-0.1px] leading-5 font-bold font-[inherit] mq450:text-lg mq450:leading-4">
              04
            </h3>
            <div className="relative text-[10px] tracking-[-0.1px] leading-5 font-semibold text-[#5e6266]">
              Creative Carousel
            </div>
          </div>
          <div className="flex-[1.111] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1),_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-t-[20px] rounded-b-none [background:#171717,_rgba(172,_172,_172,_0.2)] overflow-hidden flex flex-col items-start pt-3.5 px-4 pb-[9.6px] gap-px mq450:flex-1">
            <h3 className="m-0 relative text-[length:inherit] tracking-[-0.1px] leading-5 font-bold font-[inherit] mq450:text-lg mq450:leading-4">
              05
            </h3>
            <div className="relative text-[10px] tracking-[-0.1px] leading-5 font-semibold text-[#5e6266]">
              Captivating Reel
            </div>
          </div>
          <div className="flex-[1.2096] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1),_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-t-[20px] rounded-b-none [background:#171717,_rgba(172,_172,_172,_0.2)] overflow-hidden flex flex-col items-start pt-3.5 px-3 pb-[9.6px] gap-px">
            <h3 className="m-0 relative text-[length:inherit] tracking-[-0.1px] leading-5 font-bold font-[inherit] mq450:text-lg mq450:leading-4">
              06
            </h3>
            <div className="relative text-[10px] tracking-[-0.1px] leading-5 font-semibold text-[#5e6266]">
              Insightful Carousel
            </div>
          </div>
          <div className="flex-[1.1603] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_2px_rgba(0,_0,_0,_0.1),_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-t-[20px] rounded-b-none [background:#171717,_rgba(172,_172,_172,_0.2)] overflow-hidden flex flex-col items-start pt-3.5 px-3.5 pb-[9.6px] gap-px mq450:flex-1">
            <h3 className="m-0 relative text-[length:inherit] tracking-[-0.1px] leading-5 font-bold font-[inherit] mq450:text-lg mq450:leading-4">
              07
            </h3>
            <div className="relative text-[10px] tracking-[-0.1px] leading-5 font-semibold text-[#5e6266]">
              Targeted Emails
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ChallengeCard.propTypes = {
  className: PropTypes.string,
};

export default ChallengeCard;
