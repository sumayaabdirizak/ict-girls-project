import React from 'react';

const Contact = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "How do I register for the platform?",
      answer: "Use your official Jazeera University email address to register. The registration process is quick and you'll receive a verification email to activate your account."
    },
    {
      question: "What if I'm having technical issues?",
      answer: "For technical support, email our tech team at tech-support@jazeera.edu. Include screenshots and details about the issue for faster resolution."
    },
    {
      question: "How can companies partner with us?",
      answer: "Companies interested in partnerships can contact our partnership team at partnerships@jazeera.edu. We offer various collaboration opportunities including internships, sponsorships, and joint projects."
    },
    {
      question: "Are there any upcoming competitions?",
      answer: "Yes! We regularly host hackathons and coding competitions. Check the 'Competitions' section on the platform for current and upcoming events with deadlines and submission guidelines."
    },
    {
      question: "Can I suggest new features for the platform?",
      answer: "Absolutely! We welcome feature suggestions. Email your ideas to feedback@jazeera.edu and our product team will review them for future updates."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and enter your registered email. You'll receive a password reset link within 5 minutes."
    }
  ];

  const contactInfo = [
    {
      icon: "📧",
      title: "General Inquiries",
      email: "ict-girls@jazeera.edu",
      description: "For general questions and platform information"
    },
    {
      icon: "⚙️",
      title: "Technical Support",
      email: "tech-support@jazeera.edu",
      description: "Platform issues, bugs, or technical assistance"
    },
    {
      icon: "🤝",
      title: "Partnerships",
      email: "partnerships@jazeera.edu",
      description: "Company collaborations and sponsorship opportunities"
    },
    {
      icon: "🏆",
      title: "Competitions",
      email: "competitions@jazeera.edu",
      description: "Hackathons, coding challenges, and events"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
       
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-4">
            Contact & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or reach out to our dedicated support teams
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-12">
          
          {/* Contact Information Sidebar */}
          <div className="lg:max-w-md w-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-colors border border-gray-100">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-blue-600 text-lg">{contact.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{contact.title}</h3>
                      <p className="text-blue-600 font-medium text-sm">{contact.email}</p>
                      <p className="text-gray-600 text-xs mt-1">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { number: "24h", label: "Avg Response" },
                    { number: "100%", label: "Free Support" },
                    { number: "500+", label: "Students Helped" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="flex-1 max-w-2xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="mb-8">
                <p className="text-blue-600 text-sm font-medium">FAQ's</p>
                <h2 className="text-3xl font-semibold text-gray-900">Looking for answers?</h2>
                <p className="text-sm text-gray-500 mt-2 pb-4">
                  Quick solutions to common questions about the Jazeera ICT Girls Platform.
                </p>
              </div>

              {faqs.map((faq, index) => (
                <div 
                  className="border-b border-gray-200 py-6 cursor-pointer transition-all duration-300 hover:bg-gray-50/50 rounded-lg px-4 -mx-4" 
                  key={index} 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 18 18" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`flex-shrink-0 transition-all duration-500 ease-in-out ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <path 
                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" 
                        stroke="#1D293D" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                  <p 
                    className={`text-sm text-gray-600 transition-all duration-500 ease-in-out max-w-2xl ${
                      openIndex === index 
                        ? "opacity-100 max-h-[300px] translate-y-0 pt-4" 
                        : "opacity-0 max-h-0 -translate-y-2 overflow-hidden"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}

              {/* Still Need Help Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Still need help?</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Can't find what you're looking for? Our support team is here to help you with any questions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    Email Support
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 