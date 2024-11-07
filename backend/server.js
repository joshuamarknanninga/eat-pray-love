// backend/server.js
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('./utils/db');
const passport = require('./utils/passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const chatbot = require('./utils/chatbot');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000", // Frontend URL
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/payments', paymentRoutes);

// Socket.io for real-time features
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join session room
    socket.on('joinSession', ({ sessionId, userId }) => {
        socket.join(sessionId);
        io.to(sessionId).emit('userJoined', { userId });
    });

    // Handle chat messages
    socket.on('chatMessage', ({ sessionId, message }) => {
        io.to(sessionId).emit('newMessage', message);
        // Optionally, send to chatbot for processing
        chatbot.processMessage(sessionId, message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
