import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const LiveSessionsList = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const upcoming = await api.getUpcomingLiveSessions();
        const live = await api.getLiveSessions();
        setUpcomingSessions(upcoming);
        setLiveSessions(live);
      } catch (error) {
        console.error('Erreur lors de la récupération des sessions:', error);
      }
    };

    fetchSessions();
    // Mettre en place un intervalle pour actualiser les données régulièrement
    const interval = setInterval(fetchSessions, 60000); // Actualiser toutes les minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Sessions en direct en cours</h2>
        {liveSessions.length > 0 ? (
          <ul className="space-y-4">
            {liveSessions.map(session => (
              <li key={session.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{session.title}</h3>
                <p className="text-gray-600">{session.description}</p>
                <Link to={`/live-sessions/${session.id}`} className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Rejoindre maintenant
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune session en direct en cours pour le moment.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Sessions à venir</h2>
        {upcomingSessions.length > 0 ? (
          <ul className="space-y-4">
            {upcomingSessions.map(session => (
              <li key={session.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{session.title}</h3>
                <p className="text-gray-600">{session.description}</p>
                <p className="text-sm text-gray-500 mt-2">Commence le : {new Date(session.scheduledStart).toLocaleString()}</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Ajouter un rappel
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune session programmée pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default LiveSessionsList;
