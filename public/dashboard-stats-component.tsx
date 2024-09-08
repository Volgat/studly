import React from 'react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard title="Cours actifs" value={stats.activeCourses} />
      <StatCard title="Étudiants inscrits" value={stats.enrolledStudents} />
      <StatCard title="Taux de complétion moyen" value={`${stats.averageCompletion}%`} />
      <StatCard title="Note moyenne" value={stats.averageRating} />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold text-blue-500">{value}</p>
  </div>
);

export default DashboardStats;
