import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const getAllPosts = () => {
    return axios.get(`${REST_API_URL}/posts`);
};

export const addPost = (post) => {
    return axios.post(`${REST_API_URL}/posts/add`, post);
};