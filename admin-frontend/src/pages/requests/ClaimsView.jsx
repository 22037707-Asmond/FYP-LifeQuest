import React, { useEffect, useState } from 'react';
import { Box, IconButton, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Header from '../../Components/PageFragment/Header';
import { getAllRequests, approveRequest, rejectRequest } from '../../services/RequestsService';

const RequestsListing = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        console.log("Fetching Requests...");

        getAllRequests()
            .then((response) => {
                console.log("API Response:", response);
                if (Array.isArray(response)) {
                    setRequests(response);
                } else {
                    console.error("Invalid API response structure:", response);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching requests:", error);
                setError(error.message || "Failed to fetch requests");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log("Current Requests state:", requests);
    }, [requests]);

    const handleApprove = (id) => {
        approveRequest(id)
            .then(() => {
                setRequests((prevRequests) =>
                    prevRequests.map((request) => 
                        request.id === id ? { ...request, status: 'APPROVED' } : request
                    )
                );
            })
            .catch((error) => {
                console.error("Error approving request:", error);
            });
    };

    const handleReject = (id) => {
        rejectRequest(id)
            .then(() => {
                setRequests((prevRequests) =>
                    prevRequests.map((request) => 
                        request.id === id ? { ...request, status: 'REJECTED' } : request
                    )
                );
            })
            .catch((error) => {
                console.error("Error rejecting request:", error);
            });
    };

    const downloadPDF = (base64String, filename) => {
        const linkSource = `data:application/pdf;base64,${base64String}`;
        const downloadLink = document.createElement('a');
        const fileName = `${filename}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'userid', headerName: 'User ID', flex: 1 },
        { field: 'insurance', headerName: 'Insurance', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'agentid', headerName: 'Agent ID', flex: 1 },
        { 
            field: 'documents', 
            headerName: 'Documents', 
            flex: 1,
            renderCell: (params) => (
                params.value ? 
                <IconButton onClick={() => downloadPDF(params.value, `document-${params.row.id}`)}>
                    <DownloadIcon />
                </IconButton> 
                : null
            ) 
        },
        {
            headerName: 'Actions', flex: 1, renderCell: (params) => {
                const { id } = params.row;
                return (
                    <Box display="flex">
                        <IconButton onClick={() => handleApprove(id)}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={() => handleReject(id)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                );
            }
        }
    ];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box m="20px">
            <Header title="Requests" subtitle="Managing Requests" />
            <Box m="40px 0 0 0" height="55vh" display="flex">
                <DataGrid rows={requests} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default RequestsListing;
