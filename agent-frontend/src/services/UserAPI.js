import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const getFullName = async (username) =>{
    return (await axios.get(REST_API_URL + '/accounts/fullname/' + username)).data;
  }


  export const getPictureUrl = async (username) => {
    const response = await axios.get(`${REST_API_URL}/users/profilepicture/${username}`, { responseType: 'arraybuffer' });
    const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    return `data:image/jpeg;base64,${base64}`;
};