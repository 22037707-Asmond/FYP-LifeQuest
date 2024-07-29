import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/requests';

export const getAllRequests = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching requests:', error);
        throw error;
    }
};

export const approveRequest = async (id) => {
    try {
        await axios.post(`${API_BASE_URL}/approve/${id}`);
    } catch (error) {
        console.error('Error approving request:', error);
        throw error;
    }
};

export const rejectRequest = async (id) => {
    try {
        await axios.post(`${API_BASE_URL}/reject/${id}`);
    } catch (error) {
        console.error('Error rejecting request:', error);
        throw error;
    }
};
