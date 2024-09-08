import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const ProfileEditForm = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
    additional_info: {}
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await api.getUserProfile(user.id);
      setProfile(userProfile);
    };
    fetchProfile();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.updateUserProfile(user.id, profile);
    // Afficher un message de succès
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="full_name" className="block mb-1">Nom complet</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={profile.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="bio" className="block mb-1">Biographie</label>
        <textarea
          id="bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
      </div>
      <div>
        <label htmlFor="avatar_url" className="block mb-1">URL de l'avatar</label>
        <input
          type="text"
          id="avatar_url"
          name="avatar_url"
          value={profile.avatar_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Ajoutez d'autres champs spécifiques au type d'utilisateur ici */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Mettre à jour le profil
      </button>
    </form>
  );
};

export default ProfileEditForm;
