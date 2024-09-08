const errorLogger = (error, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Erreur:`, error);
  next(error);
};

const errorResponder = (error, req, res, next) => {
  res.header("Content-Type", 'application/json');
  
  const status = error.statusCode || 400;
  res.status(status).send(JSON.stringify({
    error: {
      message: error.message || 'Une erreur est survenue',
      status: status
    }
  }, null, 4));
};

const invalidPathHandler = (req, res, next) => {
  res.status(404).send('Route non trouvée');
};

module.exports = { errorLogger, errorResponder, invalidPathHandler };
