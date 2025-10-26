import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20"> {/* Added pt-20 for header spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Adjusted for existing header */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Jazeera ICT Girls
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering female technology leaders through innovation and collaboration
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-2xl text-white">🎯</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Creating an inclusive ecosystem where female ICT students transform into 
                  industry-ready professionals through cutting-edge education and real-world experience.
                </p>
                <p>
                  We're building bridges between academia and industry, ensuring every student 
                  has the tools to become a technology leader of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "👥",
              title: "Community",
              description: "Building strong connections between female ICT students for mutual support and growth.",
              color: "bg-blue-500"
            },
            {
              icon: "🚀",
              title: "Growth",
              description: "Providing opportunities for skill development through competitions and projects.",
              color: "bg-green-500"
            },
            {
              icon: "💼",
              title: "Opportunity",
              description: "Connecting students with internships, jobs, and career development resources.",
              color: "bg-purple-500"
            }
          ].map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center shadow-sm mb-4`}>
                <span className="text-xl text-white">{value.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

       

      </div>
    </div>
  );
};

export default About;