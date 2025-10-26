import React from 'react';
import StorageAnalytics from '../components/StorageAnalytics';
import DashboardStats from '../components/DashboardStats';
import { MdPeople, MdGroups, MdSettings, MdAnnouncement, MdTrendingUp, MdWeb } from "react-icons/md";

const AdminDashboard = () => {
  // Sample recent activity data
  const recentActivities = [
    {
      id: 1,
      action: 'New user registration',
      user: 'Sarah Johnson',
      time: '2 minutes ago',
      type: 'user'
    },
    {
      id: 2,
      action: 'Community created',
      user: 'Web Dev Club',
      time: '1 hour ago',
      type: 'community'
    },
    {
      id: 3,
      action: 'Website content updated',
      user: 'Landing page',
      time: '3 hours ago',
      type: 'website'
    },
    {
      id: 4,
      action: 'Storage threshold reached',
      user: 'Image storage',
      time: '5 hours ago',
      type: 'storage'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'Add, edit or remove user accounts',
      icon: <MdPeople className="text-blue-600" size={24} />,
      path: '/admin/users',
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Manage Community',
      description: 'Create or moderate communities',
      icon: <MdGroups className="text-green-600" size={24} />,
      path: '/admin/community',
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Website Settings',
      description: 'Update landing and about pages',
      icon: <MdWeb className="text-purple-600" size={24} />,
      path: '/admin/website',
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: <MdSettings className="text-orange-600" size={24} />,
      path: '/admin/settings',
      color: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return <MdPeople className="text-blue-500" size={20} />;
      case 'community':
        return <MdGroups className="text-green-500" size={20} />;
      case 'website':
        return <MdWeb className="text-purple-500" size={20} />;
      case 'storage':
        return <MdTrendingUp className="text-orange-500" size={20} />;
      default:
        return <MdAnnouncement className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20"> {/* Added pt-20 for header spacing */}
   
      {/* Quick Stats */}
      <div className="mb-8">
        <DashboardStats />
      </div>

      {/* Storage Analytics Section */}
      <div className="mb-8">
        <StorageAnalytics />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${action.color}`}
                onClick={() => console.log(`Navigate to: ${action.path}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Platform Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="text-sm text-gray-900">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm text-gray-900">99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;