import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../store/authStore";

export default function ProtectedRoute() {
  const isLogin = authStore((state) => state.isAuthenticated);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}