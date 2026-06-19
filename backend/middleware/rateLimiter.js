import rateLimit from "express-rate-limit";

// Login limiter: 10 attempts per 15 minutes per IP.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many login attempts. Please try again in 15 minutes." },
});

// Resend-verification limiter: 3 emails per 15 minutes per IP (prevents email spam).
export const resendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please wait a few minutes before trying again." },
});
