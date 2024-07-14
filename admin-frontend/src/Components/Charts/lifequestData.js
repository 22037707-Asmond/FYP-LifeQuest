const REST_API_URL = 'http://localhost:8080/api';

export const getSalesAgentData = async () => {
    const response = await fetch(`${REST_API_URL}/sales/data`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};