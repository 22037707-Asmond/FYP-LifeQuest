import React, { useState } from 'react';
import Calendar from '../components/Account/Calendar';
import axios from 'axios';

const CalendarTest = () => {
  const [userId] = useState(1); // Dummy user ID for testing

  const simulateMeetingRequest = async () => {
    try {
      console.log('Sending meeting request...');
      const newMeeting = {
        title: 'Meeting with Agent',
        date: '2024-07-10', // Example date
        user: { id: userId },
        agent: { id: 1 }, // Example agent ID
        accepted: false
      };
      const response = await axios.post('/api/calendar/request', newMeeting);
      console.log('Meeting Request Sent:', response.data);
      alert('Meeting Request Sent');
    } catch (error) {
      console.error('Error sending meeting request:', error.response || error.message);
      alert(`Error sending meeting request: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div>
      <h1>Test Calendar Button</h1>
      <button onClick={simulateMeetingRequest}>Simulate Meeting Request</button>
      <Calendar userId={userId} />
    </div>
  );
};

export default CalendarTest;



