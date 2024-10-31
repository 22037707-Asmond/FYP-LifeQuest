import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/calendar';

export const allCalendarEvents = async () => {
    try {
        const response = await axios.get(`${REST_API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        throw error; 
    }
}

export const createCalendarEvent = async (calendarEvent) => {
    try {
        const response = await axios.post(`${REST_API_URL}`, calendarEvent, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error; 
    }
};
