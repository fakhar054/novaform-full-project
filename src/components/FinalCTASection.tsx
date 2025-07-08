
import { useNavigate } from 'react-router-dom';

const FinalCTASection = () => {
  const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate('/book-demo');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#078147] to-[#066139] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
          Ready to Upgrade Your Pharmacy's Booking System?
        </h2>
        <p className="text-xl md:text-2xl mb-10 text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Let NovaFarm work for you. Simple to set up. Easy to use. AI-powered.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Free demo call</span>
          </div>
          <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>No commitment</span>
          </div>
          <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Quick setup</span>
          </div>
        </div>
        
        <button 
          onClick={handleBookDemo}
          className="bg-white text-[#078147] px-12 py-4 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-xl animate-fade-in" 
          style={{ animationDelay: '0.6s' }}
        >
          Book a Call
        </button>
        
        <p className="mt-6 text-gray-200 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Join 500+ pharmacies already using NovaFarm
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
