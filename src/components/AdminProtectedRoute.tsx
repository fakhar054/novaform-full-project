import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Spinner from "./Spinner";

interface AdminProtectRoute {
  children: ReactNode;
}

const AdminProtectRoute: React.FC<AdminProtectRoute> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      const role = localStorage.getItem("role");

      if (session && !error && role !== "user") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default AdminProtectRoute;
