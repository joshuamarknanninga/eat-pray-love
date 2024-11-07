// frontend/src/components/Calendar/CalendarContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

// Create the Calendar Context
export const CalendarContext = createContext();

// Socket.io server URL
const SOCKET_SERVER_URL = 'http://localhost:5000'; // Update with your backend URL

// Auth token retrieval function
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Calendar Provider Component
export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/sessions', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      // Assuming the backend returns events in a compatible format
      setEvents(res.data.sessions.map(session => ({
        id: session._id,
        title: session.title,
        start: session.startDate, // Ensure proper date format
        end: session.endDate,
        extendedProps: {
          description: session.description,
          creator: session.creator.username,
        },
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Initialize Socket.io connection
    const newSocket = io(SOCKET_SERVER_URL, {
      query: { token: getAuthToken() },
    });
    setSocket(newSocket);

    // Listen for event updates
    newSocket.on('eventCreated', (event) => {
      setEvents(prevEvents => [...prevEvents, event]);
    });

    newSocket.on('eventUpdated', (updatedEvent) => {
      setEvents(prevEvents => prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    });

    newSocket.on('eventDeleted', (deletedEventId) => {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== deletedEventId));
    });

    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create a new event
  const createEvent = async (eventData) => {
    try {
      const res = await axios.post('/api/sessions', eventData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      // The backend should emit 'eventCreated' via Socket.io
      return { success: true };
    } catch (error) {
      console.error('Error creating event:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Update an existing event
  const updateEvent = async (eventId, updatedData) => {
    try {
      const res = await axios.put(`/api/sessions/${eventId}/rename`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      // The backend should emit 'eventUpdated' via Socket.io
      return { success: true };
    } catch (error) {
      console.error('Error updating event:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  // Delete an event
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`/api/sessions/${eventId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      // The backend should emit 'eventDeleted' via Socket.io
      return { success: true };
    } catch (error) {
      console.error('Error deleting event:', error.response.data);
      return { success: false, message: error.response.data.message };
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        loading,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
