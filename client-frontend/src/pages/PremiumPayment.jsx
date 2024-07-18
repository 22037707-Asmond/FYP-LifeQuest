import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PremiumPayment = ({ onOrderCreate, onOrderApprove }) => {
  const cartTotal = 100.00; // Example value

  const createOrder = (data, actions) => {
    return fetch('http://localhost:8080/api/paypal/pay', {
      method: 'POST',
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
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(order => {
      return order.id; // Ensure this is correct
    })
    .catch(error => {
      console.error('Error creating order:', error);
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      const orderId = details.id;
      const transactionId = details.purchase_units[0].payments.captures[0].id;
      console.log(`Transaction completed by ${details.payer.name.given_name}`);
      console.log(`Order ID: ${orderId}`);
      console.log(`Transaction ID: ${transactionId}`);
      // Process order with orderId and transactionId
    });
  };

  return (
    <div>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  );
};

export default PremiumPayment;


