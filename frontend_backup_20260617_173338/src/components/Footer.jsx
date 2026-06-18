import { Link } from "react-router-dom";

const colCompany = [
  { to: "/", label: "Home" },
  { to: "/blogs", label: "Blogs" },
  { to: "/careers", label: "Careers" },
  { to: "/refund-policy", label: "Refund Policy" },
  { to: "/pricing", label: "Pricing" },
];

const colServices = [
  { to: "/social-media-management", label: "Social Media Management" },
  { to: "/short-form-videos", label: "Short-Form Videos" },
  { to: "/services/website", label: "Award Winning Website" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/book-a-call", label: "Book A Call" },
];

const colIndustries = [
  { to: "/pet-and-grooming", label: "Pet and grooming" },
  { to: "/med-spa", label: "Med Spa" },
  { to: "/salons-and-beauty", label: "Salons and beauty" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/bars", label: "Bars" },
];

const socials = [
  { label: "X", href: "https://x.com/thesocial99_", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Facebook", href: "https://www.facebook.com/the99social/", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thesocial99", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Instagram", href: "https://www.instagram.com/thesocial99_/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { label: "YouTube", href: "https://www.youtube.com/@tthesocial99", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];
const linkCls = "text-[15px] font-semibold text-[#000] hover:text-[#013186] transition-colors no-underline";

const Footer = () => {
  return (
    <footer className="w-full bg-[#f5f8ff] border-t border-[rgba(1,49,134,0.07)] font-[Montserrat]">
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 py-12">
        <div className="flex gap-10 mq1125:flex-wrap mq450:gap-8">

          {/* Brand col */}
          <div className="flex flex-col gap-4 min-w-[240px] mq450:min-w-full">
            <Link to="/"><img className="h-[44px] w-auto object-contain" alt="The Social 99" src="/Logo@2x.png" /></Link>
            <p className="text-[15px] font-semibold text-[#000] max-w-[240px] leading-relaxed m-0">
              Affordable Social Media Management for Small Business
            </p>
            <div className="flex items-center gap-4 mt-1">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-[#000] hover:text-[#013186] transition-colors">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
</a>
              ))}
            </div>
          </div>

          {/* Spacer (desktop) */}
          <div className="flex-1 mq1125:hidden" />

          {/* Link columns */}
          <div className="flex flex-col gap-4 min-w-[120px]">
            {colCompany.map((l) => <Link key={l.label} to={l.to} className={linkCls}>{l.label}</Link>)}
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            {colServices.map((l) => <Link key={l.label} to={l.to} className={linkCls}>{l.label}</Link>)}
          </div>
          <div className="flex flex-col gap-4 min-w-[160px]">
            {colIndustries.map((l) => <Link key={l.label} to={l.to} className={linkCls}>{l.label}</Link>)}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 pt-6 border-t border-[rgba(1,49,134,0.08)] text-center">
          <p className="text-[14px] font-semibold text-[#000] m-0">
            Copyright © {new Date().getFullYear()} <b className="text-[#023186]">TheSocial99</b>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
