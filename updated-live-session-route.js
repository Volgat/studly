const express = require('express');
const router = express.Router();
const db = require('./db');
const { notifyStudentsOfNewSession } = require('./notificationService');

// ... autres routes ...

router.post('/courses/:courseId/live-sessions', async (req, res) => {
  const { courseId } = req.params;
  const { hostId, title, description, scheduledStart } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO live_sessions (course_id, host_id, title, description, scheduled_start, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [courseId, hostId, title, description, scheduledStart, 'scheduled']
    );
    const sessionId = result.rows[0].id;
    
    // Notifier les étudiants de la nouvelle session
    await notifyStudentsOfNewSession(courseId, { id: sessionId, title, scheduledStart });

    res.json({ message: 'Session en direct créée avec succès', sessionId });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la session en direct' });
  }
});

// ... autres routes ...

module.exports = router;
