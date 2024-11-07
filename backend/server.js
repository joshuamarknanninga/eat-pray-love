// backend/server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('./utils/passport'); // Passport configuration
const connectDB = require('./utils/db'); // Database connection
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const gameRoutes = require('./routes/gameRoutes'); // <-- Game Routes
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Update with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/games', gameRoutes); // <-- Use Game Routes

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

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

// Export io to use in routes/controllers
app.set('io', io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
