import PropTypes from "prop-types";

const QuestionsLayout = ({ className = "" }) => {
  return (
    <section
      className={`w-full flex flex-col items-center text-center px-5 pt-20 pb-[45px] box-border font-[Montserrat] ${className}`}
    >

      
      {/* FAQ's badge with down arrow */}
      <div className="flex items-center gap-2 rounded-full bg-[#9ecaff] shadow-[0_1px_8px_rgba(0,0,0,0.1)] py-2 px-5 mb-6">
        <b className="text-[14.5px] text-[#000] leading-none">FAQ's</b>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#013186" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="m-0 text-6xl font-bold text-[#013186] mq800:text-5xl mq450:text-4xl">
        Frequently asked Questions
      </h2>

      {/* Subtitle */}
      <h2 className="m-0 mt-4 text-[27px] leading-[38px] font-semibold text-[#000] mq450:text-[22px] mq450:leading-[30px]">
        Let's find the answers to your questions.
      </h2>
    </section>
  );
};

QuestionsLayout.propTypes = {
  className: PropTypes.string,
};

export default QuestionsLayout;
