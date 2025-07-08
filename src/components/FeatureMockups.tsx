import {
  Calendar,
  MessageCircle,
  Star,
  BarChart3,
  Users,
  CreditCard,
  Zap,
  Headphones,
} from "lucide-react";

export const BookingCalendarMockup = () => (
  // <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
  //   <div className="flex items-center justify-between mb-4">
  //     <h3 className="font-semibold text-gray-800">November 2024</h3>
  //     <Calendar className="w-5 h-5 text-[#078147]" />
  //   </div>
  //   <div className="grid grid-cols-7 gap-1 mb-4 text-xs text-gray-500">
  //     {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
  //       <div key={day} className="text-center p-1">
  //         {day}
  //       </div>
  //     ))}
  //   </div>
  //   <div className="grid grid-cols-7 gap-1">
  //     {Array.from({ length: 35 }, (_, i) => {
  //       const day = i - 4;
  //       const isToday = day === 15;
  //       const hasAppointment = [12, 15, 18, 22].includes(day);
  //       return (
  //         <div
  //           key={i}
  //           className={`
  //           text-center p-2 text-xs rounded
  //           ${day <= 0 ? "text-gray-300" : "text-gray-700"}
  //           ${isToday ? "bg-[#078147] text-white" : ""}
  //           ${
  //             hasAppointment && !isToday
  //               ? "bg-[#078147]/10 text-[#078147] font-medium"
  //               : ""
  //           }
  //         `}
  //         >
  //           {day > 0 ? day : ""}
  //         </div>
  //       );
  //     })}
  //   </div>
  //   <div className="mt-4 space-y-2">
  //     <div className="flex items-center justify-between p-2 bg-[#078147]/5 rounded">
  //       <span className="text-xs text-gray-600">09:00 - Maria Rossi</span>
  //       <span className="text-xs text-[#078147]">Confirmed</span>
  //     </div>
  //     <div className="flex items-center justify-between p-2 bg-[#078147]/5 rounded">
  //       <span className="text-xs text-gray-600">14:30 - Luca Bianchi</span>
  //       <span className="text-xs text-[#078147]">Pending</span>
  //     </div>
  //   </div>
  // </div>
  // <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
  <div className="calender_div max-w-md mx-auto">
    <img src="/images/calender.png" className="w-[70] h-auto mx-auto" />
  </div>
);

export const AutomationMockup = () => (
  <img src="/images/automation_workflow.png" alt="" />
  // <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
  //   <div className="flex items-center justify-between mb-4">
  //     <h3 className="font-semibold text-gray-800">Automation Flow</h3>
  //     <Zap className="w-5 h-5 text-[#078147]" />
  //   </div>
  //   <div className="space-y-4">
  //     <div className="flex items-center space-x-3">
  //       <div className="w-8 h-8 bg-[#078147] rounded-full flex items-center justify-center text-white text-xs">
  //         1
  //       </div>
  //       <div className="flex-1">
  //         <div className="text-sm font-medium">Appointment Booked</div>
  //         <div className="text-xs text-gray-500">
  //           Trigger: New booking confirmed
  //         </div>
  //       </div>
  //     </div>
  //     <div className="ml-4 border-l-2 border-[#078147]/20 pl-4 py-2">
  //       <div className="flex items-center space-x-3">
  //         <div className="w-8 h-8 bg-[#078147]/20 rounded-full flex items-center justify-center text-[#078147] text-xs">
  //           2
  //         </div>
  //         <div className="flex-1">
  //           <div className="text-sm font-medium">24h Reminder</div>
  //           <div className="text-xs text-gray-500">
  //             SMS: "Hi Maria, reminder for tomorrow 09:00"
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="ml-4 border-l-2 border-[#078147]/20 pl-4 py-2">
  //       <div className="flex items-center space-x-3">
  //         <div className="w-8 h-8 bg-[#078147]/20 rounded-full flex items-center justify-center text-[#078147] text-xs">
  //           3
  //         </div>
  //         <div className="flex-1">
  //           <div className="text-sm font-medium">Same Day Reminder</div>
  //           <div className="text-xs text-gray-500">
  //             Email: "Your appointment is in 2 hours"
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="ml-4 border-l-2 border-[#078147]/20 pl-4 py-2">
  //       <div className="flex items-center space-x-3">
  //         <div className="w-8 h-8 bg-[#078147] rounded-full flex items-center justify-center text-white text-xs">
  //           4
  //         </div>
  //         <div className="flex-1">
  //           <div className="text-sm font-medium">Follow-up Review</div>
  //           <div className="text-xs text-gray-500">
  //             24h after: "How was your visit? Leave a review"
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
);

