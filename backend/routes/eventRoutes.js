// backend/routes/eventRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Middleware to check if the user is an admin (optional)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};

/**
 * @route   GET /api/events
 * @desc    Get all events
 * @access  Public
 */
router.get('/', eventController.getAllEvents);

/**
 * @route   POST /api/events
 * @desc    Create a new event
 * @access  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  eventController.createEvent
);

/**
 * @route   PUT /api/events/:id
 * @desc    Update an event
 * @access  Private
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  eventController.updateEvent
);

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete an event
 * @access  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  eventController.deleteEvent
);

module.exports = router;
