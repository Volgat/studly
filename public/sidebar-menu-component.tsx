import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <nav className="w-64 bg-gray-100 p-6 rounded-lg">
      <ul className="space-y-2">
        <li><Link to="/espace-personnel" className="block py-2 px-4 hover:bg-gray-200 rounded">Tableau de bord</Link></li>
        <li><Link to="/espace-personnel/profil" className="block py-2 px-4 hover:bg-gray-200 rounded">Modifier le profil</Link></li>
        <li><Link to="/espace-personnel/cours" className="block py-2 px-4 hover:bg-gray-200 rounded">Mes cours</Link></li>
        <li><Link to="/espace-personnel/etudiants" className="block py-2 px-4 hover:bg-gray-200 rounded">Mes étudiants</Link></li>
        <li><Link to="/espace-personnel/abonnements" className="block py-2 px-4 hover:bg-gray-200 rounded">Mes abonnements</Link></li>
        <li><Link to="/espace-personnel/parametres" className="block py-2 px-4 hover:bg-gray-200 rounded">Paramètres</Link></li>
      </ul>
    </nav>
  );
};

export default SidebarMenu;
