import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButtons } from "@paypal/react-paypal-js";
import '../assets/css/PremiumPayment.css';

const PremiumPayment = () => {
    const [user, setUser] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const userId = 3; 
    const insuranceId = 1; 

    const insurancePrice = 100; 
    useEffect(() => {
        axios.get(`http://localhost:8080/api/accounts/id/${userId}`)
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user data:', error));

        axios.get(`http://localhost:8080/api/insurances/${insuranceId}`)
            .then(response => setInsurance(response.data))
            .catch(error => console.error('Error fetching insurance data:', error));
    }, []);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: insurancePrice
                }
            }]
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(details => {
            const paymentId = details.id;
            const totalAmount = details.purchase_units[0].amount.value;

            const paymentRequest = {
                userId: user.id,
                insuranceId: insurance.id,
                totalAmount,
                currency: 'USD',
                method: 'PayPal'
            };

            axios.post('http://localhost:8080/api/payments/pay', paymentRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => console.log('Payment success:', response))
                .catch(error => console.error('Error processing payment:', error));
        });
    };

    if (!user || !insurance) return <div>Loading...</div>;

    return (
      <div className="receipt">
          <h2>Premium Payment</h2>
          <p>User: {user.firstName} {user.lastName}</p>
          <p>Insurance: {insurance.name}</p>
          <p className="price">Price: ${insurancePrice}</p>
          <div className="paypal-buttons">
              <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
              />
          </div>
      </div>
  );
};

export default PremiumPayment;
