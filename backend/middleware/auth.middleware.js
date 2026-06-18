import jwt from "jsonwebtoken";

// Verify the access token from the Authorization header.
export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, error: "Authentication required" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { id: decoded.sub, role: decoded.role || "client" };
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

// Must be authenticated AND an admin.
export const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Admin access required" });
    }
    next();
  });
};

// Must be authenticated AND staff (admin or manager).
export const requireStaff = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({ success: false, error: "Staff access required" });
    }
    next();
  });
};

// Must be authenticated AND able to write articles (admin or writer).
export const requireArticleAuthor = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.user.role !== "admin" && req.user.role !== "writer") {
      return res.status(403).json({ success: false, error: "Writer or admin access required" });
    }
    next();
  });
};
