// frontend/src/components/Calendar/CalendarEvent.js

import React from 'react';

const CalendarEvent = (eventInfo) => {
  return (
    <div>
      <strong>{eventInfo.event.title}</strong>
      <p>{eventInfo.event.extendedProps.description}</p>
    </div>
  );
};

export default CalendarEvent;
