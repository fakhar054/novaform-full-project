
import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { AccountSettings } from '../components/dashboard/AccountSettings';
import { SubscriptionBilling } from '../components/dashboard/SubscriptionBilling';
import { Invoices } from '../components/dashboard/Invoices';
import { Support } from '../components/dashboard/Support';

export type DashboardSection = 'overview' | 'account' | 'subscription' | 'invoices' | 'support';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'account':
        return <AccountSettings />;
      case 'subscription':
        return <SubscriptionBilling />;
      case 'invoices':
        return <Invoices />;
      case 'support':
        return <Support />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <div className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
