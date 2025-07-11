import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ChangePlanModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onPlanChange?: (plan: string) => void;
}

export const ChangePlanModal: React.FC<ChangePlanModalProps> = ({
  user,
  isOpen,
  onClose,
  onPlanChange,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(user.plan);
  const [latestPlan, setLatestPlan] = useState(user.plan);

  const plans = [
    {
      value: "Basic",
      label: "Basic Plan",
      price: "€29/month",
      features: ["Up to 100 products", "Basic support"],
    },
    {
      value: "Standard",
      label: "Standard Plan",
      price: "€59/month",
      features: [
        "Up to 500 products",
        "Priority support",
        "Advanced analytics",
      ],
    },
    {
      value: "Premium",
      label: "Premium Plan",
      price: "€89/month",
      features: ["Unlimited products", "24/7 support", "Custom integrations"],
    },
  ];

  const fetchLatestPlan = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("plan")
      .eq("uuid", user.uuid)
      .single();

    if (!error && data?.plan) {
      setLatestPlan(data.plan);
      setSelectedPlan(data.plan);
    }
  };

  useEffect(() => {
    if (user?.uuid) {
      fetchLatestPlan();
    }
  }, [user]);

  const handleSave = async () => {
    const { error } = await supabase
      .from("users")
      .update({ plan: selectedPlan })
      .eq("uuid", user.uuid);

    if (error) {
      toast.error("Update failed: Could not change plan");
      return;
    }

    toast.success("Plan changed successfully");
    onPlanChange?.(selectedPlan);
    onClose();
  };

  const getCurrentPlan = () => plans.find((p) => p.value === latestPlan);
  const getSelectedPlan = () => plans.find((p) => p.value === selectedPlan);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Change Plan for {user.businessName}</DialogTitle>
          <DialogDescription>
            Select a different subscription plan for this user.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Plan Display */}
          <div>
            <Label className="text-gray-600">Current Plan</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{getCurrentPlan()?.label}</p>
                  <p className="text-sm text-gray-600">
                    {getCurrentPlan()?.price}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Current</Badge>
              </div>
            </div>
          </div>

          {/* Plan Selector */}
          <div>
            <Label htmlFor="newPlan">Select New Plan</Label>
            <Select
              value={selectedPlan}
              onValueChange={(value) => {
                setSelectedPlan(value);
                if (onPlanChange) onPlanChange(value);
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.value} value={plan.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{plan.label}</span>
                      <span className="text-sm text-gray-500">
                        {plan.price}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Show Plan Features if different */}
          {selectedPlan && selectedPlan !== latestPlan && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">
                New Plan Features:
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                {getSelectedPlan()?.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={selectedPlan === latestPlan}
            className="bg-[#1C9B7A] hover:bg-[#158a69]"
          >
            Change Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
