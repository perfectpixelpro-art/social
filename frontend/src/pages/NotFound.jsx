import Seo from "../components/Seo";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center font-[Montserrat] px-6"
      style={{
        backgroundImage: "url('/Light-Gradient-BG.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Seo title="Page Not Found (404) | The Social 99" description="The page you are looking for could not be found." noindex />
      <div className="text-center max-w-[560px]">
        <Link to="/">
          <img src="/Logo@2x.png" alt="The Social 99" className="h-[48px] w-auto object-contain mx-auto mb-8" />
        </Link>

        <h1 className="text-[#013186] font-bold leading-none m-0" style={{ fontSize: "clamp(80px, 18vw, 160px)" }}>
          404
        </h1>
        <h2 className="text-[#0b1f44] font-bold mt-2 mb-3" style={{ fontSize: "clamp(22px, 3vw, 32px)" }}>
          Page not found
        </h2>
        <p className="m-0 mb-8 text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(15px, 1.6vw, 18px)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/"
            className="no-underline bg-[#013186] text-white font-bold text-[15px] rounded-[12px] px-7 h-[50px] flex items-center justify-center hover:bg-[#012270] transition-colors"
          >
            Back to Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer bg-white text-[#013186] font-bold text-[15px] rounded-[12px] px-7 h-[50px] border border-[rgba(1,49,134,0.15)] hover:bg-[#f2f7ff] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
