// backend/server.js

require('dotenv').config(); // Load environment variables at the very top

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

// Log the MONGODB_URI to check if it's defined
console.log('MONGODB_URI:', MONGODB_URI);

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined. Please set it in your .env file.');
  process.exit(1);
}

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Update with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Connect to MongoDB and start the server
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Start the server using 'server.listen'
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.IO Connection Handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages from the client
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
