import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, BarChart } from 'lucide-react';
import CourseSection from '../components/CourseSection';
import RecommendationSystem from '../components/RecommendationSystem';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const HomePage = () => {
  const { user } = useAuth();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await api.getFeaturedCourses();
        setFeaturedCourses(coursesData);
        const categoriesData = await api.getCourseCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Studly</h1>
        <p className="text-xl mb-8">La plateforme d'apprentissage en ligne propulsée par l'IA pour les étudiants et les professeurs.</p>
        <Link to="/inscription" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
          Commencer maintenant
        </Link>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Nos fonctionnalités</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Search className="w-12 h-12 text-blue-500" />}
            title="Recherche IA"
            description="Posez vos questions et obtenez des réponses instantanées grâce à notre assistant IA intégré."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-blue-500" />}
            title="Réseau social éducatif"
            description="Connectez-vous avec d'autres étudiants, partagez des ressources et collaborez sur des projets."
          />
          <FeatureCard
            icon={<BarChart className="w-12 h-12 text-blue-500" />}
            title="Suivi de progression"
            description="Suivez votre progression en temps réel et recevez des recommandations personnalisées."
          />
        </div>
      </section>

      {user && <RecommendationSystem />}

      <CourseSection title="Cours en vedette" courses={featuredCourses} />

      {categories.map((category) => (
        <CourseSection key={category.id} title={category.name} courses={category.courses} />
      ))}
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
