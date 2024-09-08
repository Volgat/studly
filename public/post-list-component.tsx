import React from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const PostList = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <p className="mb-4">{post.content}</p>
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-500 hover:text-blue-500">
              <ThumbsUp size={18} className="mr-1" /> {post.likes} J'aime
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500">
              <MessageCircle size={18} className="mr-1" /> {post.comments} Commentaires
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500">
              <Share2 size={18} className="mr-1" /> Partager
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
