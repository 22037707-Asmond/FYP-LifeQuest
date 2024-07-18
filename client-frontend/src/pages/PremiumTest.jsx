import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PremiumPayment from './PremiumPayment';

const PremiumTest = () => {
  const memberId = 1; // Example value

  const processOrder = (orderId, transactionId) => {
    console.log('Processing order...');
    fetch('/api/premiums/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId: orderId,
        transactionId: transactionId,
        total: 100.00, // Example value
        memberId: memberId
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Order processed:', data);
      // Add any additional logic after processing the order
    })
    .catch(error => {
      console.error('Error processing order:', error);
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Adbj4-tpMXCPfypP79iKcAnzf6b9jV4yvqwKPPfXUFe95yZxTlMYwwrLJPYOeeH90e5Sb-cpMPGa1nRO" }}>
      <div>
        <h1>Buy Premium Insurance</h1>
        <PremiumPayment
          onOrderCreate={(order) => console.log('Order created:', order)}
          onOrderApprove={(orderId, transactionId) => processOrder(orderId, transactionId)}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PremiumTest;

