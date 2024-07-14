import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AppNavBar from '../components/Account/AppNavBar';

export default function Calculator() {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [bmi, setBmi] = useState('');
    const [children, setChildren] = useState('');
    const [smoker, setSmoker] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSexChange = (event) => {
        setSex(event.target.value);
    };

    const handleSmokerChange = (event) => {
        setSmoker(event.target.value);
    };

    const handleCalculate = async () => {
        const data = {
            age: [parseInt(age)],
            sex: [parseInt(sex)],
            bmi: [parseFloat(bmi)],
            children: [parseInt(children)],
            smoker: [parseInt(smoker)],
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log('API Response:', result);
            setPrediction(result.prediction ? result.prediction[0] : null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <AppNavBar />
            <br />
            <Typography className='text-center'>Get a rough calculation of your premiums</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 800, // Set a fixed width for the form
                        padding: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: 'background.paper'
                    }}
                    component="form"
                    noValidate
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Age"
                        label="Age"
                        name="Age"
                        autoComplete="Age"
                        autoFocus
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="sex-label">Sex</InputLabel>
                        <Select
                            labelId="sex-label"
                            id="Sex"
                            value={sex}
                            label="Sex"
                            onChange={handleSexChange}
                        >
                            <MenuItem value={0}>Male</MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="smoker-label">Smoker</InputLabel>
                        <Select
                            labelId="smoker-label"
                            id="Smoker"
                            value={smoker}
                            label="Smoker"
                            onChange={handleSmokerChange}
                        >
                            <MenuItem value={0}>No</MenuItem>
                            <MenuItem value={1}>Yes</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Children"
                        label="Children"
                        name="Children"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="BMI"
                        label="BMI"
                        name="BMI"
                        value={bmi}
                        onChange={(e) => setBmi(e.target.value)}
                    />
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'red' }}
                        onClick={handleCalculate}
                    >
                        Calculate
                    </Button>
                    
                    {prediction !== null && (
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Predicted Premium: ${prediction.toFixed(2)}
                        </Typography>
                    )}
                </Box>
            </Box>
        </>
    );
}
