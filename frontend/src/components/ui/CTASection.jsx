// src/components/ui/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = ({ user, onJoinClick }) => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background elements - using your color theme */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#4da6ff] rounded-full opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#66cc99] rounded-full opacity-10"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#4da6ff] rounded-full opacity-5"></div>
      
      {/* Main content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          {user ? (
            <>
              Welcome back,{' '}
              <span className="text-[#4da6ff]">
                {user.full_name}!
              </span>
            </>
          ) : (
            <>
              See all you can accomplish{' '}
              <span className="text-[#4da6ff]">
                together.
              </span>
            </>
          )}
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          {user 
            ? `Pick up where you left off. Your community, competitions, and connections are waiting.`
            : 'Connect with fellow ICT girls, participate in exciting competitions, and accelerate your tech career in one place.'
          }
        </p>

        {/* CTA Buttons */}
        {user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/community"
              className="bg-[#4da6ff] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#3d96e6] transition-all duration-200 shadow-sm hover:shadow-md text-lg min-w-[200px] text-center"
            >
              Enter Community
            </Link>
            <Link
              to="/dashboard"
              className="bg-white text-[#4da6ff] border border-[#4da6ff] px-8 py-4 rounded-lg font-semibold hover:bg-[#4da6ff] hover:text-white transition-all duration-200 text-lg min-w-[200px] text-center"
            >
              View Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onJoinClick}
              className="bg-[#4da6ff] text-white px-10 py-4 rounded-lg font-semibold hover:bg-[#3d96e6] transition-all duration-200 shadow-sm hover:shadow-md text-lg min-w-[240px] text-center"
            >
              Get Started
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#4da6ff] border border-[#4da6ff] px-8 py-4 rounded-lg font-semibold hover:bg-[#4da6ff] hover:text-white transition-all duration-200 text-lg min-w-[200px] text-center"
            >
              Learn More
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default CTASection;