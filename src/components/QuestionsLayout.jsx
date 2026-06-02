import PropTypes from "prop-types";

const QuestionsLayout = ({ className = "" }) => {
  return (
    <section
      className={`w-[1280px] flex items-start justify-center pt-0 px-5 pb-[45px] box-border max-w-full text-left text-[14.5px] text-[#000] font-[Montserrat] ${className}`}
    >
      <div className="flex flex-col items-start gap-[9px] max-w-full">
        <div className="self-stretch flex flex-col items-start gap-[21px]">
          <div className="self-stretch flex items-start justify-center py-0 pl-[27px] pr-5">
            <div className="flex items-start relative isolate">
              <div className="h-9 w-[100px] !!m-[0 important] absolute top-[-8px] left-[-21px] shadow-[3px_3px_0.5px_-3.5px_#fff_inset,_2px_2px_0.5px_-2px_#262626_inset,_-2px_-2px_0.5px_-2px_#262626_inset,_0px_0px_0px_1px_#a6a6a6_inset,_0px_0px_8px_#f2f2f2_inset,_0px_1px_8px_rgba(0,_0,_0,_0.1)] [backdrop-filter:blur(12px)] rounded-[100px] bg-[#9ecaff] overflow-hidden shrink-0 flex items-center py-2 px-[21px] box-border z-[0]" />
              <div className="relative tracking-[-0.1px] leading-5 inline-block min-w-[65px] z-[1] shrink-0">
                <span className="leading-5">
                  <b className="leading-5">FAQ's</b>
                  <span className="text-[10.5px] font-semibold font-[Montserrat] leading-5 whitespace-pre-wrap">{`  `}</span>
                </span>
                <span className="font-black text-[#013186] leading-5">{`>`}</span>
              </div>
            </div>
          </div>
          <h2 className="m-0 h-[73px] relative text-6xl font-bold font-[inherit] text-[#013186] inline-block mq800:text-5xl mq450:text-4xl">
            Frequently asked Questions
          </h2>
        </div>
        <div className="flex items-start py-0 px-[161px] text-[27px] mq1125:pl-20 mq1125:pr-20 mq1125:box-border mq450:pl-5 mq450:pr-5 mq450:box-border">
          <h2 className="m-0 relative text-[length:inherit] leading-[38px] font-semibold font-[inherit] mq450:text-[22px] mq450:leading-[30px]">
            Let's find the answers to your questions.
          </h2>
        </div>
      </div>
    </section>
  );
};

QuestionsLayout.propTypes = {
  className: PropTypes.string,
};

export default QuestionsLayout;
