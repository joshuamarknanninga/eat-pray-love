// backend/app.js

const express = require('express');
const app = express();
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes'); // Single import

// Middleware
app.use(express.json());
app.use(cors());

// Use Routes
app.use('/', movieRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

module.exports = app;
