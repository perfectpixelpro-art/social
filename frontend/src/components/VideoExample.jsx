import { useState, useRef } from "react";
import vi1 from "../assets/vi1.avif";
import vi2 from "../assets/vi2.avif";
import vi3 from "../assets/vi3.avif";
import vi4 from "../assets/vi4.avif";
import vi5 from "../assets/vi5.avif";
import vi6 from "../assets/vi6.avif";
import vi7 from "../assets/vi7.avif";
import vi8 from "../assets/vi8.avif";

import video1 from "../assets/VIDEO1.mp4";
import video2 from "../assets/VIDEO2.mp4";
import video3 from "../assets/VIDEO3.mp4";
import video4 from "../assets/VIDEO4.mp4";
import video5 from "../assets/VIDEO5.mp4";
import video6 from "../assets/VIDEO6.mp4";
import video7 from "../assets/VIDEO7.mp4";
import video8 from "../assets/VIDEO8.mp4";

const videos = [
  {
    id: 1,
    src: video1,
    thumbnail: vi1,
    duration: "0:20",
    label: "HQ Ribbon Cutting",
  },
  {
    id: 2,
    src: video2,
    thumbnail: vi2,
    bg: "#e8281e",
    duration: "0:21",
    label: "Too Many Platforms",
    textOverlay: true,
  },
  {
    id: 3,
    src: video3,
    thumbnail: vi3,
    bg: "#000000",
    duration: "0:13",
    label: "Dark Video",
    loading: true,
  },
  {
    id: 4,
    src: video4,
    thumbnail: vi4,
    duration: "0:14",
    label: "He Sales?",
    textTop: true,
  },
  {
    id: 5,
    src: video5,
    thumbnail: vi5,
    duration: "0:30",
    label: "Brand Story",
  },
  {
    id: 6,
    src: video6,
    thumbnail: vi6,
    duration: "0:45",
    label: "Product Launch",
  },
  {
    id: 7,
    src: video7,
    thumbnail: vi7,
    duration: "0:22",
    label: "Team Highlight",
  },
  {
    id: 8,
    src: video8,
    thumbnail: vi8,
    duration: "0:18",
    label: "Client Testimonial",
  },
];

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    setCurrentTime(`${m}:${s}`);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: "9/16",
        background: video.bg || "#111",
        fontFamily: "'Montserrat', sans-serif",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail or background */}
      {video.thumbnail && !playing && (
        <img
          src={video.thumbnail}
          alt={video.label}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Red bold text overlay (card 2 style) */}
      {video.textOverlay && !playing && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{ background: "#e8281e" }}
        >
          <p
            className="text-white text-center leading-tight"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 3.5vw, 28px)",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
            }}
          >
            TOO MANY<br />PLATFORMS.<br />TOO MUCH<br />PRESSURE
          </p>
          <p
            className="text-white text-center mt-2 italic"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(10px, 1.8vw, 14px)",
              opacity: 0.85,
            }}
          >
            do IT ALL.
          </p>
          <div
            className="mt-4 rounded-full border-4 border-white"
            style={{ width: 70, height: 70, background: "rgba(255,255,255,0.15)" }}
          />
        </div>
      )}

      {/* Loading spinner (card 3 style) */}
      {video.loading && !playing && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#000" }}>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-white animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Card 4 style: text top + black/white image */}
      {video.textTop && !playing && (
        <div className="absolute inset-0" style={{ background: "#fff" }}>
          <p
            className="absolute top-4 left-4 right-4 text-black leading-none"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(20px, 3.5vw, 30px)",
            }}
          >
            he <span style={{ fontSize: "clamp(14px, 2.5vw, 22px)", fontWeight: 400 }}>sales?</span>
          </p>
          <img
            src={video.thumbnail}
            alt={video.label}
            className="absolute bottom-0 left-0 right-0 w-full object-cover"
            style={{ height: "70%", filter: "grayscale(100%)" }}
          />
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={video.src}
        muted={muted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: playing ? 1 : 0, transition: "opacity 0.3s" }}
      />

      {/* Overlay label bottom-left (only for non-special cards) */}
      {!video.textOverlay && !video.loading && !video.textTop && (
        <div
          className="absolute bottom-12 left-3 text-white text-xs font-semibold px-2 py-0.5 rounded"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            background: "rgba(0,0,0,0.45)",
            fontSize: 11,
          }}
        >
          {video.label}
        </div>
      )}

      {/* Bottom controls bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          transition: "opacity 0.2s",
          opacity: hovered || playing ? 1 : 0.85,
        }}
      >
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center rounded-full text-white"
          style={{ width: 22, height: 22, flexShrink: 0 }}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Time */}
        <span
          className="text-white"
          style={{ fontSize: 10, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.03em" }}
        >
          {currentTime} / {video.duration}
        </span>

        <div className="flex-1" />

        {/* Mute */}
        <button onClick={toggleMute} className="text-white" style={{ flexShrink: 0 }}>
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="14" height="14">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="14" height="14">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        {/* Fullscreen icon */}
        <button className="text-white" style={{ flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="14" height="14">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>

        {/* More options */}
        <button className="text-white" style={{ flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function VideoExamples() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; }
      `}</style>

      <div
        className="min-h-screen bg-white px-6 py-10"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Title */}
        <h1
          className="text-center mb-10"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 42px)",
            color: "#2563eb",
            letterSpacing: "-0.01em",
          }}
        >
          Video Examples
        </h1>

        {/* Grid: 2 rows × 4 cols */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, auto)",
            gap: "16px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </>
  );
}