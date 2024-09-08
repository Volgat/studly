const express = require('express');
const { errorLogger, errorResponder, invalidPathHandler } = require('./errorHandling');
const apiRoutes = require('./apiRoutes');

const app = express();

app.use(express.json());

// Routes API
app.use('/api', apiRoutes);

// Gestion des erreurs
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
