import jwt from "jsonwebtoken";

// Protect routes by verifying the access token from the Authorization header.
export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { id: decoded.sub };
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};
