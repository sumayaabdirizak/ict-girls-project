import React from 'react';
import { colors } from '../../theme'; // <-- Import your colors

const CommunitySidebar = ({ channels, activeChannel, onChannelChange }) => (
  // Use inline style for the background color
  <div style={{ backgroundColor: colors.jazeera.blue }} className="w-64 text-primary-200 flex flex-col flex-shrink-0">
    <div style={{ borderColor: colors.primary[800] }} className="p-4 font-bold text-lg text-white border-b">
      Channels
    </div>
    <nav className="flex-1 p-2 space-y-1">
      {channels.map(channel => {
        const isActive = activeChannel.id === channel.id;
        return (
          <button
            key={channel.id}
            onClick={() => onChannelChange(channel)}
            // Use inline styles for the active/inactive states
            style={{
              backgroundColor: isActive ? colors.primary[900] : 'transparent',
              color: isActive ? colors.jazeera.gold : colors.primary[200],
            }}
            className="flex items-center w-full text-left rounded-md p-2 transition-colors font-semibold"
          >
            <span className="mr-2 font-bold">#</span>
            <span>{channel.name}</span>
          </button>
        );
      })}
    </nav>
  </div>
);

export default CommunitySidebar;