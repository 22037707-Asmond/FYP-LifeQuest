import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../../services/LocalStorage';
import { Card, CardContent, CardHeader, Typography, Grid, Button } from '@mui/material';

const UserInsurances = () => {
    const [insurances, setInsurances] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await LocalStorage.getAccount();
            if (user) {
                setUserId(user.id);
                fetchUserInsurances(user.id);
                console.log('Fetched user:', user); // Debug log
            }
        };

        fetchUser();
    }, []);

    const fetchUserInsurances = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/insurances/user/${userId}`);
            setInsurances(response.data);
            console.log('Fetched user insurances:', response.data); // Debug log
        } catch (error) {
            console.error('Error fetching user insurances:', error);
        }
    };

    const handlePayPremiumClick = (insurance) => {
        navigate(`/Payment`, { state: { insuranceId: insurance.id } });
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h2" align="center" fontWeight="bold">
                My Insurances
            </Typography>
            <Grid container spacing={3} id="insuranceRow">
                {insurances.length > 0 ? (
                    insurances.map((insurance, key) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={key} style={{ marginTop: '16px' }}>
                            <Card id="insuranceTemplate" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                                <CardHeader title={insurance.name} />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography variant="body1" gutterBottom>
                                        {insurance.description}
                                    </Typography>
                                </CardContent>
                                <div style={{ padding: '3px', display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="contained"
                                        style={{ flex: 1, backgroundColor: 'blue', color: 'white' }}
                                        onClick={() => handlePayPremiumClick(insurance)}
                                    >
                                        Pay Premium
                                    </Button>
                                </div>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No insurances found.
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default UserInsurances;
