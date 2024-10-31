// Define the base URL for the API
const REST_API_URL = 'http://localhost:8080/api/data';

// Fetch data for agent sales

// Fetch data for user age bins
export const getUserAgeBins = async (agentId) => {
    try {
        const response = await fetch(`${REST_API_URL}/age-demographics/${agentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Return JSON response
    } catch (error) {
        console.error('Error fetching user age bins:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Fetch data for user children bins
export const getUserChildrenBins = async (agentId) => {
    try {
        const response = await fetch(`${REST_API_URL}/children-demographics/${agentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Return JSON response
    } catch (error) {
        console.error('Error fetching user children bins:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Fetch data for sales per month
export const getSalesPerMonth = async (agentId) => {
    try {
        const response = await fetch(`${REST_API_URL}/sales-per-month/${agentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Return JSON response
    } catch (error) {
        console.error('Error fetching sales per month:', error);
        throw error; // Rethrow the error for further handling
    }
};
