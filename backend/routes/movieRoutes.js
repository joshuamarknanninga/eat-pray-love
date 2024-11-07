// backend/routes/movieRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads/movies directory exists
const uploadDir = path.join(__dirname, '../uploads/movies');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, gif).'));
  }
};

const upload = multer({ storage, fileFilter });

/**
 * @route   POST /api/movies
 * @desc    Create a new movie
 * @access  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('poster'),
  movieController.createMovie
);

/**
 * @route   GET /api/movies
 * @desc    Get all movies
 * @access  Public
 */
router.get('/', movieController.getAllMovies);

/**
 * @route   GET /api/movies/:id
 * @desc    Get a single movie by ID
 * @access  Public
 */
router.get('/:id', movieController.getMovieById);

/**
 * @route   PUT /api/movies/:id
 * @desc    Update a movie
 * @access  Private
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('poster'),
  movieController.updateMovie
);

/**
 * @route   DELETE /api/movies/:id
 * @desc    Delete a movie
 * @access  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  movieController.deleteMovie
);

module.exports = router;
