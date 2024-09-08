import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        className="w-full p-3 border rounded-lg resize-none"
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Partagez vos pensées, questions ou découvertes..."
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Publier
      </button>
    </form>
  );
};

export default PostForm;
