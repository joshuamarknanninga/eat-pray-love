// backend/app.js

const express = require('express');
const path = require('path');
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const youtubeRoutes = require('./routes/youtubeRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred' });
});

module.exports = app;
