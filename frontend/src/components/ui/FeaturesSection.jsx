// src/components/ui/FeaturesSection.jsx
import React from 'react';
import girl from '../../assets/girl.jpg';
import muslim from '../../assets/muslim.jpg';
import girls from '../../assets/girls.jpg';


const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Exclusive Community",
      description: "Connect with fellow female ICT students in a safe, supportive environment designed just for you.",
      image: girl,
    
      stats: "150+ ICT Girls",
      gradient: "from-blue-500/10 to-purple-500/10",
      color: "blue"
    },
    {
      id: 2,
      title: "Real Career Opportunities",
      description: "Get access to exclusive internships, job postings, and mentorship programs from top tech companies.",
      image: muslim,

      stats: "25+ Partners",
      gradient: "from-green-500/10 to-blue-500/10",
      color: "green"
    },
    {
      id: 3,
      title: "Hands-on Learning",
      description: "Participate in real-world projects and coding challenges that build your portfolio and skills.",
      image: girls,
    
      stats: "45+ Projects",
      gradient: "from-purple-500/10 to-pink-500/10",
      color: "purple"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50/50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
     
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Designed Exclusively for{' '}
            <span className="bg-gradient-to-r from-[#4da6ff] to-[#66cc99] bg-clip-text text-transparent">
              ICT Girls
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join a platform built specifically for female ICT students at Jazeera University. 
            Connect, learn, and grow in a supportive environment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="group relative bg-blue-50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Image Container */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img 
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    src={feature.image} 
                    alt={feature.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
               
                  
                </div>

             

                {/* Text Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-2 text-sm text-gray-500">
                  {feature.id === 1 && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Slack-style community chat
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Study group collaboration
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Peer-to-peer support
                      </li>
                    </>
                  )}
                  {feature.id === 2 && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Exclusive internships
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Industry mentorship
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        Job placement support
                      </li>
                    </>
                  )}
                  {feature.id === 3 && (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        Real-world projects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        Coding competitions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        Portfolio building
                      </li>
                    </>
                  )}
                </ul>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#4da6ff] to-[#66cc99] group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

     
      
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;