// backend/controllers/gameController.js

const Game = require('../models/Game');

/**
 * Create a new game
 */
exports.createGame = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const newGame = new Game({
      title,
      description,
      questions,
      creator: req.user._id,
    });

    const game = await newGame.save();
    await game.populate('creator', 'username email');

    res.status(201).json({ message: 'Game created successfully.', game });
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get all games
 */
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find().populate('creator', 'username email').sort({ createdAt: -1 });
    res.json({ games });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get a single game by ID
 */
exports.getGameById = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findById(gameId).populate('creator', 'username email');
    if (!game) {
      return res.status(404).json({ message: 'Game not found.' });
    }
    res.json({ game });
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Update a game
 */
exports.updateGame = async (req, res) => {
  const gameId = req.params.id;
  const { title, description, questions } = req.body;

  try {
    let game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found.' });
    }

    // Check if the user is the creator or an admin
    if (game.creator.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    game.title = title || game.title;
    game.description = description || game.description;
    game.questions = questions || game.questions;

    await game.save();
    await game.populate('creator', 'username email');

    res.json({ message: 'Game updated successfully.', game });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Delete a game
 */
exports.deleteGame = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found.' });
    }

    // Check if the user is the creator or an admin
    if (game.creator.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    await Game.findByIdAndDelete(gameId);
    res.json({ message: 'Game deleted successfully.' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
