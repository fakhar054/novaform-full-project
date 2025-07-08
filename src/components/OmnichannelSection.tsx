import { MessageCircle, Mail, Instagram } from "lucide-react";

const OmnichannelSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Talk to Your Clients Where They Are
            </h2>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">
                    Integrated Messaging
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Connect across Facebook, Instagram, Email, and SMS
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">
                    Centralized Chat Inbox
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    All conversations in one simple app
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#078147]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1 sm:mb-2 text-base sm:text-lg">
                    Real-time Notifications
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Never miss a customer message again
                  </p>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-[#078147]/5 rounded-lg border-l-4 border-[#078147]">
                <p className="text-black font-medium text-sm sm:text-base leading-relaxed">
                  Improve your customer support and retention with seamless
                  communication.
                </p>
              </div>
            </div>
            <button className="bg-[#078147] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#066139] transition-colors text-sm sm:text-base">
              Book a Call
            </button>
          </div>

          <div className="mt-8 lg:mt-0">
            <img src="/images/messages.png" alt="messages" />

            {/* <div className="bg-gradient-to-br from-[#078147]/10 to-[#f4f1ea] rounded-2xl p-4 sm:p-6 lg:p-8">
              <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="font-semibold text-black text-base sm:text-lg">Messages</h3>
                  <span className="bg-[#078147] text-white text-xs px-2 py-1 rounded-full">3 new</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { platform: "Facebook", name: "Maria R.", message: "Is the pharmacy open today?", time: "2m ago", color: "bg-blue-500" },
                    { platform: "Instagram", name: "Luca_B", message: "Do you have the vaccine available?", time: "5m ago", color: "bg-pink-500" },
                    { platform: "Email", name: "Anna Verdi", message: "Thank you for the consultation", time: "1h ago", color: "bg-gray-500" }
                  ].map((msg, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 ${msg.color} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {msg.platform.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-black text-xs sm:text-sm truncate">{msg.name}</span>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{msg.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OmnichannelSection;
