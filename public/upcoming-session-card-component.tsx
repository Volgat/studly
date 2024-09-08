import React from 'react';
import { Link } from 'react-router-dom';

const UpcomingSessionCard = ({ session }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(session.scheduledStart).toLocaleString()}
      </p>
      <Link to={`/live-sessions/${session.id}`} className="text-blue-500 hover:underline">
        Voir les détails
      </Link>
    </div>
  );
};

export default UpcomingSessionCard;
