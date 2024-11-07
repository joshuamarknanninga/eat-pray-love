// backend/controllers/userController.js

const User = require('../models/User');
const Payment = require('../models/Payment');
const bcrypt = require('bcrypt');

/**
 * Get User Profile
 * GET /api/users/me
 * Protected Route
 */
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password') // Exclude password field
            .populate('donations', 'amount donatedAt stripeChargeId');

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
 * PUT /api/users/me
 * Protected Route
 */
exports.updateUserProfile = async (req, res) => {
    const { username, email, password } = req.body;

    // Build update object
    let updateFields = {};

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        } catch (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Server error. Please try again later.' });
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({ message: 'Profile updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        // Handle duplicate email error
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Get User's Donation History
 * GET /api/users/me/donations
 * Protected Route
 */
exports.getUserDonations = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'donations',
                select: 'amount donatedAt stripeChargeId',
                options: { sort: { donatedAt: -1 } }
            });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ donations: user.donations });
    } catch (error) {
        console.error('Error fetching user donations:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Delete User Account
 * DELETE /api/users/me
 * Protected Route
 */
exports.deleteUserAccount = async (req, res) => {
    try {
        // Find the user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Optionally, you can handle associated data here
        // For example, remove user from all sessions they are part of
        // Assuming you have a Session model and sessions reference participants

        // Example:
        // await Session.updateMany(
        //     { participants: user._id },
        //     { $pull: { participants: user._id } }
        // );

        // Delete user's payments/donations
        await Payment.deleteMany({ user: user._id });

        // Delete the user
        await User.findByIdAndDelete(req.user._id);

        res.json({ message: 'User account deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Get All Users (Optional - Admin Only)
 * GET /api/users
 * Protected Route
 * Admin Access Only
 */
exports.getAllUsers = async (req, res) => {
    try {
        // Assuming you have an isAdmin flag on the User model
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const users = await User.find()
            .select('-password')
            .populate('donations', 'amount donatedAt stripeChargeId')
            .sort({ createdAt: -1 });

        res.json({ users });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
