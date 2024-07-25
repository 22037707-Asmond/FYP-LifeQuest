import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const allInsurances = () => {
    return axios.get(`${REST_API_URL}/insurances`);
}

export const getInsuranceById = async (id) => {
    const response = await axios.get(`${REST_API_URL}/insurances/${id}`);
    return response.data;
};