export const ReviewSystemMockup = () => (
  <img src="/images/review_img.png" alt="" />
  // <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
  //   <div className="flex items-center justify-between mb-4">
  //     <h3 className="font-semibold text-gray-800">Review Request</h3>
  //     <Star className="w-5 h-5 text-[#078147]" />
  //   </div>
  //   <div className="bg-gradient-to-br from-[#078147]/10 to-[#078147]/5 rounded-lg p-4 mb-4">
  //     <div className="text-center">
  //       <div className="text-lg font-medium mb-2">How was your visit?</div>
  //       <div className="flex justify-center space-x-1 mb-3">
  //         {[1, 2, 3, 4, 5].map((star) => (
  //           <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
  //         ))}
  //       </div>
  //       <button className="bg-[#078147] text-white px-4 py-2 rounded-lg text-sm font-medium">
  //         Leave Google Review
  //       </button>
  //     </div>
  //   </div>
  //   <div className="space-y-3">
  //     <div className="text-xs text-gray-600 font-medium">Recent Reviews</div>
  //     <div className="bg-gray-50 rounded-lg p-3">
  //       <div className="flex items-center justify-between mb-1">
  //         <span className="text-sm font-medium">Maria R.</span>
  //         <div className="flex space-x-1">
  //           {[1, 2, 3, 4, 5].map((star) => (
  //             <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
  //           ))}
  //         </div>
  //       </div>
  //       <p className="text-xs text-gray-600">"Excellent service and very professional staff!"</p>
  //     </div>
  //   </div>
  // </div>
);

export const ChatInboxMockup = () => (
  <img src="/images/unidentified_messages.png" alt="" />

  // <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
  //   <div className="flex items-center justify-between mb-4">
  //     <h3 className="font-semibold text-gray-800">Unified Inbox</h3>
  //     <MessageCircle className="w-5 h-5 text-[#078147]" />
  //   </div>
  //   <div className="space-y-3">
  //     <div className="flex items-center space-x-3 p-3 bg-[#078147]/5 rounded-lg border-l-4 border-[#078147]">
  //       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
  //         FB
  //       </div>
  //       <div className="flex-1">
  //         <div className="flex items-center justify-between">
  //           <span className="font-medium text-sm">Marco_85</span>
  //           <span className="text-xs text-gray-500">2m ago</span>
  //         </div>
  //         <p className="text-sm text-gray-600">Is the pharmacy open today?</p>
  //       </div>
  //     </div>
  //     <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
  //       <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
  //         IG
  //       </div>
  //       <div className="flex-1">
  //         <div className="flex items-center justify-between">
  //           <span className="font-medium text-sm">anna_wellness</span>
  //           <span className="text-xs text-gray-500">5m ago</span>
  //         </div>
  //         <p className="text-sm text-gray-600">
  //           Do you have supplements in stock?
  //         </p>
  //       </div>
  //     </div>
  //     <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
  //       <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
  //         @
  //       </div>
  //       <div className="flex-1">
  //         <div className="flex items-center justify-between">
  //           <span className="font-medium text-sm">l.bianchi@email.com</span>
  //           <span className="text-xs text-gray-500">1h ago</span>
  //         </div>
  //         <p className="text-sm text-gray-600">
  //           Thank you for the consultation!
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="mt-4 p-3 bg-[#078147]/5 rounded-lg">
  //     <div className="text-xs text-[#078147] font-medium">
  //       3 unread messages
  //     </div>
  //   </div>
  // </div>
);

