
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Check } from 'lucide-react';
import Header from '@/components/Header';

interface BookDemoFormData {
  firstName: string;
  lastName: string;
  email: string;
  vatNumber: string;
  usagePlan: string;
  problemToSolve: string;
}

const BookDemo = () => {
  const form = useForm<BookDemoFormData>();

  const onSubmit = (data: BookDemoFormData) => {
    console.log('Demo booking form submitted:', data);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left 50% - Contact Form */}
            <div className="w-full order-2 lg:order-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 leading-tight">
                  Book Your Free <span className="text-[#078147]">NovaFarm Demo</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Discover how NovaFarm can transform your pharmacy operations in just 30 minutes.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    {/* First Name and Last Name - Side by Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Mario" {...field} className="h-10 sm:h-12" />
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
                            <FormLabel className="text-sm sm:text-base">Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Rossi" {...field} className="h-10 sm:h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Email */}
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
                          <FormLabel className="text-sm sm:text-base">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="mario.rossi@farmacia.it" type="email" {...field} className="h-10 sm:h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* VAT Number */}
                    <FormField
                      control={form.control}
                      name="vatNumber"
                      rules={{ required: "VAT Number is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Company VAT Number</FormLabel>
                          <FormControl>
                            <Input placeholder="IT12345678901" {...field} className="h-10 sm:h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Usage Plan Dropdown */}
                    <FormField
                      control={form.control}
                      name="usagePlan"
                      rules={{ required: "Please select how you plan to use NovaFarm" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">How do you plan to use NovaFarm?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-10 sm:h-12">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                              <SelectItem value="appointment-booking">For appointment booking only</SelectItem>
                              <SelectItem value="marketing-reviews">For marketing and reviews</SelectItem>
                              <SelectItem value="centralize-operations">To centralize all pharmacy operations</SelectItem>
                              <SelectItem value="not-sure">Not sure yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Problem to Solve Dropdown */}
                    <FormField
                      control={form.control}
                      name="problemToSolve"
                      rules={{ required: "Please select what problem you're hoping to solve" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">What problem are you hoping NovaFarm will solve?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-10 sm:h-12">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                              <SelectItem value="reduce-phone-calls">Reduce phone calls for appointments</SelectItem>
                              <SelectItem value="more-reviews">Get more customer reviews</SelectItem>
                              <SelectItem value="automate-followups">Automate follow-ups and reminders</SelectItem>
                              <SelectItem value="team-communication">Simplify team communication</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-[#078147] hover:bg-[#066139] text-white py-3 sm:py-4 text-base sm:text-lg font-semibold h-12 sm:h-14"
                    >
                      Book My Free Demo
                    </Button>
                  </form>
                </Form>

                {/* Reassuring Note */}
                <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4 px-2">
                  We'll get back to you within 24 hours to schedule your personalized demo. No obligation – just clarity.
                </p>
              </div>
            </div>

            {/* Right 50% - Textual Content */}
            <div className="w-full order-1 lg:order-2">
              <div className="bg-white p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6 leading-tight">
                  Why book a demo with NovaFarm?
                </h2>
                
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  See firsthand how NovaFarm can streamline your pharmacy operations, boost customer engagement, and save you hours every week. Our personalized demo will show you exactly how our platform fits your specific needs.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#078147] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">Save hours with smart automations</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#078147] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">Boost appointment requests and client engagement</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#078147] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">Eliminate no-shows with automatic reminders</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#078147] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">Centralize messaging across SMS, email, and social</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#078147] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">Monitor everything from one intuitive dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemo;
