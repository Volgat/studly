import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import CourseCard from '../components/CourseCard';
import UpcomingSessionCard from '../components/UpcomingSessionCard';
import ActivityFeed from '../components/ActivityFeed';

const InstitutionDashboardPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, totalEnrollments: 0, averageRating: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const institutionCourses = await api.getInstitutionCourses(user.id);
        setCourses(institutionCourses);

        const sessions = await api.getUpcomingLiveSessions(user.id);
        setUpcomingSessions(sessions);

        const activities = await api.getRecentActivities(user.id);
        setRecentActivities(activities);

        const institutionStats = await api.getInstitutionStats(user.id);
        setStats(institutionStats);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
      }
    };

    fetchDashboardData();
  }, [user.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord de {user.institutionName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Total des étudiants</h3>
          <p className="text-3xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Total des inscriptions</h3>
          <p className="text-3xl font-bold">{stats.totalEnrollments}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Note moyenne</h3>
          <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}/5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Nos cours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.slice(0, 4).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <Link to="/manage-courses" className="mt-4 inline-block text-blue-500 hover:underline">
            Gérer tous les cours
          </Link>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Sessions en direct à venir</h2>
          <div className="space-y-4">
            {upcomingSessions.slice(0, 3).map(session => (
              <UpcomingSessionCard key={session.id} session={session} />
            ))}
          </div>
          <Link to="/manage-live-sessions" className="mt-4 inline-block text-blue-500 hover:underline">
            Gérer toutes les sessions en direct
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Activités récentes</h2>
          <ActivityFeed activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboardPage;
