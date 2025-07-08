import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, Calendar, Clock, MessageSquare, CreditCard, Shield, Globe, Star, QrCode, BarChart3, Headphones, Users, CalendarDays } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FinalCTASection from '@/components/FinalCTASection';
import WhyChooseSection from '@/components/WhyChooseSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
const Pricing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const handleBookDemo = () => {
    navigate('/book-demo');
  };
  const includedFeatures = [{
    icon: <Calendar className="w-8 h-8 text-[#078147]" />,
    title: "Online Booking Calendar",
    description: "Let patients schedule appointments online"
  }, {
    icon: <Clock className="w-8 h-8 text-[#078147]" />,
    title: "Smart Automations",
    description: "Reminders, follow-ups, and client flows on autopilot"
  }, {
    icon: <MessageSquare className="w-8 h-8 text-[#078147]" />,
    title: "Unified Inbox",
    description: "All messages in one place: WhatsApp, SMS, email"
  }, {
    icon: <CreditCard className="w-8 h-8 text-[#078147]" />,
    title: "Digital Payments",
    description: "Let customers pay online in a few clicks"
  }, {
    icon: <Shield className="w-8 h-8 text-[#078147]" />,
    title: "Secure Dashboard",
    description: "GDPR-compliant, 2FA protected"
  }, {
    icon: <Globe className="w-8 h-8 text-[#078147]" />,
    title: "Custom Pharmacy Web Page",
    description: "Professional online presence"
  }, {
    icon: <Star className="w-8 h-8 text-[#078147]" />,
    title: "Automatic Review Requests",
    description: "Collect more 5-star reviews, hands-free"
  }, {
    icon: <QrCode className="w-8 h-8 text-[#078147]" />,
    title: "QR Marketing Tools",
    description: "Engage walk-in customers with printed QR codes"
  }, {
    icon: <BarChart3 className="w-8 h-8 text-[#078147]" />,
    title: "Advanced Analytics",
    description: "Track appointments, revenue, feedback and more"
  }, {
    icon: <Headphones className="w-8 h-8 text-[#078147]" />,
    title: "Dedicated Support",
    description: "Real human help 7 days a week"
  }, {
    icon: <Users className="w-8 h-8 text-[#078147]" />,
    title: "CRM Integration",
    description: "Easily manage customer data, history, and communication"
  }, {
    icon: <CalendarDays className="w-8 h-8 text-[#078147]" />,
    title: "Social Media Calendar",
    description: "Plan and schedule posts to keep your pharmacy visible online"
  }];
  const faqs = [{
    question: "Is there a minimum contract period?",
    answer: "Yes, we require a 3-month minimum commitment to ensure you get the full value of our service and proper onboarding support."
  }, {
    question: "Can I cancel anytime?",
    answer: "Yes, after the minimum 3-month period, you can cancel anytime. There are no hidden fees or cancellation penalties."
  }, {
    question: "Do you offer training?",
    answer: "Absolutely! Every plan includes a comprehensive 1-on-1 onboarding call with our team to get you set up and comfortable with the system."
  }, {
    question: "What do I need to get started?",
    answer: "Just your pharmacy's basic details and a few minutes of your time. We handle all the technical setup and configuration for you."
  }, {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle."
  }, {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade security with 256-bit SSL encryption, regular backups, and comply with all healthcare data protection regulations."
  }];
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#f4f1ea] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 animate-fade-in mx-0 py-[20px]">
            Choose the Right Plan for Your Pharmacy
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            Simple pricing. Transparent conditions. Professional support.
          </p>
        </div>
      </section>

      {/* Pricing Table - Reusing existing component */}
      <PricingSection />

      {/* What's Included Section */}
      <section className="py-12 sm:py-16 bg-[#f4f1ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
              What's Included in Every Plan
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              All plans include these powerful features to transform your pharmacy operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {includedFeatures.map((feature, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="w-16 h-16 bg-[#078147]/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Why Choose NovaFarm - Reusing existing component */}
      <WhyChooseSection />

      {/* Testimonials - Reusing existing component */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Everything you need to know about NovaFarm
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => <Collapsible key={index} open={openFaq === index} onOpenChange={isOpen => setOpenFaq(isOpen ? index : null)}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 sm:p-6 bg-[#f4f1ea] rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <span className="font-semibold text-black text-sm sm:text-base pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>)}
          </div>
        </div>
      </section>

      {/* Final CTA - Reusing existing component */}
      <FinalCTASection />
      
      <Footer />
    </div>;
};
export default Pricing;