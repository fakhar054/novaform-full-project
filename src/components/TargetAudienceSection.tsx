
import { Building2, Stethoscope, Users, Microscope } from 'lucide-react';

const TargetAudienceSection = () => {
  const audiences = [
    {
      icon: <Building2 className="w-8 h-8 text-[#078147]" />,
      title: "Local Pharmacies",
      description: "Independent pharmacies looking to modernize their appointment booking and client communication systems."
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-[#078147]" />,
      title: "Para-pharmacies",
      description: "Health and wellness centers offering specialized services like consultations, beauty treatments, and health screenings."
    },
    {
      icon: <Users className="w-8 h-8 text-[#078147]" />,
      title: "Pharmacy Chains",
      description: "Multi-location pharmacy groups needing centralized management with individual branch customization."
    },
    {
      icon: <Microscope className="w-8 h-8 text-[#078147]" />,
      title: "Healthcare Consultants",
      description: "Independent healthcare professionals and labs offering appointment-based services to clients."
    }
  ];

  return (
    <section className="py-16 bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Perfect for Every Type of Pharmacy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            NovaFarm adapts to your specific needs, whether you're a single location or managing multiple branches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {audience.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#078147] max-w-2xl mx-auto">
            <p className="text-gray-700 font-medium">
              <span className="text-[#078147] font-bold">Ready to get started?</span> Our team will help you customize NovaFarm to fit your pharmacy's unique workflow and requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
