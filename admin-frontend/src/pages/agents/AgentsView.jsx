import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from '../../Components/PageFragment/Header';
import { getAllAgents, delAgent, updateAgent } from "./AgentsAPI";

const AgentsListing = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        console.log("Fetching Agents...");

        getAllAgents()
            .then((response) => {
                console.log("API Response:", response);
                if (Array.isArray(response)) {
                    setAgents(response);
                } else {
                    console.error("Invalid API response structure:", response);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching agents:", error);
                setError(error.message || "Failed to fetch posts");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log("Current Agents state:", agents);
    }, [agents]);

    const handleDelete = (id) => {
        delAgent(id)
            .then(() => {
                setAgents(agents.filter(agent => agent.id !== id));
            })
            .catch(error => {
                console.error("Error deleting agent:", error);
            });
    };

    const handleUpdate = (id) => {
        // Implement the update logic here
        updateAgent(id)
          .then((updatedAgent) => {
            setAgents((prevAgents) =>
              prevAgents.map((agent) => (agent.id === id ? updatedAgent : agent))
            );
          })
          .catch((error) => {
            console.error("Error updating agent:", error);
            setError(error.message || "Failed to update agent");
          });
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
            <Header title="Agents" subtitle="Managing Agents" />
            <Box m="40px 0 0 0" height="55vh" display="flex">
                <DataGrid rows={agents} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default AgentsListing;
