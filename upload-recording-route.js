const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('./db');

const upload = multer({ dest: 'uploads/' });

// ... autres routes ...

router.post('/live-sessions/:sessionId/upload-recording', upload.single('video'), async (req, res) => {
  const { sessionId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Aucun fichier n\'a été téléversé.' });
  }

  try {
    // Mettre à jour l'URL de l'enregistrement dans la base de données
    await db.query('UPDATE live_sessions SET recording_url = $1 WHERE id = $2', [file.path, sessionId]);
    res.json({ message: 'Enregistrement téléversé avec succès' });
  } catch (error) {
    console.error('Erreur lors du téléversement de l\'enregistrement:', error);
    res.status(500).json({ error: 'Erreur lors du téléversement de l\'enregistrement' });
  }
});

module.exports = router;
