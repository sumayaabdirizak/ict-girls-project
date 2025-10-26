// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/public/Landing';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Community from './pages/community/Community';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginModal from './pages/auth/LoginModal';
import RegisterModal from './pages/auth/RegisterModal';
import AdminLogin from './pages/auth/AdminLogin';

// Admin Components
import AdminLayout from './Admin/components/AdminLayout';
import AdminDashboard from './Admin/pages/AdminDashboard';
import ManageUsers from './Admin/pages/ManageUsers';
import ManageCommunity from './Admin/pages/ManageCommunity';
import ManageWebsite from './Admin/pages/ManageWebsite';
import Settings from './Admin/pages/Settings';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          {/* Public Navbar - Only show for non-admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="/admin-login" element={null} />
            <Route path="*" element={
              <Navbar 
                onLoginClick={() => setIsLoginModalOpen(true)}
                onRegisterClick={() => setIsRegisterModalOpen(true)}
              />
            } />
          </Routes>
          
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              
              {/* Protected User Routes */}
              <Route 
                path="/community" 
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Routes with nested layout */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                } 
              >
                {/* Nested admin routes */}
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="community" element={<ManageCommunity />} />
                <Route path="website" element={<ManageWebsite />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </main>

          {/* Public Footer - Only show for non-admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="/admin-login" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>

          {/* Auth Modals */}
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)}
            onSwitchToRegister={switchToRegister}
          />
          <RegisterModal 
            isOpen={isRegisterModalOpen} 
            onClose={() => setIsRegisterModalOpen(false)}
            onSwitchToLogin={switchToLogin}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;