
import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
  { label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
  { label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
  { label: 'One number', test: (pwd) => /\d/.test(pwd) },
  { label: 'One special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
];

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className = '' }) => {
  const passedRequirements = passwordRequirements.filter(req => req.test(password));
  const strength = passedRequirements.length;
  
  const getStrengthLabel = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'text-red-600';
    if (strength <= 4) return 'text-orange-600';
    return 'text-green-600';
  };

  const getBarColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-orange-500';
    return 'bg-green-500';
  };

  if (!password) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Password Strength:</span>
        <span className={`text-sm font-semibold ${getStrengthColor()}`}>
          {getStrengthLabel()}
        </span>
      </div>
      
      {/* Strength Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getBarColor()}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
        {passwordRequirements.map((requirement, index) => {
          const passed = requirement.test(password);
          return (
            <div key={index} className="flex items-center space-x-2 text-sm">
              {passed ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-gray-400" />
              )}
              <span className={passed ? 'text-green-600' : 'text-gray-500'}>
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
