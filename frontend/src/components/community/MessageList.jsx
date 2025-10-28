import React from 'react';
import { format, isToday, isYesterday, isSameDay, parseISO } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

const Message = ({ msg, isGroupStart }) => {
  const timestamp = msg.createdAt ? format(parseISO(msg.createdAt), 'h:mm a') : '';

  return (
    <div className="group relative flex items-start space-x-4 px-4 py-1 rounded-md hover:bg-primary-50">
      <div className="w-10 h-10 flex-shrink-0">
        {isGroupStart && (
          <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">{msg.avatar}</div>
        )}
      </div>
      <div className="flex-1">
        {isGroupStart && (
          <div className="flex items-baseline space-x-2"><span className="font-bold text-gray-900">{msg.user}</span></div>
        )}
        <p className="text-gray-700">{msg.message}</p>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
        <div className="absolute top-0 right-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-md"><MoreHorizontal size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DateSeparator = ({ date }) => {
  const formatDate = (isoDate) => {
    if (!isoDate) return 'Today';
    const d = parseISO(isoDate);
    if (isToday(d)) return 'Today';
    if (isYesterday(d)) return 'Yesterday';
    return format(d, 'MMMM d, yyyy');
  };

  return (
    <div className="relative text-center my-4">
      <hr className="border-gray-200" />
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-sm font-semibold text-gray-500">{formatDate(date)}</span>
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div className="space-y-1">
      {messages.map((msg, index) => {
        const prevMsg = messages[index - 1];
        const isGroupStart = !prevMsg || prevMsg.user !== msg.user || !isSameDay(parseISO(prevMsg.createdAt || new Date()), parseISO(msg.createdAt || new Date()));
        const showDateSeparator = !prevMsg || !isSameDay(parseISO(prevMsg.createdAt || new Date()), parseISO(msg.createdAt || new Date()));
        return (
          <React.Fragment key={msg.id}>
            {showDateSeparator && <DateSeparator date={msg.createdAt} />}
            <Message msg={msg} isGroupStart={isGroupStart} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MessageList;