import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  HelpCircle,
  Clock,
} from "lucide-react";

export const Support: React.FC = () => {
  const navigate = useNavigate();

  const handleBookCall = () => {
    navigate("/book-demo");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  const supportOptions = [
    {
      icon: Phone,
      title: "Book a Support Call",
      description: "Schedule a one-on-one call with our support team",
      action: "Schedule Call",
      onClick: handleBookCall,
      color: "bg-[#078147]",
    },
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help through our live chat",
      action: "Start Chat",
      onClick: () => console.log("Start chat"),
      color: "bg-blue-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll get back to you within 24 hours",
      action: "Send Email",
      onClick: handleContact,
      color: "bg-purple-600",
    },
    {
      icon: BookOpen,
      title: "Help Center",
      description: "Browse our comprehensive knowledge base and FAQs",
      action: "Browse FAQs",
      onClick: () => window.open("https://help.novafarm.com", "_blank"),
      color: "bg-orange-600",
    },
  ];

  const quickLinks = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of NovaFarm",
    },
    {
      title: "Booking System Setup",
      description: "Set up your appointment system",
    },
    {
      title: "Payment Configuration",
      description: "Configure payment methods",
    },
    { title: "SMS Notifications", description: "Enable SMS reminders" },
    { title: "Analytics Dashboard", description: "Understand your reports" },
    { title: "API Documentation", description: "Integrate with other systems" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2 text-left">
          Support Center
        </h1>
        <p className="text-gray-600 text-left">
          Get help when you need it - we're here to support your success
        </p>
      </div>

      {/* Support Hours */}
      <div className="bg-[#078147]/5 border border-[#078147]/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-3">
          <Clock className="w-6 h-6 text-[#078147]" />
          <h2 className="text-lg font-semibold text-black">Support Hours</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-black text-left">Monday - Friday</p>
            <p className="text-gray-600 text-left">9:00 AM - 6:00 PM CET</p>
          </div>
          <div>
            <p className="font-medium text-black text-left">
              Emergency Support
            </p>
            <p className="text-gray-600 text-left">24/7 for critical issues</p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {supportOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {option.description}
                  </p>
                  <button
                    onClick={option.onClick}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                  >
                    {option.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="w-6 h-6 text-[#078147]" />
          <h2 className="text-xl font-bold text-black">Quick Help Links</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className="text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-black mb-1">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-4 text-left">
          Contact Information
        </h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-[#078147]" />
            <div>
              <p className="font-medium text-black text-left">Email Support</p>
              <p className="text-gray-600 text-left">support@novafarm.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-[#078147]" />
            <div>
              <p className="font-medium text-black">Phone Support</p>
              <p className="text-gray-600">+39 02 1234 5678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
