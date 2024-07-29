import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { LocalStorage } from '../services/LocalStorage';

const ClientCalendar = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await LocalStorage.getAccount();
      if (user) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/calendar');
      const userEvents = response.data.filter(event => event.user.id === userId);
      setEvents(userEvents.map(event => ({
        title: event.title,
        start: `${event.date}T${event.time}`,
        id: event.id,
        accepted: event.accepted,
        agent: event.agent,
        user: event.user,
        status: event.status || 'Upcoming'
      })));
    } catch (error) {
      console.error('Error fetching calendar events', error);
    }
  };

  const handleEventClick = (clickInfo) => {
    const event = events.find(event => event.id === clickInfo.event.id);
    alert(`Event: ${event.title}\nDate: ${event.start.split('T')[0]}\nTime: ${event.start.split('T')[1]}\nStatus: ${event.status}\nAccepted: ${event.accepted ? 'Yes' : 'No'}\nAgent: ${event.agent ? event.agent.username : 'N/A'}\nUser: ${event.user ? event.user.username : 'N/A'}`);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default ClientCalendar;
