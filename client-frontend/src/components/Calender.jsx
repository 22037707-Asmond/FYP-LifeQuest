// Calendar.js
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchCalendar();
    fetchAgents();
  }, []);

  const fetchCalendar = async () => {
    try {
      const response = await axios.get('/api/calendar');
      setCalendar(response.data);
    } catch (error) {
      console.error('Error fetching calendar', error);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get('/api/agents'); // Assuming you have an endpoint to fetch agents
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents', error);
    }
  };

  const handleDateClick = async (info) => {
    const title = prompt('Enter event title:');
    if (title) {
      const agent = prompt('Enter agent name:'); // Simplified for example purposes, you could use a dropdown
      if (agent) {
        try {
          const newEvent = { title, date: info.dateStr, agent };
          const response = await axios.post('/api/calendar', newEvent);
          setCalendar([...calendar, response.data]);
        } catch (error) {
          console.error('Error saving event', error);
        }
      }
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendar}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
