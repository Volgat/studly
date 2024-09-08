import React, { useState } from 'react';
import { Search, Mic, Image } from 'lucide-react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Logique de recherche à implémenter
    console.log('Recherche :', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Studly</h1>
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-gray-200">Accueil</a>
            <a href="#" className="text-white hover:text-gray-200">Cours</a>
            <a href="#" className="text-white hover:text-gray-200">Réseau Social</a>
            <a href="#" className="text-white hover:text-gray-200">Espace Personnel</a>
            <a href="#" className="text-white hover:text-gray-200">Connexion</a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Bienvenue sur Studly</h2>
          <p className="text-xl">Votre plateforme d'apprentissage en ligne propulsée par l'IA</p>
        </section>

        <section className="mb-12">
          <form onSubmit={handleSearch} className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Posez votre question..."
              className="w-1/2 p-2 border rounded-l"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
              <Search size={24} />
            </button>
            <button type="button" className="ml-2 bg-gray-200 p-2 rounded">
              <Mic size={24} />
            </button>
            <button type="button" className="ml-2 bg-gray-200 p-2 rounded">
              <Image size={24} />
            </button>
          </form>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">Cours populaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Exemple de carte de cours */}
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">Introduction à l'IA</h4>
              <p>Par Prof. Dupont</p>
              <div className="mt-2">
                <span className="text-yellow-500">★★★★☆</span> (4.5/5)
              </div>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">S'inscrire</button>
            </div>
            {/* Répéter pour d'autres cours */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
