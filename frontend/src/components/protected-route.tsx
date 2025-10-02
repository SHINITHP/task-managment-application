import AuthContext from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: "ADMIN" | "AGENT";
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
}) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center bg-background dark:bg-background h-screen"><Loader2 /></div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/error-page?unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
