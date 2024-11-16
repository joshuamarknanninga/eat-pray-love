// backend/server.js

const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const app = require('./app'); // Import the Express app from app.js

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Update with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successful DB connection
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error(err));

// Socket.io Connection Handling
io.use((socket, next) => {
  // Middleware to authenticate socket connections using JWT
  const token = socket.handshake.query.token;
  if (token) {
    // Verify token here (use jsonwebtoken or similar)
    // For simplicity, we'll skip token verification in this example
    socket.user = { id: 'userId', username: 'User' }; // Mock user
    next();
  } else {
    next(new Error('Authentication error'));
  }
}).on('connection', (socket) => {
  console.log(`User connected: ${socket.user.username}`);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.username}`);
  });
});

// Export io to use in routes/controllers if needed
app.set('io', io);
