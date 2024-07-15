import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const allAgents = () => {
    return axios.get(`${REST_API_URL}/agents/all`);
}

export const getFullName = async (username) => {
    const response = await axios.get(`http://localhost:8080/api/agents/fullname/${username}`);
    return response.data;  
};