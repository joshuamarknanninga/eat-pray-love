// frontend/src/contexts/CalendarContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the Calendar Context
export const CalendarContext = createContext();

// CalendarProvider Component
export const CalendarProvider = ({ children }) => {
  // State to hold all events
  const [events, setEvents] = useState([]);
  
  // Loading state to indicate data fetching
  const [loading, setLoading] = useState(true);
  
  // Error state to capture any errors during operations
  const [error, setError] = useState(null);

  /**
   * Fetch all events from the backend API
   */
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/events'); // Replace with your actual endpoint
      setEvents(response.data.events);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err.response?.data || err.message);
      setError('Failed to load events.');
      setLoading(false);
      toast.error('Failed to load events.');
    }
  };

  /**
   * Add a new event
   * @param {Object} newEvent - The event data to add
   * @returns {Object} - Success status and message
   */
  const addEvent = async (newEvent) => {
    try {
      const response = await axios.post('/api/events', newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is stored securely
        },
      });
      setEvents([...events, response.data.event]);
      toast.success('Event added successfully!');
      return { success: true };
    } catch (err) {
      console.error('Error adding event:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to add event.');
      toast.error(err.response?.data?.message || 'Failed to add event.');
      return { success: false, message: err.response?.data?.message || 'Failed to add event.' };
    }
  };

  /**
   * Update an existing event
   * @param {string} eventId - The ID of the event to update
   * @param {Object} updatedData - The updated event data
   * @returns {Object} - Success status and message
   */
  const updateEvent = async (eventId, updatedData) => {
    try {
      const response = await axios.put(`/api/events/${eventId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(events.map(event => (event._id === eventId ? response.data.event : event)));
      toast.success('Event updated successfully!');
      return { success: true };
    } catch (err) {
      console.error('Error updating event:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update event.');
      toast.error(err.response?.data?.message || 'Failed to update event.');
      return { success: false, message: err.response?.data?.message || 'Failed to update event.' };
    }
  };

  /**
   * Delete an event
   * @param {string} eventId - The ID of the event to delete
   * @returns {Object} - Success status and message
   */
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
      setError(err.response?.data?.message || 'Failed to delete event.');
      toast.error(err.response?.data?.message || 'Failed to delete event.');
      return { success: false, message: err.response?.data?.message || 'Failed to delete event.' };
    }
  };

  /**
   * Fetch events when the provider mounts
   */
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
