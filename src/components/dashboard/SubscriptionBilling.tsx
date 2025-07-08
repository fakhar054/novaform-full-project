import React, { useState } from 'react';
import { CreditCard, Calendar, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { AddPaymentMethodModal } from './AddPaymentMethodModal';

export const SubscriptionBilling: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  const currentPlan = {
    name: 'Premium',
    price: isAnnual ? 199 : 19.99,
    period: isAnnual ? 'year' : 'month',
    nextBilling: 'January 15, 2025',
    features: [
      'Unlimited appointments',
      'Advanced analytics',
      'SMS notifications',
      'Priority support',
      'Custom branding'
    ]
  };

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 9.99,
      annualPrice: 99,
      features: [
        'Up to 100 appointments/month',
        'Basic analytics',
        'Email notifications',
        'Standard support'
      ]
    },
    {
      name: 'Premium',
      monthlyPrice: 19.99,
      annualPrice: 199,
      features: [
        'Unlimited appointments',
        'Advanced analytics',
        'SMS notifications',
        'Priority support',
        'Custom branding'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
          Subscription & Billing
        </h1>
        <p className="text-gray-600">
          Manage your subscription plan and billing information
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-6">Current Plan</h2>
        
        <div className="bg-[#078147]/5 border-2 border-[#078147]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-[#078147]">{currentPlan.name}</h3>
              <p className="text-gray-600">
                €{currentPlan.price}/{currentPlan.period}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Next billing</p>
              <p className="font-semibold text-black">{currentPlan.nextBilling}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#078147] rounded-full"></div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing Frequency */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-6">Billing Frequency</h2>
        
        <div className="flex bg-gray-100 rounded-lg p-1 max-w-xs">
          <button
            onClick={() => setIsAnnual(false)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !isAnnual 
                ? 'bg-white text-[#078147] shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isAnnual 
                ? 'bg-white text-[#078147] shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Annual
            <span className="ml-1 text-xs bg-[#078147] text-white px-1.5 py-0.5 rounded">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-6">Available Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const period = isAnnual ? 'year' : 'month';
            const isCurrent = plan.name === currentPlan.name;
            
            return (
              <div key={plan.name} className={`
                border rounded-lg p-6 relative
                ${isCurrent ? 'border-[#078147] bg-[#078147]/5' : 'border-gray-200'}
              `}>
                {isCurrent && (
                  <div className="absolute -top-3 left-4 bg-[#078147] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#078147]">€{price}</span>
                  <span className="text-gray-600">/{period}</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#078147] rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {!isCurrent && (
                  <button className="w-full bg-[#078147] text-white py-3 rounded-lg font-semibold hover:bg-[#066139] transition-colors flex items-center justify-center space-x-2">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Upgrade to {plan.name}</span>
                  </button>
                )}
                
                {isCurrent && currentPlan.name === 'Premium' && (
                  <button 
                    onClick={() => setShowCancelModal(true)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Downgrade Plan</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-black mb-6">Payment Method</h2>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-black">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/26</p>
            </div>
          </div>
          <button className="text-[#078147] font-semibold hover:underline">
            Update
          </button>
        </div>
        
        <button 
          onClick={() => setShowAddPaymentModal(true)}
          className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Add New Payment Method
        </button>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-black">Cancel Subscription</h3>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to all premium features at the end of your current billing period.
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Keep Subscription
              </button>
              <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal 
        isOpen={showAddPaymentModal}
        onClose={() => setShowAddPaymentModal(false)}
      />
    </div>
  );
};
