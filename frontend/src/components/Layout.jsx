import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import StartStrongCTA from "./StartStrongCTA";

const Layout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="w-full min-h-screen flex flex-col font-[Montserrat] bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {isHome ? <Newsletter /> : <StartStrongCTA />}
      <Footer />
    </div>
  );
};

export default Layout;
