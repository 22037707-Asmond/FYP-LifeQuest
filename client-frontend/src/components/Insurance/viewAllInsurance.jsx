// src/components/InsuranceTable.jsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { allInsurances } from '../../services/InsuranceAPI';

const InsuranceTable = () => {
  const [insurances, setInsurances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    allInsurances()
      .then((res) => {
        console.log('Fetched insurances:', res.data); // Debug log
        setInsurances(res.data);
      })
      .catch((err) => {
        console.error('Error fetching insurances:', err);
      });
  }, []);

  const handleMoreInfoClick = (insurance) => {
    navigate(`/insurance/${insurance.id}`, { state: { insuranceName: insurance.name } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h2" align="center" fontWeight="bold">
        List of Prudential Insurances
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
                    style={{ flex: 1, marginRight: '5px', backgroundColor: 'blue', color: 'white' }}
                    onClick={() => handleMoreInfoClick(insurance)}
                  >
                    More Info
                  </Button>
                  <Button
                    variant="contained"
                    style={{ flex: 1, backgroundColor: 'red', color: 'white' }}
                  >
                    Buy Now
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

export default InsuranceTable;
