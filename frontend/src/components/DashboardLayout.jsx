import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { logoutUser, getNotifications } from "../api";
import DashboardTour from "./DashboardTour";
import BannerPopup from "./BannerPopup";
import OnboardingForm from "./OnboardingForm";
import NotificationBell from "./NotificationBell";
import GeneralNotice from "./GeneralNotice";
import ChatWidget, { openS99 } from "./ChatWidget";

/* ── icons ── */
export const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
export const icons = {
  home: <><path d="M3 9.5 12 3l9 6.5" /><path d="M5 10v10h14V10" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  meeting: <><rect x="3" y="7" width="13" height="10" rx="2" /><path d="M21 8.5v7l-5-3.5z" /></>,
  profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  ticket: <><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" /></>,
  support: <><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" /><path d="M12 17h.01" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M12 17h.01" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>,
  files: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>,
  team: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21c0-3.5 3-5.5 7-5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M22 21c0-3-2-4.5-5-4.5" /></>,
  store: <><path d="M3 9l1-5h16l1 5" /><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" /><path d="M3 9h18" /><path d="M9 13h6" /></>,
  banner: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18" /><circle cx="8" cy="14" r="1.5" /></>,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
};

const nav = [
  { key: "home", label: "Home", to: "/dashboard", end: true },
  { key: "calendar", label: "Scheduling", to: "/dashboard/scheduling" },
  { key: "meeting", label: "Meetings", to: "/dashboard/meetings" },
  { key: "store", label: "Store", to: "/dashboard/store" },
  { key: "profile", label: "Profile", to: "/dashboard/profile" },
  { key: "files", label: "Files", to: "/dashboard/files" },
  { key: "chat", label: "Chat", to: "/dashboard/chat" },
  { key: "ticket", label: "Support", to: "/dashboard/tickets" },
  { key: "help", label: "Help", to: "/dashboard/help" },
];

