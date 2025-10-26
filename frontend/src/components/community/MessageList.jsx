import React from 'react';
import MessageBubble from '../ui/MessageBubble';
import { useAuth } from '../../context/AuthContext';

const MessageList = ({ messages }) => {
  const { user } = useAuth();

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = message.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          {/* Date Separator */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-sm text-gray-500 bg-gray-50 rounded-lg">
              {date}
            </div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Messages for this date */}
          {dateMessages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              currentUser={user}
            />
          ))}
        </div>
      ))}

      {messages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No messages yet
          </h3>
          <p className="text-gray-600">
            Be the first to start a conversation in this channel!
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageList;