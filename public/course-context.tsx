import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const removeCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, removeCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
