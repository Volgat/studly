import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const CourseMaterialUpload = () => {
  const { courseId } = useParams();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    await api.uploadCourseMaterial(courseId, formData);
    // Afficher un message de succès et réinitialiser le formulaire
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">Titre du matériel</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="file" className="block mb-1">Fichier (PDF, Vidéo, Image)</label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          accept=".pdf,video/*,image/*"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Téléverser le matériel
      </button>
    </form>
  );
};

export default CourseMaterialUpload;
