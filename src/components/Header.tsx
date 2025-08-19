import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage first
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const handleFeaturesClick = () => {
    navigate("/features");
    setIsMenuOpen(false);
  };

  const handleServicesClick = () => {
    navigate("/services");
    setIsMenuOpen(false);
  };

  const handleBookDemo = () => {
    navigate("/book-demo");
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="text-xl sm:text-2xl font-bold text-black hover:text-[#078147] transition-colors"
            >
              {/* NovaFarm */}
              <img
                src="images/logo_without_bg.png"
                alt="novalogo"
                className="w-20 h-auto md:w-28"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm xl:text-base text-black hover:text-[#078147] transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={handleFeaturesClick}
              className="text-sm xl:text-base text-black hover:text-[#078147] transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={handleServicesClick}
              className="text-sm xl:text-base text-black hover:text-[#078147] transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm xl:text-base text-black hover:text-[#078147] transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm xl:text-base text-black hover:text-[#078147] transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Section with CTA */}
          <div className="hidden lg:flex items-center">
            {/* CTA Button */}
            <button
              onClick={handleBookDemo}
              className="bg-[#078147] text-white px-4 xl:px-6 py-2 rounded-lg text-sm xl:text-base font-semibold hover:bg-[#066139] transition-colors animate-pulse-slow"
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("home")}
                className="text-base text-black hover:text-[#078147] transition-colors text-left py-2 px-2 hover:bg-gray-50 rounded-md font-medium"
              >
                Home
              </button>
              <button
                onClick={handleFeaturesClick}
                className="text-base text-black hover:text-[#078147] transition-colors text-left py-2 px-2 hover:bg-gray-50 rounded-md font-medium"
              >
                Features
              </button>
              <button
                onClick={handleServicesClick}
                className="text-base text-black hover:text-[#078147] transition-colors text-left py-2 px-2 hover:bg-gray-50 rounded-md font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-base text-black hover:text-[#078147] transition-colors text-left py-2 px-2 hover:bg-gray-50 rounded-md font-medium"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-base text-black hover:text-[#078147] transition-colors text-left py-2 px-2 hover:bg-gray-50 rounded-md font-medium"
              >
                Contact
              </button>

              {/* Mobile CTA Button */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={handleBookDemo}
                  className="w-full bg-[#078147] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#066139] transition-colors text-center animate-pulse-slow"
                >
                  Book a Call
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
