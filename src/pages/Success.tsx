import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Success() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchSessionData = async () => {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      console.log("Access Token : ", accessToken);
      console.log("sessionId : ", sessionId);

      if (!sessionId || !accessToken) {
        console.error("Missing sessionId or accessToken");
        return;
      }

      try {
        const res = await fetch(
          `https://ajbxscredobhqfksaqrk.supabase.co/functions/v1/get-session?session_id=${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error from server:", errorText);
          return;
        }

        const data = await res.json();
        setSessionData(data);
      } catch (err) {
        console.error("Fetch session error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);


  

  return (
    <div className="p-4">
      <h1>Payment Successful</h1>
      {loading ? (
        <p>Loading session info...</p>
      ) : sessionData ? (
        <pre>{JSON.stringify(sessionData, null, 2)}</pre>
      ) : (
        <p>Failed to load session data.</p>
      )}
    </div>
  );
}
