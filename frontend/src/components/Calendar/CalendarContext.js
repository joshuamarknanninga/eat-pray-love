// frontend/src/contexts/CalendarContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the Calendar Context
export const CalendarContext = createContext();

// Calendar Provider Component
export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]); // Array of event objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events'); // Replace with your actual endpoint
      setEvents(res.data.events);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err.response?.data || err.message);
      setError('Failed to load events.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add a new event
  const addEvent = async (newEvent) => {
    try {
      const res = await axios.post('/api/events', newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // If authentication is required
        },
      });
      setEvents([...events, res.data.event]);
      toast.success('Event added successfully!');
      return { success: true };
    } catch (err) {
      console.error('Error adding event:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to add event.');
      return { success: false, message: err.response?.data?.message || 'Failed to add event.' };
    }
  };

  // Update an existing event
  const updateEvent = async (eventId, updatedData) => {
    try {
      const res = await axios.put(`/api/events/${eventId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(events.map(event => event._id === eventId ? res.data.event : event));
      toast.success('Event updated successfully!');
      return { success: true };
    } catch (err) {
      console.error('Error updating event:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to update event.');
      return { success: false, message: err.response?.data?.message || 'Failed to update event.' };
    }
  };

  // Delete an event
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(events.filter(event => event._id !== eventId));
      toast.success('Event deleted successfully!');
      return { success: true };
    } catch (err) {
      console.error('Error deleting event:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to delete event.');
      return { success: false, message: err.response?.data?.message || 'Failed to delete event.' };
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        loading,
        error,
        addEvent,
        updateEvent,
        deleteEvent,
        fetchEvents, // Optional: Expose fetchEvents if needed
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
