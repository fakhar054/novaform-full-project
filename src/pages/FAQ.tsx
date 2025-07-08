
import React, { useState } from 'react';
import { Search, Calendar, Bot, Euro, Users, Wrench, CreditCard, HelpCircle, Settings, Zap, Menu, X, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  videoUrl?: string;
  steps?: string[];
  images?: string[];
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: 'gs1',
    question: 'How do I create my first appointment booking page?',
    answer: 'Creating your first booking page is simple and takes just a few minutes. Follow these steps to get started with NovaFarm.',
    category: 'getting-started',
    steps: [
      'Navigate to your Dashboard and click on "Appointments"',
      'Select "Create New Page" from the menu',
      'Choose your service type (consultation, meeting, etc.)',
      'Set your availability hours and time zones',
      'Customize your booking form with required fields',
      'Preview and publish your page',
      'Share the generated link with your clients'
    ]
  },
  {
    id: 'gs2',
    question: 'What information do I need to set up my NovaFarm account?',
    answer: 'To get started with NovaFarm, you\'ll need some basic business information to create a professional booking experience.',
    category: 'getting-started',
    steps: [
      'Business name and contact information',
      'Service types you offer',
      'Preferred time zones for scheduling',
      'Payment processor details (can be added later)',
      'Notification preferences (email, SMS, etc.)'
    ]
  },

  // Appointments & Calendar
  {
    id: 'ac1',
    question: 'How can I sync NovaFarm with my existing calendar?',
    answer: 'Calendar integration ensures your availability is always accurate and prevents double bookings across platforms.',
    category: 'appointments',
    steps: [
      'Go to Settings > Calendar Integration',
      'Choose your calendar provider (Google, Outlook, Apple)',
      'Click "Connect" and authorize access',
      'Select which calendars to sync',
      'Set sync preferences and buffer times',
      'Test the integration with a sample booking'
    ]
  },
  {
    id: 'ac2',
    question: 'Can I set different availability for different services?',
    answer: 'Yes! NovaFarm allows you to customize availability schedules for each service type, giving you complete control over your booking calendar.',
    category: 'appointments',
    steps: [
      'Navigate to Services in your dashboard',
      'Select the service you want to edit',
      'Click on "Availability Settings"',
      'Set specific hours and days for this service',
      'Configure buffer times between appointments',
      'Save your changes'
    ]
  },

  // Automations & Reminders
  {
    id: 'ar1',
    question: 'How can I set up automated reminders before appointments?',
    answer: 'Automated reminders help reduce no-shows and keep your clients informed about upcoming appointments.',
    category: 'automations',
    steps: [
      'Go to Settings > Automations > Reminders',
      'Click "Create New Reminder"',
      'Choose timing (24h before, same-day, 1 hour before)',
      'Select delivery method (SMS, email, WhatsApp)',
      'Customize your message with merge tags',
      'Test and activate the reminder'
    ]
  },

  // Payments & Invoicing
  {
    id: 'pi1',
    question: 'Which payment methods are supported?',
    answer: 'NovaFarm supports a wide range of payment methods to accommodate your clients\' preferences.',
    category: 'payments',
    steps: [
      'Credit and debit cards (Visa, MasterCard, American Express)',
      'PayPal payments',
      'Bank transfers and ACH payments',
      'Local payment methods (varies by region)',
      'Digital wallets (Apple Pay, Google Pay)',
      'Cryptocurrency (Bitcoin, Ethereum) - Premium feature'
    ]
  },

  // Account Settings
  {
    id: 'as1',
    question: 'How do I update my business information?',
    answer: 'Keep your business information current to maintain a professional appearance and ensure clients can reach you.',
    category: 'account-settings',
    steps: [
      'Navigate to Settings > Business Profile',
      'Update your business name and description',
      'Add or change your logo and brand colors',
      'Update contact information and addresses',
      'Set your time zone and language preferences',
      'Save changes and review your public profile'
    ]
  },

  // Platform Features
  {
    id: 'pf1',
    question: 'What analytics and reporting features are available?',
    answer: 'NovaFarm provides comprehensive analytics to help you understand your business performance and client behavior.',
    category: 'platform-features',
    steps: [
      'Booking conversion rates and trends',
      'Revenue tracking and forecasting',
      'Client behavior and preferences',
      'No-show rates and patterns',
      'Popular services and time slots',
      'Custom reports and exports'
    ]
  }
];

