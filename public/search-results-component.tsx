import React from 'react';
import { Book, Link as LinkIcon } from 'lucide-react';

const SearchResults = ({ results }) => {
  // Fonction pour détecter et formater les liens dans le texte
  const formatText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => 
      urlRegex.test(part) ? <a key={index} href={part} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{part}</a> : part
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Résultats de la recherche</h2>
      <div className="space-y-4">
        {results.split('\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700">
            {formatText(paragraph)}
          </p>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Ressources suggérées</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <Book className="mr-2 text-blue-500" />
            <span>Cours recommandé : Introduction à l'IA</span>
          </li>
          <li className="flex items-center">
            <LinkIcon className="mr-2 text-blue-500" />
            <a href="#" className="text-blue-500 hover:underline">Article connexe sur Studly</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
