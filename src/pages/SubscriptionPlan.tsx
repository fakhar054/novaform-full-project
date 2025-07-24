import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SubscriptionPlan = ({ planId }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    monthly_plan_name: "",
    price_monthly: "",
    yearly_plan_name: "",
    price_yearly: "",
    plan_description: "",
  });

  console.log("Edit ID: ", planId);
  const authDataString = localStorage.getItem(
    "sb-ajbxscredobhqfksaqrk-auth-token"
  );
  let accessToken = null;

  if (authDataString) {
    try {
      const authDataObject = JSON.parse(authDataString);

      accessToken = authDataObject.access_token;
    } catch (error) {
      console.error("Error parsing auth data from localStorage:", error);
    }
  } else {
    console.log("No auth token found in localStorage.");
  }

  useEffect(() => {
    if (planId) {
      const fetchPlan = async () => {
        const { data, error } = await supabase
          .from("subscription_plan")
          .select("*")
          .eq("id", planId)
          .single();

        if (error) {
          console.error("Fetch error", error);
          toast.error("Failed to load subscription plan.");
        } else {
          setFormData(data);
        }
        setLoading(false);
      };

      fetchPlan();
    }
  }, [planId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, plan_description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const monthlyStr = formData.price_monthly.trim();
    const yearlyStr = formData.price_yearly.trim();

    if (!monthlyStr || !yearlyStr) {
      toast.error("Both monthly and yearly prices are required.");
      return;
    }

    const monthly = parseFloat(monthlyStr);
    const yearly = parseFloat(yearlyStr);

    if (isNaN(monthly) || isNaN(yearly)) {
      toast.error("Invalid price entered. Please enter valid numbers.");
      return;
    }

    try {
      const response = await fetch(
        "https://ajbxscredobhqfksaqrk.supabase.co/functions/v1/create-plans",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
          body: JSON.stringify({
            monthly_plan_name: formData.monthly_plan_name.trim(),
            yearly_plan_name: formData.yearly_plan_name.trim(),
            plan_description: formData.plan_description.trim(),
            price_monthly: monthly,
            price_yearly: yearly,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Plan created and updated successfully.");
      } else {
        toast.error(`Failed to create plan: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating plan:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Subscription Plan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="monthly_plan_name"
              className="block text-sm font-medium text-gray-700"
            >
              Monthly Plan Name
            </label>
            <input
              type="text"
              id="monthly_plan_name"
              name="monthly_plan_name"
              value={formData.monthly_plan_name}
              onChange={handleChange}
              placeholder="e.g. Basic"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="price_monthly"
              className="block text-sm font-medium text-gray-700"
            >
              Monthly Price ($)
            </label>
            <input
              type="number"
              id="price_monthly"
              name="price_monthly"
              value={formData.price_monthly}
              onChange={handleChange}
              placeholder="0.00"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="yearly_plan_name"
              className="block text-sm font-medium text-gray-700"
            >
              Yearly Plan Name
            </label>
            <input
              type="text"
              id="yearly_plan_name"
              name="yearly_plan_name"
              value={formData.yearly_plan_name}
              onChange={handleChange}
              placeholder="e.g. Premium"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="price_yearly"
              className="block text-sm font-medium text-gray-700"
            >
              Yearly Price ($)
            </label>
            <input
              type="number"
              id="price_yearly"
              name="price_yearly"
              value={formData.price_yearly}
              onChange={handleChange}
              placeholder="0.00"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="h-[300px] mb-6">
          <label
            htmlFor="plan_description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Plan Description
          </label>
          <ReactQuill
            name="plan_description"
            id="plan_description"
            value={formData.plan_description}
            onChange={handleDescriptionChange}
            theme="snow"
            className="bg-white h-full pb-12"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Save Plan
        </button>
      </form>
    </div>
  );
};

export { SubscriptionPlan };
