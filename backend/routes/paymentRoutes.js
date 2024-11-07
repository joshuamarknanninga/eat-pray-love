// backend/routes/paymentRoutes.js
const express = require('express');
const passport = require('passport');
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const router = express.Router();

// Create Payment Intent
router.post('/create', passport.authenticate('jwt', { session: false }), createPaymentIntent);

// Confirm Payment
router.post('/confirm', passport.authenticate('jwt', { session: false }), confirmPayment);

module.exports = router;
