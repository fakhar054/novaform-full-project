
import React, { useState } from 'react';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Link, useNavigate } from 'react-router-dom';

const TwoFactorVerification = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API verification
    setTimeout(() => {
      if (code === '123456') { // Demo code for testing
        navigate('/dashboard');
      } else {
        setError('Invalid verification code. Please try again.');
        setCode('');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResendCode = () => {
    // Simulate resending code
    setError('');
    // Show success message or implement resend logic
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 to-green-100 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-green-800/10"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-2">NovaFarm</h1>
            <div className="w-16 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>
          <div className="mb-6">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Secure Verification
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We've sent a verification code to your email to ensure your account security.
          </p>
        </div>
      </div>

      {/* Right Side - Verification Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">NovaFarm</h1>
            <div className="w-12 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <p>We've sent a 6-digit code to your email</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Enter the 6-digit verification code
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    setError('');
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && (
                <p className="text-sm text-red-600 text-center mt-2">{error}</p>
              )}
            </div>

            <Button
              onClick={handleVerify}
              disabled={code.length !== 6 || isLoading}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-base"
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>

            <div className="text-center space-y-4">
              <button
                onClick={handleResendCode}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Didn't receive the code? Resend it
              </button>
              
              <Link 
                to="/login" 
                className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 NovaFarm. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorVerification;
