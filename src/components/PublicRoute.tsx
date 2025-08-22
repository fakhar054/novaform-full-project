// components/PublicOnlyRoute.tsx
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Spinner from "./Spinner";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const role = localStorage.getItem("role");
      console.log("Role from public route is ", role);

      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicOnlyRoute;
