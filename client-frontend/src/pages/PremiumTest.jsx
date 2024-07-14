import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PremiumTest = () => {
  const cartTotal = 100.00; // Example value

  const createOrder = (data, actions) => {
    return fetch('/api/paypal/pay', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        total: cartTotal,
        currency: 'USD',
        method: 'paypal',
        intent: 'sale',
        description: 'Test Payment',
        cancelUrl: 'http://localhost:3000/cancel',
        successUrl: 'http://localhost:3000/success'
      })
    }).then(response => response.json())
      .then(order => {
        return order.id;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      const orderId = details.id;
      const transactionId = details.purchase_units[0].payments.captures[0].id;
      console.log(`Transaction completed by ${details.payer.name.given_name}`);
      console.log(`Order ID: ${orderId}`);
      console.log(`Transaction ID: ${transactionId}`);
      processOrder(orderId, transactionId);
    });
  };

  const processOrder = (orderId, transactionId) => {
    fetch('/api/premiums/process', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId: orderId,
        transactionId: transactionId,
        total: cartTotal,
        memberId: 1 // Example member ID
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
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PremiumTest;
