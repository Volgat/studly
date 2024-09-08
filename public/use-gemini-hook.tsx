import { useState } from 'react';

const API_KEY = 'AIzaSyBZMZXml_nUOGFrChX1A5pb7VlS5UP2OQU';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const searchGemini = async (query, type) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      let body;
      if (type === 'text') {
        body = JSON.stringify({
          contents: [{ parts: [{ text: query }] }]
        });
      } else if (type === 'image') {
        body = JSON.stringify({
          contents: [{ parts: [{ inlineData: { mimeType: "image/jpeg", data: query.split(',')[1] } }] }]
        });
      } else if (type === 'audio') {
        // Conversion de l'audio en texte serait nécessaire ici
        // Pour cet exemple, nous allons simplement envoyer un texte indiquant que c'est une recherche audio
        body = JSON.stringify({
          contents: [{ parts: [{ text: "Ceci est une recherche audio : " + query }] }]
        });
      }

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Erreur lors de la recherche');
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
        setResults(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Aucun résultat trouvé');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { searchGemini, loading, error, results };
};
