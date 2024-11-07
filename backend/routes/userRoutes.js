// backend/routes/userRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware to check if the user is an admin (optional)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};

/**
 * @route   GET /api/users/profile
 * @desc    Get authenticated user's profile
 * @access  Private
 */
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  userController.getUserProfile
);

/**
 * @route   PUT /api/users/profile
 * @desc    Update authenticated user's profile
 * @access  Private
 */
router.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  userController.updateUserProfile
);

/**
 * @route   POST /api/users/favorites/:movieId
 * @desc    Add a movie to user's favorites
 * @access  Private
 */
router.post(
  '/favorites/:movieId',
  passport.authenticate('jwt', { session: false }),
  userController.addFavorite
);

/**
 * @route   DELETE /api/users/favorites/:movieId
 * @desc    Remove a movie from user's favorites
 * @access  Private
 */
router.delete(
  '/favorites/:movieId',
  passport.authenticate('jwt', { session: false }),
  userController.removeFavorite
);

/**
 * @route   GET /api/users/favorites
 * @desc    Get user's favorite movies
 * @access  Private
 */
router.get(
  '/favorites',
  passport.authenticate('jwt', { session: false }),
  userController.getFavorites
);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only)
 * @access  Private/Admin
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      const users = await User.find().select('-password').populate('favorites');
      res.json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by ID (Admin only)
 * @access  Private/Admin
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId).select('-password').populate('favorites');
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user by ID (Admin only)
 * @access  Private/Admin
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      await User.findByIdAndDelete(userId);
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

module.exports = router;
