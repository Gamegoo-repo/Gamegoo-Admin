import { getAccessToken } from "@/api/auth/auth.storage";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";



const AuthLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getAccessToken()
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
