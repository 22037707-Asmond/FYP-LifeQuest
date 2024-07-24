import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const ClientCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/calendar'); // Use full URL if necessary
      setEvents(response.data.map(event => ({
        title: event.title,
        start: `${event.date}T${event.time}`,
        id: event.id,
        accepted: event.accepted,
        agent: event.agent,
        user: event.user
      })));
    } catch (error) {
      console.error('Error fetching calendar events', error);
    }
  };

  const handleEventClick = async (clickInfo) => {
    const accept = window.confirm('Do you want to accept this event?');
    if (accept) {
      try {
        await axios.post(`http://localhost:8080/api/calendar/accept/${clickInfo.event.id}`); // Use full URL if necessary
        const updatedEvents = events.map(event => 
          event.id === clickInfo.event.id ? { ...event, accepted: true } : event
        );
        setEvents(updatedEvents);
      } catch (error) {
        console.error('Error accepting event', error);
      }
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={handleEventClick}
    />
  );
};

export default ClientCalendar;
