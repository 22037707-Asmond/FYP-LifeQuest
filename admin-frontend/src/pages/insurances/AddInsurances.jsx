import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addInsurance, addInsuranceType, getAllInsuranceTypes, getInsuranceType } from './InsuranceAPI';

const AddInsurance = () => {
    const [formType, setFormType] = useState('insurance');
    const [formData, setFormData] = useState({ name: '', description: '', premium: '', insuranceType: '' });
    const [insuranceTypes, setInsuranceTypes] = useState([]);

    useEffect(() => {
        const fetchInsuranceTypes = async () => {
            try {
                const types = await getAllInsuranceTypes();
                setInsuranceTypes(types);
            } catch (error) {
                console.error('Error fetching insurance types:', error);
            }
        };
        if (formType === 'insurance') {
            fetchInsuranceTypes();
        }
    }, [formType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formType === 'insurance') {
                const insuranceData = {
                    name: formData.name,
                    description: formData.description,
                    premium: parseFloat(formData.premium),
                    insuranceType: {
                        id: formData.insuranceType
                    }
                };
                await addInsurance(insuranceData); // Send the data as JSON

                // Fetch the name of the insurance type
                const insuranceType = await getInsuranceType(formData.insuranceType);

                alert(`Insurance created\nname: ${insuranceData.name}\ndescription: ${insuranceData.description}\npremium: ${insuranceData.premium}\ninsurance type: ${insuranceType.name}`);
            } else {
                const insuranceTypeData = {
                    name: formData.name,
                    description: formData.description
                };
                await addInsuranceType(insuranceTypeData); // Send the data as JSON
                alert(`Insurance type created\nname: ${insuranceTypeData.name}\ndescription: ${insuranceTypeData.description}`); // Use backticks
            }
        } catch (error) {
            console.error(`Error creating ${formType}:`, error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create {formType === 'insurance' ? 'Insurance' : 'Insurance Type'}
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="form-type-label">Form Type</InputLabel>
                    <Select
                        labelId="form-type-label"
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                    >
                        <MenuItem value="insurance">Insurance</MenuItem>
                        <MenuItem value="insuranceType">Insurance Type</MenuItem>
                    </Select>
                </FormControl>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    {formType === 'insurance' && (
                        <>
                            <TextField
                                label="Premium"
                                name="premium"
                                value={formData.premium}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="insurance-type-label">Insurance Type</InputLabel>
                                <Select
                                    labelId="insurance-type-label"
                                    name="insuranceType"
                                    value={formData.insuranceType}
                                    onChange={handleChange}
                                >
                                    {insuranceTypes.map((type) => (
                                        <MenuItem key={type.id} value={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddInsurance;
