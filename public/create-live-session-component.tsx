import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth-context';
import { api } from '../services/api';

const CreateLiveSession = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [sessionData, setSessionData] = useState({
    title: '',
    description: '',
    scheduledStart: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSession = await api.createLiveSession(courseId, user.id, sessionData);
      // Rediriger vers la page de la session en direct
      history.push(`/courses/${courseId}/live-sessions/${newSession.id}`);
    } catch (error) {
      console.error('Erreur lors de la création de la session en direct:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">Titre de la session</label>
        <input
          type="text"
          id="title"
          name="title"
          value={sessionData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={sessionData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="scheduledStart" className="block mb-1">Date et heure de début</label>
        <input
          type="datetime-local"
          id="scheduledStart"
          name="scheduledStart"
          value={sessionData.scheduledStart}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Créer la session en direct
      </button>
    </form>
  );
};

export default CreateLiveSession;
