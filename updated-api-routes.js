const express = require('express');
const router = express.Router();
const db = require('./db');

// ... autres routes existantes ...

// Créer une nouvelle session en direct
router.post('/courses/:courseId/live-sessions', async (req, res) => {
  const { courseId } = req.params;
  const { hostId, title, description, scheduledStart } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO live_sessions (course_id, host_id, title, description, scheduled_start, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [courseId, hostId, title, description, scheduledStart, 'scheduled']
    );
    res.json({ message: 'Session en direct créée avec succès', sessionId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la session en direct' });
  }
});

// Récupérer les détails d'une session en direct
router.get('/live-sessions/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const result = await db.query('SELECT * FROM live_sessions WHERE id = $1', [sessionId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session en direct non trouvée' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des détails de la session en direct' });
  }
});

// Mettre à jour le statut d'une session en direct
router.put('/live-sessions/:sessionId/status', async (req, res) => {
  const { sessionId } = req.params;
  const { status } = req.body;

  try {
    await db.query('UPDATE live_sessions SET status = $1, actual_start = CASE WHEN $1 = \'live\' THEN NOW() ELSE actual_start END, actual_end = CASE WHEN $1 = \'ended\' THEN NOW() ELSE actual_end END WHERE id = $2', [status, sessionId]);
    res.json({ message: 'Statut de la session en direct mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut de la session en direct' });
  }
});

module.exports = router;
