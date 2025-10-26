import React from 'react';
import { Link } from 'react-router-dom';
import girlsImage from '../../assets/women.jpg';

const ModernHero = ({ user, onJoinClick, onLearnMoreClick }) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-25 to-emerald-25 relative overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes with reduced opacity */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern with reduced opacity */}
        <div className="absolute inset-0 opacity-[0.02] bg-[length:50px_50px] bg-[linear-gradient(to_right,#4da6ff_1px,transparent_1px),linear-gradient(to_bottom,#4da6ff_1px,transparent_1px)]"></div>
      </div>

      {/* Main Hero Content - 50/50 split */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 min-h-screen ">
        {/* Text Content - Half screen */}
        <div className="flex-1 w-full lg:w-1/2 text-center lg:text-left z-10 lg:pr-8 xl:pr-12">
      

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-slate-800 leading-tight">
            Empowering{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#4da6ff] to-[#66cc99] bg-clip-text text-transparent relative z-10">
                Jazeera ICT
              </span>
              <div className="absolute bottom-2 left-0 w-full h-3 bg-blue-50/60 -z-0 rounded-lg"></div>
            </span>{' '}
            Girls
          </h1>

          {/* Subtitle with lighter background */}
          <p className="text-lg md:text-xl lg:text-xl text-slate-600 mt-6 leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60">
            Connect, collaborate, and compete with fellow female ICT students at Jazeera University. 
            Join exclusive coding challenges, study groups, and build your tech career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-8 md:mt-10">
            {!user ? (
              <>
                <button 
                  onClick={onJoinClick}
                  className="group relative px-6 md:px-8 py-3 md:py-4 text-white bg-gradient-to-r from-[#4da6ff] to-[#66cc99] hover:from-[#3d96e6] hover:to-[#5cb88a] active:scale-95 transition-all rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl hover:shadow-blue-200/30 overflow-hidden w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                    Join Community
                    <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button 
                  onClick={onLearnMoreClick}
                  className="group px-6 md:px-8 py-3 md:py-4 border-2 border-slate-200 hover:border-slate-300 active:scale-95 hover:bg-white/60 backdrop-blur-sm transition-all text-slate-600 rounded-xl font-semibold text-base md:text-lg flex items-center gap-2 hover:shadow-lg w-full sm:w-auto justify-center"
                >
                  Explore Features
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                <Link
                  to="/community"
                  className="group relative px-6 md:px-8 py-3 md:py-4 text-white bg-gradient-to-r from-[#4da6ff] to-[#66cc99] hover:from-[#3d96e6] hover:to-[#5cb88a] active:scale-95 transition-all rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl hover:shadow-blue-200/30 overflow-hidden text-center"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                    Enter Community
                    <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <button 
                  onClick={onLearnMoreClick}
                  className="group px-6 md:px-8 py-3 md:py-4 border-2 border-slate-200 hover:border-slate-300 active:scale-95 hover:bg-white/60 backdrop-blur-sm transition-all text-slate-600 rounded-xl font-semibold text-base md:text-lg flex items-center gap-2 hover:shadow-lg justify-center"
                >
                  Explore Features
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Image - Half screen */}
        <div className="flex-1 w-full lg:w-1/2 flex justify-center lg:justify-end items-center mt-8 lg:mt-0 z-10 lg:pl-8 xl:pl-12">
          <div className="relative group w-full max-w-full">
            {/* Main Image Container - Full width of its container */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl group-hover:shadow-3xl transition-all duration-500 w-full">
              <img 
                src={girlsImage}
                alt="ICT Girls collaborating" 
                className="w-full h-[300px] md:h-[500px] lg:h-[550px] xl:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Overlay with reduced opacity */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;