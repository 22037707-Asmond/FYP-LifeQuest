import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api';

export const getAllPosts = async () => {
    try {
        const response = await fetch(`${REST_API_URL}/article`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const addPost = async (formData) => {
    try {
        const response = await axios.post(`${REST_API_URL}/article/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const delPost = async (id) => {
    try {
        const response = await axios.delete(`${REST_API_URL}/articles/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

export const updatePost = async (id, updatedData) => {
    try {
        const response = await axios.put(`${REST_API_URL}/article/update/${id}`, updatedData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};
