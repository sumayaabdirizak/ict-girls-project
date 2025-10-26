import React from 'react';
import MemberSpotlight from './MemberSpotlight';
import OnlineUsers from './OnlineUsers';
import StudyGroupFinder from './StudyGroupFinder';

const MembersSidebar = ({ onlineUsers, studyGroups }) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <MemberSpotlight />
      <OnlineUsers onlineUsers={onlineUsers} />
      <StudyGroupFinder studyGroups={studyGroups} />
    </div>
  );
};

export default MembersSidebar;