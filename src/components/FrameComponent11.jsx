import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Image4 from "../assets/image4.png";
import Video from "../assets/VIDEO.mp4";
import VideoImage from "../assets/VideoImage.png"

const FrameComponent11 = ({ className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => setIsPlaying(true);

  return (
    <section className={`w-full font-[Montserrat] ${className}`}>

      {/* ── SECTION 1: Consistency Builds Growth ── */}
      <div className="w-full flex items-center gap-20 mq1125:gap-10 pl-[30px] pr-0 pb-[70px] box-border mq800:flex-col mq800:gap-6 mq800:px-[30px] mq800:pb-[40px]">

        {/* LEFT: text */}
        <div className="flex flex-col gap-5 w-[740px] max-w-[55%] flex-shrink mq800:w-full mq800:max-w-full">
          <h1 className="m-0 text-[53px] font-bold text-[#013186] leading-[1.1] mq800:text-[40px] mq450:text-[30px]">
            Consistency<br />Builds Growth
          </h1>
          <p className="text-[19px] font-semibold leading-[1.85] text-[#505050] mq450:text-base">
            Content doesn't work when it's occasional. It works when it shows
            up every week, without fail. Most businesses don't struggle with
            ideas. They struggle with execution. That's where results are lost
            and where we step in.
          </p>
        </div>

        {/* RIGHT: image card flush to right edge */}
        <div
          className="flex-1 overflow-hidden bg-[#f0f6ff] self-stretch flex items-center justify-center min-w-0 mt-10 mq800:mt-0 mq800:w-full mq800:self-auto"
          style={{ borderRadius: "28px 0 0 28px" }}
        >
          <img
            className="w-full h-auto object-contain"
            style={{ maxHeight: "500px" }}
            loading="lazy"
            alt="Content scheduling calendar"
            src={Image4}
          />
        </div>
      </div>

      {/* ── SECTION 2: Video Without Purpose Is Just Noise ── */}
      <div className="w-full flex flex-col items-center gap-10 px-[20px] pb-[80px] box-border mq800:px-[10px] mq800:gap-7">

        {/* Video — plays inline in place */}
        <div
          className="relative w-full rounded-[28px] overflow-hidden group flex items-center justify-center"
          style={{ aspectRatio: "16/9", boxShadow: "0 20px 60px rgba(1,49,134,0.14)" }}
        >
          {isPlaying ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover bg-black"
              src={Video}
              poster={VideoImage}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <button
              className="absolute inset-0 w-full h-full cursor-pointer border-none p-0 flex items-center justify-center"
              style={{ backgroundImage: `url(${VideoImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
              onClick={handlePlay}
              aria-label="Play video"
            >
              <span className="relative w-[120px] h-[120px] flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-110 mq450:w-[80px] mq450:h-[80px]">
                <span className="absolute inset-0 rounded-full bg-[#cae1ff] z-[1]" />
                <b className="relative z-[2] text-[20px] text-[#013186] font-bold tracking-widest mq450:text-[14px]">PLAY</b>
              </span>
            </button>
          )}
        </div>
      </div>

    </section>
  );
};

FrameComponent11.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent11;