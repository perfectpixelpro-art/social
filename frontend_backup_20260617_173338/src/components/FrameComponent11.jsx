import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Image4 from "../assets/image4.png";
import Video from "../assets/VIDEO.mp4";
import VideoImage from "../assets/VideoImage.png";

const FrameComponent11 = ({ className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <section className={`w-full font-[Montserrat] ${className}`}>

      {/* SECTION 1 */}
      <div
        className="
          w-full
          flex
          items-center
          justify-between
          gap-16
          pt-[100px]
          pb-[80px]
          mq1125:gap-10
          mq800:flex-col
          mq800:pt-[60px]
          mq800:pb-[50px]
          mq800:gap-8
        "
      >
        {/* LEFT */}
        <div
          className="
            flex
            flex-col
            gap-5
            flex-1
            max-w-[650px]
            mq800:max-w-full
          "
        >
          <h1
            className="
              m-0
              font-bold
              text-[#013186]
              leading-[1.05]
              text-[64px]
              mq1125:text-[54px]
              mq800:text-[44px]
              mq600:text-[38px]
              mq450:text-[30px]
            "
          >
            Consistency
            <br />
            Builds Growth
          </h1>

          <p
            className="
              text-[22px]
              leading-[1.8]
              text-[#808080]
              mq800:text-[18px]
              mq450:text-[16px]
            "
          >
            Content doesn't work when it's occasional. It works when it
            shows up every week, without fail. Most businesses don't
            struggle with ideas. They struggle with execution. That's
            where results are lost and where we step in.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            flex-1
            w-full
            flex
            items-center
            justify-center
          "
        >
          <img
            src={Image4}
            alt="Content scheduling calendar"
            loading="lazy"
            className="
              w-full
              max-w-[700px]
              h-auto
              object-contain
              mq800:max-w-[550px]
              mq450:max-w-full
            "
          />
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div
        className="
          w-full
          pb-[80px]
          mq800:pb-[60px]
          mq450:pb-[40px]
        "
      >
        <div
          className="
            relative
            w-full
            overflow-hidden
            rounded-[28px]
            mq450:rounded-[20px]
            group
          "
          style={{
            aspectRatio: "16 / 9",
          }}
        >
          {isPlaying ? (
            <video
              ref={videoRef}
              src={Video}
              poster={VideoImage}
              controls
              autoPlay
              playsInline
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                bg-black
              "
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              aria-label="Play video"
              className="
                absolute
                inset-0
                w-full
                h-full
                border-none
                cursor-pointer
                flex
                items-center
                justify-center
              "
              style={{
                backgroundImage: `url(${VideoImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  group-hover:scale-110
                  w-[120px]
                  h-[120px]
                  mq800:w-[95px]
                  mq800:h-[95px]
                  mq450:w-[70px]
                  mq450:h-[70px]
                "
              >
                <span className="absolute inset-0 rounded-full bg-[#cae1ff]" />

                <b
                  className="
                    relative
                    z-10
                    font-bold
                    tracking-[4px]
                    text-[#013186]
                    text-[20px]
                    mq450:text-[13px]
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