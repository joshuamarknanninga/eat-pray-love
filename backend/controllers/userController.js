// backend/controllers/userController.js

const User = require('../models/User');
const Movie = require('../models/Movie');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Update User Profile
 * @desc Update the authenticated user's profile
 * @route PUT /api/users/profile
 * @access Private
 */
exports.updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // Will be hashed by pre-save hook

    await user.save();

    const updatedUser = await User.findById(req.user._id).select('-password').populate('favorites');

    res.json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Add a Movie to Favorites
 * @desc Add a movie to the authenticated user's favorites
 * @route POST /api/users/favorites/:movieId
 * @access Private
 */
exports.addFavorite = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    const user = await User.findById(req.user._id);
    if (user.favorites.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in favorites.' });
    }

    user.favorites.push(movieId);
    await user.save();

    res.json({ message: 'Movie added to favorites.', movie });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


exports.removeFavorite = async (req, res) => {
  const { movieId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user.favorites.includes(movieId)) {
      return res.status(400).json({ message: 'Movie not in favorites.' });
    }

    user.favorites = user.favorites.filter(id => id.toString() !== movieId);
    await user.save();

    res.json({ message: 'Movie removed from favorites.' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get User's Favorite Movies
 * @desc Retrieve the authenticated user's favorite movies
 * @route GET /api/users/favorites
 * @access Private
 */
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
