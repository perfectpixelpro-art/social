import { Navigate } from "react-router-dom";
import { getAccessToken } from "../api";

// Blocks access unless the user has logged in (has an access token).
// Typing /dashboard in the URL without being logged in → bounced to /login.
export default function ProtectedRoute({ children }) {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
