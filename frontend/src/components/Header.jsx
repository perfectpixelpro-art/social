import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NavLogo from "../assets/NavLogo.png";

const services = [
  { to: "/social-media-management", label: "Social Media Management" },
  { to: "/short-form-videos", label: "Short-Form Videos" },
  { to: "/services/website", label: "Award Winning Website" },
];

const otherLinks = [
  { to: "/work", label: "Work" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact" , label: "Contact"}
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  // Logged-in if this browser has a stored session. Re-evaluated on each render
  // (route changes re-render the header), so it flips after login/logout.
  const loggedIn = !!localStorage.getItem("user") || !!localStorage.getItem("accessToken");

  return (
    <header
      className="w-full relative z-[100] border-b border-[rgba(1,49,134,0.07)]"
      style={{
        backgroundImage: "url('/Light-Gradient-BG.svg')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 h-[72px] flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
          <img className="h-[43px] w-auto object-contain mq450:h-[40px]" loading="lazy" alt="The Social 99" src={NavLogo}/>
        </Link>

        {/* Desktop nav links */}
        <nav className="flex items-center gap-7 text-[#111] font-medium text-[15px] mq1125:hidden font-[Montserrat]">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 cursor-pointer bg-transparent border-none text-[15px] font-medium text-[#111] hover:text-[#013186] transition-colors">
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: servicesOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-3 z-50">
                <div className="bg-white rounded-[14px] shadow-[0_8px_30px_rgba(1,49,134,0.15)] border border-[rgba(1,49,134,0.08)] py-2 min-w-[240px]">
                  {services.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="block px-5 py-3 text-[14px] font-medium text-[#111] hover:bg-[rgba(188,214,255,0.25)] hover:text-[#013186] transition-colors no-underline"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {otherLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `cursor-pointer transition-colors ${isActive ? "text-[#013186]" : "hover:text-[#013186]"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop CTA buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 mq1125:hidden">
          <Link
            to="/book-a-call"
            className="block px-5 py-3 text-[15px] font-medium text-[#111] no-underline hover:text-[#013186]"
          >
            Book a Call
          </Link>
          {loggedIn ? (
            <Link
              to="/dashboard"
              className="no-underline cursor-pointer border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] h-[43px] rounded-[25.5px] flex items-center gap-2 pl-5 pr-[5px] hover:bg-[rgba(188,214,255,0.6)] transition-colors"
            >
              <b className="text-base font-[Montserrat] text-[#000]">Dashboard</b>
              <div className="h-[35px] w-[35px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center flex-shrink-0">
                <img className="w-[18px] h-[18px] object-contain" alt="" src="/image@2x.png" />
              </div>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-5 py-3 text-[15px] font-medium text-[#111] no-underline hover:text-[#013186]"
              >
                Sign In
              </Link>
              <Link
                to="/signup?trial=1"
                className="no-underline cursor-pointer border border-[rgba(1,49,134,0.07)] bg-[rgba(188,214,255,0.37)] h-[43px] rounded-[25.5px] flex items-center gap-2 pl-5 pr-[5px] hover:bg-[rgba(188,214,255,0.6)] transition-colors"
              >
                <b className="text-base font-[Montserrat] text-[#000]">Free Trial</b>
                <div className="h-[35px] w-[35px] rounded-[21px] bg-[rgba(158,202,255,0.39)] flex items-center justify-center flex-shrink-0">
                  <img className="w-[18px] h-[18px] object-contain" alt="" src="/image@2x.png" />
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Log In + Hamburger (shown ≤1125px) */}
        <div className="hidden mq1125:flex items-center gap-3 flex-shrink-0">
          <Link
            to={loggedIn ? "/dashboard" : "/login"}
            onClick={() => setOpen(false)}
            className="h-[40px] flex items-center px-5 rounded-[25.5px] bg-[rgba(188,214,255,0.54)] border border-[rgba(1,49,134,0.07)] font-bold text-[#000] text-[14px] no-underline"
          >
            {loggedIn ? "Dashboard" : "Sign In"}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col justify-center items-center gap-[5px] w-[40px] h-[40px] cursor-pointer bg-transparent border-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-[24px] h-[2.5px] bg-[#013186] rounded transition-all duration-300 ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
            <span className={`block w-[24px] h-[2.5px] bg-[#013186] rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-[24px] h-[2.5px] bg-[#013186] rounded transition-all duration-300 ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="hidden mq1125:block bg-white border-t border-[rgba(1,49,134,0.08)] shadow-lg px-10 mq450:px-5 py-6">
          <nav className="flex flex-col gap-4 font-[Montserrat]">
            {/* Services replaced by the 3 service links on mobile */}
            {services.map((s) => (
              <NavLink
                key={s.to}
                to={s.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-[16px] font-semibold no-underline ${isActive ? "text-[#013186]" : "text-[#111]"}`
                }
              >
                {s.label}
              </NavLink>
            ))}
            {otherLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-[16px] font-semibold no-underline ${isActive ? "text-[#013186]" : "text-[#111]"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
