
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Plus, HeadphonesIcon } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();

  const handleBookSupport = () => {
    navigate('/book-demo');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
          Welcome back, John!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your NovaFarm account
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#078147]" />
            </div>
          </div>
          <h3 className="font-semibold text-black mb-1">Current Plan</h3>
          <p className="text-2xl font-bold text-[#078147] mb-1">Premium</p>
          <p className="text-sm text-gray-600">Annual billing</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#078147]" />
            </div>
          </div>
          <h3 className="font-semibold text-black mb-1">Next Billing</h3>
          <p className="text-2xl font-bold text-black mb-1">Jan 15</p>
          <p className="text-sm text-gray-600">€199.00</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-[#078147]" />
            </div>
          </div>
          <h3 className="font-semibold text-black mb-1">Active Add-ons</h3>
          <p className="text-2xl font-bold text-black mb-1">3</p>
          <p className="text-sm text-gray-600">SMS notifications, Analytics+</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleBookSupport}
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-[#078147]/10 rounded-lg flex items-center justify-center">
              <HeadphonesIcon className="w-5 h-5 text-[#078147]" />
            </div>
            <div>
              <h3 className="font-semibold text-black">Book Support Call</h3>
              <p className="text-sm text-gray-600">Get help from our team</p>
            </div>
          </button>

          <button
            onClick={handleBookSupport}
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-[#078147]/10 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#078147]" />
            </div>
            <div>
              <h3 className="font-semibold text-black">Access Help Center</h3>
              <p className="text-sm text-gray-600">Browse FAQs and guides</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div>
              <p className="font-medium text-black">Payment processed</p>
              <p className="text-sm text-gray-600">Premium plan renewal</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div>
              <p className="font-medium text-black">Profile updated</p>
              <p className="text-sm text-gray-600">Changed email address</p>
            </div>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div>
              <p className="font-medium text-black">Add-on activated</p>
              <p className="text-sm text-gray-600">SMS notifications enabled</p>
            </div>
            <span className="text-sm text-gray-500">2 weeks ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
