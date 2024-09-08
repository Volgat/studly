const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const Redis = require('ioredis');
const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuration de Redis
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Configuration de la limitation de débit
const limiter = new RateLimit({
  store: new RedisStore({
    redis: redis,
    prefix: 'rate_limit:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre
});

app.use(limiter);

// Middleware d'authentification pour Socket.IO
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await verifyToken(token); // Fonction à implémenter pour vérifier le token
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');

  socket.on('join-session', async ({ sessionId }) => {
    // Vérifier si l'utilisateur a le droit de rejoindre la session
    const canJoin = await checkSessionAccess(socket.user.id, sessionId);
    if (canJoin) {
      socket.join(sessionId);
      // ... reste de la logique pour rejoindre une session
    } else {
      socket.emit('error', { message: 'Accès non autorisé à cette session' });
    }
  });

  // ... autres événements Socket.IO

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur Socket.IO optimisé en écoute sur le port ${PORT}`);
});

// Fonction utilitaire pour vérifier l'accès à une session
async function checkSessionAccess(userId, sessionId) {
  // Implémenter la logique de vérification d'accès
  // Par exemple, vérifier dans Redis si l'utilisateur est inscrit au cours
  return true; // À remplacer par la vraie logique
}
