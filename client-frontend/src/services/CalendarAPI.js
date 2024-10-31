import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/calendar';

export const allCalendarEvents = () => {
    return axios.get(`${REST_API_URL}`);
}

export const createCalendarEvent = async (calendarEvent) => {
    const response = await axios.post(`${REST_API_URL}`, calendarEvent);
    return response.data;
};