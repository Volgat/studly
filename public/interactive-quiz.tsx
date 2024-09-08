import React, { useState } from 'react';

const InteractiveQuiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz terminé !</h2>
          <p className="text-xl">Votre score : {score} sur {questions.length}</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Question {currentQuestion + 1}/{questions.length}</h2>
          <p className="mb-4">{questions[currentQuestion].questionText}</p>
          <div className="space-y-2">
            {questions[currentQuestion].answerOptions.map((option, index) => (
              <button
                key={index}
                className="w-full p-2 bg-blue-100 hover:bg-blue-200 rounded"
                onClick={() => handleAnswerClick(option.isCorrect)}
              >
                {option.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InteractiveQuiz;
