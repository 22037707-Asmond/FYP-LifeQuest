import axios from 'axios';

const REST_API_URL = 'http://localhost:5002/api/v1';
const REST_API_PAYMENT = 'http://localhost:5002/api';

export const getAllAgents = async () => {
    const response = await fetch(`${REST_API_URL}/agents`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const addAgent = (formData) => {
    return axios.post(`${REST_API_URL}/agents`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const delAgent = (id) => {
    return axios.delete(`${REST_API_URL}/agents/${id}`);
};

export const updateAgent = (id, agentDetails) => {
    return axios.put(`${REST_API_URL}/agents/${id}`, agentDetails);
};


export const payoutAgent = async (recipientEmail, amount) => {
    const response = await fetch(
      `${REST_API_PAYMENT}/payouts?recipientEmail=${recipientEmail}&amount=${amount}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to process payout");
    }
  
    return await response.json(); // Assuming the response contains the payout details
  };
  
// export const createPayout = (payoutData) => {
//     return axios.post(`${REST_API_PAYMENT}/v1/payments/payouts`, payoutData, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// export const getAllPayouts = async () => {
//     const response = await fetch(`${REST_API_PAYMENT}/v1/payments/payouts`);
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return await response.json();
// };

// export const deletePayout = (id) => {
//     return axios.delete(`${REST_API_PAYMENT}/v1/payments/payouts/${id}`);
// };

// export const updatePayout = (id, payoutDetails) => {
//     return axios.put(`${REST_API_PAYMENT}/v1/payments/payouts/${id}`, payoutDetails, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };