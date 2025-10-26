import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, channel }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message #${channel}`}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <button type="button" className="text-gray-400 hover:text-gray-600">
              😊
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-600">
              📎
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
      
      <div className="mt-2 text-xs text-gray-500">
        Press Enter to send • Shift+Enter for new line
      </div>
    </div>
  );
};

export default MessageInput;