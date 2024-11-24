// backend/app.js

const express = require('express');
const cors = require('cors');
const passport = require('./utils/passport'); // Passport configuration
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const gameRoutes = require('./routes/gameRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

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
app.use('/api', sessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/games', gameRoutes);
app.use('/', movieRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;
