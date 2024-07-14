import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/v1';

export const getAllAdmins = async () => {
    const response = await fetch(`${REST_API_URL}/admins`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addAdmin = (formData) => {
    return axios.post(`${REST_API_URL}/admins`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const delAdmin = (id) => {
    return axios.delete(`${REST_API_URL}/admins/${id}`);
};

export const updateAdmin = (id, adminDetails) => {
    return axios.put(`${REST_API_URL}/admins/${id}`, adminDetails);
};
