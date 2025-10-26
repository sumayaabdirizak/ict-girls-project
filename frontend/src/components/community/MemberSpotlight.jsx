import React from 'react';
import UserAvatar from '../ui/UserAvatar';

const MemberSpotlight = () => {
  const spotlightMember = {
    name: 'Salma Adam',
    major: 'Computer Science',
    year: 'Year 3',
    achievement: 'Won last month\'s Web Development competition 🏆',
    avatar: 'SA'
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">🌟 Member Spotlight</h3>
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
        <div className="text-center">
          <UserAvatar 
            user={spotlightMember} 
            size="xl" 
            showStatus 
            status="online"
          />
          <h4 className="font-semibold text-gray-900 mt-3">{spotlightMember.name}</h4>
          <p className="text-sm text-gray-600 mb-2">
            {spotlightMember.major} • {spotlightMember.year}
          </p>
          <p className="text-xs text-gray-700 mb-3">
            {spotlightMember.achievement}
          </p>
          <button className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberSpotlight;