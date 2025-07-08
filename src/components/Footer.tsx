
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">NovaFarm</div>
            <p className="text-gray-400 mb-6 max-w-md">
              The smart appointment system for modern pharmacies. AI-powered, easy to use, and designed to grow your business.
            </p>
            <div className="text-sm text-gray-500">
              Powered by AI | NovaFarm 2025
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Accedi
                </Link>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-left">
                  Terms of Use
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <p>support@novafarm.ai</p>
              <p>+39 02 1234 5678</p>
              <p>Via Roma 123<br />20121 Milano, Italy</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 NovaFarm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
