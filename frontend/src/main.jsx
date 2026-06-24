import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// ── Marketing (new design) ──
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import ShortFormVideos from "./pages/ShortFormVideos";
import Website from "./pages/Website";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import Careers from "./pages/Careers";
import Bookacall from "./pages/Bookacall";
import MedSpaLandingPage from "./pages/MedSpaLandingPage";
import PetAndGrooming from "./pages/PetAndGrooming";
import SalonsAndBeauty from "./pages/SalonsAndBeauty";
import Restaurants from "./pages/Restaurants";
import Bars from "./pages/Bars";
import ScrollToTop from "./components/ScrollToTop";
import DataDeletion from "./pages/DeletetionData";

// ── App (auth + dashboards) ──
// These routes are NOT pre-rendered (SPA-only, noindex), so we lazy-load them.
// This keeps the dashboard/admin/auth code out of the marketing pages' bundle
// (big "unused JavaScript" win) without affecting pre-rendering/hydration.
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import NotFound from "./pages/NotFound";
import ImageViewerHost from "./components/ImageViewer";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Verified = lazy(() => import("./pages/Verified"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/Home"));
const DashboardScheduling = lazy(() => import("./pages/dashboard/Scheduling"));
const DashboardMeetings = lazy(() => import("./pages/dashboard/Meetings"));
const DashboardHelp = lazy(() => import("./pages/dashboard/Help"));
const DashboardStore = lazy(() => import("./pages/dashboard/Store"));
const DashboardChat = lazy(() => import("./pages/dashboard/Chat"));
const DashboardProfile = lazy(() => import("./pages/dashboard/Profile"));
const DashboardTickets = lazy(() => import("./pages/dashboard/Tickets"));
const DashboardFiles = lazy(() => import("./pages/dashboard/Files"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminHome = lazy(() => import("./pages/admin/Home"));
const AdminScheduling = lazy(() => import("./pages/admin/Scheduling"));
const AdminMeetings = lazy(() => import("./pages/admin/Meetings"));
const AdminChat = lazy(() => import("./pages/admin/Chat"));
const AdminFiles = lazy(() => import("./pages/admin/Files"));
const AdminManagers = lazy(() => import("./pages/admin/Managers"));
const AdminTickets = lazy(() => import("./pages/admin/Tickets"));
const AdminHelp = lazy(() => import("./pages/admin/Help"));
const AdminBanners = lazy(() => import("./pages/admin/Banners"));
const AdminNotifications = lazy(() => import("./pages/admin/Notifications"));
const AdminEmail = lazy(() => import("./pages/admin/Email"));

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        {/* ── Marketing site ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/social-media-management" element={<SocialMediaManagement />} />
          <Route path="/short-form-videos" element={<ShortFormVideos />} />
          <Route path="/services/website" element={<Website />} />
          <Route path="/website" element={<Website />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          <Route path="/careers" element={<Careers />} />
          <Route path="/book-a-call" element={<Bookacall />} />
          <Route path="/med-spa" element={<MedSpaLandingPage />} />
          <Route path="/pet-and-grooming" element={<PetAndGrooming />} />
          <Route path="/salons-and-beauty" element={<SalonsAndBeauty />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/bars" element={<Bars />} />
          <Route path="/terms-of-service" element = {<TermsOfService/>} />
          <Route path="/deletion-data" element = {<DataDeletion/>} />
        </Route>

        {/* ── Auth (full-screen) ── */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/free-trial" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/verified" element={<Verified />} />

        {/* ── Client dashboard (protected) ── */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="scheduling" element={<DashboardScheduling />} />
          <Route path="meetings" element={<DashboardMeetings />} />
          <Route path="help" element={<DashboardHelp />} />
          <Route path="store" element={<DashboardStore />} />
          <Route path="chat" element={<DashboardChat />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="files" element={<DashboardFiles />} />
          <Route path="tickets" element={<DashboardTickets />} />
          <Route path="*" element={<div className="p-8 text-[#7a8499] font-semibold">Coming soon…</div>} />
        </Route>

        {/* ── Admin / manager / writer ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route index element={<AdminHome />} />
          <Route path="scheduling" element={<AdminScheduling />} />
          <Route path="meetings" element={<AdminMeetings />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="files" element={<AdminFiles />} />
          <Route path="team" element={<AdminManagers />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="help" element={<AdminHelp />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="email" element={<AdminEmail />} />
          <Route path="*" element={<div className="p-8 text-[#7a8499] font-semibold">Coming soon…</div>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <ImageViewerHost />
    </BrowserRouter>
  </React.StrictMode>
);

// react-snap pre-renders pages to static HTML at build time. When that HTML is
// present we hydrate it (attach React to existing markup); otherwise we render
// fresh (normal SPA boot / dev).
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
