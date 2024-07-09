import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PremiumPayment = () => {
  const cartTotal = 100.00; // Example value
  const memberId = 1; // Example value

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
    // Your order processing logic here
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
