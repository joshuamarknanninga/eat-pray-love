// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

/**
 * Register a new user
 * POST /api/auth/register
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password // Will be hashed in the User model's pre-save hook
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Optionally, you can automatically log in the user after registration
        // by generating a token here.

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Log in an existing user
 * POST /api/auth/login
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create JWT payload
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Sign the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({
                    token: `Bearer ${token}`,
                    user: payload
                });
            }
        );
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Get current authenticated user
 * GET /api/auth/current
 * Protected Route
 */
exports.getCurrentUser = (req, res) => {
    // Passport middleware adds the user to req.user
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
    });
};
