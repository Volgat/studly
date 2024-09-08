import React from 'react';
import { Link } from 'react-router-dom';

const CourseProgressCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{course.progress}% complété</span>
        <Link to={`/courses/${course.id}`} className="text-blue-500 hover:underline">
          Continuer
        </Link>
      </div>
    </div>
  );
};

export default CourseProgressCard;
