import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import PostForm from './PostForm';
import PostList from './PostList';
import GroupsList from './GroupsList';
import FriendSuggestions from './FriendSuggestions';
import Notifications from './Notifications';

const SocialNetworkPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchSocialData = async () => {
      const fetchedPosts = await api.getPosts();
      setPosts(fetchedPosts);
      const fetchedGroups = await api.getUserGroups(user.id);
      setGroups(fetchedGroups);
    };
    fetchSocialData();
  }, [user.id]);

  const handleNewPost = async (postContent) => {
    const newPost = await api.createPost(user.id, postContent);
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Réseau Social Studly</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <PostForm onSubmit={handleNewPost} />
          <PostList posts={posts} />
        </div>
        <div>
          <Notifications />
          <GroupsList groups={groups} />
          <FriendSuggestions />
        </div>
      </div>
    </div>
  );
};

export default SocialNetworkPage;
