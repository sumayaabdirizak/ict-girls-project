import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cleanup function for invalid localStorage data
  const cleanupInvalidStorage = () => {
    const userData = localStorage.getItem('user');
    const adminData = localStorage.getItem('admin');
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');

    // Clean up invalid user data
    if (userData === 'undefined' || userData === 'null' || userData === '' || !token) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      console.log('Cleaned up invalid user data');
    }

    // Clean up invalid admin data
    if (adminData === 'undefined' || adminData === 'null' || adminData === '' || !adminToken) {
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
      console.log('Cleaned up invalid admin data');
    }
  };

  useEffect(() => {
    cleanupInvalidStorage();
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      
      // Restore user data if available
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('user');
        }
      }
      console.log('🔑 Restored token from localStorage');
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    if (!userData || !token) {
      console.error('Invalid login data provided');
      return;
    }

    console.log('🔐 Storing user token');

    const userWithAdmin = {
      ...userData,
      isAdmin: userData.isAdmin || false
    };

    setUser(userWithAdmin);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithAdmin));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const adminLogin = async (email, password) => {
    try {
      console.log('Attempting admin login with:', { email });

      const response = await axios.post('http://localhost:5000/api/admin/login', { 
        email, 
        password 
      });

      console.log('Admin login response:', response.data);

      let adminUser, token;

      if (response.data.user && response.data.token) {
        adminUser = response.data.user;
        token = response.data.token;
      } else if (response.data.admin && response.data.token) {
        adminUser = response.data.admin;
        token = response.data.token;
      } else if (response.data.data) {
        adminUser = response.data.data.user || response.data.data.admin;
        token = response.data.data.token;
      } else {
        adminUser = response.data;
        token = response.data.token;
      }

      if (adminUser && token) {
        const adminWithRole = {
          ...adminUser,
          role: 'admin'
        };

        localStorage.setItem('adminToken', token);
        localStorage.setItem('admin', JSON.stringify(adminWithRole));
        setAdmin(adminWithRole);

        console.log('Admin login successful:', adminWithRole);
        return response.data;
      } else {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response from server: Missing user or token');
      }
    } catch (error) {
      console.error('Admin login error:', error);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
  };

  const fullLogout = () => {
    logout();
    adminLogout();
    cleanupInvalidStorage();
  };

  const isAdmin = () => {
    return admin !== null;
  };

  const isAuthenticated = () => {
    return user !== null || admin !== null;
  };

  // Get WebSocket authentication token
  const getWebSocketToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('adminToken');
  };

  // Get authenticated WebSocket URL
  const getWebSocketUrl = () => {
    const token = getWebSocketToken();
    const baseUrl = import.meta.env?.VITE_WS_URL || 'ws://localhost:5000';
    return token ? `${baseUrl}?token=${encodeURIComponent(token)}` : null;
  };

  const adminApi = axios.create({
    baseURL: 'http://localhost:5000/api/admin'
  });

  adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        adminLogout();
        window.location.href = '/admin-login';
      }
      return Promise.reject(error);
    }
  );

  const value = {
    user,
    admin,
    token: getWebSocketToken(),
    login,
    logout,
    adminLogin,
    adminLogout,
    fullLogout,
    loading,
    isAuthenticated,
    isAdmin,
    adminApi,
    cleanupInvalidStorage,
    getWebSocketToken,
    getWebSocketUrl
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};