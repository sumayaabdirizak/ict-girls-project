import React from 'react';

const ChannelButton = ({ channel, isActive, unreadCount, onClick }) => {
  return (
    <button
      onClick={() => onClick(channel.id)}
      className={`flex items-center w-full text-left p-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="mr-2 text-lg">{channel.icon}</span>
      <span className="flex-1">{channel.name}</span>
      {unreadCount > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default ChannelButton;