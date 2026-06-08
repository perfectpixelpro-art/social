import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validationResult } from "express-validator";

import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import VerificationToken from "../models/verificationToken.model.js";
import { sendVerificationEmail, sendLoginVerificationEmail, sendPasswordResetEmail } from "../utils/email.js";

const VERIFY_TOKEN_MS = 24 * 60 * 60 * 1000; // 24 hours
const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

// Create + store a verification token, return the full email link
const createVerificationLink = async (userId, purpose) => {
  const token = crypto.randomBytes(32).toString("hex");
  await VerificationToken.create({
    token,
    user: userId,
    purpose,
    expiresAt: new Date(Date.now() + VERIFY_TOKEN_MS),
  });
  const base = process.env.SERVER_URL || "http://localhost:5001";
  return `${base}/api/auth/verify-email?token=${token}`;
};

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = "7d";
const REFRESH_TOKEN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const GENERIC_CREDENTIALS_ERROR = "Invalid credentials";

// httpOnly cookie options for the refresh token
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // secure over HTTPS in prod
  sameSite: "strict",
  maxAge: REFRESH_TOKEN_MS,
  path: "/",
};

const signAccessToken = (userId, role = "client") =>
  jwt.sign({ sub: userId, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });

const signRefreshToken = (userId) =>
  jwt.sign({ sub: userId, jti: crypto.randomUUID() }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
  });

// Persist a refresh token in MongoDB
const persistRefreshToken = async (token, userId) => {
  await RefreshToken.create({
    token,
    user: userId,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_MS),
  });
};

/* ───────────────────────── SIGNUP ───────────────────────── */
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }

  try {
    const { name, email, mobile, password } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      // Generic — never reveal that the email already exists.
      return res.status(400).json({ success: false, error: "Unable to create account" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, mobile, password: hashed, role: "client" });

    // Send the verification email (don't fail signup if email send hiccups)
    try {
      const link = await createVerificationLink(user._id, "signup");
      await sendVerificationEmail(user.email, user.name, link);
    } catch (e) {
      console.error("Verification email failed:", e.message);
    }

    // No tokens issued on signup.
    return res.status(201).json({
      success: true,
      message: "Account created! Please check your email to verify your account.",
    });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── LOGIN ───────────────────────── */
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, error: GENERIC_CREDENTIALS_ERROR });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, error: GENERIC_CREDENTIALS_ERROR });
    }

    // Block login until the email is verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        code: "EMAIL_NOT_VERIFIED",
        error: "Please verify your email before logging in. Check your inbox for the verification link.",
      });
    }

    // If it's been more than 5 days since the last login, send a security verification email
    const now = Date.now();
    const lastLogin = user.lastLoginAt ? user.lastLoginAt.getTime() : 0;
    if (lastLogin && now - lastLogin > FIVE_DAYS_MS) {
      try {
        const link = await createVerificationLink(user._id, "login");
        await sendLoginVerificationEmail(user.email, user.name, link);
      } catch (e) {
        console.error("Login verification email failed:", e.message);
      }
    }

    // Record this login time
    user.lastLoginAt = new Date(now);
    await user.save();

    const accessToken = signAccessToken(user._id.toString(), user.role);
    const refreshToken = signRefreshToken(user._id.toString());
    await persistRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.json({
      success: true,
      accessToken,
      user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified },
    });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── ADMIN LOGIN ─────────────────────────
   No signup, no email verification. Only an account with role "admin"
   can log in here. */
