import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/v1';

export const getAllAgents = async () => {
    const response = await fetch(`${REST_API_URL}/agents`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addAgent = (formData) => {
    return axios.post(`${REST_API_URL}/agents`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const delAgent = (id) => {
    return axios.delete(`${REST_API_URL}/agents/${id}`);
};

export const updateAgent = (id, agentDetails) => {
    return axios.put(`${REST_API_URL}/agents/${id}`, agentDetails);
};
