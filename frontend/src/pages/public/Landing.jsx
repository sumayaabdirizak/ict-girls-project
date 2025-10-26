import React from 'react';
import { Link } from 'react-router-dom';
import ExpandingCardHero from '../../components/ui/ExpandingCardHero';
import ModernHero from '../../components/ui/ModernHero';
import ImageGallery from '../../components/ui/ImageGallery'; // Add this import
import FeaturesSection from '../../components/ui/FeaturesSection';
import CTASection from '../../components/ui/CTASection';

const Landing = () => {
  // Get user from localStorage since we don't have AuthContext yet
  const getUser = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const user = getUser();

  const handleJoinClick = () => {
    // This will trigger the register modal through the Navbar props
    const event = new CustomEvent('openRegisterModal');
    window.dispatchEvent(event);
  };

  const handleLearnMoreClick = () => {
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
  <div className="min-h-screen">
      {/* New Hero Section */}
        <ModernHero 
        user={user}
        onJoinClick={handleJoinClick}
        onLearnMoreClick={handleLearnMoreClick}
      />
        <ExpandingCardHero 
        user={user}
        onJoinClick={handleJoinClick}
        onLearnMoreClick={handleLearnMoreClick}
      />
    {/* Features Section */}
      <FeaturesSection />


 

      <CTASection 
        user={user}
        onJoinClick={handleJoinClick}
      />
    </div>
  );
};

export default Landing;