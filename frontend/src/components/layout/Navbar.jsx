import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleOpenRegisterModal = () => {
      onRegisterClick();
    };

    window.addEventListener('openRegisterModal', handleOpenRegisterModal);
    
    return () => {
      window.removeEventListener('openRegisterModal', handleOpenRegisterModal);
    };
  }, [onRegisterClick]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full h-24 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo and Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src={logo}
                alt="Jazeera ICT Girls" 
                className="h-40 m-2.5 w-auto"
              />
            </Link>
            <div className="hidden md:flex space-x-10">
              <Link 
                to="/" 
                className="text-gray-800 hover:text-[#4da6ff] px-4 py-3 rounded-md text-base font-semibold transition-colors duration-200"
              >
                Home
              </Link>
              {user && (
                <Link 
                  to="/community" 
                  className="text-gray-800 hover:text-[#4da6ff] px-4 py-3 rounded-md text-base font-semibold transition-colors duration-200"
                >
                  Community
                </Link>
              )}
              <Link 
                to="/blog" 
                className="text-gray-800 hover:text-[#4da6ff] px-4 py-3 rounded-md text-base font-semibold transition-colors duration-200"
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className="text-gray-800 hover:text-[#4da6ff] px-4 py-3 rounded-md text-base font-semibold transition-colors duration-200"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-800 hover:text-[#4da6ff] px-4 py-3 rounded-md text-base font-semibold transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-6">
                
                <div className="text-base text-gray-800 hidden lg:block">
                  Welcome, <span className="font-bold text-[#4da6ff]">{user.full_name}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-[#66cc99] hover:bg-[#5cb88a] text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors duration-200 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onLoginClick}
                  className="text-gray-800 hover:text-[#4da6ff] px-5 py-3 rounded-lg text-base font-semibold transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-[#4da6ff] hover:bg-[#3d96e6] text-white px-7 py-3 rounded-lg text-base font-semibold transition-all duration-200 shadow-md"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;