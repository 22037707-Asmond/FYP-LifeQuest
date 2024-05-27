import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const addAccount = (account) => {
    return axios.post(`${REST_API_URL}/accounts/add`, account);
};

export const getAccounts = () => {
    return axios.get(`${REST_API_URL}/accounts`);
};

export const getAccountByUsr = (username) => {
    return axios.get(`${REST_API_URL}/accounts/${username}`);
};

export const deleteAccount = (accountId) => {
    return axios.delete(`${REST_API_URL}/accounts/delete/${accountId}`);
};

export const authUser = async (username, password) => {
    try {
      const response = await axios.get(`${REST_API_URL}/accounts/auth/${username}/${password}`);
      return response.data;
    } catch (error) {
      // Handle errors
    }
  };
  