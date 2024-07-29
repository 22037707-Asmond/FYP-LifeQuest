// src/components/PremiumPayment.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalStorage } from '../services/LocalStorage';
import '../assets/css/PremiumPayment.css';

const PremiumPayment = () => {
    const [user, setUser] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await LocalStorage.getAccount();
            console.log('Fetched user data:', userData); // Debug log
            if (userData) {
                setUser(userData);
            } else {
                console.error('User data not found');
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (state && state.insuranceId) {
            axios.get(`http://localhost:8080/api/insurances/${state.insuranceId}`)
                .then(response => {
                    console.log('Fetched insurance data:', response.data); // Debug log
                    setInsurance(response.data);
                })
                .catch(error => console.error('Error fetching insurance data:', error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [state]);

    const createOrder = (data, actions) => {
        // Commented out original code for testing purposes
        // if (!insurance || !insurance.premium) {
        //     console.error('Insurance data is missing or incomplete');
        //     return;
        // }
        // const price = insurance.premium.toString(); // Use the premium directly from the insurance object
        
        const price = '1.00'; // Fixed price for testing

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: price
                }
            }]
        });
    };

    const onApprove = (data, actions) => {
        if (!user || !insurance) {
            console.error('User or insurance data is missing');
            return;
        }
        return actions.order.capture().then(details => {
            const paymentId = details.id;
            const totalAmount = details.purchase_units[0].amount.value;

            const paymentRequest = {
                userId: user.id,
                insuranceId: insurance.id,
                totalAmount,
                currency: 'USD',
                method: 'PayPal',
                paymentId: paymentId // Send PayPal payment ID
            };

            console.log('Payment request:', paymentRequest); // Debug log

            axios.post('http://localhost:8080/api/payments/pay', paymentRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Payment success:', response.data);
                    navigate('/Receipt', { state: { payment: response.data, insurance, user } });
                })
                .catch(error => console.error('Error processing payment:', error));
        });
    };

    if (loading) return <div>Loading...</div>;

    if (!user || !user.id || !insurance || !insurance.id) {
        console.error('User or insurance data is incomplete', { user, insurance });
        return <div>Error loading data. Please try again.</div>;
    }

    return (
        <div className="receipt">
            <h2>Premium Payment</h2>
            <p>User: {user.firstName} {user.lastName}</p>
            <p>Insurance: {insurance.name}</p>
            <p className="price">Price: ${insurance.premium}</p>
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
