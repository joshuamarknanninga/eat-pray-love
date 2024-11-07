// backend/utils/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error('Error: MONGO_URI is not defined in the environment variables.');
        process.exit(1); // Exit process with failure
    }

    try {
        // Mongoose options to handle deprecation warnings and improve connection stability
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // Deprecated in Mongoose 6+
            // useFindAndModify: false, // Deprecated in Mongoose 6+
            // autoIndex: false, // Disable auto-indexing for performance in production
            // poolSize: 10, // Maintain up to 10 socket connections
            // bufferCommands: false, // Disable buffering
            // bufferMaxEntries: 0, // Disable buffer max entries
            // useFindAndModify: false, // Use native findOneAndUpdate() rather than findAndModify()
        };

        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, options);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }

    // Optional: Handle connection events
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB.');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB.');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('Mongoose connection closed due to application termination.');
        process.exit(0);
    });
};

module.exports = connectDB;
