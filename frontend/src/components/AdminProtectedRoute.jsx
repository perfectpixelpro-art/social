import { Navigate } from "react-router-dom";
import { getAdminToken } from "../api";

// Blocks access unless an admin is logged in.
// Typing /admin in the URL without an admin token → bounced to /admin/login.
export default function AdminProtectedRoute({ children }) {
  const token = getAdminToken();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
