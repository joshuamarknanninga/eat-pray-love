// backend/routes/userRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware to check if the user is admin (optional)
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
};

/**
 * @route   GET /api/users/me
 * @desc    Get authenticated user's profile
 * @access  Private
 */
router.get(
    '/me',
    passport.authenticate('jwt', { session: false }),
    userController.getUserProfile
);

/**
 * @route   PUT /api/users/me
 * @desc    Update authenticated user's profile
 * @access  Private
 */
router.put(
    '/me',
    passport.authenticate('jwt', { session: false }),
    userController.updateUserProfile
);

/**
 * @route   GET /api/users/me/donations
 * @desc    Get authenticated user's donation history
 * @access  Private
 */
router.get(
    '/me/donations',
    passport.authenticate('jwt', { session: false }),
    userController.getUserDonations
);

/**
 * @route   DELETE /api/users/me
 * @desc    Delete authenticated user's account
 * @access  Private
 */
router.delete(
    '/me',
    passport.authenticate('jwt', { session: false }),
    userController.deleteUserAccount
);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin Only)
 * @access  Private/Admin
 */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    userController.getAllUsers
);

module.exports = router;
