import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import AppNavBar from '../components/Account/AppNavBar';
import { ReportStorage } from '../services/LocalStorage';
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from '../components/Report';

export default function Calculator() {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [bmi, setBmi] = useState('');
    const [children, setChildren] = useState('');
    const [smoker, setSmoker] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [message, setMessage] = useState(null);
    const [monthly, setMonthly] = useState(null);
    const [yearly, setYearly] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    ReportStorage.setReport(message);

    const handleSexChange = (event) => {
        setSex(event.target.value);
    };

    const handleSmokerChange = (event) => {
        setSmoker(event.target.value);
    };

    const handleCalculate = async () => {
        setLoading(true); // Set loading to true when request starts
        const data = {
            age: [parseInt(age)],
            sex: [parseInt(sex)],
            bmi: [parseFloat(bmi)],
            children: [parseInt(children)],
            smoker: [parseInt(smoker)]
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('API Response:', result);
            setPrediction(result.prediction ? result.prediction[0] : null);
            setMessage(result.message || null);
            setMonthly(result.monthly || null);
            setYearly(result.yearly || null);
            setLoading(false); // Set loading to false when request completes
        } catch (error) {
            console.error('Error:', error);
            setError('Error making request');
            setLoading(false); // Set loading to false if request fails
        }
    };

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
        ));
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
                            <MenuItem value={'0'}>Male</MenuItem>
                            <MenuItem value={'1'}>Female</MenuItem>
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
                            <MenuItem value={'0'}>No</MenuItem>
                            <MenuItem value={'1'}>Yes</MenuItem>
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
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? <CircularProgress size={24} /> : 'Calculate'} {/* Show loading spinner */}
                    </Button>

                    {prediction !== null && (
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Predicted Premium: ${prediction.toFixed(2)}
                        </Typography>
                    )}
                    {monthly && (
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Monthly Premium: ${monthly}
                        </Typography>
                    )}
                    {yearly && (
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Yearly Premium: ${yearly}
                        </Typography>
                    )}
                    {message && ( // Conditionally render PDFDownloadLink only if message is set
                        <PDFDownloadLink document={<Report />} fileName="FORM">
                            {({ blob, url, loading, error }) =>
                                loading ? (
                                    'Loading document...'
                                ) : (
                                    <Button
                                        type="button"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Download Report
                                    </Button>
                                )
                            }
                        </PDFDownloadLink>
                    )}
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </Box>
            </Box>
        </>
    );
}
