const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Remplacez par l'URL de votre frontend en production
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');

  socket.on('join-session', ({ sessionId, userId, isHost }) => {
    socket.join(sessionId);
    if (isHost) {
      socket.to(sessionId).emit('host-joined', { hostId: userId });
    } else {
      socket.to(sessionId).emit('viewer-connected', { viewerId: userId });
    }
  });

  socket.on('start-broadcast', ({ sessionId }) => {
    socket.to(sessionId).emit('broadcast-started');
  });

  socket.on('stop-broadcast', ({ sessionId }) => {
    socket.to(sessionId).emit('broadcast-stopped');
  });

  socket.on('offer', ({ offer, viewerId, sessionId }) => {
    socket.to(sessionId).emit('offer', { offer, viewerId });
  });

  socket.on('answer', ({ answer, sessionId }) => {
    socket.to(sessionId).emit('answer', { answer });
  });

  socket.on('ice-candidate', ({ candidate, sessionId }) => {
    socket.to(sessionId).emit('ice-candidate', { candidate });
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur Socket.IO en écoute sur le port ${PORT}`);
});
