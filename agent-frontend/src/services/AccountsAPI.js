import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const addAccount = (account) => {
    return axios.post(`${REST_API_URL}/accounts/add`, account);
};

export const getAccounts = () => {
    return axios.get(`${REST_API_URL}/accounts`);
};

export const updateAccount = async (id, account) => {
  try {
    const response = await axios.post(`${REST_API_URL}/accounts/update/${id}`, account);
    return response.data;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
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

  export const addImage = async (file, id) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        const response = await axios.post(`${REST_API_URL}/accounts/addPhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
  