import React from 'react';

const ManageCommunity = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Community Management</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Create Community
            </button>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500">Community management interface coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCommunity;