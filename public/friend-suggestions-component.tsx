import React from 'react';

const FriendSuggestions = () => {
  const suggestions = [
    { id: 1, name: 'Alice Durand', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Thomas Martin', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Sophie Leclerc', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Suggestions d'amis</h2>
      <ul className="space-y-4">
        {suggestions.map((friend) => (
          <li key={friend.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
              <span>{friend.name}</span>
            </div>
            <button className="text-blue-500 hover:text-blue-600">Ajouter</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSuggestions;
