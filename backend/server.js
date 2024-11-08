// backend/server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('./utils/passport'); // Passport configuration
const connectDB = require('./utils/db'); // Database connection
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes'); // Import sessionRoutes once
const userRoutes = require('./routes/userRoutes'); // <-- User Routes
const paymentRoutes = require('./routes/paymentRoutes');
const gameRoutes = require('./routes/gameRoutes');
const movieRoutes = require('./routes/movieRoutes'); // Movie Routes
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Update with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// Serve static files (movie posters)
app.use('/uploads/movies', express.static(path.join(__dirname, 'uploads/movies')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', sessionRoutes); // Use the single import of sessionRoutes here
app.use('/api/users', userRoutes); // <-- Use User Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/movies', movieRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

// Socket.io Connection Handling (Optional: Implement real-time features if needed)
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

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
