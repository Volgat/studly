const db = require('./db');
const { sendEmail } = require('./emailService'); // Supposons que vous avez un service d'envoi d'e-mails

const notifyStudentsOfNewSession = async (courseId, sessionDetails) => {
  try {
    // Récupérer tous les étudiants inscrits au cours
    const students = await db.query('SELECT users.id, users.email FROM users JOIN enrollments ON users.id = enrollments.user_id WHERE enrollments.course_id = $1', [courseId]);
    
    // Envoyer une notification à chaque étudiant
    for (const student of students.rows) {
      // Envoyer un e-mail
      await sendEmail(student.email, 'Nouvelle session en direct programmée', `Une nouvelle session en direct "${sessionDetails.title}" a été programmée pour le ${sessionDetails.scheduledStart}. Ne la manquez pas !`);
      
      // Enregistrer la notification dans la base de données
      await db.query('INSERT INTO notifications (user_id, message, type, created_at) VALUES ($1, $2, $3, NOW())', 
        [student.id, `Nouvelle session en direct : ${sessionDetails.title}`, 'live_session']);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi des notifications:', error);
  }
};

module.exports = { notifyStudentsOfNewSession };
