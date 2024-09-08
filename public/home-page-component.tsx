import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, BarChart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur SecondaryLearn</h1>
        <p className="text-xl mb-8">La plateforme d'apprentissage en ligne qui révolutionne l'éducation secondaire.</p>
        <Link to="/inscription" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
          Commencer maintenant
        </Link>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Nos fonctionnalités</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Search className="w-12 h-12 text-blue-500" />}
            title="Cours interactifs"
            description="Accédez à une vaste bibliothèque de cours conçus par des experts, couvrant toutes les matières du programme secondaire."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-blue-500" />}
            title="Réseau social éducatif"
            description="Connectez-vous avec d'autres étudiants, partagez des ressources et collaborez sur des projets."
          />
          <FeatureCard
            icon={<BarChart className="w-12 h-12 text-blue-500" />}
            title="Suivi de progression"
            description="Suivez votre progression en temps réel et recevez des recommandations personnalisées pour améliorer vos résultats."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HomePage;
