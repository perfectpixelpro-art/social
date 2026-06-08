import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import ShortFormVideos from "./pages/ShortFormVideos";
import Website from "./pages/Website";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Careers from "./pages/Careers";
import Bookacall from "./pages/Bookacall";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/dashboard/Home";
import DashboardChat from "./pages/dashboard/Chat";
import DashboardProfile from "./pages/dashboard/Profile";
import DashboardTickets from "./pages/dashboard/Tickets";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/Home";
import AdminChat from "./pages/admin/Chat";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/social-media-management" element={<SocialMediaManagement />} />
          <Route path="/short-form-videos" element={<ShortFormVideos />} />
          <Route path="/services/website" element={<Website />} />
          <Route path="/website" element={<Website />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/careers" element={<Careers />} />
               <Route path="/book-a-call" element={<Bookacall />} />

        </Route>

        {/* Auth pages — full-screen, no navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected dashboard — redirects to /login if not authenticated */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="chat" element={<DashboardChat />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="tickets" element={<DashboardTickets />} />
          <Route path="*" element={<div className="p-8 text-[#7a8499] font-semibold">Coming soon…</div>} />
        </Route>

        {/* ── Admin (separate auth, no signup) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="*" element={<div className="p-8 text-[#7a8499] font-semibold">Coming soon…</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
