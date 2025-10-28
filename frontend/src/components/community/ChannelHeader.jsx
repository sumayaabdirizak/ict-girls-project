import React from 'react';
import { Hash, BookOpen, Users, Briefcase, Search, Pin, User, MoreVertical } from 'lucide-react';

const channelMeta = {
  'general chat': { icon: Hash, color: '#0ea5e9' },
  'courses help': { icon: BookOpen, color: '#059669' },
  'project teams': { icon: Users, color: '#d946ef' },
  'internships & jobs': { icon: Briefcase, color: '#f59e0b' },
  default: { icon: Hash, color: '#6b7280' },
};

const ChannelHeader = ({ channel, onlineCount, onToggleMembersSidebar }) => {
  const meta = channel?.name ? (channelMeta[channel.name.toLowerCase()] || channelMeta.default) : channelMeta.default;
  const IconComponent = meta.icon;

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 shadow-sm z-10 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
          <IconComponent className="w-6 h-6 flex-shrink-0" style={{ color: meta.color }} />
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{channel?.name || 'Loading...'}</h1>
            {channel?.description && <p className="text-sm text-gray-500 truncate hidden sm:block">{channel.description}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>{onlineCount || 0} Online</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-1">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-jazeera-gold"><Search size={20} /></button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-jazeera-gold"><Pin size={20} /></button>
            <button onClick={onToggleMembersSidebar} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-jazeera-gold"><User size={20} /></button>
          </div>
          <div className="sm:hidden">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"><MoreVertical size={20} /></button>
          </div>
          <button className="bg-jazeera-blue text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-sm hover:bg-primary-900 transition-colors shadow-sm hover:shadow-md">Invite</button>
        </div>
      </div>
    </header>
  );
};

export default ChannelHeader;