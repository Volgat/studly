import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import CourseCard from './CourseCard';

const RecommendationSystem = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user) {
        const userRecommendations = await api.getRecommendations(user.id);
        setRecommendations(userRecommendations);
      }
    };
    fetchRecommendations();
  }, [user]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommandations pour vous</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSystem;
