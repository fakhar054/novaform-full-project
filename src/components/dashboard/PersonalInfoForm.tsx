import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  onSave: (data: PersonalInfoData) => void;
  isLoading: boolean;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onSave,
  isLoading,
}) => {
  const [formData, setFormData] = useState(data);
  const [email, setEmail] = useState();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (user) {
        setEmail(user.email);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSave = async () => {
  //   if (currentEmail !== formData.email) {
  //     console.log("email are not same");
  //   } else {
  //     console.log("email are  same");
  //     try {
  //       const { data, error } = await supabase.auth.updateUser({
  //         email: formData.email,
  //       });

  //       if (error) {
  //         console.log(" Error: " + error.message);
  //       } else {
  //         console.log(
  //           "Email update request sent. Please check your inbox to confirm.",
  //           data
  //         );
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       console.log("Something went wrong.");
  //     }
  //   }
  //   onSave(formData);
  // };

  const handleSave = async () => {
    if (email !== formData.email) {
      // Update email
      const { data, error } = await supabase.auth.updateUser({
        email: formData.email,
      });

      if (error) {
        console.log("Email update error:", error.message);
      } else {
        console.log("Confirmation link sent to new email.", data);
        alert("Please check your new email to confirm the change.");
      }
    }

    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold text-black mb-6 text-left">
        Referent Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Cognome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Email Personale <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Numero di Telefono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent"
          />
        </div>

        {/* <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language Preference
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent"
          >
            <option value="EN">English</option>
            <option value="IT">Italiano</option>
          </select>
        </div> */}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-[#078147] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#066139] transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isLoading ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>
    </div>
  );
};
