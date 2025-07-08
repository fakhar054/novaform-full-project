
import { MessageCircle, Shield, BookOpen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReliabilitySection = () => {
  const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate('/book-demo');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-8 lg:mb-0 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#078147]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#078147]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-black">99.9% Uptime</h3>
                <p className="text-gray-600 text-sm sm:text-base">Reliable cloud infrastructure</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-[#078147]">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Support Available</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-[#078147]">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Happy Pharmacies</div>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#078147] rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Secure data encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#078147] rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-600">GDPR compliant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#078147] rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Regular backups</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Your Trusted Digital Assistant
            </h2>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">7-day Support</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Get help via chat and email whenever you need it</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">Stable & Secure</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Cloud infrastructure you can trust</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">Easy Onboarding</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Initial setup and video tutorials included</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">Scalable Solution</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">From solo pharmacists to large teams</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleBookDemo}
              className="bg-[#078147] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#066139] transition-colors text-sm sm:text-base"
            >
              Book a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
