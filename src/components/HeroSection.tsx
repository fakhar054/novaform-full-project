import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate('/book-demo');
  };

  return (
    <section id="home" className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              The Smart Appointment System for
              <span className="text-[#078147]"> Modern Pharmacies</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              NovaFarm helps you automate bookings, improve customer service, and grow your pharmacy with ease.
            </p>
            <button 
              onClick={handleBookDemo}
              className="bg-[#078147] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#066139] transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Book a Free Demo Call
            </button>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-br from-[#078147]/10 to-[#f4f1ea] rounded-2xl p-6">
              {/* NovaFarm Dashboard Mockup - GoHighLevel Style */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">app.novafarm.com</div>
                  <div className="w-16"></div>
                </div>

                {/* Main Dashboard Layout */}
                <div className="flex h-96">
                  {/* Left Sidebar */}
                  <div className="w-16 bg-black flex flex-col items-center py-4 space-y-4">
                    {/* NovaFarm Logo */}
                    <div className="w-8 h-8 bg-[#078147] rounded-lg flex items-center justify-center mb-2">
                      <span className="text-white font-bold text-xs">NF</span>
                    </div>
                    
                    {/* Navigation Icons */}
                    <div className="w-8 h-8 bg-[#078147] rounded-lg flex items-center justify-center">
                      <span className="text-xs">📊</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-xs">📅</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-xs">👥</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-xs">💬</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-xs">⭐</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-xs">🤖</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-xs">⚙️</span>
                    </div>
                  </div>

                  {/* Secondary Sidebar - Conversations */}
                  <div className="w-48 bg-[#f4f1ea] border-r border-gray-200">
                    <div className="p-3 border-b border-gray-200">
                      <div className="text-sm font-semibold text-black mb-2">Messaggi</div>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Cerca..." 
                          className="w-full text-xs px-2 py-1 border border-gray-300 rounded bg-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1 p-2">
                      {/* Conversation Items */}
                      <div className="bg-[#078147]/10 p-2 rounded border border-[#078147]/20">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">MC</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-black">Maria Colombo</div>
                            <div className="text-xs text-gray-600">9:15</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-700">Buongiorno, vorrei prenotare...</div>
                      </div>

                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">LB</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-black">Luca Bianchi</div>
                            <div className="text-xs text-gray-600">8:42</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-700">Grazie per la consulenza di ieri</div>
                      </div>

                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">AS</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-black">Anna Santoro</div>
                            <div className="text-xs text-gray-600">Ieri</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-700">Info sui vaccini antinfluenzali</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area - Chat/Email Interface */}
                  <div className="flex-1 bg-white flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">MC</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-black">Maria Colombo</div>
                          <div className="text-xs text-gray-600">+39 346 123 4567</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-xs bg-[#078147] text-white px-2 py-1 rounded">📞</button>
                        <button className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">📧</button>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                          <div className="text-xs text-gray-800">Buongiorno! Vorrei prenotare una consulenza farmaceutica per domani mattina. Avete disponibilità?</div>
                          <div className="text-xs text-gray-500 mt-1">9:15</div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#078147] p-2 rounded-lg max-w-xs">
                          <div className="text-xs text-white">Ciao Maria! Sì, abbiamo disponibilità domani alle 10:30. Ti va bene?</div>
                          <div className="text-xs text-green-100 mt-1">9:17</div>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                          <div className="text-xs text-gray-800">Perfetto! Posso confermare l'appuntamento?</div>
                          <div className="text-xs text-gray-500 mt-1">9:18</div>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-3 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <input 
                          type="text" 
                          placeholder="Scrivi un messaggio..." 
                          className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <button className="bg-[#078147] text-white px-3 py-2 rounded-lg text-xs">📤</button>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Contact Info */}
                  <div className="w-48 bg-[#f4f1ea] border-l border-gray-200 p-3">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-lg">MC</span>
                      </div>
                      <div className="text-sm font-medium text-black">Maria Colombo</div>
                      <div className="text-xs text-gray-600">Cliente</div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="text-xs font-medium text-black mb-1">Prossimo Appuntamento</div>
                        <div className="text-xs text-gray-600">Dom 15 Dic, 10:30</div>
                        <div className="text-xs text-[#078147]">Consulenza farmaceutica</div>
                      </div>

                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="text-xs font-medium text-black mb-1">Contatto</div>
                        <div className="text-xs text-gray-600">+39 346 123 4567</div>
                        <div className="text-xs text-gray-600">m.colombo@email.com</div>
                      </div>

                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="text-xs font-medium text-black mb-1">Tags</div>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs bg-[#078147]/10 text-[#078147] px-2 py-1 rounded">Cliente attivo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
