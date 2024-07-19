import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from '../../Components/PageFragment/Header';
import { getAllAdmins, delAdmin, updateAdmin } from "./AdminsAPI";

const AdminsListing = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        console.log("Fetching Admins...");

        getAllAdmins()
            .then((response) => {
                console.log("API Response:", response);
                if (Array.isArray(response)) {
                    setAdmins(response);
                } else {
                    console.error("Invalid API response structure:", response);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching admins:", error);
                setError(error.message || "Failed to fetch posts");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log("Current Admins state:", admins);
    }, [admins]);

    const handleDelete = (id) => {
        delAdmin(id)
            .then(() => {
                setAdmins(admins.filter(admin => admin.id !== id));
            })
            .catch(error => {
                console.error("Error deleting admin:", error);
            });
    };

    const handleUpdate = (id) => {
        // Implement the update logic here
        updateAdmin(id)
          .then((updatedAdmin) => {
            setAdmins((prevAdmins) =>
              prevAdmins.map((admin) => (admin.id === id ? updatedAdmin : admin))
            );
          })
          .catch((error) => {
            console.error("Error updating admin:", error);
            setError(error.message || "Failed to update admin");
          });
    };

    const handlePaySalary = (id) => {
        // Implement pay salary logic here
    };

    const columns = [
        { field: "mr_ms", headerName: "Mr/Ms", flex: 1, cellClassName: "name-column--cell" },
        { field: "telephone", headerName: "Telephone", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "salary", headerName: "Salary", flex: 1 },
        {
            headerName: "Actions", flex: 1, renderCell: (params) => {
                const { id } = params.row;
                return (
                    <Box display="flex">
                        <IconButton onClick={() => handleDelete(id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleUpdate(id)}>
                            <UpdateIcon />
                        </IconButton>
                    </Box>
                );
            }
        }
    ];

    return (
        <Box m="20px">
            <Header title="Admins" subtitle="Managing Admins" />
            <Box m="40px 0 0 0" height="55vh" display="flex">
                <DataGrid rows={admins} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default AdminsListing;
