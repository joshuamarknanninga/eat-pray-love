// backend/routes/sessionRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Middleware to check if the user is admin (optional)
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
};

// Ensure that the route has a proper callback
router.get('/session/:id', sessionController.getSessionDetails);

/**
 * @route   POST /api/sessions
 * @desc    Create a new session
 * @access  Private
 */
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    sessionController.createSession
);

/**
 * @route   GET /api/sessions/:id
 * @desc    Get session details by ID
 * @access  Private
 */
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    sessionController.getSessionById
);

/**
 * @route   POST /api/sessions/:id/join
 * @desc    Join a session
 * @access  Private
 */
router.post(
    '/:id/join',
    passport.authenticate('jwt', { session: false }),
    sessionController.joinSession
);

/**
 * @route   POST /api/sessions/:id/leave
 * @desc    Leave a session
 * @access  Private
 */
router.post(
    '/:id/leave',
    passport.authenticate('jwt', { session: false }),
    sessionController.leaveSession
);

/**
 * @route   GET /api/sessions
 * @desc    List all sessions
 * @access  Private
 */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    sessionController.listSessions
);

/**
 * @route   DELETE /api/sessions/:id
 * @desc    Delete a session
 * @access  Private
 */
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    sessionController.deleteSession
);

/**
 * @route   GET /api/sessions/:id/participants
 * @desc    Get all participants of a session
 * @access  Private
 */
router.get(
    '/:id/participants',
    passport.authenticate('jwt', { session: false }),
    sessionController.getSessionParticipants
);

/**
 * @route   PUT /api/sessions/:id/rename
 * @desc    Rename a session
 * @access  Private
 */
router.put(
    '/:id/rename',
    passport.authenticate('jwt', { session: false }),
    sessionController.renameSession
);

module.exports = router;
