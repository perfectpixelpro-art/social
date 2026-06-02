import LightGradientBG from "../components/LightGradientBG";
import PlanContent from "../components/PlanContent";
import ChallengeCard from "../components/ChallengeCard";
import FrameComponent11 from "../components/FrameComponent11";
import FrameComponent111 from "../components/FrameComponent111";
import FrameComponent11111 from "../components/FrameComponent11111";
import FrameComponent1111 from "../components/FrameComponent1111";
import QuestionsLayout from "../components/QuestionsLayout";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";

const Home = () => {
  return (
    <div className="w-full relative bg-[#fff] overflow-hidden flex flex-col items-end pt-14 pb-0 pl-0 pr-[55px] box-border isolate gap-[86px] leading-[normal] tracking-[normal] text-left text-base text-[#000] font-[Montserrat] mq800:gap-[43px] mq800:pr-[27px] mq800:box-border mq450:gap-[21px]">
      <div className="w-[1315.1px] flex items-start justify-end py-0 px-px box-border max-w-full shrink-0">
        <header className="self-stretch flex-1 flex items-start gap-2.5 max-w-full text-left text-base text-[#7e7f80] font-[Montserrat]">
          <div className="self-stretch flex flex-col items-start py-0 pl-0 pr-[18px]">
            <img
              className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover z-[1]"
              loading="lazy"
              alt=""
              src="/Logo@2x.png"
            />
          </div>
          <div className="flex-1 flex flex-col items-start pt-3.5 px-0 pb-0 box-border max-w-full">
            <nav className="m-0 w-[228px] flex items-start gap-[16.6px] text-left text-base text-[#7e7f80] font-[Montserrat] mq1350:hidden">
              <div className="h-[19px] flex-1 relative">
                <img
                  className="absolute top-[8.5px] left-[73.6px] w-[9.8px] h-[5.5px] object-cover z-[1]"
                  alt=""
                  src="/Mask-group1@2x.png"
                />
                <div className="absolute top-[0px] left-[0px] font-semibold inline-block min-w-[71px] z-[1]">
                  Services
                </div>
              </div>
              <div className="flex flex-col items-start py-0 pl-0 pr-[5px]">
                <div className="relative font-semibold z-[1]">Work</div>
              </div>
              <div className="relative font-semibold z-[1]">Pricing</div>
            </nav>
          </div>
          <div className="flex flex-col items-start pt-[3px] px-0 pb-0">
            <div className="self-stretch h-[43px] flex items-start py-3 pl-[23px] pr-[22px] box-border relative isolate z-[1]">
              <div className="h-full w-full absolute !!m-[0 important] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-[25.5px] bg-[rgba(188,214,255,0.54)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border shrink-0" />
              <b className="relative z-[1] shrink-0">Log in</b>
            </div>
          </div>
          <div className="flex flex-col items-start pt-[3px] px-0 pb-0">
            <button className="cursor-pointer border-[rgba(1,49,134,0.07)] border-solid border-[1px] pt-0.5 pb-[3px] pl-[17px] pr-[5px] bg-[rgba(188,214,255,0.37)] h-[43px] rounded-[25.5px] box-border flex items-start gap-[13px] z-[1]">
              <div className="h-[43px] w-[171px] relative rounded-[25.5px] bg-[rgba(188,214,255,0.37)] border-[rgba(1,49,134,0.07)] border-solid border-[1px] box-border hidden shrink-0" />
              <div className="flex flex-col items-start pt-2 px-0 pb-0 shrink-0">
                <b className="relative text-base inline-block font-[Montserrat] text-[#000] text-left min-w-[99px] z-[1]">
                  Book a call
                </b>
              </div>
              <div className="h-[35px] w-[35px] relative rounded-[21px] bg-[rgba(158,202,255,0.39)] z-[1] shrink-0">
                <div className="absolute top-[0px] left-[0px] rounded-[21px] bg-[rgba(158,202,255,0.39)] w-full h-full hidden" />
                <img
                  className="absolute top-[7px] left-[7px] w-[21px] h-[21px] object-cover z-[1]"
                  alt=""
                  src="/image@2x.png"
                />
              </div>
            </button>
          </div>
        </header>
      </div>
      <section className="w-[1329px] flex items-start justify-center pt-0 px-5 pb-[37px] box-border max-w-full shrink-0 text-center text-[68px] text-[#013186] font-[Montserrat]">
        <div className="flex flex-col items-start gap-4 max-w-full">
          <b className="relative z-[1] mq800:text-[54px] mq450:text-[41px]">
            Affordable Social Media <br />
            Management for Small Business
          </b>
          <div className="flex items-start py-0 pl-[114px] pr-[100px] text-left text-[31px] text-[rgba(0,0,0,0.5)] mq1125:pl-[57px] mq1125:pr-[50px] mq1125:box-border mq800:pl-7 mq800:pr-[25px] mq800:box-border">
            <h2 className="m-0 relative text-[length:inherit] font-semibold font-[inherit] z-[1] mq800:text-[25px] mq450:text-[19px]">
              Customized Content, Expert Management, Proven Results.
            </h2>
          </div>
        </div>
      </section>
      <img
        className="cursor-pointer [border:none] p-0 bg-[transparent] w-[25px] h-[25px] relative object-cover hidden z-[2] shrink-0"
        alt=""
        src="/prime-twitter@2x.png"
      />
      <section className="w-full h-[1095px] absolute !!m-[0 important] top-[-200px] right-[0px] left-[0px] shrink-0">
        <LightGradientBG />
        <img
          className="absolute top-[696px] left-[1261px] w-[121.3px] h-[27.5px] object-cover z-[1] shrink-0"
          loading="lazy"
          alt=""
          src="/Group-86@2x.png"
        />
        <div className="absolute top-[572px] left-[1194px] [filter:blur(600px)] rounded-[50%] w-[175px] h-[175px] z-[2] shrink-0" />
        <div className="absolute top-[0px] left-[1018px] [filter:blur(400px)] rounded-[50%] [background:linear-gradient(180deg,_rgba(158,_202,_255,_0.51),_rgba(255,_255,_255,_0))] w-[983px] h-[983px] z-[3] shrink-0" />
      </section>
      <div className="w-[585px] h-[65px] relative rounded-[32.5px] border-[#013186] border-solid border-[1px] box-border hidden max-w-full z-[4] shrink-0" />
      <div className="w-[585px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[5] shrink-0" />
      <img
        className="w-[30px] h-[30px] relative object-cover hidden z-[6] shrink-0"
        alt=""
        src="/image-131@2x.png"
      />
      <div className="w-[585px] h-[65px] relative rounded-[32.5px] border-[#013186] border-solid border-[1px] box-border hidden max-w-full z-[7] shrink-0" />
      <div className="w-[585px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[8] shrink-0" />
      <img
        className="w-[30px] h-[30px] relative object-cover hidden z-[9] shrink-0"
        alt=""
        src="/image-131@2x.png"
      />
      <div className="w-[585px] h-[65px] relative rounded-[32.5px] border-[#013186] border-solid border-[1px] box-border hidden max-w-full z-[10] shrink-0" />
      <div className="w-[582px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[11] shrink-0" />
      <div className="w-[582px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[12] shrink-0" />
      <img
        className="w-[30px] h-[30px] relative object-cover hidden z-[13] shrink-0"
        alt=""
        src="/image-131@2x.png"
      />
      <img
        className="w-[30px] h-[30px] relative object-cover hidden z-[14] shrink-0"
        alt=""
        src="/image-131@2x.png"
      />
      <div className="w-[585px] h-[65px] relative rounded-[32.5px] border-[#013186] border-solid border-[1px] box-border hidden max-w-full z-[15] shrink-0" />
      <div className="w-[585px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[16] shrink-0" />
      <div className="w-[585px] h-[65px] relative rounded-[32.5px] border-[#013186] border-solid border-[1px] box-border hidden max-w-full z-[17] shrink-0" />
      <div className="w-[585px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[18] shrink-0" />
      <div className="w-[585px] h-[65px] relative rounded-[32.5px] border-[#013186] border-solid border-[1px] box-border hidden max-w-full z-[19] shrink-0" />
      <div className="w-[585px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[20] shrink-0" />
      <div className="w-[582px] h-[65px] relative [backdrop-filter:blur(80px)] rounded-[30px] [background:linear-gradient(238.96deg,_#f2f7ff,_#f5f9ff)] border-[rgba(1,49,134,0.2)] border-solid border-[1px] box-border hidden max-w-full z-[21] shrink-0" />
      <section className="w-[1314px] flex flex-col items-start pt-0 px-0 pb-[13px] box-border gap-[46px] max-w-full shrink-0 mq800:gap-[23px]">
        <PlanContent />
        <ChallengeCard />
      </section>
      <FrameComponent11 />
      <FrameComponent111 />
      <FrameComponent11111 />
      <div className="w-[1440px] h-11 relative bg-[rgba(3,108,233,0.11)] hidden max-w-full z-[26] shrink-0" />
      <img
        className="cursor-pointer [border:none] p-0 bg-[transparent] w-[26px] h-[26px] relative hidden z-[27] shrink-0"
        alt=""
        src="/radix-icons-cross-2.svg"
      />
      <FrameComponent1111 />
      <div className="w-[1321px] flex items-start justify-center pt-0 px-5 pb-[42.4px] box-border max-w-full shrink-0">
        <div className="flex flex-col items-start gap-[19px]">
          <div className="self-stretch relative font-semibold">
            <span>⭐ 5/5 Average Rating (</span>
            <span className="text-[#3db100]">744+ Reviews</span>
            <span>)</span>
          </div>
          <div className="flex items-start py-0 pl-[11px] pr-5">
            <img
              className="h-[58.6px] w-[286px] relative object-cover"
              loading="lazy"
              alt=""
              src="/Group-85@2x.png"
            />
          </div>
        </div>
      </div>
      <section className="w-[1317px] flex items-start justify-end py-0 px-1.5 box-border max-w-full shrink-0">
        <div className="flex-1 flex flex-col items-start gap-[47px] max-w-full mq800:gap-[23px]">
          <QuestionsLayout />
          <FrameComponent />
          <FrameComponent1 />
        </div>
      </section>
    </div>
  );
};

export default Home;
