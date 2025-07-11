import React, { useState } from "react";
import { Plus, Save, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordStrength } from "@/components/ui/password-strength";
// import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

import supabaseAdmin from "@/integrations/supabase/superadmin";

export const SuperAdminAccounts: React.FC = () => {
  // const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // General Info
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    language: "it",
    customDomain: "",
    notes: "",

    // Billing Information
    legalOwnerFirstName: "",
    legalOwnerLastName: "",
    billingEmail: "",
    vatNumber: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    province: "",
    country: "IT",

    // Account Access & Subscription
    password: "",
    plan: "standard",
    accountStatus: true,
    sendOnboardingEmail: true,
  });

  const handleInputChange = async (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating account:", formData);

    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: formData.email,
        password: formData.password || undefined,
        email_confirm: true,
      });

    if (authError) {
      console.error("Error creating auth user:", authError.message);
      toast.error("Error creating user");
      return;
    }

    const userId = authData.user.id;

    // Step 2: Insert profile info into Supabase 'users' table
    const { error: dbError } = await supabaseAdmin.from("users").insert({
      uuid: userId,
      businessName: formData.businessName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      language: formData.language,
      customDomain: formData.customDomain,
      notes: formData.notes,
      legalOwnerFirstName: formData.legalOwnerFirstName,
      legalOwnerLastName: formData.legalOwnerLastName,
      billingEmail: formData.billingEmail,
      vatNumber: formData.vatNumber,
      streetAddress: formData.streetAddress,
      city: formData.city,
      zipCode: formData.zipCode,
      province: formData.province,
      country: formData.country,
      plan: formData.plan,
      accountStatus: formData.accountStatus,
      sendOnboardingEmail: formData.sendOnboardingEmail,
    });

    if (dbError) {
      console.error("Error inserting to users table:", dbError.message);
      toast.error("User created in auth, but failed in DB");
      return;
    }

    console.log("User created and saved to DB");
    toast("Account Created Successfully");

    // Reset form
    setFormData({
      businessName: "",
      contactPerson: "",
      phone: "",
      email: "",
      language: "it",
      customDomain: "",
      notes: "",
      legalOwnerFirstName: "",
      legalOwnerLastName: "",
      billingEmail: "",
      vatNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      province: "",
      country: "IT",
      password: "",
      plan: "standard",
      accountStatus: true,
      sendOnboardingEmail: true,
    });

    setIsCreating(false);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Creating account:", formData);
  //   const { data: authData, error: authError } =
  //     await supabaseAdmin.auth.admin.createUser({
  //       email: formData.email,
  //       password: formData.password || undefined,
  //       email_confirm: true,
  //     });

  //   if (authError) {
  //     console.error("Error creating auth user:", authError.message);
  //     toast({
  //       title: "Error creating user",
  //       description: authError.message,
  //       variant: "destructive",
  //     });
  //     return;
  //   }
  //   const userId = authData.user.id;

  //   const { error: dbError } = await supabaseAdmin.from("users").insert({
  //     id: userId,
  //     username: formData.businessName,
  //     email: formData.email,
  //     role: "user",
  //   });

  //   if (dbError) {
  //     console.error("Error inserting to users table:", dbError.message);
  //     toast({
  //       title: "User created in auth, but failed in DB",
  //       description: dbError.message,
  //       variant: "destructive",
  //     });
  //     return;
  //   }
  //   console.log("✅ User created and saved to DB");
  //   toast({
  //     title: "Account Created Successfully",
  //     description: `Account for ${formData.businessName} has been created.`,
  //   });

  //   // toast({
  //   //   title: "Account Created Successfully",
  //   //   description: `Account for ${formData.businessName} has been created. ${
  //   //     formData.sendOnboardingEmail
  //   //       ? "Onboarding email sent to " + formData.email
  //   //       : "No onboarding email sent."
  //   //   }`,
  //   // });

  //   // Reset form
  //   setFormData({
  //     businessName: "",
  //     contactPerson: "",
  //     phone: "",
  //     email: "",
  //     language: "it",
  //     customDomain: "",
  //     notes: "",
  //     legalOwnerFirstName: "",
  //     legalOwnerLastName: "",
  //     billingEmail: "",
  //     vatNumber: "",
  //     streetAddress: "",
  //     city: "",
  //     zipCode: "",
  //     province: "",
  //     country: "IT",
  //     password: "",
  //     plan: "standard",
  //     accountStatus: true,
  //     sendOnboardingEmail: true,
  //   });
  //   setIsCreating(false);
  // };

  const handleCancel = () => {
    setIsCreating(false);
    setFormData({
      businessName: "",
      contactPerson: "",
      phone: "",
      email: "",
      language: "it",
      customDomain: "",
      notes: "",
      legalOwnerFirstName: "",
      legalOwnerLastName: "",
      billingEmail: "",
      vatNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      province: "",
      country: "IT",
      password: "",
      plan: "standard",
      accountStatus: true,
      sendOnboardingEmail: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Account Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage pharmacy accounts manually
          </p>
        </div>

        {!isCreating && (
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-[#1C9B7A] hover:bg-[#158a69] mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Account
          </Button>
        )}
      </div>

      {isCreating ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Info Section */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    placeholder="e.g., Farmacia Centrale Milano"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    placeholder="Dr. Mario Rossi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+39 02 1234567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="admin@pharmacy.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) =>
                      handleInputChange("language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Italian</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input
                    id="customDomain"
                    value={formData.customDomain}
                    onChange={(e) =>
                      handleInputChange("customDomain", e.target.value)
                    }
                    placeholder="pharmacy.novafarm.it"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional notes about this account..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Billing Information Section */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="legalOwnerFirstName">
                    Legal Owner First Name
                  </Label>
                  <Input
                    id="legalOwnerFirstName"
                    value={formData.legalOwnerFirstName}
                    onChange={(e) =>
                      handleInputChange("legalOwnerFirstName", e.target.value)
                    }
                    placeholder="Mario"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legalOwnerLastName">
                    Legal Owner Last Name
                  </Label>
                  <Input
                    id="legalOwnerLastName"
                    value={formData.legalOwnerLastName}
                    onChange={(e) =>
                      handleInputChange("legalOwnerLastName", e.target.value)
                    }
                    placeholder="Rossi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="billingEmail">Billing Email</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    value={formData.billingEmail}
                    onChange={(e) =>
                      handleInputChange("billingEmail", e.target.value)
                    }
                    placeholder="billing@pharmacy.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vatNumber">VAT Number / Tax Code</Label>
                  <Input
                    id="vatNumber"
                    value={formData.vatNumber}
                    onChange={(e) =>
                      handleInputChange("vatNumber", e.target.value)
                    }
                    placeholder="IT12345678901"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Legal Address</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">
                      streetAddress and Number
                    </Label>
                    <Input
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={(e) =>
                        handleInputChange("streetAddress", e.target.value)
                      }
                      placeholder="Via Roma 123"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      placeholder="Milano"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      placeholder="20100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">Province / Region</Label>
                    <Input
                      id="province"
                      value={formData.province}
                      onChange={(e) =>
                        handleInputChange("province", e.target.value)
                      }
                      placeholder="MI"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        handleInputChange("country", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">Italy</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="ES">Spain</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Access & Subscription Section */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Account Access & Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password (Optional - Auto-generated if empty)
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Leave empty for auto-generation"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 h-auto"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <PasswordStrength
                    password={formData.password}
                    className="mt-3"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="plan">Subscription Plan *</Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(value) => handleInputChange("plan", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - €49/month</SelectItem>
                      <SelectItem value="standard">
                        Standard - €99/month
                      </SelectItem>
                      <SelectItem value="premium">
                        Premium - €199/month
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountStatus">Account Status</Label>
                  <div className="flex items-center space-x-3 pt-2">
                    <Switch
                      id="accountStatus"
                      checked={formData.accountStatus}
                      onCheckedChange={(checked) =>
                        handleInputChange("accountStatus", checked)
                      }
                    />
                    <span
                      className={`text-sm font-medium ${
                        formData.accountStatus
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formData.accountStatus ? "Active" : "Suspended"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendOnboardingEmail"
                  checked={formData.sendOnboardingEmail}
                  onCheckedChange={(checked) =>
                    handleInputChange("sendOnboardingEmail", checked)
                  }
                />
                <Label htmlFor="sendOnboardingEmail" className="text-sm">
                  Send Onboarding Email with login credentials
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="submit"
              className="bg-[#1C9B7A] hover:bg-[#158a69] flex-1 sm:flex-none"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Account
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Creation
              </h3>
              <p className="text-gray-600 mb-4">
                Create new pharmacy accounts with automatic onboarding email
                delivery.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Automatic credentials generation</li>
                <li>• Custom domain setup</li>
                <li>• Plan assignment</li>
                <li>• Onboarding email with login details</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Features Included
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Multi-language support</li>
                <li>✓ Custom domain configuration</li>
                <li>✓ Flexible plan assignment</li>
                <li>✓ Business information management</li>
                <li>✓ VAT/Tax ID tracking</li>
                <li>✓ Internal notes system</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Automation
              </h3>
              <p className="text-gray-600 mb-4">
                Once created, the system automatically:
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Generates secure login credentials</li>
                <li>• Sets up the pharmacy dashboard</li>
                <li>• Sends welcome email with access details</li>
                <li>• Configures billing and subscription</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
