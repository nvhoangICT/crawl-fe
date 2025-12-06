import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/store/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { currentUser } = useAuth();

  if (currentUser?.permissions?.some((item: string ) => roles.includes(item))) {
  }
  return children;

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
