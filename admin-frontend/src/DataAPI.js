const REST_API_URL = 'http://localhost:8080/api';

export const getAllPremiumsSales = async () => {
    const response = await fetch(`${REST_API_URL}/article`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};
