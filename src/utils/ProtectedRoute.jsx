import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, role = null }) {
  const { isAuthenticated, user, loading, hasRole } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && !hasRole(role)) return <Navigate to="/" replace />;
  return children;
}
