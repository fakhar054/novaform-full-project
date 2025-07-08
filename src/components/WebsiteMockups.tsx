
import { Globe, MessageCircle, MapPin, Clock, Phone, Mail } from 'lucide-react';

export const ServicesPageMockup = () => (
  <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg mx-auto">
    <div className="mb-4">
      <div className="h-6 bg-gray-100 rounded mb-4 flex items-center px-3">
        <Globe className="w-3 h-3 text-gray-400 mr-2" />
        <span className="text-xs text-gray-400">farmacia-rossi.it/services</span>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-black mb-2">Our Professional Services</h3>
        <p className="text-gray-600 text-sm">Expert consultations and personalized care for your health needs</p>
      </div>
      
      {/* Service grid - top row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <div className="w-8 h-8 bg-[#078147]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-sm">💊</span>
          </div>
          <div className="font-medium text-xs mb-1">Medication Review</div>
          <div className="text-xs text-gray-600 mb-2">Expert prescription advice</div>
          <button className="bg-[#078147] text-white px-2 py-1 rounded text-xs w-full">Book Now</button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <div className="w-8 h-8 bg-[#078147]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-sm">🩺</span>
          </div>
          <div className="font-medium text-xs mb-1">Health Screening</div>
          <div className="text-xs text-gray-600 mb-2">Blood pressure monitoring</div>
          <button className="bg-[#078147] text-white px-2 py-1 rounded text-xs w-full">Book Now</button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <div className="w-8 h-8 bg-[#078147]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-sm">💉</span>
          </div>
          <div className="font-medium text-xs mb-1">Vaccination</div>
          <div className="text-xs text-gray-600 mb-2">Flu shots & travel vaccines</div>
          <button className="bg-[#078147] text-white px-2 py-1 rounded text-xs w-full">Book Now</button>
        </div>
      </div>
      
      {/* Featured service with image and text layout */}
      <div className="border border-[#078147]/20 rounded-lg p-4 bg-[#078147]/5">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <h4 className="text-sm font-bold text-black mb-2">Specialized Consultations</h4>
            <p className="text-xs text-gray-600 mb-3">Get personalized advice from our expert pharmacists on medication management and wellness planning.</p>
            <div className="space-y-1 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-[#078147] rounded-full"></div>
                <span className="text-xs text-gray-700">One-on-one consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-[#078147] rounded-full"></div>
                <span className="text-xs text-gray-700">Detailed health assessment</span>
              </div>
            </div>
            <button className="bg-[#078147] text-white px-3 py-2 rounded-lg text-xs font-medium">
              Schedule Consultation
            </button>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="w-full h-20 bg-gradient-to-br from-[#078147]/10 to-[#078147]/5 rounded-lg flex items-center justify-center mb-2">
              <div className="text-center">
                <div className="w-10 h-10 bg-[#078147] rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-sm text-white">👩‍⚕️</span>
                </div>
                <div className="text-xs text-gray-600">Expert Pharmacist</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-black">Dr. Maria Rossi</div>
              <div className="text-xs text-gray-600">15+ years experience</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#078147]/5 p-3 rounded-lg text-center">
        <div className="text-xs text-[#078147] font-medium">
          📞 Book online or call (055) 123-4567
        </div>
        <div className="text-xs text-gray-600 mt-1">Available Mon-Fri 8:30-19:30, Sat 8:30-13:00</div>
      </div>
    </div>
  </div>
);
