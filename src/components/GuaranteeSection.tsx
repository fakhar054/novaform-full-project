
import { Shield, CheckCircle } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-12 bg-[#f4f1ea]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-[#078147] rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="inline-block bg-[#078147] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                30 Days • Money-Back Guarantee
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                30-Day Satisfaction Guarantee
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Try NovaFarm risk-free. If you're not satisfied within the first 30 days, 
              we'll refund you — no questions asked.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#078147]" />
                <span>No setup risks</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#078147]" />
                <span>Full refund</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#078147]" />
                <span>No questions asked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
