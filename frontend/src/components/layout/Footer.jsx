import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-700 bg-blue-50">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-blue-200 pb-6">
        {/* Brand Section */}
        <div className="md:max-w-96">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logo}
                alt="Jazeera ICT Girls" 
                className="h-16 w-auto"
              />
            </Link>
            <div>
              <h3 className="font-bold text-lg text-[#4da6ff]">Jazeera ICT Girls</h3>
              <p className="text-blue-500 text-sm">Empowering Female Tech Leaders</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Empowering female ICT students at Jazeera University through community, 
            competitions, and career development. Join 150+ ICT girls building their 
            tech careers together.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row items-start gap-16 lg:gap-20">
          {/* Platform Links */}
          <div>
            <h2 className="font-semibold mb-5 text-[#4da6ff]">Platform</h2>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>
                <Link to="/" className="hover:text-[#4da6ff] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#4da6ff] transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#4da6ff] transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#4da6ff] transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h2 className="font-semibold mb-5 text-[#4da6ff]">Get in touch</h2>
            <div className="text-sm space-y-2 text-gray-600">
              <p>Jazeera University</p>
              <p>ICT Department</p>
              <p className="hover:text-[#4da6ff] transition-colors cursor-pointer">
                ict-girls@jazeera.edu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-600">
        Copyright 2025 © <span className="text-[#4da6ff] font-semibold">Jazeera University ICT Girls</span>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;