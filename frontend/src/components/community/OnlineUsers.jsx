import React from 'react';
import UserAvatar from '../ui/UserAvatar';

const OnlineUsers = ({ onlineUsers }) => {
  const onlineCount = onlineUsers.filter(user => user.status === 'online').length;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Online Now ({onlineCount})
      </h3>
      <div className="space-y-3">
        {onlineUsers.map(user => (
          <div key={user.id} className="flex items-center">
            <UserAvatar 
              user={user} 
              size="sm" 
              showStatus 
              status={user.status}
            />
            <div className="ml-3 flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 truncate">{user.major}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;