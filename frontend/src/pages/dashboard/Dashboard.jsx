import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.full_name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Ready to continue your ICT journey with fellow Jazeera University students?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.full_name?.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-gray-600">Community Posts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-gray-600">Discussion Categories</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a 
            href="/community" 
            className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:border-blue-300 hover:shadow-md transition-all block"
          >
            <div className="text-3xl mb-3">💬</div>
            <div className="font-semibold text-gray-900">Community</div>
            <div className="text-sm text-gray-600 mt-2">Join discussions with peers</div>
          </a>
          
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:border-blue-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">🏆</div>
            <div className="font-semibold text-gray-900">Competitions</div>
            <div className="text-sm text-gray-600 mt-2">Join coding challenges</div>
          </div>
          
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:border-blue-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">📚</div>
            <div className="font-semibold text-gray-900">Resources</div>
            <div className="text-sm text-gray-600 mt-2">Study materials</div>
          </div>
          
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:border-blue-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">👤</div>
            <div className="font-semibold text-gray-900">Profile</div>
            <div className="text-sm text-gray-600 mt-2">Manage your account</div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <div className="bg-gray-50 px-3 py-2 rounded border border-gray-300 text-gray-900">
                {user?.student_id}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="bg-gray-50 px-3 py-2 rounded border border-gray-300 text-gray-900">
                {user?.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
              <div className="bg-gray-50 px-3 py-2 rounded border border-gray-300 text-gray-900">
                {user?.major || 'Not specified'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <div className="bg-gray-50 px-3 py-2 rounded border border-gray-300 text-gray-900">
                Year {user?.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;