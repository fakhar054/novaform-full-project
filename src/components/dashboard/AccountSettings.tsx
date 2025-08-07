import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { CompanyInfoForm } from "./CompanyInfoForm";
import { BillingAddressForm } from "./BillingAddressForm";
import { TwoFactorModal } from "./TwoFactorModal";
import { PasswordStrength } from "@/components/ui/password-strength";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AccountSettings: React.FC = () => {
  const [loadingPersonal, setLoadingPersonal] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const [loadingBilling, setLoadingBilling] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [userData, setUserData] = useState();

  // console.log("user Data", userData);

  const [userLoading, setUserLoading] = useState(null);

  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    language: "",
  });

  const [companyData, setCompanyData] = useState({
    companyName: "",
    vatNumber: "",
    taxCode: "",
    sdi_code: "",
    pec_email: "",
  });

  const [billingData, setBillingData] = useState({
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
  });

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorMode, setTwoFactorMode] = useState<"enable" | "disable">(
    "enable"
  );

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchUserData = async () => {
    setUserLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Auth error:", userError?.message);
      setUserLoading(false);
      return;
    }
    const { data, error } = await (supabase as any)
      .from("users")
      .select("*")
      .eq("email", user.email)
      .single();

    if (error) {
      console.error("Data fetch error:", error.message);
    } else {
      // console.log("data fetched from  Account Setting", data);
      setUserData(data);
      setPersonalData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        language: data.language || "",
      });

      setCompanyData({
        companyName: data.companyName || "",
        vatNumber: data.vatNumber || "",
        taxCode: data.tax_code || "",
        sdi_code: data.sdi_code || "",
        pec_email: data.billingEmail || "",
      });

      setBillingData({
        streetAddress: data.streetAddress || "",
        city: data.city || "",
        province: data.province || "",
        zipCode: data.zipCode || "",
        country: data.country || "",
      });
    }
    setUserLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSavePersonalInfo = async (data: typeof personalData) => {
    setLoadingPersonal(true);
    setMessage(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage({ type: "error", text: "User not found or auth error" });
      setLoadingPersonal(false);
      return;
    }

    const { error } = await (supabase as any)
      .from("users")
      .update({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        language: data.language,
      })
      .eq("email", user.email);

    if (error) {
      console.error("Update failed:", error.message);
      setMessage({ type: "error", text: "Failed to update user info" });
    } else {
      setPersonalData(data);
      setMessage({
        type: "success",
        text: "Personal info updated successfully!",
      });
      toast("Information updated successfully!");
    }

    setLoadingPersonal(false);
    // Optional: clear success message after 3s
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveCompanyInfo = async (data: typeof companyData) => {
    setLoadingCompany(true);
    setMessage(null);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage({
        type: "error",
        text: "User not found or auth error in companyInfo",
      });
      setLoadingCompany(false);
      return;
    }

    const { error } = await (supabase as any)
      .from("users")
      .update({
        companyName: data.companyName,
        vatNumber: data.vatNumber,
        sdi_code: data.sdi_code,
        billingEmail: data.pec_email,
      })
      .eq("email", user.email);

    if (error) {
      console.error("Update failed in company", error.message);
      setMessage({ type: "error", text: "Failed to update company info" });
    } else {
      setMessage({
        type: "success",
        text: "Company information updated successfully!",
      });
      setCompanyData(data);
      toast("Information updated successfully!");
      setTimeout(() => setMessage(null), 3000);
    }

    setLoadingCompany(false);
  };

  const handleSaveBillingAddress = async (data: typeof billingData) => {
    // console.log("Billing Information", data);
    setLoadingBilling(true);
    setMessage(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage({
        type: "error",
        text: "User not found or auth error in billingInfo",
      });
      setLoadingBilling(false);
      return;
    }

    const { error } = await (supabase as any)
      .from("users")
      .update({
        streetAddress: data.streetAddress,
        city: data.city,
        province: data.province,
        country: data.country,
        zipCode: data.zipCode,
      })
      .eq("email", user.email);

    if (error) {
      console.error("Update failed in biling", error.message);
      setMessage({ type: "error", text: "Failed to update company info" });
    } else {
      setMessage({
        type: "success",
        text: "Company information updated successfully!",
      });
      setBillingData(data);
      toast("Information updated successfully!");
      setTimeout(() => setMessage(null), 3000);
    }

    // Simulate API call
    setTimeout(() => {
      setBillingData(data);
      setLoadingBilling(false);
      // setIsLoading(false);
      setMessage({
        type: "success",
        text: "Billing address updated successfully!",
      });
      setTimeout(() => setMessage(null), 3000);
    }, 3000);
  };

  // 2FA handlers
  const handleTwoFactorToggle = (enabled: boolean) => {
    if (enabled) {
      setTwoFactorMode("enable");
      setShowTwoFactorModal(true);
    } else {
      setTwoFactorMode("disable");
      setShowTwoFactorModal(true);
    }
  };

  const handleTwoFactorConfirm = async (code: string) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setTwoFactorEnabled(twoFactorMode === "enable");
      setIsLoading(false);
      setShowTwoFactorModal(false);
      setMessage({
        type: "success",
        text: `Two-factor authentication ${
          twoFactorMode === "enable" ? "enabled" : "disabled"
        } successfully!`,
      });
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  //code for change passwore
  const user = supabase.auth.getUser();
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user?.email) {
      setIsLoading(false);
      return;
    }
    const email = userData.user.email;
    // 2. Re-authenticate with old password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: passwordData.currentPassword,
    });

    if (signInError) {
      toast.error("Old password is incorrect.");
      console.log("Old password is incorrect.");
      setIsLoading(false);
      return;
    }

    // 3. Update to new password
    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");
      // console.log("Password updated successfully!");
      passwordData.currentPassword = "";
      passwordData.newPassword = "";
      passwordData.confirmPassword = "";
    }

    // setIsLoading(true);
    // setMessage(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2 text-left">
          Account Settings
        </h1>
        <p className="text-gray-600 text-left">
          Manage your personal information and preferences
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Personal Information */}
      <PersonalInfoForm
        data={personalData}
        onSave={handleSavePersonalInfo}
        isLoading={loadingPersonal}
      />

      {/* Company Information */}
      <CompanyInfoForm
        data={companyData}
        onSave={handleSaveCompanyInfo}
        isLoading={loadingCompany}
      />

      {/* Billing Address */}
      <BillingAddressForm
        data={billingData}
        onSave={handleSaveBillingAddress}
        isLoading={loadingBilling}
      />

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-6 text-left">
          Security Settings
        </h2>

        {/* Two-Factor Authentication */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900 text-left">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-600 text-left">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
              className="data-[state=checked]:bg-green-600"
            />
          </div>

          {twoFactorEnabled && (
            <div className="ml-8 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 text-left">
                ✓ Two-factor authentication is enabled. You'll receive a
                verification code via email when signing in.
              </p>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className="border-t pt-6 text-left">
          <h3 className="text-lg font-semibold text-black mb-4 text-left">
            Password
          </h3>

          {!showPasswordForm ? (
            <div>
              <p className="text-gray-600 mb-4 text-left">
                Keep your account secure with a strong password
              </p>
              <button
                onClick={() => setShowPasswordForm(true)}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors "
              >
                Change Password
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        current: !showPasswords.current,
                      })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        new: !showPasswords.new,
                      })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {passwordData.newPassword && (
                  <div className="mt-3">
                    <PasswordStrength password={passwordData.newPassword} />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        confirm: !showPasswords.confirm,
                      })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleChangePassword}
                  disabled={isLoading}
                  className="bg-[#078147] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#066139] transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two-Factor Modal */}
      <TwoFactorModal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        onConfirm={handleTwoFactorConfirm}
        isLoading={isLoading}
        mode={twoFactorMode}
      />
    </div>
  );
};
