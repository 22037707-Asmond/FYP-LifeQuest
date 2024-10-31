import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import PaidIcon from "@mui/icons-material/Paid";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from '../../Components/PageFragment/Header';
import { addInvoice } from "../../Components/Invoices/BillingAgentsAPI";
import { getAllAgents, delAgent, updateAgent, payoutAgent} from "./AgentsAPI";

const AgentsListing = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [payoutMessage, setPayoutMessage] = useState("");

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

    const handlePayment = (id) => {
        const agent = agents.find((agent) => agent.id === id);
        if (!agent) {
          console.error("Agent not found");
          return;
        }
        const { email, salary } = agent;
      
        payoutAgent(email, salary)
          .then((payoutResponse) => {
            console.log("Payout successful:", payoutResponse);
            setPayoutMessage(`Payout of ${salary} was successful for agent ${email}.`);
      
            const invoiceData = {
              totalAmount: salary,
              billingDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
              agentId: agent.id, // Send agentId directly
            };
      
            return addInvoice(invoiceData);
          })
          .then((invoiceResponse) => {
            console.log("Invoice added successfully:", invoiceResponse);
          })
          .catch((error) => {
            console.error("Error processing payout or adding invoice:", error);
            setError(error.message || "Failed to process payout or add invoice");
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
                        <IconButton onClick={() => handlePayment(id)}>
                            <PaidIcon />
                        </IconButton>
                    </Box>
                );
            }
        }
    ];

    return (
        <Box m="20px">
            <Header title="Agents" subtitle="Managing Agents" />
            {payoutMessage && <div>{payoutMessage}</div>}{" "}
            {/* Display payout message */}
            <Box m="40px 0 0 0" height="55vh" display="flex">
                <DataGrid rows={agents} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default AgentsListing;
