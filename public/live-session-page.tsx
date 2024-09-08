import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import LiveBroadcast from '../components/LiveBroadcast';
import LiveViewer from '../components/LiveViewer';
import { useAuth } from '../context/AuthContext';

const LiveSessionPage = () => {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const sessionData = await api.getLiveSessionById(sessionId);
        setSession(sessionData);
        setIsHost(sessionData.hostId === user.id);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la session:', error);
      }
    };

    fetchSessionData();
  }, [sessionId, user.id]);

  if (!session) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{session.title}</h1>
      {isHost ? (
        <LiveBroadcast sessionId={sessionId} />
      ) : (
        <LiveViewer sessionId={sessionId} />
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">À propos de cette session</h2>
        <p className="text-gray-700">{session.description}</p>
      </div>
    </div>
  );
};

export default LiveSessionPage;
