import React from 'react';
import { Users } from 'lucide-react';

const GroupsList = ({ groups }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Vos groupes d'étude</h2>
      <ul className="space-y-3">
        {groups.map((group) => (
          <li key={group.id} className="flex items-center">
            <Users size={18} className="mr-2 text-blue-500" />
            <span>{group.name}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Créer un groupe
      </button>
    </div>
  );
};

export default GroupsList;
