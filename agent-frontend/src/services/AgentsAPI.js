import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const authAgent = async (username, password) => {
    try {
      const response = await axios.get(`${REST_API_URL}/agents/auth/${username}/${password}`);
      return response.data;
    } catch (error) {
      // Handle errors
    }
  }

  export const getFullName = async (username) => {
    const response = await axios.get(`http://localhost:8080/api/agents/fullname/${username}`);
    return response.data;  
};