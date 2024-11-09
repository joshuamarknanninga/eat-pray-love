// backend/routes/youtubeRoutes.js

const express = require('express');
const router = express.Router();
const { getFreeMovies } = require('../controllers/youtubeController');

router.get('/free-movies', getFreeMovies);

module.exports = router;
