// backend/routes/gameRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Middleware to check if the user is admin (optional)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};

/**
 * @route   POST /api/games
 * @desc    Create a new game
 * @access  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  gameController.createGame
);

/**
 * @route   GET /api/games
 * @desc    Get all games
 * @access  Public
 */
router.get('/', gameController.getAllGames);

/**
 * @route   GET /api/games/:id
 * @desc    Get a single game by ID
 * @access  Public
 */
router.get('/:id', gameController.getGameById);

/**
 * @route   PUT /api/games/:id
 * @desc    Update a game
 * @access  Private
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  gameController.updateGame
);

/**
 * @route   DELETE /api/games/:id
 * @desc    Delete a game
 * @access  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  gameController.deleteGame
);

module.exports = router;
