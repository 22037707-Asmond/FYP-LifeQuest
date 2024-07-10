const REST_API_URL = 'http://localhost:8080/api';

// Referenced from PostingAPI.js
export const getAllAgents = async () => {
    const response = await fetch(`${REST_API_URL}/agent`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};
