import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget title="Mes cours en cours">
          <ul className="list-disc list-inside">
            <li>Mathématiques avancées</li>
            <li>Physique quantique</li>
            <li>Littérature française</li>
          </ul>
        </DashboardWidget>
        <DashboardWidget title="Prochains examens">
          <ul className="list-disc list-inside">
            <li>Algèbre - 15 mai</li>
            <li>Histoire moderne - 22 mai</li>
            <li>Chimie organique - 1er juin</li>
          </ul>
        </DashboardWidget>
        <DashboardWidget title="Activité récente">
          <ul className="list-disc list-inside">
            <li>Commentaire sur le cours de biologie</li>
            <li>Nouveau message de Marie Dupont</li>
            <li>Badge obtenu : Expert en physique</li>
          </ul>
        </DashboardWidget>
        <DashboardWidget title="Statistiques">
          <div className="grid grid-cols-3 gap-4 text-center">
            <Stat value="85%" label="Progression moyenne" />
            <Stat value="12" label="Cours terminés" />
            <Stat value="4.8" label="Note moyenne" />
          </div>
        </DashboardWidget>
      </div>
    </div>
  );
};

const DashboardWidget = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

const Stat = ({ value, label }) => {
  return (
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default DashboardPage;