export const DashboardMockup = () => (
  <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-800">NovaFarm Dashboard</h3>
      <Users className="w-5 h-5 text-[#078147]" />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-[#078147]/10 p-3 rounded-lg">
        <div className="text-2xl font-bold text-[#078147]">24</div>
        <div className="text-xs text-gray-600">Today's Appointments</div>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="text-2xl font-bold text-gray-700">156</div>
        <div className="text-xs text-gray-600">This Month</div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="text-xs text-gray-600 font-medium">Recent Activity</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-xs">New booking - Maria R.</span>
          <span className="text-xs text-[#078147]">Just now</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-xs">Review received - 5 stars</span>
          <span className="text-xs text-gray-500">5m ago</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-xs">Payment received - €45</span>
          <span className="text-xs text-gray-500">12m ago</span>
        </div>
      </div>
    </div>
  </div>
);

export const PaymentMockup = () => (
  <img src="/images/secure_payment.png" alt="secure payment " />
  // <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
  //   <div className="flex items-center justify-between mb-6">
  //     <h3 className="font-semibold text-gray-800 text-lg">Secure Payment</h3>
  //     <CreditCard className="w-6 h-6 text-[#078147]" />
  //   </div>
  //   <div className="space-y-6">
  //     <div className="bg-[#078147]/5 p-6 rounded-lg">
  //       <div className="flex items-center justify-between mb-3">
  //         <span className="text-base font-medium">Consultation Fee</span>
  //         <span className="text-2xl font-bold text-[#078147]">€45.00</span>
  //       </div>
  //       <div className="text-sm text-gray-600">
  //         Dr. Rossi - Nov 15, 2024 at 14:30
  //       </div>
  //       <div className="text-xs text-gray-500 mt-1">
  //         Medication consultation & health screening
  //       </div>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       <div className="space-y-4">
  //         <div>
  //           <label className="text-sm text-gray-600 font-medium">
  //             Cardholder Name
  //           </label>
  //           <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm border">
  //             Marco Bianchi
  //           </div>
  //         </div>
  //         <div>
  //           <label className="text-sm text-gray-600 font-medium">
  //             Card Number
  //           </label>
  //           <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm border">
  //             •••• •••• •••• 4242
  //           </div>
  //         </div>
  //       </div>

  //       <div className="space-y-4">
  //         <div>
  //           <label className="text-sm text-gray-600 font-medium">
  //             Expiry Date
  //           </label>
  //           <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm border">
  //             12/26
  //           </div>
  //         </div>
  //         <div>
  //           <label className="text-sm text-gray-600 font-medium">
  //             Security Code
  //           </label>
  //           <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm border">
  //             •••
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="space-y-3">
  //       <button className="w-full bg-[#078147] text-white py-4 rounded-lg font-semibold text-base hover:bg-[#066139] transition-colors">
  //         Confirm Payment €45.00
  //       </button>
  //       <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
  //         <span>🔒</span>
  //         <span>Secured by Stripe • SSL Encrypted</span>
  //       </div>
  //     </div>

  //     <div className="border-t pt-4">
  //       <div className="text-xs text-gray-500 text-center">
  //         Your payment information is secure and encrypted
  //       </div>
  //     </div>
  //   </div>
  // </div>
);

export const AnalyticsMockup = () => (
  <img
    src="/images/statistics_dashboard.png"
    className="w-[80%]"
    alt="dashboard statistics"
  />
  // <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
  //   <div className="flex items-center justify-between mb-4">
  //     <h3 className="font-semibold text-gray-800">Analytics Dashboard</h3>
  //     <BarChart3 className="w-5 h-5 text-[#078147]" />
  //   </div>
  //   <div className="space-y-4">
  //     <div className="grid grid-cols-3 gap-3">
  //       <div className="text-center">
  //         <div className="text-lg font-bold text-[#078147]">234</div>
  //         <div className="text-xs text-gray-600">Total Bookings</div>
  //       </div>
  //       <div className="text-center">
  //         <div className="text-lg font-bold text-[#078147]">98%</div>
  //         <div className="text-xs text-gray-600">Show Rate</div>
  //       </div>
  //       <div className="text-center">
  //         <div className="text-lg font-bold text-[#078147]">4.8</div>
  //         <div className="text-xs text-gray-600">Avg Rating</div>
  //       </div>
  //     </div>
  //     <div className="space-y-2">
  //       <div className="text-xs text-gray-600 font-medium">Monthly Trends</div>
  //       <div className="bg-gray-50 p-3 rounded">
  //         <div className="flex items-end space-x-1 h-16">
  //           {[40, 60, 45, 80, 65, 90, 85, 95].map((height, i) => (
  //             <div
  //               key={i}
  //               className="flex-1 bg-[#078147] rounded-t"
  //               style={{ height: `${height}%` }}
  //             />
  //           ))}
  //         </div>
  //         <div className="text-xs text-gray-500 mt-2">Bookings per week</div>
  //       </div>
  //     </div>
  //     <div className="bg-[#078147]/5 p-3 rounded-lg">
  //       <div className="text-sm font-medium text-[#078147]">
  //         +23% increase this month
  //       </div>
  //       <div className="text-xs text-gray-600">Compared to last month</div>
  //     </div>
  //   </div>
  // </div>
);

export const SupportMockup = () => (
  <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-800">Support Center</h3>
      <Headphones className="w-5 h-5 text-[#078147]" />
    </div>
    <div className="space-y-4">
      <div className="bg-[#078147]/5 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#078147] rounded-full flex items-center justify-center text-white font-medium">
            NS
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">NovaFarm Support</div>
            <div className="text-xs text-gray-600">
              Usually responds in 5 minutes
            </div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm">Hi! How can I help you today?</div>
          <div className="text-xs text-gray-500 mt-1">
            Support Agent - 2m ago
          </div>
        </div>
        <div className="bg-[#078147]/10 p-3 rounded-lg ml-8">
          <div className="text-sm">
            I need help setting up automated reminders
          </div>
          <div className="text-xs text-gray-500 mt-1">You - 1m ago</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="p-2 bg-gray-50 rounded text-xs text-center">
          📹 Video Tutorials
        </button>
        <button className="p-2 bg-gray-50 rounded text-xs text-center">
          📚 Help Center
        </button>
      </div>
      <div className="text-center">
        <button className="bg-[#078147] text-white px-4 py-2 rounded-lg text-sm font-medium">
          Start Live Chat
        </button>
      </div>
    </div>
  </div>
);
