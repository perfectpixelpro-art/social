import PropTypes from "prop-types";

const FrameComponent11 = ({ className = "" }) => {
  return (
    <section
      className={`flex items-start justify-end pt-0 px-[11px] pb-[31px] box-border max-w-full shrink-0 text-center text-[53px] text-[#013186] font-[Montserrat] ${className}`}
    >
      <div className="flex-1 flex flex-col items-start gap-16 max-w-full mq800:gap-8 mq450:gap-4">
        <div className="self-stretch flex items-start gap-11 max-w-full mq1125:flex-wrap mq800:gap-[22px]">
          <section className="w-[600px] flex flex-col items-start gap-3.5 max-w-full text-left text-[53px] text-[#013186] font-[Montserrat] mq1125:flex-1 mq800:min-w-full">
            <h1 className="m-0 w-[500px] relative text-[length:inherit] font-bold font-[inherit] inline-block max-w-full mq800:text-[42px] mq450:text-[32px]">
              Consistency Builds Growth
            </h1>
            <div className="self-stretch flex items-start py-0 pl-[3px] pr-0 box-border max-w-full text-xl text-[#505050]">
              <div className="flex-1 relative leading-[38px] font-semibold inline-block max-w-full mq450:text-base mq450:leading-[30px]">
                Content doesn't work when it's occasional. It works when it
                shows up every week, without fail. Most businesses don't
                struggle with ideas. They struggle with execution. That's where
                results are lost and where we step in.
              </div>
            </div>
          </section>
          <img
            className="h-[405px] flex-1 relative max-w-full overflow-hidden object-cover min-w-[424px] mq800:min-w-full"
            loading="lazy"
            alt=""
            src="/Group-716@2x.png"
          />
        </div>
        <div className="w-[1281px] flex items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="flex flex-col items-start gap-[55px] max-w-full mq800:gap-[27px]">
            <h2 className="m-0 relative text-[length:inherit] font-bold font-[inherit] mq800:text-[42px] mq450:text-[32px]">
              Video Without Purpose Is Just Noise.
            </h2>
            <div className="self-stretch flex items-start py-0 px-[31px] box-border max-w-full text-left text-[19px]">
              <div className="flex-1 flex items-start relative isolate max-w-full">
                <div className="h-[515px] w-[936px] absolute !!m-[0 important] bottom-[-12px] left-[14px] [filter:blur(400px)] rounded-[50%] [background:linear-gradient(180deg,_rgba(138,_181,_255,_0.5),_rgba(225,_251,_255,_0.5))] shrink-0" />
                <div className="flex-1 rounded-[28px] flex items-start py-[207px] px-[431px] box-border bg-[url('/public/Rectangle-34624728@2x.png')] bg-cover bg-no-repeat bg-[top] max-w-full z-[1] shrink-0 mq1125:pl-[215px] mq1125:pr-[215px] mq1125:box-border mq800:py-[135px] mq800:px-[107px] mq800:box-border">
                  <img
                    className="h-[523px] w-[967px] relative rounded-[28px] object-cover hidden max-w-full shrink-0"
                    alt=""
                    src="/Rectangle-34624728@2x.png"
                  />
                  <div className="h-[105px] flex-1 relative shrink-0">
                    <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-[#cae1ff] w-full h-full z-[1]" />
                    <b className="absolute top-[41px] left-[27px] inline-block min-w-[52px] z-[2]">
                      PLAY
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent11.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent11;
