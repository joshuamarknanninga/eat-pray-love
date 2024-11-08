// frontend/src/pages/CalendarPage.js

import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Container,
  Header,
  Button,
  Modal,
  Form,
  Loader,
  Message,
  Icon,
  List,
  Confirm,
} from 'semantic-ui-react';
import { CalendarContext } from '../contexts/CalendarContext';
import { toast } from 'react-toastify';
import '.pages/CalendarPage.css'; // Import custom styles

const CalendarPage = () => {
  // Accessing CalendarContext
  const {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useContext(CalendarContext);

  // Local state management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Handlers for adding events
  const openAddModal = () => {
    setFormData({
      title: '',
      description: '',
      time: '',
    });
    setFormError('');
    setModalOpen(true);
  };

  const closeAddModal = () => {
    setModalOpen(false);
  };

  const handleAddChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubmit = async () => {
    setFormError('');
    setSubmitting(true);

    // Basic validation
    if (!formData.title) {
      setFormError('Title is required.');
      setSubmitting(false);
      return;
    }

    const newEvent = {
      date: selectedDate.toISOString(),
      title: formData.title,
      description: formData.description,
      time: formData.time,
    };

    const res = await addEvent(newEvent);
    if (res.success) {
      closeAddModal();
    } else {
      setFormError(res.message || 'Failed to add event.');
    }

    setSubmitting(false);
  };

  // Handlers for editing events
  const openEditModal = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      time: event.time,
    });
    setFormError('');
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentEvent(null);
  };

  const handleEditChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = async () => {
    setFormError('');
    setSubmitting(true);

    // Basic validation
    if (!formData.title) {
      setFormError('Title is required.');
      setSubmitting(false);
      return;
    }

    const updatedData = {
      title: formData.title,
      description: formData.description,
      time: formData.time,
    };

    const res = await updateEvent(currentEvent._id, updatedData);
    if (res.success) {
      closeEditModal();
    } else {
      setFormError(res.message || 'Failed to update event.');
    }

    setSubmitting(false);
  };

  // Handlers for deleting events
  const openConfirm = (event) => {
    setCurrentEvent(event);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setCurrentEvent(null);
  };

  const handleDelete = async () => {
    const res = await deleteEvent(currentEvent._id);
    if (res.success) {
      toast.success('Event deleted successfully!');
    } else {
      toast.error(res.message || 'Failed to delete event.');
    }
    closeConfirm();
  };

  // Filter events for the selected date
  const eventsForSelectedDate = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  // Tile content to show indicators on dates with events
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasEvent = events.some((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      });
      return hasEvent ? <div className="event-indicator"></div> : null;
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
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          onClickDay={() => openAddModal()}
        />
      </div>

      <Header as="h3" style={{ marginTop: '2rem' }}>
        Events on {selectedDate.toDateString()}
      </Header>
      {eventsForSelectedDate.length > 0 ? (
        <List divided relaxed>
          {eventsForSelectedDate.map((event) => (
            <List.Item key={event._id}>
              <Icon name="calendar alternate outline" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{event.title}</List.Header>
                <List.Description>
                  {event.time && (
                    <span>
                      <strong>Time:</strong> {event.time}
                      <br />
                    </span>
                  )}
                  {event.description}
                </List.Description>
                <Button
                  icon
                  color="blue"
                  size="small"
                  onClick={() => openEditModal(event)}
                  style={{ marginTop: '0.5rem' }}
                >
                  <Icon name="edit" />
                </Button>
                <Button
                  icon
                  color="red"
                  size="small"
                  onClick={() => openConfirm(event)}
                  style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
                >
                  <Icon name="trash" />
                </Button>
              </List.Content>
            </List.Item>
          ))}
        </List>
      ) : (
        <Message info header="No Events" content="There are no events for this date." />
      )}

      {/* Add Event Modal */}
      <Modal open={modalOpen} onClose={closeAddModal} size="small">
        <Modal.Header>Add Event on {selectedDate.toDateString()}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleAddSubmit} error={!!formError}>
            <Form.Input
              label="Title"
              placeholder="Event Title"
              name="title"
              value={formData.title}
              onChange={handleAddChange}
              required
            />
            <Form.Input
              label="Time"
              placeholder="Event Time (e.g., 10:00 AM)"
              name="time"
              value={formData.time}
              onChange={handleAddChange}
            />
            <Form.TextArea
              label="Description"
              placeholder="Event Description"
              name="description"
              value={formData.description}
              onChange={handleAddChange}
            />
            {formError && <Message error header="Error" content={formError} />}
            <Button type="submit" primary loading={submitting}>
              Add Event
            </Button>
            <Button type="button" onClick={closeAddModal} secondary>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>

      {/* Edit Event Modal */}
      <Modal open={editModalOpen} onClose={closeEditModal} size="small">
        <Modal.Header>Edit Event</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleEditSubmit} error={!!formError}>
            <Form.Input
              label="Title"
              placeholder="Event Title"
              name="title"
              value={formData.title}
              onChange={handleEditChange}
              required
            />
            <Form.Input
              label="Time"
              placeholder="Event Time (e.g., 10:00 AM)"
              name="time"
              value={formData.time}
              onChange={handleEditChange}
            />
            <Form.TextArea
              label="Description"
              placeholder="Event Description"
              name="description"
              value={formData.description}
              onChange={handleEditChange}
            />
            {formError && <Message error header="Error" content={formError} />}
            <Button type="submit" primary loading={submitting}>
              Update Event
            </Button>
            <Button type="button" onClick={closeEditModal} secondary>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>

      {/* Delete Confirmation */}
      <Confirm
        open={confirmOpen}
        onCancel={closeConfirm}
        onConfirm={handleDelete}
        content={`Are you sure you want to delete the event "${currentEvent?.title}"?`}
        confirmButton="Delete"
        cancelButton="Cancel"
      />
    </Container>
  );
};

export default CalendarPage;
