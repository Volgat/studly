import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const DiscussionForum = ({ courseId }) => {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchDiscussions = async () => {
      const forumData = await api.getDiscussions(courseId);
      setDiscussions(forumData);
    };
    fetchDiscussions();
  }, [courseId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = await api.createDiscussionPost(courseId, user.id, newPost);
      setDiscussions([...discussions, post]);
      setNewPost('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Forum de discussion</h2>
      <div className="space-y-4 mb-6">
        {discussions.map(post => (
          <div key={post.id} className="bg-gray-100 p-4 rounded">
            <p className="font-semibold">{post.author}</p>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">{post.timestamp}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handlePostSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Votre message..."
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Poster
        </button>
      </form>
    </div>
  );
};

export default DiscussionForum;
