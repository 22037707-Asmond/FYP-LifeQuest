import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const addAccount = (account) => {
    return axios.post(`${REST_API_URL}/admin/add`, account);
}
