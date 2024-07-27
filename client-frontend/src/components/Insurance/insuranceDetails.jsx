import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InsuranceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { insurance } = location.state;

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
        <CardHeader title={insurance.name} />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {insurance.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/insurance')}
            style={{ marginTop: '20px' }}
          >
            Back to List
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceDetails;
