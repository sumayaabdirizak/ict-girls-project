import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../ui/UserAvatar';
import ChannelButton from '../ui/ChannelButton';

const CommunitySidebar = ({ 
  channels, 
  activeChannel, 
  onChannelChange, 
  onlineUsers 
}) => {
  const { user } = useAuth();

  const channelCategories = [
    {
      title: 'Starred',
      channels: [
        { id: 'starred-1', name: 'Important Announcements', icon: '⭐', unread: 0 }
      ]
    },
    {
      title: 'Channels',
      channels: channels
    },
    {
      title: 'Direct Messages',
      channels: onlineUsers.map(user => ({
        id: `dm-${user.id}`,
        name: user.name,
        icon: '👤',
        unread: 0
      }))
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">🎓 ICT Girls</h1>
        <p className="text-sm text-gray-600">Jazeera University</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {channelCategories.map((category, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase">
                {category.title}
              </h3>
              {category.title === 'Channels' && (
                <button className="text-gray-400 hover:text-gray-600 text-sm">+</button>
              )}
            </div>
            <div className="space-y-1">
              {category.channels.map(channel => (
                <ChannelButton
                  key={channel.id}
                  channel={channel}
                  isActive={activeChannel === channel.id}
                  unreadCount={channel.unread}
                  onClick={onChannelChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <UserAvatar 
            user={user} 
            size="sm" 
            showStatus 
            status="online" 
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.full_name}
            </p>
            <p className="text-xs text-gray-500 truncate">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;