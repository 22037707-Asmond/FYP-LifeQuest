import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/invoices';

export const getInvoices = async () => {
    try {
        const response = await axios.get(`${REST_API_URL}/all`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            throw new Error('Failed to fetch invoices');
        }
    } catch (error) {
        console.error('Error fetching invoices:', error);
        throw error;
    }
};

export const addInvoice = (invoiceData) => {
    return axios.post(`${REST_API_URL}/add`, {
      totalAmount: invoiceData.totalAmount,
      billingDate: invoiceData.billingDate,
      agentId: invoiceData.agentId, // Adjusted to match backend DTO
    })
    .then(response => response.data)
    .catch(error => {
      console.error("Error adding invoice:", error);
      throw error;
    });
  };
