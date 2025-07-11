import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AdminPublicRoute {
  children: ReactNode;
}

const AdminPublicRoute: React.FC<AdminPublicRoute> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Navigate to="/super-admin" /> : <>{children}</>;
};

export default AdminPublicRoute;
