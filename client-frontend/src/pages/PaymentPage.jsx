import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import PremiumPayment from './PremiumPayment';
import AppNavBar from '../components/Account/AppNavBar';

const PaymentPage = () => {
    return (
    <PayPalScriptProvider options={{ "client-id": "Adbj4-tpMXCPfypP79iKcAnzf6b9jV4yvqwKPPfXUFe95yZxTlMYwwrLJPYOeeH90e5Sb-cpMPGa1nRO" }}>
      <div>
      <AppNavBar/>
        <PremiumPayment />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentPage;
