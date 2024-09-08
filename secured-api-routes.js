const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('./authMiddleware');
const db = require('./db');
const { notifyStudentsOfNewSession } = require('./notificationService');

// Route pour créer une session en direct (sécurisée et validée)
router.post('/courses/:courseId/live-sessions', 
  authMiddleware,
  [
    body('title').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape(),
    body('scheduledStart').isISO8601().toDate()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { courseId } = req.params;
    const { title, description, scheduledStart } = req.body;
    const hostId = req.user.id;

    try {
      const result = await db.query(
        'INSERT INTO live_sessions (course_id, host_id, title, description, scheduled_start, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [courseId, hostId, title, description, scheduledStart, 'scheduled']
      );
      const sessionId = result.rows[0].id;
      
      await notifyStudentsOfNewSession(courseId, { id: sessionId, title, scheduledStart });

      res.json({ message: 'Session en direct créée avec succès', sessionId });
    } catch (error) {
      console.error('Erreur lors de la création de la session en direct:', error);
      res.status(500).json({ error: 'Erreur lors de la création de la session en direct' });
    }
  }
);

// Route pour téléverser l'enregistrement d'une session (sécurisée)
router.post('/live-sessions/:sessionId/upload-recording',
  authMiddleware,
  upload.single('video'),
  async (req, res) => {
    const { sessionId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier n\'a été téléversé.' });
    }

    try {
      // Vérifier que l'utilisateur est bien l'hôte de la session
      const session = await db.query('SELECT host_id FROM live_sessions WHERE id = $1', [sessionId]);
      if (session.rows[0].host_id !== req.user.id) {
        return res.status(403).json({ error: 'Non autorisé à téléverser l\'enregistrement pour cette session' });
      }

      await db.query('UPDATE live_sessions SET recording_url = $1 WHERE id = $2', [file.path, sessionId]);
      res.json({ message: 'Enregistrement téléversé avec succès' });
    } catch (error) {
      console.error('Erreur lors du téléversement de l\'enregistrement:', error);
      res.status(500).json({ error: 'Erreur lors du téléversement de l\'enregistrement' });
    }
  }
);

// ... autres routes sécurisées ...

module.exports = router;
