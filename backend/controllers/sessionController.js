// backend/controllers/sessionController.js

const Session = require('../models/Session');
const User = require('../models/User');

/**
 * Create a new session
 * POST /api/sessions
 * Protected Route
 */
exports.createSession = async (req, res) => {
  const { sessionName } = req.body;

  // Basic validation
  if (!sessionName) {
    return res.status(400).json({ message: 'Session name is required.' });
  }

  try {
    // Create a new session instance
    const newSession = new Session({
      sessionName,
      createdBy: req.user._id,
      participants: [req.user._id], // Creator is the first participant
    });

    // Save the session to the database
    const savedSession = await newSession.save();

    res.status(201).json({
      message: 'Session created successfully.',
      session: savedSession,
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get session details
 * GET /api/sessions/session/:id
 * Protected Route
 */
exports.getSessionDetails = async (req, res) => {
  const sessionId = req.params.id;

  try {
    // Find the session by ID
    const session = await Session.findById(sessionId)
      .select('sessionName createdBy participants createdAt updatedAt')
      .populate('createdBy', 'username email')
      .populate('participants', 'username email');

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    res.json({ session });
  } catch (error) {
    console.error('Error fetching session details:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get session details by ID
 * GET /api/sessions/:id
 * Protected Route
 */
exports.getSessionById = async (req, res) => {
  const sessionId = req.params.id;

  try {
    // Find the session by ID and populate participants
    const session = await Session.findById(sessionId)
      .populate('createdBy', 'username email')
      .populate('participants', 'username email');

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    res.json({ session });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Join a session
 * POST /api/sessions/:id/join
 * Protected Route
 */
exports.joinSession = async (req, res) => {
  const sessionId = req.params.id;
  const userId = req.user._id;

  try {
    // Find the session by ID
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // Check if the user is already a participant
    if (session.participants.includes(userId)) {
      return res.status(400).json({ message: 'You are already a participant of this session.' });
    }

    // Add the user to the participants array
    session.participants.push(userId);
    await session.save();

    res.json({ message: 'Joined the session successfully.', session });
  } catch (error) {
    console.error('Error joining session:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Leave a session
 * POST /api/sessions/:id/leave
 * Protected Route
 */
exports.leaveSession = async (req, res) => {
  const sessionId = req.params.id;
  const userId = req.user._id;

  try {
    // Find the session by ID
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // Check if the user is a participant
    if (!session.participants.includes(userId)) {
      return res.status(400).json({ message: 'You are not a participant of this session.' });
    }

    // Remove the user from the participants array
    session.participants = session.participants.filter(
      (participant) => participant.toString() !== userId.toString()
    );

    // If the user leaving is the creator, assign a new creator or delete the session
    if (session.createdBy.toString() === userId.toString()) {
      if (session.participants.length > 0) {
        session.createdBy = session.participants[0];
      } else {
        // No participants left, delete the session
        await Session.findByIdAndDelete(sessionId);
        return res.json({
          message: 'You left the session. Session has been deleted as there are no participants left.',
        });
      }
    }

    await session.save();

    res.json({ message: 'Left the session successfully.', session });
  } catch (error) {
    console.error('Error leaving session:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * List all sessions
 * GET /api/sessions
 * Protected Route
 */
exports.listSessions = async (req, res) => {
  try {
    // Retrieve all sessions, optionally with pagination
    const sessions = await Session.find()
      .populate('createdBy', 'username email')
      .populate('participants', 'username email')
      .sort({ createdAt: -1 });

    res.json({ sessions });
  } catch (error) {
    console.error('Error listing sessions:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Delete a session
 * DELETE /api/sessions/:id
 * Protected Route
 */
exports.deleteSession = async (req, res) => {
  const sessionId = req.params.id;
  const userId = req.user._id;

  try {
    // Find the session by ID
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // Only the creator can delete the session
    if (session.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this session.' });
    }

    // Delete the session
    await Session.findByIdAndDelete(sessionId);

    res.json({ message: 'Session deleted successfully.' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get all participants of a session
 * GET /api/sessions/:id/participants
 * Protected Route
 */
exports.getSessionParticipants = async (req, res) => {
  const sessionId = req.params.id;

  try {
    // Find the session by ID and populate participants
    const session = await Session.findById(sessionId).populate('participants', 'username email');

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    res.json({ participants: session.participants });
  } catch (error) {
    console.error('Error fetching session participants:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Rename a session
 * PUT /api/sessions/:id/rename
 * Protected Route
 */
exports.renameSession = async (req, res) => {
  const sessionId = req.params.id;
  const userId = req.user._id;
  const { newName } = req.body;

  if (!newName) {
    return res.status(400).json({ message: 'New session name is required.' });
  }

  try {
    // Find the session by ID
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // Only the creator can rename the session
    if (session.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to rename this session.' });
    }

    // Update the session name
    session.sessionName = newName;
    await session.save();

    res.json({ message: 'Session renamed successfully.', session });
  } catch (error) {
    console.error('Error renaming session:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
