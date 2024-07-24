// AgentCalendar.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const AgentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', userId: '' });

  useEffect(() => {
    fetchEvents();
    fetchAgents();
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

  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/agents'); // Use full URL if necessary
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents', error);
    }
  };

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, date: info.dateStr });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSaveEvent = async () => {
    if (!selectedAgent) {
      alert('Please select an agent.');
      return;
    }
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.userId) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const eventToSave = { 
        ...newEvent, 
        agent: { id: selectedAgent }, 
        user: { id: newEvent.userId } 
      };
      const response = await axios.post('http://localhost:8080/api/calendar', eventToSave); // Use full URL if necessary
      setEvents([...events, {
        title: response.data.title,
        start: `${response.data.date}T${response.data.time}`,
        id: response.data.id,
        accepted: response.data.accepted,
        agent: response.data.agent,
        user: response.data.user
      }]);
      setNewEvent({ title: '', date: '', time: '', userId: '' }); // Reset the form
    } catch (error) {
      console.error('Error saving event', error);
    }
  };

  return (
    <div>
      <div>
        <label>Select Agent:</label>
        <select onChange={(e) => setSelectedAgent(e.target.value)}>
          <option value="">--Select Agent--</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>{agent.firstName} {agent.lastName}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Event Title:</label>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
        />
        <label>Event Time (HH:MM:SS):</label>
        <input
          type="text"
          name="time"
          value={newEvent.time}
          onChange={handleInputChange}
        />
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={newEvent.userId}
          onChange={handleInputChange}
        />
        <button onClick={handleSaveEvent}>Save Event</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default AgentCalendar;
