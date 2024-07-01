import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from '../../Components/PageFragment/Header';
import { getAllAgents } from "./AgentsAPI";

const Agents = () => {
    // Below is to store all agents in one object
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        console.log("Fetching Agents..."); // Log before fetching posts

        // look at file AgentAPI.js to use the function
        getAllAgents()
            .then((response) => {
                console.log("API Response:", response); // Log the API response
                if (Array.isArray(response)) {
                    setAgents(response); // Set the agents state with the fetched data
                } else {
                    console.error("Invalid API response structure:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching agents:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Current Agents state:", agents); // Log agents whenever it changes
    }, [agents]);

    // These is just for the dark mode and light mode
    
    // The codes below here are for column data in agents, field is for the column name in database, headerName is for the name to appear frontend
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "Name", headerName: "Mr/Ms", flex: 1, cellClassName: "name-column--cell" },
        { field: "phone_number", headerName: "Telephone", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "salary", headerName: "Salary", flex: 1 },
        { headerName: "Actions", flex: 1, renderCell:() =>{
            return(
                <Box display="flex">
                    <IconButton>
                        {/* Delete agent, use icon from https://mui.com/material-ui/material-icons */}
                    </IconButton>
                    <IconButton>
                        <SystemUpdateAltOutlinedIcon/>{/* update agent */}
                    </IconButton>
                    <IconButton>
                        <CreditCardOutlinedIcon/>{/* pay Salary */}
                    </IconButton>
                </Box>
            )
        }}
    ];

    return (
        <Box m="20px">
            <Header title="Agents" subtitle="Managing Agents" />
            <Box m="40px 0 0 0" height="55vh" display="flex">
                {/* to see agents, enter data in rows, columns is for the headers we had earlier specified, components are meant for the filteration buttons (yet to see if it works) */}
                <DataGrid rows={agents} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default Agents;
