// Define the base URL for the API
const REST_API_URL = 'http://localhost:8080/api/data';

// Fetch data for agent sales
export const getAgentSales = async () => {
    try {
        const response = await fetch(`${REST_API_URL}/agent-sales`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Return JSON response
    } catch (error) {
        console.error('Error fetching agent sales:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Fetch data for user ages
export const getUserAges = async () => {
    try {
        const response = await fetch(`${REST_API_URL}/user-ages`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Return JSON response
    } catch (error) {
        console.error('Error fetching user ages:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Fetch data for profit or loss by month
export const getProfitOrLossByMonth = async () => {
    try {
        const response = await fetch(`${REST_API_URL}/profit-loss`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Return JSON response
    } catch (error) {
        console.error('Error fetching profit or loss by month:', error);
        throw error; // Rethrow the error for further handling
    }
};
