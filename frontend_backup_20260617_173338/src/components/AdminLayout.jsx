import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { adminLogout } from "../api";
import { Icon, icons } from "./DashboardLayout";
import NotificationBell from "./NotificationBell";

const baseNav = [
  { key: "home", label: "Home", to: "/admin", end: true },
  { key: "calendar", label: "Scheduling", to: "/admin/scheduling" },
  { key: "team", label: "Team & Clients", to: "/admin/team", adminOnly: true },
  { key: "files", label: "Files", to: "/admin/files" },
  { key: "chat", label: "Chat", to: "/admin/chat" },
  { key: "ticket", label: "Support", to: "/admin/tickets" },
  { key: "banner", label: "Banners", to: "/admin/banners", adminOnly: true },
  { key: "bell", label: "Notifications", to: "/admin/notifications", adminOnly: true },
  { key: "help", label: "Help", to: "/admin/help" },
];

const titleByPath = {
  "/admin": "Admin Panel",
  "/admin/scheduling": "Scheduling",
  "/admin/team": "Team & Clients",
  "/admin/files": "Files",
  "/admin/profile": "Profile",
  "/admin/chat": "Chat",
  "/admin/tickets": "Support",
  "/admin/banners": "Banners",
  "/admin/notifications": "Notifications",
  "/admin/help": "Help",
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 801) setCollapsed((c) => !c);
    else setSidebarOpen((o) => !o);
  };

  useEffect(() => {
    const onClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const admin = (() => {
    try { return JSON.parse(localStorage.getItem("adminUser")) || {}; } catch { return {}; }
  })();
  const role = admin.role || "admin";
  // Role-specific navigation.
  let nav;
  if (role === "manager") {
    // Managers: their assigned clients' home, scheduling, chat, support, help.
    nav = [
      { key: "home", label: "Home", to: "/admin", end: true },
      { key: "calendar", label: "Scheduling", to: "/admin/scheduling" },
      { key: "chat", label: "Chat", to: "/admin/chat" },
      { key: "ticket", label: "Support", to: "/admin/tickets" },
      { key: "help", label: "Help", to: "/admin/help" },
    ];
  } else if (role === "writer") {
    // Writers: only the Help / articles area.
    nav = [{ key: "help", label: "Help", to: "/admin/help" }];
  } else {
    nav = baseNav.filter((item) => !item.adminOnly || role === "admin");
  }
  const name = admin.name || (role === "manager" ? "Manager" : "Admin");
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const crumb = titleByPath[location.pathname] || "Admin Panel";

  const handleLogout = async () => { await adminLogout(); navigate("/admin/login"); };

  // Restrict managers and writers to their allowed pages.
  useEffect(() => {
    if (role === "manager") {
      const allowed = ["/admin", "/admin/scheduling", "/admin/chat", "/admin/tickets", "/admin/help"];
      if (!allowed.includes(location.pathname)) navigate("/admin", { replace: true });
    } else if (role === "writer") {
      if (location.pathname !== "/admin/help") navigate("/admin/help", { replace: true });
    }
  }, [role, location.pathname, navigate]);

  return (
    <div className="w-full min-h-screen bg-white font-[Montserrat] flex">
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-[230px] bg-white border-r border-[#eef1f6] flex flex-col transition-transform duration-300 shadow-2xl [@media(min-width:801px)]:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "[@media(min-width:801px)]:-translate-x-full" : "[@media(min-width:801px)]:translate-x-0"}`}
      >
        <div className="px-5 py-5 flex items-center gap-3 border-b border-[#eef1f6]">
          <img src="/Logo@2x.png" alt="logo" className="h-12 w-auto object-contain" />
          <span className="font-bold text-[14px] text-[#0b1f44] leading-tight">Analytics<br />Dashboard</span>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="ml-auto text-[#5b6472] cursor-pointer [@media(min-width:801px)]:hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>

        <div className="px-5 pt-5 pb-2 text-[11px] font-bold tracking-wider text-[#9aa3b2]">NAVIGATION</div>
        <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
          {nav.map((item) => (
            <NavLink key={item.key} to={item.to} end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-semibold transition-colors cursor-pointer no-underline ${isActive ? "bg-[#eaf1ff] text-[#013186]" : "text-[#5b6472] hover:bg-[#f5f7fb]"}`
              }>
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-[#013186]" : "text-[#9aa3b2]"}><Icon d={icons[item.key]} /></span>
                  {item.label}
                  {isActive && <span className="ml-auto w-[7px] h-[7px] rounded-full bg-[#013186]" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-[#eef1f6] flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-[#013186] text-white flex items-center justify-center text-[13px] font-bold">{initials}</span>
          <div className="leading-tight">
            <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{name}</p>
            <p className="m-0 text-[11px] text-[#9aa3b2]">{role === "manager" ? "Manager" : "Administrator"}</p>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 [@media(min-width:801px)]:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className={`flex-1 min-w-0 flex flex-col h-screen transition-[margin] duration-300 ${collapsed ? "[@media(min-width:801px)]:ml-0" : "[@media(min-width:801px)]:ml-[230px]"}`}>
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
            <NotificationBell role="admin" />
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-2 cursor-pointer">
                <span className="w-9 h-9 rounded-full bg-[#013186] text-white flex items-center justify-center text-[13px] font-bold">{initials}</span>
                <div className="leading-tight text-left mq450:hidden">
                  <p className="m-0 text-[13px] font-bold text-[#0b1f44]">{name}</p>
                  <p className="m-0 text-[11px] text-[#9aa3b2]">{role === "manager" ? "Manager" : "Administrator"}</p>
                </div>
                <span className={`text-[#9aa3b2] text-xs transition-transform ${menuOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white rounded-[12px] border border-[#eef1f6] shadow-[0_12px_30px_rgba(1,49,134,0.14)] overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#f1f4f9]">
                    <p className="m-0 text-[13px] font-bold text-[#0b1f44] truncate">{name}</p>
                    <p className="m-0 text-[11px] text-[#9aa3b2] truncate">{admin.email || "Administrator"}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-[#dc2626] hover:bg-[#fdf2f2] transition-colors cursor-pointer text-left">
                    <span className="text-[#dc2626]"><Icon d={icons.logout} /></span> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-hidden">
          <Outlet context={{ admin, name, initials }} />
        </div>
      </div>
    </div>
  );
}
