import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const StudyGroupsPage = () => {
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        const groups = await api.getStudyGroups();
        setStudyGroups(groups);
      } catch (error) {
        console.error('Failed to fetch study groups:', error);
      }
    };
    fetchStudyGroups();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Groupes d'étude</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyGroups.map(group => (
          <div key={group.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
            <p className="text-gray-600 mb-4">{group.topic}</p>
            <p>{group.members} membres</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Rejoindre</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGroupsPage;
