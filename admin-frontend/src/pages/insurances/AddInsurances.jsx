import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import Header from "../../Components/PageFragment/Header";
import { addInsurance, addInsuranceType, getAllInsuranceTypes } from './InsuranceAPI'; // Adjust the path as needed

const AddInsurances = () => {
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [insuranceData, setInsuranceData] = useState({
    name: '',
    description: '',
    insuranceType: ''
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getAllInsuranceTypes();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setInsuranceData({ ...insuranceData, insuranceType: event.target.value });
  };

  const handleInsuranceChange = (event) => {
    const { name, value } = event.target;
    setInsuranceData({ ...insuranceData, [name]: value });
  };

  const handleNewCategoryChange = (event) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCategory = async () => {
    try {
      await addInsuranceType(newCategory);
      setNewCategory({ name: '', description: '' });
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };

  const handleAddInsurance = async () => {
    try {
      const payload = {
        ...insuranceData,
        insuranceType: { id: insuranceData.insuranceType } // Sending insuranceType as an object with an id
      };
      await addInsurance(payload);
      setInsuranceData({ name: '', description: '', insuranceType: '' });
    } catch (error) {
      console.error('Error adding insurance:', error);
    }
  };

  const handleUpdateClick = () => {
    setOpen(true);
  };

  return (
    <>
      <section>
        <div className="App">
          <main>
            <Header
              title="Add Insurance"
              subtitle="Choose Category Insurance"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="insuranceCategory"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleUpdateClick}>Add New Category</Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  name="name"
                  label="Category Name"
                  type="text"
                  fullWidth
                  value={newCategory.name}
                  onChange={handleNewCategoryChange}
                />
                <TextField
                  margin="dense"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  value={newCategory.description}
                  onChange={handleNewCategoryChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>

            <Box sx={{ minWidth: 120, marginTop: 2 }}>
              <TextField
                margin="dense"
                name="name"
                label="Insurance Name"
                type="text"
                fullWidth
                value={insuranceData.name}
                onChange={handleInsuranceChange}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                value={insuranceData.description}
                onChange={handleInsuranceChange}
              />
              <Button variant="contained" onClick={handleAddInsurance} sx={{ marginTop: 2 }}>Add Insurance</Button>
            </Box>
          </main>
        </div>
      </section>
    </>
  );
};

export default AddInsurances;