const titleByPath = {
  "/dashboard": "Dashboard",
  "/dashboard/chat": "Chat",
  "/dashboard/scheduling": "Scheduling",
  "/dashboard/meetings": "Meetings",
  "/dashboard/store": "Store",
  "/dashboard/profile": "Profile",
  "/dashboard/files": "Files",
  "/dashboard/tickets": "Support",
  "/dashboard/help": "Help",
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false);     // desktop collapse
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // One button: collapses on desktop, opens drawer on mobile
  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 801) {
      setCollapsed((c) => !c);
    } else {
      setSidebarOpen((o) => !o);
    }
  };

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // close mobile sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  // user kept in state so profile edits reflect live in sidebar + topbar
  const readUser = () => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; } };
  const [user, setUser] = useState(readUser);
  useEffect(() => {
    const refresh = () => setUser(readUser());
    window.addEventListener("profile-updated", refresh);
    return () => window.removeEventListener("profile-updated", refresh);
  }, []);

  // Per-tab unread badges, derived from unread notifications by type.
  const [counts, setCounts] = useState({});
  useEffect(() => {
    const map = { message: "chat", meeting: "chat", file: "files", approval: "calendar", feedback: "calendar" };
    const load = async () => {
      try {
        const r = await getNotifications("client");
        const c = {};
        (r.data?.items || []).filter((n) => !n.read).forEach((n) => {
          const key = map[n.type];
          if (key) c[key] = (c[key] || 0) + 1;
        });
        setCounts(c);
      } catch { /* */ }
    };
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, [location.pathname]);

  const name = user.name || "James Brown";
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const crumb = titleByPath[location.pathname] || "Dashboard";

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-white font-[Montserrat] flex">

      {/* ── Sidebar ── */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-[230px] bg-white border-r border-[#eef1f6] flex flex-col transition-transform duration-300 shadow-2xl [@media(min-width:801px)]:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "[@media(min-width:801px)]:-translate-x-full" : "[@media(min-width:801px)]:translate-x-0"}`}
      >
        <div className="px-5 py-5 flex items-center gap-2 border-b border-[#eef1f6]">
          <img src="/Logo@2x.png" alt="logo" className="h-12 w-auto object-contain" />
          <span className="font-bold text-[14px] text-[#0b1f44] leading-tight mr-4">Analytics<br />Dashboard</span>
          {/* mobile close button — only when the drawer is open */}
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="ml-auto text-[#5b6472] cursor-pointer [@media(min-width:801px)]:hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>

        <div className="px-5 pt-5 pb-2 text-[11px] font-bold tracking-wider text-[#9aa3b2]">NAVIGATION</div>
        <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
          {nav.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.end}
              data-tour={`nav-${item.key}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-semibold transition-colors cursor-pointer no-underline ${
                  isActive ? "bg-[#eaf1ff] text-[#013186]" : "text-[#5b6472] hover:bg-[#f5f7fb]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-[#013186]" : "text-[#9aa3b2]"}><Icon d={icons[item.key]} /></span>
                  {item.label}
                  {counts[item.key] > 0 ? (
                    <span className="ml-auto min-w-[18px] h-[18px] px-1 rounded-full bg-[#dc2626] text-white text-[11px] font-bold flex items-center justify-center">{counts[item.key]}</span>
                  ) : (
                    isActive && <span className="ml-auto w-[7px] h-[7px] rounded-full bg-[#013186]" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Ask Dot chatbot */}
          <button onClick={openS99}
            className="mt-1 flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-bold cursor-pointer text-white [background:linear-gradient(135deg,#1463ff,#013186)] hover:opacity-95 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="m14 7 1 2 2 1-2 1-1 2-1-2-2-1 2-1z" /></svg>
            Ask Dot
          </button>
        </nav>

        <div className="px-4 py-4 border-t border-[#eef1f6] flex items-center gap-3">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <span className="w-9 h-9 rounded-full bg-[#013186] text-white flex items-center justify-center text-[13px] font-bold">{initials}</span>
          )}
          <div className="leading-tight">
            <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{name}</p>
            <p className="m-0 text-[11px] text-[#9aa3b2]">Standard</p>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 [@media(min-width:801px)]:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main column ── */}
      <div className={`flex-1 min-w-0 flex flex-col h-screen transition-[margin] duration-300 ${collapsed ? "[@media(min-width:801px)]:ml-0" : "[@media(min-width:801px)]:ml-[230px]"}`}>

        {/* Top bar */}
        <header className="h-16 shrink-0 border-b border-[#eef1f6] flex items-center justify-between px-6 mq450:px-4">
          <div className="flex items-center gap-3 text-[14px]">
            <button onClick={toggleSidebar} title="Toggle sidebar" className="text-[#5b6472] cursor-pointer hover:text-[#013186] transition-colors">
              <Icon d={icons.menu} size={22} />
            </button>
            <span className="text-[#9aa3b2] font-semibold">The Social 99</span>
            <span className="text-[#9aa3b2]">/</span>
            <span className="text-[#0b1f44] font-bold">{crumb}</span>
          </div>

          <div className="flex items-center gap-5">
            <span data-tour="bell"><NotificationBell role="client" /></span>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-2 cursor-pointer">
                {user.avatar ? (
            <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <span className="w-9 h-9 rounded-full bg-[#013186] text-white flex items-center justify-center text-[13px] font-bold">{initials}</span>
          )}
                <div className="leading-tight text-left mq450:hidden">
                  <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{name}</p>
                  <p className="m-0 text-[11px] text-[#9aa3b2]">Standard</p>
                </div>
                <span className={`text-[#9aa3b2] text-xs transition-transform ${menuOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white rounded-[12px] border border-[#eef1f6] shadow-[0_12px_30px_rgba(1,49,134,0.14)] overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#f1f4f9]">
                    <p className="m-0 text-[13px] font-bold text-[#0b1f44] truncate">{name}</p>
                    <p className="m-0 text-[11px] text-[#9aa3b2] truncate">{user.email || "Standard"}</p>
                  </div>
                  <button
                    onClick={() => { setMenuOpen(false); navigate("/dashboard/profile"); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-[#5b6472] hover:bg-[#f5f7fb] transition-colors cursor-pointer text-left"
                  >
                    <span className="text-[#9aa3b2]"><Icon d={icons.profile} /></span> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-[#dc2626] hover:bg-[#fdf2f2] transition-colors cursor-pointer text-left"
                  >
                    <span className="text-[#dc2626]"><Icon d={icons.logout} /></span> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <Outlet context={{ user, name, initials }} />
        </div>
        {/* First-login product tour + onboarding form + promo banner popup */}
        <DashboardTour />
        <OnboardingForm user={user} />
        <BannerPopup />
        <GeneralNotice />
        <ChatWidget />
      </div>
    </div>
  );
}
