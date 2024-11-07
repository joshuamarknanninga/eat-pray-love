// backend/models/Movie.js

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  genre: {
    type: String,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Documentary', 'Other'],
    default: 'Other',
  },
  poster: {
    type: String, // URL or path to the poster image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Movie', MovieSchema);
