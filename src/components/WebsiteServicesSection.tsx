
import { Globe, MessageCircle, Server, Wrench } from 'lucide-react';
import { ServicesPageMockup } from './WebsiteMockups';

const WebsiteServicesSection = () => {
  const features = [
    "Up to 3 custom-built landing pages",
    "Contact form for lead acquisition", 
    "Integrated live chat",
    "Hosting, maintenance, and updates included",
    "Can be linked to your existing website"
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6 leading-tight">
            Professional Web Pages to Showcase Your Pharmacy's Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We design up to 3 tailor-made web pages for your pharmacy, built to highlight your services, 
            consultations, and contact options – all optimized to generate more leads and simplify online bookings.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center mb-12 sm:mb-16">
          {/* Mockup */}
          <div className="mb-8 lg:mb-0 flex justify-center order-2 lg:order-1">
            <ServicesPageMockup />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Custom Web Pages</h3>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Professional, conversion-optimized pages that work seamlessly with your existing website 
              or as standalone landing pages for your pharmacy services.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <h4 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Each package includes:</h4>
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#078147] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#078147]/5 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-[#078147] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-black text-sm sm:text-base">Already have a website?</div>
                  <div className="text-xs sm:text-sm text-gray-600">No problem – these pages can be linked directly to it</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteServicesSection;
