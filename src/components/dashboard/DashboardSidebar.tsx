import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { DashboardSection } from "../../pages/Dashboard";
import { toast } from "sonner";

interface DashboardSidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    {
      id: "overview" as DashboardSection,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "account" as DashboardSection,
      label: "Account Settings",
      icon: Settings,
    },
    {
      id: "subscription" as DashboardSection,
      label: "Subscription",
      icon: CreditCard,
    },
    { id: "invoices" as DashboardSection, label: "Invoices", icon: FileText },
    { id: "support" as DashboardSection, label: "Support", icon: HelpCircle },
  ];

  const handleLogout = () => {
    localStorage.removeItem("sb-ajbxscredobhqfksaqrk-auth-token");
    navigate("/");
    toast.success("Logout");
    console.log("Logout");
  };

  const handleMenuClick = (section: DashboardSection) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  const handleEnterPlatform = () => {
    // This will redirect to the NovaFarm platform login
    // Replace with actual URL when provided
    window.open("#", "_blank");
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-2 rounded-lg shadow-lg border"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-[#078147]">NovaFarm</h1>
          <p className="text-sm text-gray-600 mt-1">Dashboard</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${
                    isActive
                      ? "bg-[#078147] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}

          {/* Enter Platform Button */}
          <button
            onClick={handleEnterPlatform}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100 border-t mt-4 pt-4"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-medium">Enter the Platform</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};
