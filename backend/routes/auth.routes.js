import express from "express";
import { body } from "express-validator";

import { signup, login, adminLogin, adminRefresh, adminLogout, refresh, logout, verifyEmail, resendVerification, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { loginLimiter, resendLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

const signupValidators = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

const loginValidators = [
  body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/signup", signupValidators, signup);
router.post("/login", loginLimiter, loginValidators, login);
router.post("/admin/login", loginLimiter, loginValidators, adminLogin);
router.post("/admin/refresh", adminRefresh);
router.post("/admin/logout", adminLogout);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendLimiter, resendVerification);
router.post("/forgot-password", resendLimiter, forgotPassword);
router.post("/reset-password", [
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
], resetPassword);

export default router;
