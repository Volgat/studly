// ... autres imports et méthodes

export const api = {
  // ... autres méthodes

  getInstitutionCourses: async (institutionId) => {
    // Implémentez la logique pour récupérer les cours de l'institution
    // Ceci est un exemple, à adapter selon votre backend
    const response = await fetch(`/api/institutions/${institutionId}/courses`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des cours');
    return response.json();
  },

  getInstitutionStats: async (institutionId) => {
    // Implémentez la logique pour récupérer les statistiques de l'institution
    const response = await fetch(`/api/institutions/${institutionId}/stats`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
    return response.json();
  },

  // Assurez-vous que cette méthode peut accepter un paramètre institutionId
  getUpcomingLiveSessions: async (institutionId) => {
    const response = await fetch(`/api/institutions/${institutionId}/upcoming-sessions`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des sessions à venir');
    return response.json();
  },

  // Assurez-vous que cette méthode peut gérer les activités spécifiques à une institution
  getRecentActivities: async (userId) => {
    const response = await fetch(`/api/users/${userId}/recent-activities`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des activités récentes');
    return response.json();
  },

  // ... autres méthodes
};
