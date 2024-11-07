// backend/controllers/paymentController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.createPaymentIntent = async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
            // Optionally, you can pass metadata or customer information
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: 'Stripe Error', error });
    }
};

exports.confirmPayment = async (req, res) => {
    const { paymentIntentId, userId, amount } = req.body;
    try {
        const payment = new Payment({
            user: userId,
            amount,
            stripeChargeId: paymentIntentId
        });
        await payment.save();

        // Update user's donations
        const user = await User.findById(userId);
        user.donations.push(payment._id);
        await user.save();

        res.json({ message: 'Payment successful' });
    } catch (error) {
        res.status(500).json({ message: 'Payment Confirmation Error', error });
    }
};
