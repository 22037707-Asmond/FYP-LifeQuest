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
        console.log('Fetched user:', user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEvents(userId);
    }
  }, [userId]);

  const fetchEvents = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8080/api/calendar');
      console.log('API Response:', response.data); // Debug log

      const userEvents = response.data.filter(event => event.userId === userId);
      console.log('Fetched user events:', userEvents); // Debug log

      setEvents(userEvents.map(event => ({
        title: event.title,
        start: `${event.date}T${event.time}`,
        id: event.id,
        accepted: event.accepted,
        agentId: event.agentId,
        userId: event.userId,
        status: event.status || 'Upcoming'
      })));
    } catch (error) {
      console.error('Error fetching calendar events', error);
    }
  };

  const handleEventClick = (clickInfo) => {
    const event = events.find(event => event.id === parseInt(clickInfo.event.id));
    if (event) {
      alert(`Event: ${event.title}\nDate: ${event.start.split('T')[0]}\nTime: ${event.start.split('T')[1]}\nStatus: ${event.status}\nAgent ID: ${event.agentId}`);
    } else {
      console.error('Event not found:', clickInfo.event.id);
    }
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
