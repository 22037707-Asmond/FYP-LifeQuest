import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const allAgents = async() => {
    return (await axios.get(`${REST_API_URL}/agents/all`)).data;
}

export const getFullName = async (username) => {
    const response = await axios.get(`http://localhost:8080/api/agents/fullname/${username}`);
    return response.data;  
};

export const getAgent = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/agents/${id}`);
    return response.data;
};