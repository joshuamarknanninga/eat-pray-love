// backend/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch(err){
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch(err){
        res.status(500).json({ message: 'Server error' });
    }
});

// Protected Route Example
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
