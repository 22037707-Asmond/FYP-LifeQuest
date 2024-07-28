import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { allInsurances } from '../../services/InsuranceAPI';

const InsuranceTable = () => {
  const [insurances, setInsurances] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const insuranceCategories = {
    "Health Protection": ["PRUShield", "PRUExtra", "PRUActive Protect", "PRUCancer 360", "PRU Early Stage Crisis Cover", "PRU Safe Dengue", "PRU Safe COVIDCover"],
    "Life Protection": ["PRULife Vantage Achiever Prime Series", "PRUVantage Legacy Index", "PRULifetime Income Premier (USD)", "PRULifetime Income Plus"],
    "Wealth Accumulation": ["PRULink FlexGrowth", "PRUWealth Plus (SGD)", "PRUVantage Wealth"],
    "Legacy Planning": ["PRUVantage Legacy Index"],
    "Microinsurance": ["PruShield", "PRUSafe Sports", 'PruSafe Guard 22', "PRUSafe COVIDCover", "PRUSafe Dengue", 'PRUSafe Prostate Cancer', 'PRUSafe Breast Cancer']
  };

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
    navigate(`/insurance/${insurance.id}`, { state: { insurance } });
  };

  const handleBuyNowClick = (insurance) => {
    if (insuranceCategories["Microinsurance"].includes(insurance.name)) {
      navigate(`/Payment`, { state: { insuranceId: insurance.id } });
    } else {
      navigate(`/Chat`, { state: { insuranceId: insurance.id } });
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredInsurances = selectedCategory === 'All' ? insurances : insurances.filter(insurance =>
    insuranceCategories[selectedCategory].includes(insurance.name)
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h2" align="center" fontWeight="bold">
        List of Prudential Insurances
      </Typography>
      <FormControl variant="outlined" fullWidth style={{ margin: '20px 0' }}>
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
          <MenuItem value="All">All</MenuItem>
          {Object.keys(insuranceCategories).map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={3} id="insuranceRow">
        {filteredInsurances.length > 0 ? (
          filteredInsurances.map((insurance, key) => (
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
                    onClick={() => handleBuyNowClick(insurance)}
                  >
                    {insuranceCategories["Microinsurance"].includes(insurance.name) ? 'Buy Now' : 'Chat'}
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
