import { useState } from "react";
import PropTypes from "prop-types";

import Video1 from "../assets/VIDEO1.mp4";
import Video2 from "../assets/VIDEO2.mp4";
import Video3 from "../assets/VIDEO3.mp4";
import Video4 from "../assets/VIDEO4.mp4";
import Video5 from "../assets/VIDEO5.mp4";
import Video6 from "../assets/VIDEO6.mp4";
import Video7 from "../assets/VIDEO7.mp4";
import Video8 from "../assets/VIDEO8.mp4";

import vi1 from "../assets/vi1.avif";
import vi2 from "../assets/vi2.avif";
import vi3 from "../assets/vi3.avif";
import vi4 from "../assets/vi4.avif";
import vi5 from "../assets/vi5.avif";
import vi6 from "../assets/vi6.avif";
import vi7 from "../assets/vi7.avif";
import vi8 from "../assets/vi8.avif";

const REELS = [
  { id: 1, src: Video1, poster: vi1 },
  { id: 2, src: Video2, poster: vi2 },
  { id: 3, src: Video3, poster: vi3 },
  { id: 4, src: Video4, poster: vi4 },
  { id: 5, src: Video5, poster: vi5 },
  { id: 6, src: Video6, poster: vi6 },
  { id: 7, src: Video7, poster: vi7 },
  { id: 8, src: Video8, poster: vi8 },
];

const VideoExamples = ({ className = "" }) => {
  const [active, setActive] = useState(null);

  return (
    <section
      className={`w-full font-[Montserrat] py-20 mq800:py-14 mq450:py-10 ${className}`}
    >
      <h2
        className="
          text-center
          font-bold
          text-[#013186]
          leading-[1.1]
          mb-12
          mq800:mb-8
          mq450:mb-6
        "
        style={{
          fontSize: "clamp(32px, 5vw, 73px)",
        }}
      >
        Video Examples
      </h2>

      <div
        className="
          grid
          grid-cols-4
          gap-6
          mq1125:grid-cols-2
          mq1125:gap-5
          mq450:grid-cols-1
          mq450:gap-4
        "
      >
        {REELS.map((reel) => (
          <div
            key={reel.id}
            className="
              relative
              overflow-hidden
              rounded-[22px]
              group
              transition-all
              duration-300
              hover:-translate-y-1
            "
            style={{
              aspectRatio: "9/16",
              boxShadow: "0 8px 30px rgba(1,49,134,0.12)",
            }}
          >
            {active === reel.id ? (
              <video
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  bg-black
                "
                src={reel.src}
                poster={reel.poster}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <button
                onClick={() => setActive(reel.id)}
                aria-label="Play video"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  border-none
                  p-0
                  cursor-pointer
                "
                style={{
                  backgroundImage: `url(${reel.poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="
                      w-[70px]
                      h-[70px]
                      mq450:w-[56px]
                      mq450:h-[56px]
                      rounded-full
                      bg-white/90
                      flex
                      items-center
                      justify-center
                      shadow-xl
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#013186"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

VideoExamples.propTypes = {
  className: PropTypes.string,
};

export default VideoExamples;
``