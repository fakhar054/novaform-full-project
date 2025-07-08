
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  UserPlus, 
  FileText, 
  Activity, 
  Settings,
  Menu,
  X,
  Shield,
  Mail
} from 'lucide-react';
import { SuperAdminSection } from '@/pages/SuperAdmin';

interface SuperAdminSidebarProps {
  activeSection: SuperAdminSection;
  onSectionChange: (section: SuperAdminSection) => void;
}

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  activeSection,
  onSectionChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as SuperAdminSection, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as SuperAdminSection, label: 'Users', icon: Users },
    { id: 'payments' as SuperAdminSection, label: 'Payments', icon: CreditCard },
    { id: 'accounts' as SuperAdminSection, label: 'Accounts', icon: UserPlus },
    { id: 'invoices' as SuperAdminSection, label: 'Invoices', icon: FileText },
    { id: 'activity' as SuperAdminSection, label: 'Activity Logs', icon: Activity },
    { id: 'email' as SuperAdminSection, label: 'Email', icon: Mail },
    { id: 'roles' as SuperAdminSection, label: 'User Roles', icon: Shield },
    { id: 'settings' as SuperAdminSection, label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (section: SuperAdminSection) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-2 rounded-lg shadow-lg border"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-[#1B1B1F] shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-[#1C9B7A]">NovaFarm</h1>
          <p className="text-sm text-gray-400 mt-1">Super Admin</p>
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
                  ${isActive 
                    ? 'bg-[#1C9B7A] text-white shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
