import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import fileRoutes from "./routes/file.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import stripeRoutes from "./routes/stripe.routes.js";
import youtubeRoutes from "./routes/youtube.routes.js";
import { youtubeCallback } from "./controllers/youtube.controller.js";
import metaRoutes from "./routes/meta.routes.js";
import { facebookCallback } from "./controllers/meta.controller.js";
import linkedinRoutes from "./routes/linkedin.routes.js";
import { linkedinCallback } from "./controllers/linkedin.controller.js";
import schedulerRoutes from "./routes/scheduler.routes.js";
import { publishDuePosts } from "./controllers/scheduler.controller.js";
import ticketRoutes from "./routes/ticket.routes.js";
import articleRoutes from "./routes/article.routes.js";
import trackerRoutes from "./routes/tracker.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { runExpiryCheck } from "./controllers/notification.controller.js";
import emailRoutes from "./routes/email.routes.js";
import { runAllEmailAutomations } from "./controllers/email.controller.js";

dotenv.config();
connectDB();

const app = express();

// Trust the first proxy (needed so rate-limiter & secure cookies see the real client IP behind a load balancer)
app.set("trust proxy", 1);

// ── Security & parsing middleware ──
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // required so the browser sends/receives the httpOnly cookie
  })
);
// ⚠️ Stripe webhook MUST be mounted BEFORE express.json() so it receives the
//    raw request body for signature verification. (express.raw is applied inside the route.)
app.use("/api/stripe", stripeRoutes);

app.use(express.json({ limit: "1mb" })); // cap JSON body size to prevent payload-DoS
app.use(cookieParser());

// serve uploaded images (allow cross-origin <img> embedding)
app.use("/uploads", (req, res, next) => { res.set("Cross-Origin-Resource-Policy", "cross-origin"); next(); }, express.static("uploads"));

// Health check
app.get("/", (req, res) => res.json({ message: "The Social 99 API is running 🚀" }));

// OAuth callbacks — paths must match the provider configs (no /api prefix)
app.get("/auth/youtube/callback", youtubeCallback);
app.get("/auth/facebook/callback", facebookCallback);
app.get("/auth/linkedin/callback", linkedinCallback);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/youtube", youtubeRoutes);
app.use("/api/auth/meta", metaRoutes);
app.use("/api/auth/linkedin", linkedinRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/blogs", blogRoutes);

// 404 for unknown API routes
app.use((req, res) => res.status(404).json({ success: false, error: "Not found" }));

// Global error handler — never leak stack traces / internal messages in production
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error("Unhandled error:", err);
  const isProd = process.env.NODE_ENV === "production";
  res.status(err.status || 500).json({
    success: false,
    error: isProd ? "Something went wrong" : err.message || "Server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// Scheduled-post publisher — checks every 30s for posts whose time has arrived.
setInterval(() => { publishDuePosts().catch((e) => console.error("scheduler tick error:", e.message)); }, 30_000);

// Plan-expiry reminder check — hourly (deduped per threshold).
runExpiryCheck();
setInterval(() => { runExpiryCheck().catch((e) => console.error("expiry tick error:", e.message)); }, 3600_000);

// Email automations (newsletter / trial drip / cart / plan-expiry) — hourly, self-deduped.
runAllEmailAutomations();
setInterval(() => { runAllEmailAutomations().catch((e) => console.error("email automation error:", e.message)); }, 3600_000);
