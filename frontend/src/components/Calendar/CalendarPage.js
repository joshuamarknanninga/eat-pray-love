// frontend/src/components/Calendar/CalendarPage.js

import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
import { Container, Header, Button, Modal, Form, Loader, Message, Icon, List } from 'semantic-ui-react';
import { MoviesContext } from '../Movies/MoviesContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Optional: Create a context or use existing one for managing calendar events
// For simplicity, this example manages events locally within the component

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Array of event objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch events from the backend when the component mounts
  useEffect(() => {
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

    fetchEvents();
  }, []);

  // Handle date selection
  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  // Open modal to add event
  const openModal = (selectedDate) => {
    setSelectedDate(selectedDate);
    setFormData({
      title: '',
      description: '',
      time: '',
    });
    setError('');
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setFormData({
      title: '',
      description: '',
      time: '',
    });
    setError('');
  };

  // Handle form input changes
  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to add an event
  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    // Basic validation
    if (!formData.title) {
      setError('Please provide a title for the event.');
      setSubmitting(false);
      return;
    }

    const newEvent = {
      date: selectedDate.toISOString(),
      title: formData.title,
      description: formData.description,
      time: formData.time,
    };

    try {
      const res = await axios.post('/api/events', newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // If authentication is required
        },
      });
      setEvents([...events, res.data.event]);
      toast.success('Event added successfully!');
      closeModal();
    } catch (err) {
      console.error('Error adding event:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to add event.');
    }

    setSubmitting(false);
  };

  // Get events for the selected date
  const eventsForDate = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    );
  });

  // Optional: Define tile content to indicate dates with events
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      });
      if (dayEvents.length > 0) {
        return (
            <div className="event-dot"></div> // Custom class for the dot
          );
    }
    return null;
  };

  if (loading) {
    return <Loader active inline="centered" content="Loading Calendar..." />;
  }

  if (error) {
    return <Message error header="Error" content={error} />;
  }

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Header as="h2" dividing>
        Calendar
      </Header>
      <Calendar
        onChange={onDateChange}
        value={date}
        tileContent={tileContent}
        onClickDay={(value) => openModal(value)}
      />
      <Header as="h3" style={{ marginTop: '2rem' }}>
        Events on {date.toDateString()}
      </Header>
      {eventsForDate.length > 0 ? (
        <List divided relaxed>
          {eventsForDate.map(event => (
            <List.Item key={event._id}>
              <Icon name="calendar alternate outline" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{event.title}</List.Header>
                <List.Description>
                  {event.time && <span><strong>Time:</strong> {event.time}<br /></span>}
                  {event.description}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      ) : (
        <Message info header="No Events" content="There are no events for this date." />
      )}

      {/* Add Event Modal */}
      <Modal open={modalOpen} onClose={closeModal} size="small">
        <Modal.Header>Add Event on {selectedDate && selectedDate.toDateString()}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit} error={!!error}>
            <Form.Input
              label="Title"
              placeholder="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Time"
              placeholder="Event Time (e.g., 10:00 AM)"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            <Form.TextArea
              label="Description"
              placeholder="Event Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {error && <Message error header="Error" content={error} />}
            <Button type="submit" primary loading={submitting}>
              Add Event
            </Button>
            <Button type="button" onClick={closeModal} secondary>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </Container>
  );
};
}

export default CalendarPage;
