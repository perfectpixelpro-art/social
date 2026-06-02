import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <section
      className={`flex items-start py-0 px-[66px] box-border max-w-full text-left text-[20.5px] text-[#000] font-[Montserrat] mq1350:pl-[33px] mq1350:pr-[33px] mq1350:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-end gap-[38px] max-w-full mq800:gap-[19px]">
        <div className="self-stretch flex items-start justify-between gap-5 max-w-full mq1125:flex-wrap mq1125:gap-5">
          <div className="w-[861px] flex flex-col items-start pt-1.5 px-0 pb-0 box-border max-w-full">
            <div className="self-stretch flex items-start justify-between gap-5 max-w-full mq1125:flex-wrap mq1125:gap-5">
              <div className="relative leading-[38px] font-semibold inline-block max-w-full mq450:text-base mq450:leading-[30px]">
                Is the content unique to my business?
              </div>
              <button className="cursor-pointer [border:none] pt-0.5 pb-0 pl-0 pr-[9px] bg-[transparent] flex flex-col items-start">
                <img
                  className="w-10 relative max-h-full"
                  loading="lazy"
                  alt=""
                  src="/ic-baseline-plus.svg"
                />
              </button>
              <div className="relative leading-[38px] font-semibold mq450:text-base mq450:leading-[30px]">
                Do you offer revisions?
              </div>
            </div>
          </div>
          <img
            className="cursor-pointer [border:none] p-0 bg-[transparent] h-10 w-10 relative"
            alt=""
            src="/ic-baseline-plus.svg"
          />
        </div>
        <div className="self-stretch flex flex-col items-start pt-0 px-0 pb-[7px] box-border gap-9 max-w-full mq800:gap-[18px]">
          <div className="self-stretch flex items-start gap-[55px] max-w-full mq1350:flex-wrap mq800:gap-[27px]">
            <div className="flex flex-col items-start pt-1.5 px-0 pb-0 box-border max-w-full">
              <div className="relative leading-[38px] font-semibold mq450:text-base mq450:leading-[30px]">
                Can I approve content before it's posted?
              </div>
            </div>
            <div className="w-[570px] flex flex-col items-start pt-1.5 px-0 pb-0 box-border max-w-full">
              <div className="w-[489px] flex items-start justify-between gap-5 max-w-full mq800:flex-wrap mq800:gap-5">
                <button className="cursor-pointer [border:none] pt-1 px-0 pb-0 bg-[transparent] flex flex-col items-start">
                  <img
                    className="w-10 relative max-h-full"
                    alt=""
                    src="/ic-baseline-plus.svg"
                  />
                </button>
                <div className="relative leading-[38px] font-semibold inline-block max-w-full mq450:text-base mq450:leading-[30px]">
                  Which platforms do you support?
                </div>
              </div>
            </div>
            <img
              className="cursor-pointer [border:none] p-0 bg-[transparent] h-10 w-10 relative"
              alt=""
              src="/ic-baseline-plus.svg"
            />
          </div>
          <div className="self-stretch flex items-start justify-between gap-5 max-w-full mq1125:flex-wrap mq1125:gap-5">
            <div className="flex flex-col items-start pt-1.5 px-0 pb-0">
              <div className="relative leading-[38px] font-semibold mq450:text-base mq450:leading-[30px]">
                What if I want to cancel?
              </div>
            </div>
            <div className="w-[665px] flex items-start gap-[170px] max-w-full mq800:gap-[85px] mq800:flex-wrap mq450:gap-[42px]">
              <div className="flex-1 flex flex-col items-start pt-[3px] px-0 pb-0 box-border min-w-[296px] max-w-full">
                <div className="self-stretch flex items-start justify-between gap-5 max-w-full mq800:flex-wrap mq800:gap-5">
                  <img
                    className="w-10 relative max-h-full"
                    alt=""
                    src="/ic-baseline-plus.svg"
                  />
                  <div className="flex flex-col items-start pt-[3px] px-0 pb-0 box-border max-w-full">
                    <div className="relative leading-[38px] font-semibold mq450:text-base mq450:leading-[30px]">
                      Do I own the content created?
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="cursor-pointer [border:none] p-0 bg-[transparent] h-10 w-10 relative"
                alt=""
                src="/ic-baseline-plus.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex items-start justify-between gap-5 max-w-full mq1125:flex-wrap mq1125:gap-5">
          <div className="flex flex-col items-start pt-1.5 px-0 pb-0">
            <div className="relative leading-[38px] font-semibold mq450:text-base mq450:leading-[30px]">
              How soon will I see results?
            </div>
          </div>
          <div className="w-[426px] flex flex-col items-start pt-1.5 px-0 pb-0 box-border max-w-full">
            <div className="w-[353px] flex items-start justify-between gap-5 max-w-full mq450:flex-wrap mq450:gap-5">
              <div className="flex flex-col items-start pt-1.5 px-0 pb-0">
                <img
                  className="w-10 relative max-h-full"
                  alt=""
                  src="/ic-baseline-plus.svg"
                />
              </div>
              <div className="relative leading-[38px] font-semibold mq450:text-base mq450:leading-[30px]">
                Is there a setup fee?
              </div>
            </div>
          </div>
          <img
            className="cursor-pointer [border:none] p-0 bg-[transparent] h-10 w-10 relative"
            alt=""
            src="/ic-baseline-plus.svg"
          />
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
