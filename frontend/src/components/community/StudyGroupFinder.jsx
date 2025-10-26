import React from 'react';

const StudyGroupFinder = ({ studyGroups }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">🔬 Study Group Finder</h3>
      <div className="space-y-3">
        {studyGroups.map(group => (
          <div key={group.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">{group.name}</h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {group.members} members
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">{group.topic}</p>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Next: {group.nextSession}</span>
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Join
              </button>
            </div>
          </div>
        ))}
        <button className="w-full border border-dashed border-gray-300 text-gray-500 rounded-lg py-2 text-sm hover:border-gray-400 hover:text-gray-600 transition-colors">
          + Create Study Group
        </button>
      </div>
    </div>
  );
};

export default StudyGroupFinder;