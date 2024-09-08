import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const SignupPage = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    termsAccepted: false,
    typeConfirmed: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!formData.userType || !formData.typeConfirmed) {
      setError('Veuillez sélectionner et confirmer votre type d\'utilisateur.');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Vous devez accepter les conditions d\'utilisation.');
      return;
    }

    try {
      const user = await api.signup(formData);
      login(user);
      history.push('/dashboard');
    } catch (error) {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Type d'utilisateur</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="student"
                checked={formData.userType === 'student'}
                onChange={handleChange}
                className="mr-2"
              />
              Étudiant
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="teacher"
                checked={formData.userType === 'teacher'}
                onChange={handleChange}
                className="mr-2"
              />
              Professeur
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="institution"
                checked={formData.userType === 'institution'}
                onChange={handleChange}
                className="mr-2"
              />
              Institution
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="typeConfirmed"
              checked={formData.typeConfirmed}
              onChange={handleChange}
              className="mr-2"
            />
            Je confirme mon type d'utilisateur sélectionné
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            J'accepte les conditions d'utilisation
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Créer mon compte
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
