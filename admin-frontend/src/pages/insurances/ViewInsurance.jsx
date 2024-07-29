import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Components/PageFragment/Header";
import { delInsurance, getAllInsurances, getAllInsuranceTypes, updateInsurance } from "./InsuranceAPI"; // Ensure this path is correct

function ViewInsurances() {
  const [insurances, setInsurances] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    insuranceType: ''
  });

  useEffect(() => {
    fetchInsurances();
    fetchInsuranceTypes();
  }, []);

  const fetchInsurances = async () => {
    try {
      const data = await getAllInsurances();
      setInsurances(data);
    } catch (error) {
      console.error('Error fetching insurances:', error);
    }
  };

  const fetchInsuranceTypes = async () => {
    try {
      const data = await getAllInsuranceTypes();
      setInsuranceTypes(data);
    } catch (error) {
      console.error('Error fetching insurance types:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await delInsurance(id);
      fetchInsurances();
    } catch (error) {
      console.error('Error deleting insurance:', error);
    }
  };

  const handleUpdateClick = (insurance) => {
    setFormData({
      id: insurance.id,
      name: insurance.name,
      description: insurance.description,
      insuranceType: insurance.insuranceType ? insurance.insuranceType.id : '' // Check if insuranceType exists
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ id: '', name: '', description: '', insuranceType: '' });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const payload = {
        ...formData,
        insuranceType: { id: formData.insuranceType } // Assuming formData.insuranceType holds the ID
      };
      await updateInsurance(formData.id, payload);
      fetchInsurances();
      handleClose();
    } catch (error) {
      console.error('Error updating insurance:', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Insurances" subtitle="Manage Insurance Policies" />
      <Box height="65vh" overflow="auto" p="20px">
        {insurances.length > 0 ? (
          insurances.map((insurance) => (
            <Box key={insurance.id} mb="20px" p="15px" border="1px solid #ddd" borderRadius="8px">
              <h2>{insurance.name}</h2>
              <p style={{ padding: "5px 5px 5px 5px" }}>
                {insurance.description}
              </p>
              <p>Category: {insurance.insuranceType ? insurance.insuranceType.name : 'No Category'}</p> {/* Check if insuranceType exists */}
              <Box display="flex" justifyContent="space-between" p={2}>
                <Box display="flex" ml="auto">
                  <IconButton onClick={() => handleDelete(insurance.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleUpdateClick(insurance)}>
                    <UpdateIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <div>No insurance available</div>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Insurance</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleFormChange}
          />
          <Select
            fullWidth
            name="insuranceType"
            value={formData.insuranceType}
            onChange={handleFormChange}
          >
            {insuranceTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewInsurances;
