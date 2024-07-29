import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AgentCalendar.css';
import { LocalStorage } from '../../services/LocalStorage';


const AgentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const [newEvent, setNewEvent] = useState({ title: 'Meeting With ---', date: defaultDate, time: '14:00:00', userId: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/calendar');
      setEvents(response.data.map(event => ({
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

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, date: new Date(info.dateStr) });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleSaveEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.userId) {
      alert('Please fill in all fields.');
      return;
    }

    const account = await LocalStorage.getAccount();
    const agentId = account?.id; // Fetch agent ID from local storage

    try {
      const eventDate = new Date(newEvent.date.getTime() - newEvent.date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      const eventToSave = { 
        ...newEvent, 
        date: eventDate,
        agent: { id: agentId }, // Use agent ID from local storage
        user: { id: newEvent.userId },
        status: 'Upcoming' // Set status to 'Upcoming' by default
      };

      console.log('Saving event:', eventToSave); // Debugging line

      const response = await axios.post('http://localhost:8080/api/calendar', eventToSave); 
      setEvents([...events, {
        title: response.data.title,
        start: `${response.data.date}T${response.data.time}`,
        id: response.data.id,
        accepted: response.data.accepted,
        agent: response.data.agent,
        user: response.data.user,
        status: response.data.status || 'Upcoming'
      }]);
      setNewEvent({ title: 'Meeting With ---', date: defaultDate, time: '14:00:00', userId: '' });
    } catch (error) {
      console.error('Error saving event', error);
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      status: clickInfo.event.extendedProps.status,
      user: clickInfo.event.extendedProps.user,
      time: clickInfo.event.start.toISOString().split('T')[1].split('.')[0]
    });
  };

  const handleEventAction = async (action) => {
    if (!selectedEvent) return;

    const eventId = selectedEvent.id;
    const updatedStatus = action === 'complete' ? 'Completed' : 'Absent';

    try {
      await axios.put(`http://localhost:8080/api/calendar/status/${eventId}`, { status: updatedStatus });
      setEvents(events.map(event => 
        event.id === eventId ? { ...event, status: updatedStatus } : event
      ));
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error updating event', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  const handleEditDateChange = (date) => {
    setSelectedEvent({ ...selectedEvent, start: date });
  };

  const handleUpdateEvent = async () => {
    if (!selectedEvent.title || !selectedEvent.start || !selectedEvent.time || !selectedEvent.user.id) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const eventDate = new Date(selectedEvent.start.getTime() - selectedEvent.start.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      const eventToUpdate = { 
        ...selectedEvent, 
        date: eventDate,
        time: selectedEvent.time,
        user: { id: selectedEvent.user.id } 
      };
      await axios.put(`http://localhost:8080/api/calendar/${selectedEvent.id}`, eventToUpdate);
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...eventToUpdate, start: `${eventDate}T${selectedEvent.time}` } : event
      ));
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error updating event', error);
    }
  };

  return (
    <div className="container">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
      <div className="form-container">
        <h2>Schedule Meeting</h2>
        <label>Meeting Title:</label>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
        />
        <label>Meeting Date:</label>
        <DatePicker
          selected={newEvent.date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
        <label>Meeting Time:</label>
        <select
          name="time"
          value={newEvent.time}
          onChange={handleInputChange}
        >
          <option value="">--Select Time--</option>
          <option value="09:00:00">09:00</option>
          <option value="10:00:00">10:00</option>
          <option value="11:00:00">11:00</option>
          <option value="14:00:00">14:00</option>
          <option value="15:00:00">15:00</option>
          <option value="16:00:00">16:00</option>
        </select>
        <label>Enter the User's ID:</label>
        <input
          type="text"
          name="userId"
          value={newEvent.userId}
          onChange={handleInputChange}
        />
        <button onClick={handleSaveEvent}>Save Event</button>
      </div>
      {selectedEvent && (
        <div className="dropdown-container">
          <h3>Meeting Status</h3>
          <p>Status: {selectedEvent.status || 'Upcoming'}</p>
          <button onClick={() => handleEventAction('complete')}>Mark as Completed</button>
          <button onClick={() => handleEventAction('absent')}>Mark as Absent</button>
          <div className="form-container">
            <h3>Update Meeting</h3>
            <label>Meeting Title:</label>
            <input
              type="text"
              name="title"
              value={selectedEvent.title}
              onChange={handleEditInputChange}
            />
            <label>Meeting Date:</label>
            <DatePicker
              selected={new Date(selectedEvent.start)}
              onChange={handleEditDateChange}
              dateFormat="yyyy-MM-dd"
            />
            <label>Meeting Time:</label>
            <select
              name="time"
              value={selectedEvent.time}
              onChange={handleEditInputChange}
            >
              <option value="">--Select Time--</option>
              <option value="09:00:00">09:00</option>
              <option value="10:00:00">10:00</option>
              <option value="11:00:00">11:00</option>
              <option value="14:00:00">14:00</option>
              <option value="15:00:00">15:00</option>
              <option value="16:00:00">16:00</option>
            </select>
            <label>Enter the User's ID:</label>
            <input
              type="text"
              name="user.id"
              value={selectedEvent.user.id}
              onChange={handleEditInputChange}
            />
            <button onClick={handleUpdateEvent}>Update Meeting</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCalendar;
