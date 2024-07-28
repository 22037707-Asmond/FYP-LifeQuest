import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ReceiptPage = () => {
    const location = useLocation();
    const { state } = location;

    if (!state || !state.payment) {
        return <div>Error: No payment details available.</div>;
    }

    const { payment, insurance, user } = state;
    const formattedDate = new Date(payment.createdDate).toLocaleString();
    
    return (
        <div>
            <Card style={{ margin: 'auto', maxWidth: '600px' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Payment Receipt
                    </Typography>
                    <Typography variant="body1">
                        <strong>Payment ID:</strong> {payment.paymentId}
                    </Typography>
                    <Typography variant="body1">
                        <strong>User:</strong> {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Insurance:</strong> {insurance.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Total Amount:</strong> ${payment.amount}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Payment Method:</strong> {payment.method}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Date:</strong> {payment.createdDate}
                    </Typography>
                </CardContent>
            </Card>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => window.print()}>
                Print Receipt
            </Button>
        </div>
    );
};

export default ReceiptPage;
