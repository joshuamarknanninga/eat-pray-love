// frontend/src/components/Calendar/EventModal.js

import React, { useState, useContext, useEffect } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import { CalendarContext } from './CalendarContext';

const EventModal = ({ open, onClose, event, selectedDate }) => {
  const { createEvent, updateEvent, deleteEvent } = useContext(CalendarContext);

  const isEditMode = !!event;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: selectedDate || '',
    end: selectedDate || '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Populate form data if editing an event
  useEffect(() => {
    if (isEditMode && event) {
      setFormData({
        title: event.title,
        description: event.extendedProps.description || '',
        start: event.startStr,
        end: event.endStr || event.startStr,
      });
    } else if (selectedDate) {
      setFormData({
        title: '',
        description: '',
        start: selectedDate,
        end: selectedDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        start: '',
        end: '',
      });
    }
    setError('');
  }, [isEditMode, event, selectedDate]);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    const { title, description, start, end } = formData;

    if (!title || !start || !end) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const eventData = { title, description, start, end };

    if (isEditMode) {
      const res = await updateEvent(event.id, eventData);
      if (!res.success) {
        setError(res.message || 'Failed to update event.');
      } else {
        onClose();
      }
    } else {
      const res = await createEvent(eventData);
      if (!res.success) {
        setError(res.message || 'Failed to create event.');
      } else {
        onClose();
      }
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (isEditMode && event) {
      setLoading(true);
      const res = await deleteEvent(event.id);
      if (!res.success) {
        setError(res.message || 'Failed to delete event.');
      } else {
        onClose();
      }
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>{isEditMode ? 'Edit Event' : 'Create New Event'}</Modal.Header>
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
          <Form.TextArea
            label="Description"
            placeholder="Event Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Form.Input
            label="Start Date & Time"
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="End Date & Time"
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          />
          {error && <Message error header="Error" content={error} />}
          <Button type="submit" primary loading={loading}>
            {isEditMode ? 'Update Event' : 'Create Event'}
          </Button>
          {isEditMode && (
            <Button type="button" color="red" onClick={handleDelete} loading={loading}>
              Delete Event
            </Button>
          )}
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EventModal;
