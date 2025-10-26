import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Jlogo from '../../assets/jazeera.png';
import Button from '@mui/material/Button';
import { 
  MdDashboard, 
  MdPeople, 
  MdGroups, 
  MdSettings,
  MdWeb 
} from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <MdDashboard size={20} />
    },
    {
      path: "/admin/users",
      name: "Manage Users",
      icon: <MdPeople size={20} />
    },
    {
      path: "/admin/community",
      name: "Manage Community",
      icon: <MdGroups size={20} />
    },
    {
      path: "/admin/website",
      name: "Manage Website",
      icon: <MdWeb size={20} />
    },
    {
      path: "/admin/settings",
      name: "Settings",
      icon: <MdSettings size={20} />
    }
  ];

  // Check if current path matches menu item (including sub-routes)
  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className='sidebar fixed top-0 left-0 z-[100] w-64 h-screen bg-white shadow-lg'>
      {/* Logo */}
      <Link to="/admin" className='block'>
        <div className='logoWrapper flex justify-center items-center py-4 px-4 border-b border-gray-300 hover:bg-gray-50 transition-colors'>
          <img src={Jlogo} alt="Company Logo" className='h-20' /> 
        </div>
      </Link>

      {/* Navigation Tabs */}
      <div className='sidebarTabs p-4 space-y-2'>
        {menuItems.map((item) => (
          <Button 
            key={item.path}
            component={Link}
            to={item.path}
            className={`w-full justify-start !normal-case !text-base !font-medium ${
              isActive(item.path)
                ? '!bg-blue-500 !text-white hover:!bg-blue-600' 
                : '!text-gray-700 hover:!bg-gray-100'
            }`}
            sx={{ 
              padding: '12px 16px', 
              justifyContent: 'flex-start',
              borderRadius: '8px',
              marginBottom: '4px'
            }}
          >
            <span className={`icon mr-3 w-6 h-6 flex items-center justify-center ${
              isActive(item.path) ? 'text-white' : 'text-gray-600'
            }`}>
              {item.icon}
            </span>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;