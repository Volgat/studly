import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressTracker = ({ courses }) => {
  const overallProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Suivi de progression</h2>
      <div className="flex items-center justify-center mb-6">
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar
            value={overallProgress}
            text={`${overallProgress.toFixed(0)}%`}
            styles={buildStyles({
              textColor: '#3B82F6',
              pathColor: '#3B82F6',
            })}
          />
        </div>
      </div>
      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{course.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
