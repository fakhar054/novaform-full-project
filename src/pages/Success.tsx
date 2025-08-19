import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Success() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");
  const [plan_info, setPlanInfo] = useState([]);
  const [planDuration, setPlanDuration] = useState();

  function generateInvoiceNo() {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900); // random 3-digit (100–999)
    return `NF:${year}-${randomNum}`;
  }

  useEffect(() => {
    const invoiceNo = generateInvoiceNo();
    const fetchSessionData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const accessToken = session?.access_token;
        const userId = session?.user?.id;

        // console.log("Access Token:", accessToken);
        // console.log("Session ID:", sessionId);
        // console.log("User UUID:", userId);

        if (!sessionId || !accessToken || !userId) {
          console.error("Missing sessionId, accessToken, or userId");
          return;
        }

        const res = await fetch(
          `https://ajbxscredobhqfksaqrk.supabase.co/functions/v1/get-session`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id: sessionId,
              user_id: userId,
            }),
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error from server:", errorText);
          return;
        }
        const data = await res.json();
        const plan_id = data?.session?.subscription?.items?.data?.[0]?.plan?.id;

        console.log("Plan ID:", plan_id);

        const { data: planData, error } = await supabase
          .from("subscription_plan")
          .select("*")
          .or(
            `stripe_price_monthly_id.eq.${plan_id},stripe_price_yearly_id.eq.${plan_id}`
          )
          .single();

        if (error) {
          console.error("Error fetching plan:", error);
        } else {
          if (planData.stripe_price_monthly_id === plan_id) {
            console.log("Matched Monthly Plan:", planData);
            setPlanDuration("monthly");
            setPlanInfo(planData);
          } else if (planData.stripe_price_yearly_id === plan_id) {
            console.log("Matched Yearly Plan:", planData);
            setPlanDuration("yearly");
            setPlanInfo(planData);
          }
        }

        setSessionData(data);
        if (data.success === true) {
          // console.log("Successful");

          // 1. Fetch user info from users table
          const { data: userInfo, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("user_id", userId)
            .single();

          if (userError) {
            console.error("Error fetching user info:", userError.message);
            return;
          } else {
            console.log(
              "response from fetching data from users_table",
              userInfo
            );
          }

          // 2. Insert into invoices table
          const { error: insertError } = await supabase
            .from("invoices")
            .insert({
              user_id: userInfo.user_id,
              customer_name: userInfo.contactPerson,
              personal_email: userInfo.billingEmail,
              address: userInfo.address,
              city: userInfo.city,
              province: userInfo.province,
              vat: userInfo.vatNumber,
              sdi: userInfo.sdi_code,
              // session_id: data.session.id,
              amount_total: data.session.amount_total / 100,
              status: "paid",
              invoice_no: invoiceNo,
              plan_name: planData.plan_name,
              duration: planDuration,
              // created_at: new Date(),
            });
          if (insertError) {
            console.error("Error saving invoice:", insertError.message);
          } else {
            // console.log("Invoice saved successfully 🎉");
          }
        }
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
