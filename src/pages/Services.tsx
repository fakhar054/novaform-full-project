
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  TestTube, 
  Scale, 
  Apple, 
  Shield, 
  Microscope, 
  Pill,
  Syringe,
  UserCheck,
  Droplets,
  Brain,
  Moon,
  User,
  Scissors,
  Clock,
  MapPin,
  Smartphone,
  CreditCard,
  Recycle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Services = () => {
  const checkupServices = [
    {
      icon: <Activity className="w-8 h-8 text-[#078147]" />,
      title: "24h / 48h Blood Pressure Holter",
      description: "A non-invasive test that monitors blood pressure over 24 or 48 hours via a portable device. Useful for a full day/night evaluation."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#078147]" />,
      title: "24h / 48h Heart Holter (ECG Holter)",
      description: "Detects any heart rhythm issues over 24/48h using a small chest-worn recorder. Useful for palpitations or suspected arrhythmias."
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-[#078147]" />,
      title: "Electrocardiogram (ECG)",
      description: "A fast and safe heart check to measure electrical activity. Recommended for prevention or in case of fatigue or chest discomfort."
    },
    {
      icon: <TestTube className="w-8 h-8 text-[#078147]" />,
      title: "Blood Test – Lipid Profile",
      description: "Quick test (finger prick) for cholesterol, HDL, LDL, triglycerides, and glucose. Results in minutes."
    },
    {
      icon: <Scale className="w-8 h-8 text-[#078147]" />,
      title: "Bioimpedance Analysis (BIA)",
      description: "Measures body composition: fat, muscle, hydration. Ideal for weight loss tracking, fitness or wellness monitoring."
    },
    {
      icon: <Apple className="w-8 h-8 text-[#078147]" />,
      title: "Food Intolerance Test",
      description: "Capillary test that screens up to 90 foods to identify potential intolerances."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#078147]" />,
      title: "Allergy Test (IgE Specific)",
      description: "Rapid screening for common allergens (pollens, foods, dust mites, etc.) by measuring specific IgE antibodies."
    },
    {
      icon: <Microscope className="w-8 h-8 text-[#078147]" />,
      title: "Gut Wellness Test",
      description: "Evaluates intestinal microbiota balance, inflammation, and permeability. Based on stool and/or urine samples."
    },
    {
      icon: <TestTube className="w-8 h-8 text-[#078147]" />,
      title: "Helicobacter Pylori Test",
      description: "Detects H. pylori bacteria, often linked to gastritis. Stool sample required. No prep needed."
    },
    {
      icon: <Pill className="w-8 h-8 text-[#078147]" />,
      title: "Gluten Sensitivity & Celiac Test",
      description: "Two quick capillary tests to detect gluten sensitivity or genetic predisposition to celiac disease."
    },
    {
      icon: <Activity className="w-8 h-8 text-[#078147]" />,
      title: "Thyroid Hormones Test (TSH, FT3, FT4)",
      description: "Simple blood test to check thyroid function. Ideal for fatigue, weight fluctuation, or sleep issues."
    },
    {
      icon: <User className="w-8 h-8 text-[#078147]" />,
      title: "Menopause Hormone Test",
      description: "Saliva test for estradiol, progesterone, and other female hormones. Detects early signs of menopause."
    },
    {
      icon: <Brain className="w-8 h-8 text-[#078147]" />,
      title: "Stress Profile Test (Cortisol, others)",
      description: "Saliva test measuring cortisol and stress-related hormones. Useful in chronic fatigue, insomnia, anxiety."
    },
    {
      icon: <Droplets className="w-8 h-8 text-[#078147]" />,
      title: "Blood Type and Rh Factor",
      description: "Fast and painless test to identify blood type and Rh factor – useful in many medical situations."
    }
  ];

  const consultationServices = [
    {
      icon: <Scissors className="w-8 h-8 text-[#078147]" />,
      title: "Trichology Consultation",
      description: "Scalp analysis using a micro-camera to detect issues like seborrhea, dandruff, thinning. Includes tailored treatment advice."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-[#078147]" />,
      title: "Cosmetic Consultation",
      description: "Meet with a skincare expert to receive personalized advice for face/body treatments and daily routines."
    },
    {
      icon: <Apple className="w-8 h-8 text-[#078147]" />,
      title: "Nutritional Consultation",
      description: "Session with a nutritionist to develop a tailored diet plan – for weight loss, sports or lifestyle improvement."
    }
  ];

  const pharmacyServices = [
    {
      icon: <Syringe className="w-8 h-8 text-[#078147]" />,
      title: "In-Pharmacy Vaccinations",
      description: "Seasonal and authorized vaccines administered by qualified personnel in a safe environment."
    },
    {
      icon: <TestTube className="w-8 h-8 text-[#078147]" />,
      title: "Rapid COVID-19 Antigen Tests",
      description: "Fast SARS-CoV-2 screening for travel, work or personal needs. Results in minutes."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-[#078147]" />,
      title: "Skin Analysis",
      description: "In-depth skin check with dermatological tools. Useful for dryness, impurities or sensitivity."
    },
    {
      icon: <Scissors className="w-8 h-8 text-[#078147]" />,
      title: "Ear Lobe Piercing",
      description: "Hygienic ear piercing service using single-use systems and sterile earrings. Suitable for kids (with consent)."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#078147]" />,
      title: "Blood Pressure Measurement",
      description: "Quick and accurate blood pressure checks – key to cardiovascular prevention."
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-[#078147]" />,
      title: "Medical Device Rental",
      description: "Rental service for breast pumps, neonatal scales, crutches, aerosol machines, magnet therapy, etc."
    },
    {
      icon: <Activity className="w-8 h-8 text-[#078147]" />,
      title: "Crutch Rental",
      description: "Ergonomic crutches available for short- or long-term rental with adjustable height."
    },
    {
      icon: <Clock className="w-8 h-8 text-[#078147]" />,
      title: "CUP Healthcare Booking",
      description: "Book public healthcare appointments (visits, exams) via our pharmacy."
    },
    {
      icon: <TestTube className="w-8 h-8 text-[#078147]" />,
      title: "Sample Collection for Labs",
      description: "We collect biological samples (urine, stool, etc.) for certified partner labs."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#078147]" />,
      title: "Online Report Retrieval",
      description: "Get your test results via email or directly at the pharmacy."
    },
    {
      icon: <Scale className="w-8 h-8 text-[#078147]" />,
      title: "Weight and Height Check",
      description: "Digital measurement tools available in-store for tracking your body stats."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#078147]" />,
      title: "Early Childhood Care",
      description: "Advice and products for babies and children – from diapers to sensitive skincare."
    },
    {
      icon: <Pill className="w-8 h-8 text-[#078147]" />,
      title: "Supplement Consultation",
      description: "Personalized advice to choose the right supplements for health, energy or sports."
    },
    {
      icon: <Recycle className="w-8 h-8 text-[#078147]" />,
      title: "Expired Medicine Disposal",
      description: "Return unused or expired medicine for eco-friendly disposal, following current regulations."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#078147]" />,
      title: "WhatsApp Support",
      description: "Contact us via WhatsApp to ask for products, book services, or get quick advice."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[#078147]" />,
      title: "Loyalty Card Program",
      description: "Earn points and get exclusive discounts. Ask in-store to activate your card."
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <Header />
      
      {/* Page Header */}
      <section className="pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore all the check-ups, consultations, and pharmaceutical services we offer in pharmacy – and book directly online.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-4">
            <button 
              onClick={() => scrollToSection('checkups')}
              className="text-sm font-medium text-gray-600 hover:text-[#078147] transition-colors"
            >
              Check-Ups
            </button>
            <button 
              onClick={() => scrollToSection('consultations')}
              className="text-sm font-medium text-gray-600 hover:text-[#078147] transition-colors"
            >
              Consultations
            </button>
            <button 
              onClick={() => scrollToSection('pharmacy')}
              className="text-sm font-medium text-gray-600 hover:text-[#078147] transition-colors"
            >
              Pharmacy Services
            </button>
          </div>
        </div>
      </section>

      {/* Check-ups & Self-Tests Section */}
      <section id="checkups" className="py-16 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Check-ups & Self-Tests
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quick, safe and certified tests for your health and prevention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkupServices.map((service, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    {service.icon}
                    <CardTitle className="text-lg font-semibold text-black">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button 
                    className="w-full bg-[#078147] hover:bg-[#066139] text-white"
                    size="sm"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultations Section */}
      <section id="consultations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Specialist Consultations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Personalised advice for your skin, hair, nutrition and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {consultationServices.map((service, index) => (
              <Card key={index} className="bg-[#F8F6F3] hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    {service.icon}
                    <CardTitle className="text-lg font-semibold text-black">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button 
                    className="w-full bg-[#078147] hover:bg-[#066139] text-white"
                    size="sm"
                  >
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pharmaceutical Services Section */}
      <section id="pharmacy" className="py-16 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              In-Pharmacy Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Safe and certified services provided directly in our pharmacy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacyServices.map((service, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    {service.icon}
                    <CardTitle className="text-lg font-semibold text-black">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#078147] text-[#078147] hover:bg-[#078147] hover:text-white"
                    size="sm"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Book Your Service?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to schedule your appointment or learn more about our comprehensive healthcare services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#078147] hover:bg-[#066139] text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/book-demo'}
            >
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              className="border-[#078147] text-[#078147] hover:bg-[#078147] hover:text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
