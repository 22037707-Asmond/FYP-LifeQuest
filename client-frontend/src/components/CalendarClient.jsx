import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ClientCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleEventClick = (clickInfo) => {
    console.log('Event clicked:', clickInfo.event.id); // Debugging line
    const event = events.find(event => event.id === clickInfo.event.id);
    console.log('Selected event:', event); // Debugging line
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />

      {selectedEvent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Event Details"
        >
          <h2>{selectedEvent.title}</h2>
          <p>Date: {selectedEvent.start.split('T')[0]}</p>
          <p>Time: {selectedEvent.start.split('T')[1]}</p>
          <p>Status: {selectedEvent.status}</p>
          <p>Accepted: {selectedEvent.accepted ? 'Yes' : 'No'}</p>
          <p>Agent: {selectedEvent.agent ? selectedEvent.agent.username : 'N/A'}</p>
          <p>User: {selectedEvent.user ? selectedEvent.user.username : 'N/A'}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default ClientCalendar;
