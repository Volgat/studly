import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const SocialNetworkPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      // Simulated API call
      const fetchedPosts = [
        { id: 1, author: 'Alice', content: 'Just finished my AI project!', likes: 15 },
        { id: 2, author: 'Bob', content: 'Anyone want to study for the math exam?', likes: 8 },
        { id: 3, author: 'Charlie', content: 'Great literature lecture today!', likes: 12 },
      ];
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Réseau Social</h1>
      <div className="mb-8">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Quoi de neuf ?"
          rows="3"
        ></textarea>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Publier</button>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{post.author}</h3>
            <p>{post.content}</p>
            <button className="text-blue-500 mt-2">Like ({post.likes})</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialNetworkPage;
