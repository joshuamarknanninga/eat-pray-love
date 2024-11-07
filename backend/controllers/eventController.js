// backend/controllers/eventController.js

const Event = require('../models/Event');

/**
 * Get All Events
 */
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username email').sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Create a New Event
 */
exports.createEvent = async (req, res) => {
  const { date, title, description, time } = req.body;

  try {
    const newEvent = new Event({
      date,
      title,
      description,
      time,
      createdBy: req.user._id,
    });

    const event = await newEvent.save();
    await event.populate('createdBy', 'username email');

    res.status(201).json({ message: 'Event created successfully.', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Update an Event
 */
exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { date, title, description, time } = req.body;

  try {
    let event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Check if the user is the creator or an admin
    if (event.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    event.date = date || event.date;
    event.title = title || event.title;
    event.description = description || event.description;
    event.time = time || event.time;

    await event.save();
    await event.populate('createdBy', 'username email');

    res.json({ message: 'Event updated successfully.', event });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Delete an Event
 */
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Check if the user is the creator or an admin
    if (event.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    await Event.findByIdAndDelete(eventId);
    res.json({ message: 'Event deleted successfully.' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
