import React from 'react';

const ActivityFeed = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="bg-white shadow-md rounded-lg p-4">
          <p className="text-sm">{activity.description}</p>
          <span className="text-xs text-gray-500">
            {new Date(activity.timestamp).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
