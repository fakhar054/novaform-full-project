
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marco R.",
      role: "Pharmacy Owner",
      content: "NovaFarm transformed our appointment system. No more calls, just results.",
      rating: 5
    },
    {
      name: "Silvia T.",
      role: "Pharmacist",
      content: "The review follow-ups helped us get over 50 new Google reviews in 2 months.",
      rating: 5
    },
    {
      name: "Giuseppe M.",
      role: "Para-pharmacy Manager",
      content: "Finally, a system that actually works for our team. Simple and effective.",
      rating: 5
    },
    {
      name: "Francesca L.",
      role: "Pharmacy Director",
      content: "Customer satisfaction increased by 40% since we started using NovaFarm.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4 leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Join hundreds of satisfied pharmacy owners who trust NovaFarm
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div>
                <div className="font-semibold text-black text-sm sm:text-base">{testimonial.name}</div>
                <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-black font-semibold text-sm sm:text-base">4.9/5</span>
            <span className="text-gray-600 text-sm sm:text-base">from 200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
