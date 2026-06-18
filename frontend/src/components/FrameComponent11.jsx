import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Image4 from "../assets/image4.webp";
import Video from "../assets/VIDEO.mp4";
import VideoImage from "../assets/VideoImage.webp";

const FrameComponent11 = ({ className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const videoDivRef = useRef(null);
  const playBtnRef = useRef(null);

  useEffect(() => {
    const container = videoDivRef.current;
    const playBtn = playBtnRef.current;
    if (!container || !playBtn) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Direct DOM manipulation — no React re-render, zero lag
      playBtn.style.left = `${x}px`;
      playBtn.style.top = `${y}px`;
    };

    const handleMouseEnter = () => {
      playBtn.style.transition = "none";
    };

    const handleMouseLeave = () => {
      playBtn.style.transition = "left 0.5s ease, top 0.5s ease";
      playBtn.style.left = "50%";
      playBtn.style.top = "50%";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPlaying]);

  return (
    <section className={`w-full font-[Montserrat] ${className}`}>

      {/* SECTION 1 — completely unchanged */}
      <div
        className="
          w-full flex items-center justify-between gap-16 pt-[100px] pb-[80px]
          mq1125:gap-10 mq800:flex-col mq800:pt-[60px] mq800:pb-[50px] mq800:gap-8
        "
      >
        <div className="flex flex-col gap-5 flex-1 max-w-[650px] mq800:max-w-full">
          <h1
            className="
              m-0 font-bold text-[#013186] leading-[1.05]
              text-[64px] mq1125:text-[54px] mq800:text-[44px] mq600:text-[38px] mq450:text-[30px]
            "
          >
            Consistency
            <br />
            Builds Growth
          </h1>
          <p
            className="
              text-[22px] leading-[1.8] text-[#808080]
              mq800:text-[18px] mq450:text-[16px]
            "
          >
            Content doesn't work when it's occasional. It works when it
            shows up every week, without fail. Most businesses don't
            struggle with ideas. They struggle with execution. That's
            where results are lost and where we step in.
          </p>
        </div>
        <div className="flex-1 w-full flex items-center justify-center">
          <img
            src={Image4}
            alt="Content scheduling calendar"
            loading="lazy"
            className="
              w-full max-w-[700px] h-auto object-contain
              mq800:max-w-[550px] mq450:max-w-full
            "
          />
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div className="w-full pb-[80px] mq800:pb-[60px] mq450:pb-[40px]">
        <div
          ref={videoDivRef}
          className="relative w-full overflow-hidden rounded-[28px] mq450:rounded-[20px]"
          style={{ aspectRatio: "16 / 9", cursor: "none" }}
        >
          {isPlaying ? (
            <video
              ref={videoRef}
              src={Video}
              poster={VideoImage}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover bg-black"
              style={{ cursor: "auto" }}
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              aria-label="Play video"
              className="absolute inset-0 w-full h-full border-none"
              style={{
                backgroundImage: `url(${VideoImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "none",
              }}
            >
              {/* PLAY button — moves via direct DOM, no lag */}
              <span
                ref={playBtnRef}
                className="
                  relative flex items-center justify-center
                  w-[120px] h-[120px]
                  mq800:w-[95px] mq800:h-[95px]
                  mq450:w-[70px] mq450:h-[70px]
                "
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  willChange: "left, top",
                }}
              >
                <span className="absolute inset-0 rounded-full bg-[#cae1ff]" />
                <b
                  className="
                    relative z-10 font-bold tracking-[4px]
                    text-[#013186] text-[20px] mq450:text-[13px]
                  "
                >
                  PLAY
                </b>
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