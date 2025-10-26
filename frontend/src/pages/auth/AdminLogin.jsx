import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLock, MdCheckCircle, MdError } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Logo from '../../assets/logo.png';
import Login from '../../assets/login.png';

const AdminLogin = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' });
    }, 5000);
  };

  const closeAlert = () => {
    setAlert({ show: false, type: '', message: '' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showAlert('error', 'Please enter both email and password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await adminLogin(email, password);
      showAlert('success', 'Login successful! Redirecting to admin dashboard...');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        const serverError = error.response.data;
        if (serverError.error) {
          errorMessage = serverError.error;
        } else if (error.response.status === 401) {
          errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection and make sure the backend server is running.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred.';
      }
      
      showAlert('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setRememberMe(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-white relative">
      {/* Alert Notification */}
      {alert.show && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ${
          alert.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        } rounded-lg shadow-lg`}>
          <div className="flex items-start p-4">
            <div className={`flex-shrink-0 ${
              alert.type === 'success' 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}>
              {alert.type === 'success' ? (
                <MdCheckCircle size={24} />
              ) : (
                <MdError size={24} />
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${
                alert.type === 'success' 
                  ? 'text-green-800' 
                  : 'text-red-800'
              }`}>
                {alert.type === 'success' ? 'Success!' : 'Error!'}
              </p>
              <p className={`mt-1 text-sm ${
                alert.type === 'success' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {alert.message}
              </p>
            </div>
            <button
              onClick={closeAlert}
              className={`ml-4 flex-shrink-0 rounded-md inline-flex ${
                alert.type === 'success' 
                  ? 'text-green-400 hover:text-green-500 focus:ring-green-500' 
                  : 'text-red-400 hover:text-red-500 focus:ring-red-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <IoClose size={20} />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className={`h-1 w-full ${
            alert.type === 'success' 
              ? 'bg-green-400' 
              : 'bg-red-400'
          } rounded-b-lg animate-progress`}></div>
        </div>
      )}

      {/* Left Side - Image */}
      <div className="w-full hidden md:inline-block">
        <div className="h-full w-full">
          <img 
            src={Login} 
            alt="Jazeera ICT Girls collaborating" 
            className="h-182 w-full object-cover" 
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full flex flex-col items-center justify-center md:p-8">
        <form className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleLogin}>
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className='flex items-center justify-center'>
              <img src={Logo} alt="Jazeera ICT Logo" className='h-32 md:h-40' /> 
            </div>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-bold">Admin Portal</h2>
            <p className="text-sm text-gray-500/90 mt-2">Welcome back! Please sign in to continue</p>
          </div>

          {/* Email Input */}
          <div className="w-full mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className={`flex items-center bg-transparent border ${
              alert.show && alert.type === 'error' 
                ? 'border-red-300 ring-2 ring-red-200' 
                : 'border-gray-300/60'
            } h-12 rounded-lg overflow-hidden pl-4 gap-3 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200`}>
              <MdEmail className={`${
                alert.show && alert.type === 'error' ? 'text-red-500' : 'text-gray-500/80'
              }`} size={18} />
              <input 
                id="email"
                type="email" 
                placeholder="Enter your admin email"  
                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required 
              />                 
            </div>
          </div>

          {/* Password Input */}
          <div className="w-full mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className={`flex items-center bg-transparent border ${
              alert.show && alert.type === 'error' 
                ? 'border-red-300 ring-2 ring-red-200' 
                : 'border-gray-300/60'
            } h-12 rounded-lg overflow-hidden pl-4 gap-3 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200`}>
              <MdLock className={`${
                alert.show && alert.type === 'error' ? 'text-red-500' : 'text-gray-500/80'
              }`} size={18} />
              <input 
                id="password"
                type="password" 
                placeholder="Enter your password" 
                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required 
              />
            </div>
            
            {/* Error hint */}
            {alert.show && alert.type === 'error' && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <MdError size={14} className="mr-1" />
                Please check your email and password
              </p>
            )}
          </div>

       
 

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 rounded-lg text-white bg-gradient-to-r from-blue-500 to-emerald-400 hover:from-blue-600 hover:to-emerald-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign in to Admin'
            )}
          </button>

          {/* Clear Form Button */}
          <button
            type="button"
            onClick={clearForm}
            disabled={isLoading}
            className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            Clear Form
          </button>

          {/* Back to Main Site */}
          <div className="text-center mt-6">
            <Link 
              to="/" 
              className="text-sm text-gray-600 hover:text-gray-700 hover:underline transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Main Site
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;