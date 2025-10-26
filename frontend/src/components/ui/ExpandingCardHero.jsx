import React from 'react';
import { Link } from 'react-router-dom';
import girlsImage from '../../assets/girl.jpg';
import womenImage from '../../assets/women.jpg';
import sisImage from '../../assets/sis.jpg';



const ExpandingCardHero = ({ user, onJoinClick, onLearnMoreClick }) => {
  const cards = [
    {
      id: 1,
      title: "Community Hub",
      description: "Connect with fellow ICT girls in our Slack-style platform. Share knowledge, ask questions, and grow together in a supportive environment designed for female ICT students.",
      image: girlsImage,
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      id: 2,
      title: "Coding Competitions",
      description: "Participate in exciting challenges and hackathons. Showcase your skills, solve real-world problems, and win amazing prizes while building your portfolio.",
      image: womenImage,
      gradient: "from-green-500/20 to-blue-500/20"
    },
    {
      id: 3,
      title: "Career Growth",
      description: "Access exclusive internships, job opportunities, and mentorship programs tailored for ICT students. Get career guidance and connect with industry professionals.",
      image: sisImage,
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen pt-0 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            What We <span className="bg-[#66cc99] bg-clip-text text-transparent">Offer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the exclusive features designed to empower female ICT students at Jazeera University
          </p>
        </div>

        {/* Expanding Cards Container */}
        <div className="flex flex-col lg:flex-row items-center gap-6 h-auto lg:h-[600px] w-full max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className="relative group flex-grow transition-all duration-700 h-80 lg:h-full w-full lg:w-64 hover:lg:w-full rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl border border-gray-200"
            >
              {/* Background Image */}
              <img 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={card.image} 
                alt={card.title}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-white">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4 lg:translate-y-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 max-w-md leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                {/* Hover Indicator */}
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center space-x-2">
                  
                  
                </div>
              </div>

              {/* Default Title (Visible when not hovered) */}
              <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl lg:text-2xl font-bold text-white drop-shadow-lg">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default ExpandingCardHero;