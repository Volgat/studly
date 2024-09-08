import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import SidebarMenu from '../components/SidebarMenu';
import DashboardStats from '../components/DashboardStats';

const TeacherDashboardPage = () => {
  const { user } = useAuth();
  const { courses } = useCourses();

  const stats = {
    activeCourses: courses.length,
    enrolledStudents: courses.reduce((sum, course) => sum + course.students, 0),
    averageCompletion: 87,
    averageRating: 4.8
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <SidebarMenu />
      <div className="flex-grow ml-8">
        <h1 className="text-3xl font-bold mb-8">Espace Personnel</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Bonjour, {user.name}</h2>
          <p>Type de compte : Professeur</p>
        </div>
        <DashboardStats stats={stats} />
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-500 text-white p-3 rounded">Soumettre un cours</button>
            <button className="bg-green-500 text-white p-3 rounded">Voir mes étudiants</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
