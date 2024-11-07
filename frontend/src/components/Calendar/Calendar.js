// frontend/src/components/Calendar/Calendar.js

import React, { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg, EventClickArg } from '@fullcalendar/interaction';
import { CalendarContext } from './CalendarContext';
import EventModal from './EventModal';
import { Button, Loader } from 'semantic-ui-react';

const CalendarComponent = () => {
  const { events, loading } = useContext(CalendarContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection to create a new event
  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  // Handle event click to edit the event
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setModalOpen(true);
  };

  // Handle event drop or resize for updating event timings
  const handleEventDrop = (dropInfo) => {
    // Implement event drop logic if needed
    // For now, alert the new date
    alert(`Event dropped to ${dropInfo.event.startStr}`);
  };

  if (loading) {
    return <Loader active inline="centered" content="Loading Calendar..." />;
  }

  return (
    <div>
      <Button primary onClick={() => setModalOpen(true)} style={{ marginBottom: '1rem' }}>
        Create New Event
      </Button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
      />
      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarComponent;
