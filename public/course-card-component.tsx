import React from 'react';
import { BookOpen, User, Clock } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={`https://source.unsplash.com/400x300/?${encodeURIComponent(course.title)}`}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <User size={16} className="mr-2" />
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <BookOpen size={16} className="mr-2" />
          <span>{course.level}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-2" />
          <span>{course.duration}</span>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-100">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
          En savoir plus
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
