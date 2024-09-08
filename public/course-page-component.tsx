import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import InteractiveQuiz from '../components/InteractiveQuiz';
import ProgressTracker from '../components/ProgressTracker';
import DiscussionForum from '../components/DiscussionForum';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await api.getCourse(courseId);
      setCourse(courseData);
      const questions = await api.getCourseQuizQuestions(courseId);
      setQuizQuestions(questions);
    };
    fetchCourseData();
  }, [courseId]);

  if (!course) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{course.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Contenu du cours */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contenu du cours</h2>
            {/* Ajouter le contenu du cours ici */}
          </div>

          <InteractiveQuiz questions={quizQuestions} />
          
          <DiscussionForum courseId={courseId} />
        </div>
        <div>
          <ProgressTracker courses={[course]} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
