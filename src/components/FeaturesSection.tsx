
import { Calendar, MessageSquare, Star, BarChart3, Users, CreditCard, Zap, Headphones, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  BookingCalendarMockup,
  AutomationMockup,
  ReviewSystemMockup,
  ChatInboxMockup,
  DashboardMockup,
  PaymentMockup,
  AnalyticsMockup,
  SupportMockup
} from './FeatureMockups';

const FeaturesSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = (sectionId: string) => {
    navigate(`/features#${sectionId}`);
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const QRCodeMockup = () => (
    <div className="relative max-w-lg mx-auto">
      {/* Main container with better proportions */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 overflow-hidden">
        {/* Single focused poster mockup */}
        <div className="relative">
          {/* Poster with QR code */}
          <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-[#078147] to-[#066139] rounded-xl shadow-lg p-6 text-white">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Prenota Online</h3>
              <p className="text-sm opacity-90">Farmacia Centrale</p>
            </div>
            
            {/* Large QR Code */}
            <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-[#078147]" />
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-2">Scansiona per prenotare</p>
              <p className="text-xs opacity-75">Servizi disponibili 24/7</p>
            </div>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">QR Stats</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="font-bold text-[#078147] text-lg">247</div>
                <div className="text-gray-500">Scans</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600 text-lg">89</div>
                <div className="text-gray-500">Bookings</div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-bold text-yellow-600 text-base">36%</div>
              <div className="text-gray-500 text-xs">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const features = [
    {
      id: 1,
      sectionId: 'calendar',
      title: "Online Booking Calendar",
      description: "Let your customers book appointments 24/7 from any device, automatically syncing with your team's schedule.",
      mockup: <BookingCalendarMockup />,
      benefits: [
        "24/7 availability",
        "Works from desktop or mobile", 
        "Sync with your team's agenda"
      ],
      icon: <Calendar className="w-6 h-6 text-[#078147]" />,
      imageLeft: true
    },
    {
      id: 2,
      sectionId: 'automation',
      title: "Smart Automations",
      description: "Set-it-and-forget-it workflows that handle appointment reminders and follow-ups automatically.",
      mockup: <AutomationMockup />,
      benefits: [
        "Appointment reminders sent automatically (24h before & same day)",
        "Follow-up messages after the visit",
        "Set-it-and-forget-it workflows"
      ],
      icon: <Zap className="w-6 h-6 text-[#078147]" />,
      imageLeft: false
    },
    {
      id: 3,
      sectionId: 'qr-codes',
      title: "Boost Bookings with QR Code Posters",
      description: "We create branded QR codes that pharmacies can display in-store to promote their services. Customers can easily scan and book online appointments.",
      mockup: <QRCodeMockup />,
      benefits: [
        "QR codes link to dedicated landing pages",
        "Ready-made templates, customized to your pharmacy",
        "View scan statistics and booking conversions",
        "Works perfectly for seasonal campaigns or events"
      ],
      icon: <QrCode className="w-6 h-6 text-[#078147]" />,
      imageLeft: true
    },
    {
      id: 4,
      sectionId: 'reviews',
      title: "Review Request System",
      description: "Automatically boost your online reputation by requesting Google reviews from satisfied customers.",
      mockup: <ReviewSystemMockup />,
      benefits: [
        "Automatically ask for Google reviews",
        "Customizable templates",
        "Boost reputation effortlessly"
      ],
      icon: <Star className="w-6 h-6 text-[#078147]" />,
      imageLeft: false
    },
    {
      id: 5,
      sectionId: 'chat',
      title: "Centralized Chat",
      description: "Manage all your customer communications from Facebook, Instagram, Email & SMS in one unified inbox.",
      mockup: <ChatInboxMockup />,
      benefits: [
        "Manage FB, IG, Email & SMS from one inbox",
        "Tag & assign conversations",
        "Notifications in real-time"
      ],
      icon: <MessageSquare className="w-6 h-6 text-[#078147]" />,
      imageLeft: true
    },
    {
      id: 6,
      sectionId: 'dashboard',
      title: "Unified Dashboard & App",
      description: "Everything your team needs in one simple, intuitive interface with custom roles and permissions.",
      mockup: <DashboardMockup />,
      benefits: [
        "Everything in one place",
        "Easy for all team members",
        "Roles and permissions"
      ],
      icon: <Users className="w-6 h-6 text-[#078147]" />,
      imageLeft: false
    },
    {
      id: 7,
      sectionId: 'payments',
      title: "Online Payment Integration",
      description: "Accept secure payments at booking time to reduce no-shows and improve cash flow.",
      mockup: <PaymentMockup />,
      benefits: [
        "Let users pre-pay at booking",
        "Reduce no-shows",
        "Secure Stripe integration"
      ],
      icon: <CreditCard className="w-6 h-6 text-[#078147]" />,
      imageLeft: true
    },
    {
      id: 8,
      sectionId: 'dashboard',
      title: "Advanced Analytics & Reporting",
      description: "Track your pharmacy's performance with detailed insights, KPIs, and monthly reports.",
      mockup: <AnalyticsMockup />,
      benefits: [
        "View KPIs and trends",
        "Monthly performance reports",
        "Track leads and conversions"
      ],
      icon: <BarChart3 className="w-6 h-6 text-[#078147]" />,
      imageLeft: false
    },
    {
      id: 9,
      sectionId: 'support',
      title: "7-Day Human Support",
      description: "Get help when you need it with our dedicated support team, onboarding videos, and help center.",
      mockup: <SupportMockup />,
      benefits: [
        "Chat and email support",
        "Live assistance when needed",
        "Onboarding videos & help center"
      ],
      icon: <Headphones className="w-6 h-6 text-[#078147]" />,
      imageLeft: true
    }
  ];

  return (
    <section id="features" className="py-16 bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Everything You Need to Simplify Your Pharmacy's Operations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for modern pharmacies and para-pharmacies
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Mockup */}
              <div className={`mb-8 lg:mb-0 ${feature.imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex justify-center">
                  {feature.mockup}
                </div>
              </div>

              {/* Content */}
              <div className={feature.imageLeft ? 'lg:order-2' : 'lg:order-1'}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black">{feature.title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3 mb-8">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#078147] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleLearnMore(feature.sectionId)}
                  className="bg-[#078147] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#066139] transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
