import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface BillingData {
  firstName: string;
  lastName: string;
  companyName: string;
  vatNumber: string;
  streetAddress: string;
  addressDetails: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
}

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  setupFee: number;
  stripeUrl: string;
}

const plans: Plan[] = [
  {
    id: 'standard',
    name: 'Standard Plan',
    monthlyPrice: 99,
    setupFee: 199,
    stripeUrl: 'https://buy.stripe.com/test_147standard'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    monthlyPrice: 149,
    setupFee: 249,
    stripeUrl: 'https://buy.stripe.com/test_297premium'
  }
];

const countries = [
  'Italy',
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria'
];

const Payment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const [billingData, setBillingData] = useState<BillingData>({
    firstName: '',
    lastName: '',
    companyName: '',
    vatNumber: '',
    streetAddress: '',
    addressDetails: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phone: '',
    email: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!billingData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!billingData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!billingData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!billingData.vatNumber.trim()) newErrors.vatNumber = 'VAT number is required';
    if (!billingData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!billingData.city.trim()) newErrors.city = 'City is required';
    if (!billingData.state.trim()) newErrors.state = 'State/Region is required';
    if (!billingData.country.trim()) newErrors.country = 'Country is required';
    if (!billingData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!billingData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!billingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(billingData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof BillingData, value: string) => {
    setBillingData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinueToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const storeBillingData = async () => {
    try {
      // Store billing data in localStorage as a fallback
      const purchaseData = {
        billing: billingData,
        selectedPlan: selectedPlan,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('novafarm_purchase_data', JSON.stringify(purchaseData));
      console.log('Billing data stored:', purchaseData);
      
      // TODO: In the future, integrate with Supabase or backend API
      // Example: await supabase.from('leads').insert(purchaseData);
      
    } catch (error) {
      console.error('Error storing billing data:', error);
    }
  };

  const handleCompletePurchase = async () => {
    if (!selectedPlan) {
      toast({
        title: "Plan Required",
        description: "Please select a subscription plan to continue.",
        variant: "destructive"
      });
      return;
    }

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) {
      toast({
        title: "Invalid Plan",
        description: "Selected plan not found. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Store billing data before redirect
      await storeBillingData();

      // Brief delay to show processing state
      setTimeout(() => {
        // Redirect to Stripe checkout
        window.location.href = plan.stripeUrl;
      }, 1000);

    } catch (error) {
      console.error('Error during purchase process:', error);
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Subscription
          </h1>
          <p className="text-gray-600">
            Join NovaFarm and start managing your pharmacy services today
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 mx-2 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="text-sm text-gray-600">
            Step {currentStep} of 2
          </span>
        </div>

        {/* Step 1: Billing Information */}
        {currentStep === 1 && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={billingData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={billingData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <Label htmlFor="companyName">Company Name / Business Name *</Label>
                  <Input
                    id="companyName"
                    value={billingData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={errors.companyName ? 'border-red-500' : ''}
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <Label htmlFor="vatNumber">VAT Number *</Label>
                  <Input
                    id="vatNumber"
                    value={billingData.vatNumber}
                    onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                    className={errors.vatNumber ? 'border-red-500' : ''}
                  />
                  {errors.vatNumber && <p className="text-red-500 text-sm mt-1">{errors.vatNumber}</p>}
                </div>

                <div>
                  <Label htmlFor="streetAddress">Street Address *</Label>
                  <Input
                    id="streetAddress"
                    value={billingData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    className={errors.streetAddress ? 'border-red-500' : ''}
                  />
                  {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
                </div>

                <div>
                  <Label htmlFor="addressDetails">Address Details (Apt, floor...)</Label>
                  <Input
                    id="addressDetails"
                    value={billingData.addressDetails}
                    onChange={(e) => handleInputChange('addressDetails', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={billingData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="state">State/Region *</Label>
                  <Input
                    id="state"
                    value={billingData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select value={billingData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>

                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={billingData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className={errors.postalCode ? 'border-red-500' : ''}
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={billingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={billingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleContinueToStep2}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 transition-colors duration-200"
                  style={{ backgroundColor: '#27AE60' }}
                >
                  Continue to Step 2
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Plan Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Choose Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="planSelect">Select Subscription Plan *</Label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - €{plan.monthlyPrice}/month
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPlanData && (
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedPlanData.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly price (VAT included):</span>
                        <span className="font-medium">€{selectedPlanData.monthlyPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup fee (one-time):</span>
                        <span className="font-medium">€{selectedPlanData.setupFee}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total today:</span>
                        <span style={{ color: '#27AE60' }}>
                          €{selectedPlanData.monthlyPrice + selectedPlanData.setupFee}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Recurring monthly:</span>
                        <span>€{selectedPlanData.monthlyPrice}/month</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2 transition-colors duration-200"
                disabled={isProcessing}
              >
                Back to Step 1
              </Button>
              
              <Button 
                onClick={handleCompletePurchase}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: isProcessing ? '#666' : '#27AE60' }}
                disabled={!selectedPlan || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
