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
  const [active, setActive] = useState(null); // id of reel currently playing inline

  return (
    <section className={`w-full font-[Montserrat] py-16 ${className}`}>
      <h2 className="text-center text-[73px] mq800:text-[40px] mq450:text-[28px] font-bold text-[#013186] m-0 mb-12">
        Video Examples
      </h2>

      {/* 2 rows × 4 = 8 reels */}
      <div className="grid grid-cols-4 gap-6 mq1125:grid-cols-2 mq450:grid-cols-1">
        {REELS.map((reel) => (
          <div
            key={reel.id}
            className="relative rounded-[18px] overflow-hidden group"
            style={{ aspectRatio: "9/16", boxShadow: "0 8px 30px rgba(1,49,134,0.12)" }}
          >
            {active === reel.id ? (
              <video
                className="absolute inset-0 w-full h-full object-cover bg-black"
                src={reel.src}
                poster={reel.poster}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <button
                className="absolute inset-0 w-full h-full cursor-pointer border-none p-0"
                style={{ backgroundImage: `url(${reel.poster})`, backgroundSize: "cover", backgroundPosition: "center" }}
                onClick={() => setActive(reel.id)}
                aria-label="Play video"
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-[64px] h-[64px] rounded-full bg-white/85 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-lg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#013186"><path d="M8 5v14l11-7z" /></svg>
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
