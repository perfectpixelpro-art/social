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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
