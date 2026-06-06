import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <footer
      className={`self-stretch flex items-end py-0 pl-[228px] pr-0 box-border relative isolate gap-[73.5px] max-w-full text-left text-[21px] text-[rgba(0,0,0,0.5)] font-[Montserrat] mq1350:pl-[114px] mq1350:box-border mq1125:flex-wrap mq800:gap-[37px] mq800:pl-[57px] mq800:box-border mq450:gap-[18px] mq450:pl-5 mq450:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start pt-[238px] px-[113px] pb-[165px] box-border relative isolate gap-[39px] max-w-full shrink-0 mq1125:pl-14 mq1125:pr-14 mq1125:box-border mq1125:min-w-full mq800:pt-[155px] mq800:pb-[107px] mq800:box-border mq450:gap-[19px] mq450:pl-5 mq450:pr-5 mq450:box-border">
        <h3 className="m-0 relative text-[length:inherit] font-semibold font-[inherit] inline-block max-w-full z-[4] shrink-0 mq450:text-[17px]">
          Join Our Newsletter — Smarter Social Media Starts Here.
        </h3>
        <div className="w-[858.5px] h-[725px] !!m-[0 important] absolute top-[0px] left-[0px] flex items-start isolate max-w-full shrink-0 text-[58px] text-[#013186]">
          <img
            className="h-[725px] flex-1 relative max-w-full overflow-hidden z-[3] shrink-0"
            alt=""
            src="/Newsletter-BG.svg"
          />
          <h2 className="!!m-[0 important] w-[933px] absolute top-[148px] left-[-48px] text-[length:inherit] font-bold font-[inherit] inline-block whitespace-nowrap z-[4] shrink-0 mq800:text-[46px] mq450:text-[35px]">
            Subscribe to Our Newsletter 🗞️
          </h2>
        </div>
        <div className="w-[611px] h-[71px] flex items-start py-0 px-[11px] box-border max-w-full shrink-0">
          <div className="self-stretch flex-1 flex items-start py-0 pl-0 pr-2 box-border max-w-full">
            <div className="self-stretch flex-1 rounded-[22px] bg-[#f3f8ff] border-[#b0c5e7] border-solid border-[1px] box-border flex items-start pt-[25px] px-[34px] pb-6 max-w-full shrink-0">
              <div className="h-[71px] w-[589px] relative rounded-[22px] bg-[#f3f8ff] border-[#b0c5e7] border-solid border-[1px] box-border hidden max-w-full shrink-0" />
              <input
                className="w-full [border:none] [outline:none] font-medium font-[Montserrat] text-[15px] bg-[transparent] relative text-[#000] text-left inline-block p-0 z-[1] shrink-0"
                placeholder="Email Address"
                type="text"
              />
            </div>
            <div className="w-[223px] flex flex-col items-start pt-3.5 px-0 pb-0 box-border ml-[-231px] relative shrink-0">
              <button className="cursor-pointer border-[rgba(1,49,134,0.07)] border-solid border-[1px] py-0.5 pl-7 pr-[9px] bg-[rgba(188,214,255,0.37)] self-stretch h-[43px] rounded-[25.5px] box-border flex items-start justify-between gap-5 z-[2]">
                <div className="h-[43px] w-[223px] relative rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border hidden shrink-0" />
                <div className="flex flex-col items-start pt-[9px] px-0 pb-0 shrink-0">
                  <b className="relative text-[15px] font-[Montserrat] text-[#000] text-left [text-shadow:1px_0_0_rgba(1,_49,_134,_0.07),_0_1px_0_rgba(1,_49,_134,_0.07),_-1px_0_0_rgba(1,_49,_134,_0.07),_0_-1px_0_rgba(1,_49,_134,_0.07)] z-[1]">
                    Subscribe Now
                  </b>
                </div>
                <div className="h-[35px] w-[35px] relative rounded-[21px] bg-[rgba(158,202,255,0.39)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border z-[1] shrink-0">
                  <div className="absolute top-[0px] left-[0px] rounded-[21px] bg-[rgba(158,202,255,0.39)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border w-full h-full hidden" />
                  <img
                    className="absolute top-[9px] left-[9px] w-[18px] h-[18px] object-contain z-[2]"
                    alt=""
                    src="/image-14@2x.png"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[65px] flex flex-col items-start shrink-0">
        <div className="flex items-start gap-[15px]">
          <img
            className="cursor-pointer [border:none] p-0 bg-[transparent] h-[25px] w-[25px] relative rounded-[3px] object-cover"
            alt=""
            src="/Icon-jpeg@2x.png"
          />
          <img
            className="cursor-pointer [border:none] p-0 bg-[transparent] h-[25px] w-[25px] relative object-cover"
            alt=""
            src="/image-12@2x.png"
          />
          <img
            className="cursor-pointer [border:none] p-0 bg-[transparent] h-[25px] w-[25px] relative object-cover"
            alt=""
            src="/image-111@2x.png"
          />
          <img
            className="cursor-pointer [border:none] p-0 bg-[transparent] h-[25px] w-[25px] relative object-cover"
            alt=""
            src="/image-10@2x.png"
          />
        </div>
      </div>
      <img
        className="cursor-pointer [border:none] p-0 bg-[transparent] h-[39px] w-[33.1px] absolute !!m-[0 important] bottom-[33px] left-[0px] object-cover shrink-0"
        alt=""
        src="/Logo@2x.png"
      />
    </footer>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
