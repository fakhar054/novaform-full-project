
import { Mail, MessageCircle, FileText, Send } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-[#078147]" />,
      title: "Email",
      description: "Send us an email and we'll respond within 2 hours",
      detail: "support@novafarm.it"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#078147]" />,
      title: "Website Chat",
      description: "Chat with our support team in real-time",
      detail: "Available 7 days a week"
    },
    {
      icon: <FileText className="w-6 h-6 text-[#078147]" />,
      title: "Contact Form",
      description: "Fill out the form and we'll get back to you quickly",
      detail: "Use the form on the right"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-20 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left Column - Contact Info */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                Need help? Let's talk.
              </h1>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                We're here 7 days a week. Choose the method that suits you best.
              </p>

              <div className="space-y-8">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        {method.description}
                      </p>
                      <p className="text-[#078147] font-medium">
                        {method.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="mt-12 lg:mt-0">
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-6">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#078147] focus:border-transparent transition-colors resize-vertical"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#078147] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#066139] transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
