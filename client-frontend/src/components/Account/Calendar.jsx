import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const Calendar = ({ userId }) => {
  const [calendar, setCalendar] = useState([]);

  const fetchAcceptedMeetings = useCallback(async () => {
    try {
      const response = await axios.get(`/api/calendar/accepted/${userId}`);
      setCalendar(response.data);
    } catch (error) {
      console.error('Error fetching accepted meetings', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchAcceptedMeetings();
  }, [fetchAcceptedMeetings]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendar.map(event => ({
        title: event.title,
        date: event.date
      }))}
    />
  );
};

export default Calendar;
