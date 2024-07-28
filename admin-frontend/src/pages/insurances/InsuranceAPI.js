import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/insurances';

export const getAllInsuranceTypes = async () => {
    try {
        const response = await axios.get(`${REST_API_URL}/Category/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching insurance types:', error);
        throw error;
    }
};

export const getAllInsurances = async () => {
    try {
        const response = await axios.get(`${REST_API_URL}/Insurance/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching insurances:', error);
        throw error;
    }
};

export const addInsuranceType = async (formData) => {
    try {
        const response = await axios.post(`${REST_API_URL}/Category/add`, formData);
        return response.data;
    } catch (error) {
        console.error('Error adding insurance type:', error);
        throw error;
    }
};

export const addInsurance = async (formData) => {
    try {
        const response = await axios.post(`${REST_API_URL}/Insurance/add`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding insurance:', error);
        throw error;
    }
};

export const delInsurance = async (id) => {
    try {
        const response = await axios.delete(`${REST_API_URL}/Insurance/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting insurance:', error);
        throw error;
    }
};

export const updateInsurance = async (id, updatedData) => {
    try {
        const response = await axios.put(`${REST_API_URL}/Insurance/update/${id}`, updatedData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating insurance:', error);
        throw error;
    }
};

export const getInsuranceType = async (id) => {
    try {
        const response = await axios.get(`${REST_API_URL}/Category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching insurance type:', error);
        throw error;
    }
};