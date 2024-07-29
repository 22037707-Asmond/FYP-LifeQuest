import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppNavBar from '../components/Account/AppNavBar';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Container, Box, Alert } from '@mui/material';

const RequestForm = () => {
    const [userId, setUserId] = useState('');
    const [documents, setDocuments] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const [status] = useState('PENDING');
    const [insurance, setInsurance] = useState('');
    const [type, setType] = useState('Application');
    const agent = JSON.parse(localStorage.getItem('account'));

    const [insuranceList, setInsuranceList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/insurances')
            .then((res) => {
                setInsuranceList(res.data);
            })
            .catch((err) => {
                console.error('Error fetching insurance list:', err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const readFileAsBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result.split(',')[1]); 
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };

        try {
            const base64Documents = await readFileAsBase64(documents);

            const requestPayload = {
                agent: {
                    id: agent.id,
                },
                userid: userId,
                documents: base64Documents,
                status,
                insurance,
                type,
            };

            const response = await axios.post('http://localhost:8080/api/requests/add', requestPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Request submitted successfully:', response.data);
            setSuccessMessage('Request submitted successfully!');
            setUserId('');
            setDocuments(null);
            setDocumentName('');
            setInsurance('');
            setType('Application');
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setDocuments(e.target.files[0]);
            setDocumentName(e.target.files[0].name);
        }
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ mt: 4, mb: 4, p: 3, border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Submit Request
                    </Typography>
                    {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="User ID"
                            variant="outlined"
                            fullWidth
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                            <InputLabel>Insurance</InputLabel>
                            <Select
                                value={insurance}
                                onChange={(e) => setInsurance(e.target.value)}
                                label="Insurance"
                            >
                                {insuranceList.map((insurance) => (
                                    <MenuItem key={insurance.id} value={insurance.name}>
                                        {insurance.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                label="Type"
                            >
                                <MenuItem value="Application">Application</MenuItem>
                                <MenuItem value="Claim">Claim</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mb: 2 }}
                        >
                            Upload Documents
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                required
                            />
                        </Button>
                        {documentName && <Typography variant="body1" sx={{ mb: 2 }}>{documentName}</Typography>}
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Submit Request
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default RequestForm;
