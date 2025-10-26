import React from 'react';
import { MdStorage, MdImage, MdVideocam, MdDescription, MdMusicNote, MdSearch } from "react-icons/md";

const StorageAnalytics = () => {
  const storageData = [
    { type: 'Image', used: 24000, total: 105000, color: 'bg-blue-500', icon: <MdImage className="text-white" size={16} /> },
    { type: 'Video', used: 28000, total: 105000, color: 'bg-purple-500', icon: <MdVideocam className="text-white" size={16} /> },
    { type: 'Documents', used: 35000, total: 105000, color: 'bg-green-500', icon: <MdDescription className="text-white" size={16} /> },
    { type: 'Audio', used: 18000, total: 105000, color: 'bg-orange-500', icon: <MdMusicNote className="text-white" size={16} /> },
  ];

  const monthlyData = [85, 92, 78, 105, 98, 110, 95, 102, 88, 96, 104, 98];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const totalUsedGB = 105000;
  const totalUsedPercentage = 78;
  const totalAvailablePercentage = 22;
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MdStorage className="text-xl text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Total Storage used</h2>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalUsedGB.toLocaleString()} GB</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-green-600">32.40% increase from last year</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Storage Breakdown */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Storage Breakdown</h3>
            <div className="space-y-4">
              {storageData.map((item, index) => {
                const percentage = Math.round((item.used / item.total) * 100);
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                          {item.icon}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 block">{item.type}</span>
                          <span className="text-xs text-gray-500">{percentage}% of total</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.used.toLocaleString()} GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Channels Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Channels</h4>
                <p className="text-2xl font-bold text-blue-600 mt-1">456</p>
                <p className="text-xs text-gray-500 mt-1">Total communication channels</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">+32 today</p>
                <p className="text-xs text-gray-500">new messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Charts and Progress */}
        <div className="space-y-8">
          {/* Monthly Usage Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Monthly Usage (GB)</h3>
              <span className="text-xs text-gray-500">Last 12 months</span>
            </div>
            <div className="flex items-end justify-between h-40 bg-gradient-to-b from-blue-50 to-transparent rounded-lg p-4">
              {monthlyData.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1 mx-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                    style={{ height: `${(value / 120) * 100}%`, minHeight: '8px' }}
                    title={`${months[index]}: ${value}GB`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{months[index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Circular Progress */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 - (totalUsedPercentage / 100) * 2 * Math.PI * 40}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{totalUsedPercentage}%</span>
                  <span className="text-xs text-gray-500">Used</span>
                </div>
              </div>
              
              {/* Legend */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Used storage</span>
                    <span className="text-xs text-gray-500">{totalUsedPercentage}% • 105,000 GB</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Available storage</span>
                    <span className="text-xs text-gray-500">{totalAvailablePercentage}% • 29,615 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageAnalytics;