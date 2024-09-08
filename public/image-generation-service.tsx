const REPLICATE_API_TOKEN = 'VOTRE_TOKEN_API_REPLICATE';
const API_URL = 'https://api.replicate.com/v1/predictions';

export const generateImage = async (prompt) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",
        input: { prompt: `course thumbnail for ${prompt}` }
      }),
    });

    const prediction = await response.json();
    
    // Attendre que l'image soit générée
    let imageUrl;
    while (!imageUrl) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const statusResponse = await fetch(prediction.urls.get, {
        headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` },
      });
      const status = await statusResponse.json();
      if (status.status === 'succeeded') {
        imageUrl = status.output[0];
      } else if (status.status === 'failed') {
        throw new Error('Image generation failed');
      }
    }

    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};
