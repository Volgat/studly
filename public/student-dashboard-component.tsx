import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import CourseProgressCard from '../components/CourseProgressCard';
import UpcomingSessionCard from '../components/UpcomingSessionCard';
import ActivityFeed from '../components/ActivityFeed';

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const courses = await api.getEnrolledCourses(user.id);
        setEnrolledCourses(courses);

        const sessions = await api.getUpcomingLiveSessions();
        setUpcomingSessions(sessions);

        const activities = await api.getRecentActivities(user.id);
        setRecentActivities(activities);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
      }
    };

    fetchDashboardData();
  }, [user.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord de {user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Mes cours</h2>
          <div className="space-y-4">
            {enrolledCourses.map(course => (
              <CourseProgressCard key={course.id} course={course} />
            ))}
          </div>
          <Link to="/courses" className="mt-4 inline-block text-blue-500 hover:underline">
            Voir tous mes cours
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Prochaines sessions en direct</h2>
          <div className="space-y-4">
            {upcomingSessions.slice(0, 3).map(session => (
              <UpcomingSessionCard key={session.id} session={session} />
            ))}
          </div>
          <Link to="/live-sessions" className="mt-4 inline-block text-blue-500 hover:underline">
            Voir toutes les sessions
          </Link>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Activités récentes</h2>
          <ActivityFeed activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
