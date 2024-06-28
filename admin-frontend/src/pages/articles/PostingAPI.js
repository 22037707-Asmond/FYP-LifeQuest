import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const getAllPosts = async () => {
    const response = await fetch(`${REST_API_URL}/article`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};


export const addPost = (formData) => {
    return axios.post(`${REST_API_URL}/article/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const delPost = (id) => {
    return axios.post(`${REST_API_URL}/article/delete`, id, {
        
    });
};

export const updatePost = (id) => {
    return axios.post(`${REST_API_URL}/article/add`,id, {
        
    });
};