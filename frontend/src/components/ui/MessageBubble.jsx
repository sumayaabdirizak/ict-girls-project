import React, { useState } from 'react';
import UserAvatar from './UserAvatar';

const MessageBubble = ({ message, currentUser }) => {
  const [showReactions, setShowReactions] = useState(false);
  const isCurrentUser = currentUser?.full_name === message.user;

  const handleReaction = (emoji) => {
    // In a real app, this would update the message in the backend
    console.log(`Added ${emoji} reaction to message ${message.id}`);
    setShowReactions(false);
  };

  const quickReactions = ['👍', '❤️', '😄', '😮', '😢', '🎉'];

  return (
    <div className={`flex space-x-3 hover:bg-gray-50 p-3 rounded-lg transition-colors group ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <UserAvatar 
        user={{ name: message.user }} 
        size="md"
      />
      
      <div className={`flex-1 ${isCurrentUser ? 'text-right' : ''}`}>
        <div className={`flex items-baseline space-x-2 mb-1 ${isCurrentUser ? 'justify-end' : ''}`}>
          <span className="font-semibold text-gray-900 text-sm">{message.user}</span>
          <span className="text-xs text-gray-500">{message.time}</span>
        </div>
        
        <div className={`relative inline-block ${isCurrentUser ? 'text-right' : ''}`}>
          <div 
            className={`inline-block px-4 py-2 rounded-2xl max-w-xs lg:max-w-md cursor-pointer ${
              isCurrentUser 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}
            onDoubleClick={() => handleReaction('❤️')}
          >
            <p className="text-sm leading-relaxed">{message.message}</p>
          </div>

          {/* Reactions */}
          {Object.keys(message.reactions || {}).length > 0 && (
            <div className={`flex flex-wrap gap-1 mt-2 ${isCurrentUser ? 'justify-end' : ''}`}>
              {Object.entries(message.reactions).map(([emoji, count]) => (
                <button
                  key={emoji}
                  className="bg-white border border-gray-300 rounded-full px-2 py-1 text-xs hover:bg-gray-50 transition-colors"
                  onClick={() => handleReaction(emoji)}
                >
                  {emoji} {count}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`flex space-x-4 mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentUser ? 'justify-end' : ''}`}>
          <button 
            className="hover:text-gray-700 transition-colors"
            onClick={() => setShowReactions(!showReactions)}
          >
            😊
          </button>
          <button className="hover:text-gray-700 transition-colors">💬 Reply</button>
          <button className="hover:text-gray-700 transition-colors">🔄 Share</button>
          <button className="hover:text-gray-700 transition-colors">⋯</button>
        </div>

        {/* Reaction Picker */}
        {showReactions && (
          <div className={`absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 mt-1 flex space-x-1 ${isCurrentUser ? 'right-0' : 'left-0'}`}>
            {quickReactions.map(emoji => (
              <button
                key={emoji}
                className="hover:scale-125 transform transition-transform text-lg"
                onClick={() => handleReaction(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;