const categories = [
  { id: 'getting-started', name: 'Getting Started', icon: HelpCircle, color: 'bg-blue-500' },
  { id: 'appointments', name: 'Appointments & Calendar', icon: Calendar, color: 'bg-[#078147]' },
  { id: 'automations', name: 'Automations & Reminders', icon: Bot, color: 'bg-purple-500' },
  { id: 'payments', name: 'Payments & Invoicing', icon: Euro, color: 'bg-orange-500' },
  { id: 'account-settings', name: 'Account Settings', icon: Settings, color: 'bg-indigo-500' },
  { id: 'integrations', name: 'Integrations', icon: Zap, color: 'bg-pink-500' },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: Wrench, color: 'bg-red-500' },
  { id: 'billing', name: 'Plans & Billing', icon: CreditCard, color: 'bg-yellow-500' },
  { id: 'platform-features', name: 'Platform Features', icon: Users, color: 'bg-teal-500' }
];

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedback, setFeedback] = useState<{[key: string]: boolean | null}>({});

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() !== '') {
      // Find first matching FAQ
      const matchingFAQ = faqData.find(faq =>
        faq.question.toLowerCase().includes(value.toLowerCase()) ||
        faq.answer.toLowerCase().includes(value.toLowerCase())
      );
      if (matchingFAQ) {
        setSelectedFAQ(matchingFAQ);
        setSelectedCategory(matchingFAQ.category);
      }
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedFAQ(null);
    setSidebarOpen(false);
  };

  const handleFAQSelect = (faq: FAQItem) => {
    setSelectedFAQ(faq);
    setSelectedCategory(faq.category);
    setSidebarOpen(false);
  };

  const handleFeedback = (faqId: string, isHelpful: boolean) => {
    setFeedback(prev => ({ ...prev, [faqId]: isHelpful }));
  };

  const getCategoryFAQs = (categoryId: string) => {
    return faqData.filter(faq => faq.category === categoryId);
  };

  const getFilteredFAQs = () => {
    if (searchTerm.trim() === '') return [];
    return faqData.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-black">Help Center</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mt-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a question, topic or feature..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#078147] focus:border-transparent"
            />
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {searchTerm ? (
            /* Search Results */
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Search Results ({getFilteredFAQs().length})
              </h3>
              {getFilteredFAQs().map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleFAQSelect(faq)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedFAQ?.id === faq.id
                      ? 'bg-[#078147]/10 text-[#078147] border border-[#078147]/20'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-sm">{faq.question}</div>
                </button>
              ))}
            </div>
          ) : (
            /* Categories */
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const categoryFAQs = getCategoryFAQs(category.id);
                
                return (
                  <div key={category.id}>
                    <button
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#078147]/10 text-[#078147]'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{category.name}</div>
                        <div className="text-xs text-gray-500">{categoryFAQs.length} articles</div>
                      </div>
                    </button>
                    
                    {/* Category FAQs */}
                    {selectedCategory === category.id && categoryFAQs.length > 0 && (
                      <div className="ml-11 mt-2 space-y-1">
                        {categoryFAQs.map((faq) => (
                          <button
                            key={faq.id}
                            onClick={() => handleFAQSelect(faq)}
                            className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                              selectedFAQ?.id === faq.id
                                ? 'bg-[#078147]/10 text-[#078147]'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            {faq.question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center space-x-2 text-gray-600"
          >
            <Menu className="w-5 h-5" />
            <span className="font-medium">Help Center</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {selectedFAQ ? (
            /* FAQ Article View */
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-black mb-6">
                  {selectedFAQ.question}
                </h1>
                
                {selectedFAQ.videoUrl && (
                  <div className="mb-8">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500">Video placeholder</div>
                    </div>
                  </div>
                )}
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedFAQ.answer}
                  </p>
                  
                  {selectedFAQ.steps && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-black mb-4">Step-by-step guide:</h3>
                      <ol className="space-y-3">
                        {selectedFAQ.steps.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-[#078147] text-white rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                
                {/* Feedback Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Was this helpful?</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleFeedback(selectedFAQ.id, true)}
                        className={`p-2 rounded-lg transition-colors ${
                          feedback[selectedFAQ.id] === true
                            ? 'bg-green-100 text-green-600'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(selectedFAQ.id, false)}
                        className={`p-2 rounded-lg transition-colors ${
                          feedback[selectedFAQ.id] === false
                            ? 'bg-red-100 text-red-600'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {feedback[selectedFAQ.id] !== undefined && (
                    <div className="mt-2 text-sm text-gray-600">
                      Thank you for your feedback!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Category Overview */
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                {currentCategory && (
                  <>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-12 h-12 ${currentCategory.color} rounded-lg flex items-center justify-center`}>
                        <currentCategory.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-black">
                          {currentCategory.name}
                        </h1>
                        <p className="text-gray-600">
                          {getCategoryFAQs(selectedCategory).length} articles in this category
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      {getCategoryFAQs(selectedCategory).map((faq) => (
                        <button
                          key={faq.id}
                          onClick={() => handleFAQSelect(faq)}
                          className="text-left p-4 border border-gray-200 rounded-lg hover:border-[#078147] hover:bg-[#078147]/5 transition-colors group"
                        >
                          <h3 className="font-semibold text-black group-hover:text-[#078147] mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {faq.answer}
                          </p>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
