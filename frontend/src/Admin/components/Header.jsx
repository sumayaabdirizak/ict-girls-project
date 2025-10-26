import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdNotifications, MdSearch, MdHome } from "react-icons/md";
import User from '../../assets/user.png';

const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Dashboard';
      case '/admin/users':
        return 'Manage Users';
      case '/admin/community':
        return 'Manage Community';
      case '/admin/website':
        return 'Manage Website';
      case '/admin/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const getBreadcrumbPath = () => {
    const paths = location.pathname.split('/').filter(path => path);
    if (paths[0] === 'admin') {
      paths[0] = 'Admin';
    }
    return paths;
  };

  const pageTitle = getPageTitle();
  const breadcrumbPath = getBreadcrumbPath();

  return (
    <header className='fixed top-0 bg-white shadow-sm border-b border-gray-200 px-6 py-4 z-40 transition-all duration-300 lg:left-64' 
            style={{ left: '16rem', right: 0 }}>
      <div className='flex items-center justify-between'>
        {/* Left Side - Page Title & Breadcrumbs */}
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>{pageTitle}</h1>
          <nav className='flex items-center space-x-1 text-sm text-gray-500 mt-1'>
            <MdHome size={16} className="text-gray-400" />
            <span className="text-gray-300">/</span>
            {breadcrumbPath.map((path, index) => (
              <React.Fragment key={index}>
                <span className={`${
                  index === breadcrumbPath.length - 1 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-600'
                } capitalize`}>
                  {path}
                </span>
                {index < breadcrumbPath.length - 1 && (
                  <span className="text-gray-300">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Right Side Items */}
        <div className='flex items-center space-x-4'>
          {/* Search */}
          <div className='relative hidden md:block'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MdSearch className='text-gray-400' size={20} />
            </div>
            <input
              type='text'
              placeholder='Search...'
              className='w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>

          {/* Notifications */}
          <button className='relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors'>
            <MdNotifications size={24} />
            <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
              3
            </span>
          </button>

          {/* User Profile */}
          <div className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors'>
            <img 
              src={User} 
              alt='Admin Avatar' 
              className='w-12 h-12 rounded-full object-cover' 
            />
            <div className='hidden md:block text-left'>
              <p className='text-sm font-semibold text-gray-900'> Admin</p>
              <p className='text-xs text-gray-500'>Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;