export const adminLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    // Must exist AND be an admin — otherwise generic error (never reveal which)
    if (!user || user.role !== "admin") {
      return res.status(401).json({ success: false, error: GENERIC_CREDENTIALS_ERROR });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, error: GENERIC_CREDENTIALS_ERROR });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const accessToken = signAccessToken(user._id.toString(), "admin");
    const refreshToken = signRefreshToken(user._id.toString());
    await persistRefreshToken(refreshToken, user._id);

    // separate cookie name so admin + client sessions can coexist in one browser
    res.cookie("adminRefreshToken", refreshToken, refreshCookieOptions);

    return res.json({
      success: true,
      accessToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── ADMIN REFRESH ───────────────────────── */
export const adminRefresh = async (req, res) => {
  try {
    const token = req.cookies?.adminRefreshToken;
    if (!token) return res.status(401).json({ success: false, error: "Authentication required" });

    const stored = await RefreshToken.findOne({ token });
    if (!stored) return res.status(401).json({ success: false, error: "Invalid session" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      await RefreshToken.deleteOne({ token });
      return res.status(401).json({ success: false, error: "Invalid session" });
    }

    await RefreshToken.deleteOne({ token });
    const userId = decoded.sub;
    const dbUser = await User.findById(userId).select("role");
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(401).json({ success: false, error: "Invalid session" });
    }
    const newAccessToken = signAccessToken(userId, "admin");
    const newRefreshToken = signRefreshToken(userId);
    await persistRefreshToken(newRefreshToken, userId);

    res.cookie("adminRefreshToken", newRefreshToken, refreshCookieOptions);
    return res.json({ success: true, accessToken: newAccessToken });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── ADMIN LOGOUT ───────────────────────── */
export const adminLogout = async (req, res) => {
  try {
    const token = req.cookies?.adminRefreshToken;
    if (token) await RefreshToken.deleteOne({ token });
    res.clearCookie("adminRefreshToken", { ...refreshCookieOptions, maxAge: undefined });
    return res.json({ success: true, message: "Logged out" });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── REFRESH (rotation) ───────────────────────── */
export const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    // Must exist in DB
    const stored = await RefreshToken.findOne({ token });
    if (!stored) {
      return res.status(401).json({ success: false, error: "Invalid session" });
    }

    // Verify signature; if invalid, drop it
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      await RefreshToken.deleteOne({ token });
      return res.status(401).json({ success: false, error: "Invalid session" });
    }

    // Rotation: delete the old token, issue a fresh pair
    await RefreshToken.deleteOne({ token });

    const userId = decoded.sub;
    const dbUser = await User.findById(userId).select("role");
    const newAccessToken = signAccessToken(userId, dbUser?.role || "client");
    const newRefreshToken = signRefreshToken(userId);
    await persistRefreshToken(newRefreshToken, userId);

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);
    return res.json({ success: true, accessToken: newAccessToken });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── RESEND VERIFICATION ───────────────────────── */
export const resendVerification = async (req, res) => {
  // Always return the same generic message so we never reveal whether
  // an email exists or is already verified.
  const generic = { success: true, message: "If that account exists and is unverified, a new verification email has been sent." };
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email is required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.isVerified) return res.json(generic);

    // Clear any old signup tokens for this user, then issue a fresh one
    await VerificationToken.deleteMany({ user: user._id, purpose: "signup" });
    const link = await createVerificationLink(user._id, "signup");
    await sendVerificationEmail(user.email, user.name, link);

    return res.json(generic);
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── FORGOT PASSWORD ───────────────────────── */
const RESET_TOKEN_MS = 60 * 60 * 1000; // 1 hour

export const forgotPassword = async (req, res) => {
  // Generic response so we never reveal whether an email is registered
  const generic = { success: true, message: "If an account with that email exists, a reset link has been sent." };
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email is required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      // remove old reset tokens, issue a fresh one
      await VerificationToken.deleteMany({ user: user._id, purpose: "reset" });
      const token = crypto.randomBytes(32).toString("hex");
      await VerificationToken.create({
        token,
        user: user._id,
        purpose: "reset",
        expiresAt: new Date(Date.now() + RESET_TOKEN_MS),
      });
      const base = process.env.CLIENT_URL || "http://localhost:5173";
      const link = `${base}/reset-password?token=${token}`;
      try {
        await sendPasswordResetEmail(user.email, user.name, link);
      } catch (e) {
        console.error("Password reset email failed:", e.message);
      }
    }
    return res.json(generic);
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── RESET PASSWORD ───────────────────────── */
export const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }
  try {
    const { token, password } = req.body;
    if (!token) return res.status(400).json({ success: false, error: "Invalid or missing token" });

    const record = await VerificationToken.findOne({ token, purpose: "reset" });
    if (!record) {
      return res.status(400).json({ success: false, error: "This reset link is invalid or has expired." });
    }

    const hashed = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(record.user, { password: hashed });

    // consume the token and revoke any existing sessions for safety
    await VerificationToken.deleteOne({ _id: record._id });
    await RefreshToken.deleteMany({ user: record.user });

    return res.json({ success: true, message: "Password updated successfully. You can now log in." });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

/* ───────────────────────── VERIFY EMAIL ───────────────────────── */
export const verifyEmail = async (req, res) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  try {
    const { token } = req.query;
    if (!token) return res.redirect(`${clientUrl}/login?verified=0`);

    const record = await VerificationToken.findOne({ token });
    if (!record) return res.redirect(`${clientUrl}/login?verified=0`);

    // Mark the user verified and consume the token
    await User.findByIdAndUpdate(record.user, { isVerified: true });
    await VerificationToken.deleteOne({ _id: record._id });

    return res.redirect(`${clientUrl}/login?verified=1`);
  } catch {
    return res.redirect(`${clientUrl}/login?verified=0`);
  }
};

/* ───────────────────────── LOGOUT ───────────────────────── */
export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await RefreshToken.deleteOne({ token });
    }
    res.clearCookie("refreshToken", { ...refreshCookieOptions, maxAge: undefined });
    return res.json({ success: true, message: "Logged out" });
  } catch {
    return res.status(500).json({ success: false, error: "Something went wrong" }); 
  }
};
