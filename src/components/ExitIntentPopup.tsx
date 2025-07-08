
import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';

interface ExitIntentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  vatNumber: string;
}

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
  const form = useForm<ExitIntentFormData>();
  
  // Use a 7-day countdown (7 * 24 * 60 = 10080 minutes)
  const { timeLeft, formattedTime, isExpired } = useCountdownTimer(10080);
  
  // Calculate days, hours, minutes, seconds from timeLeft
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  const onSubmit = (data: ExitIntentFormData) => {
    console.log('Exit intent form submitted:', data);
    // Handle form submission here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogOverlay className="bg-black/60" />
      <DialogContent className="max-w-5xl w-[95%] max-h-[95vh] overflow-y-auto p-0 bg-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
              Wait! Don't leave without discovering NovaFarm!
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Book your free demo now and see how NovaFarm can save you time, automate your workflow, and boost your pharmacy's growth.
            </p>
          </div>

          {/* Countdown Timer Section */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-4">
                This offer expires soon – book your free demo before time runs out!
              </p>
              
              {!isExpired ? (
                <div className="flex justify-center items-center space-x-6">
                  <div className="text-center">
                    <div className="bg-red-100 text-red-700 font-bold text-2xl px-4 py-2 rounded-lg min-w-[60px]">
                      {days.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Days</div>
                  </div>
                  <div className="text-red-600 text-2xl font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-red-100 text-red-700 font-bold text-2xl px-4 py-2 rounded-lg min-w-[60px]">
                      {hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Hours</div>
                  </div>
                  <div className="text-red-600 text-2xl font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-red-100 text-red-700 font-bold text-2xl px-4 py-2 rounded-lg min-w-[60px]">
                      {minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Minutes</div>
                  </div>
                  <div className="text-red-600 text-2xl font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-red-100 text-red-700 font-bold text-2xl px-4 py-2 rounded-lg min-w-[60px]">
                      {seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Seconds</div>
                  </div>
                </div>
              ) : (
                <div className="text-red-600 font-bold text-xl">
                  Offer has expired!
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 shadow-sm max-w-4xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name and Last Name - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-left block">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Mario" {...field} className="text-sm h-12 text-left" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-left block">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Rossi" {...field} className="text-sm h-12 text-left" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email and Phone Number - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-left block">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="mario.rossi@farmacia.it" type="email" {...field} className="text-sm h-12 text-left" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-left block">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+39 123 456 7890" type="tel" {...field} className="text-sm h-12 text-left" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* VAT Number */}
                <FormField
                  control={form.control}
                  name="vatNumber"
                  rules={{ required: "VAT Number is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-left block">Company VAT Number</FormLabel>
                      <FormControl>
                        <Input placeholder="IT12345678901" {...field} className="text-sm h-12 text-left" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button with Microcopy */}
                <div className="text-center mt-8">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#078147] hover:bg-[#066139] text-white py-4 text-lg font-semibold h-14 mb-2"
                  >
                    Book a Free Demo
                  </Button>
                  <p className="text-sm text-gray-600">
                    No risk, no commitment – just a quick intro to NovaFarm.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
