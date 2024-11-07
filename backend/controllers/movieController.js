// backend/controllers/movieController.js

const Movie = require('../models/Movie');
const path = require('path');

/**
 * Create a new movie
 */
exports.createMovie = async (req, res) => {
  const { title, description, releaseDate, genre } = req.body;
  const poster = req.file ? `/uploads/movies/${req.file.filename}` : null;

  try {
    const newMovie = new Movie({
      title,
      description,
      releaseDate,
      genre,
      poster,
      createdBy: req.user._id,
    });

    const movie = await newMovie.save();
    await movie.populate('createdBy', 'username email');

    res.status(201).json({ message: 'Movie created successfully.', movie });
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get all movies
 */
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate('createdBy', 'username email')
      .sort({ releaseDate: -1 });
    res.json({ movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get a single movie by ID
 */
exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId).populate('createdBy', 'username email');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    res.json({ movie });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Update a movie
 */
exports.updateMovie = async (req, res) => {
  const movieId = req.params.id;
  const { title, description, releaseDate, genre } = req.body;
  const poster = req.file ? `/uploads/movies/${req.file.filename}` : null;

  try {
    let movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    // Check if the user is the creator or an admin
    if (movie.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.genre = genre || movie.genre;
    if (poster) {
      movie.poster = poster;
    }

    await movie.save();
    await movie.populate('createdBy', 'username email');

    res.json({ message: 'Movie updated successfully.', movie });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Delete a movie
 */
exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    // Check if the user is the creator or an admin
    if (movie.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    await Movie.findByIdAndDelete(movieId);
    res.json({ message: 'Movie deleted successfully.' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
