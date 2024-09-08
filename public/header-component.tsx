import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">SecondaryLearn</Link>
        <nav>
          <Link to="/" className="text-white mx-2">Accueil</Link>
          <Link to="/cours" className="text-white mx-2">Cours</Link>
          <Link to="/reseau-social" className="text-white mx-2">Réseau Social</Link>
          <Link to="/espace-personnel" className="text-white mx-2">Espace Personnel</Link>
          <Link to="/logout" className="text-white mx-2">Déconnexion</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
