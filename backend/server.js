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
app.use(express.json({ limit: "1mb" })); // cap JSON body size to prevent payload-DoS
app.use(cookieParser());

// serve uploaded images (allow cross-origin <img> embedding)
app.use("/uploads", (req, res, next) => { res.set("Cross-Origin-Resource-Policy", "cross-origin"); next(); }, express.static("uploads"));

// Health check
app.get("/", (req, res) => res.json({ message: "The Social 99 API is running 🚀" }));

// API routes
app.use("/api/auth", authRoutes);
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
