//

import React, { useEffect, useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPlan } from "./SubscriptionPlan";

export default function AllPlans() {
  const navigate = useNavigate();
  const [editPlanId, setEditPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("subscription_plan")
        .select("*");

      if (error) {
        console.error("Error fetching subscription plans:", error);
      } else {
        setPlans(data);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleEdit = (id) => {
    setEditPlanId(id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("subscription_plan")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting plan:", error);
      alert("Error deleting plan");
    } else {
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    }
  };

  const handleClick = () => {
    navigate("/create-new-plan");
  };

  if (editPlanId) {
    return <SubscriptionPlan planId={editPlanId} />;
  }

  return (
    <div>
      <div className="flex justify-end mt-4 sm:mt-0">
        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#1C9B7A] hover:bg-[#158a69]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Plan
        </button>
      </div>

      <h1 className="text-2xl font-bold">All Plans</h1>
      <table className="mt-5 min-w-full divide-y divide-gray-200 shadow-md rounded-lg bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
              Plan Name
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
              Monthly Price
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
              Yearly Price
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="px-6 font-bold text-center py-4 text-sm text-gray-800">
                {plan.monthly_plan_name}
              </td>
              <td className="px-6 text-center py-4 text-sm text-gray-800">
                {plan.price_monthly}
              </td>
              <td className="px-6 text-center py-4 text-sm text-gray-800">
                {plan.price_yearly}
              </td>
              <td className="px-6 text-center py-4 text-sm space-x-2">
                <button
                  onClick={() => handleEdit(plan.id)}
                  className="px-2 py-1 text-xl text-black rounded"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="px-2 py-1 text-sm text-red-500 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
