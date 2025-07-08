
import { Shield, Clock, TrendingUp, Users, Star, Zap } from 'lucide-react';

const WhyChooseSection = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-[#078147]" />,
      title: "Save Time with Automation",
      description: "Automate appointment reminders, follow-ups, and routine tasks to focus on what matters most."
    },
    {
      icon: <Users className="w-8 h-8 text-[#078147]" />,
      title: "Centralize Operations",
      description: "Manage appointments, communications, and client data from one unified platform."
    },
    {
      icon: <Star className="w-8 h-8 text-[#078147]" />,
      title: "Improve Client Retention",
      description: "Automated follow-ups and review requests help build stronger relationships with your clients."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#078147]" />,
      title: "Increase Revenue",
      description: "Reduce no-shows with reminders and accept online payments to improve cash flow."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#078147]" />,
      title: "Built for Pharmacies",
      description: "Designed specifically for pharmacies and para-pharmacies with industry-specific features."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#078147]" />,
      title: "Quick Setup & Support",
      description: "Get started in minutes with our onboarding process and dedicated 7-day support."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Why Choose NovaFarm?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of pharmacies that have transformed their operations with NovaFarm's comprehensive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#078147]/10 rounded-lg flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
