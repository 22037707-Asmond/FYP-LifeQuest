import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Button, Typography, useTheme } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState } from 'react';
import LineChartSales from '../../components/Charts/LineChartSales';
import PieChartAge from "../../components/Charts/PieChartAge";
import PieChart from "../../components/Charts/PieChartKids";
import Header from "../../components/fragment/Header";
import { tokens } from '../../theme';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true);

    const handleDownload = async () => {
        const input = document.getElementById('dashboard-content');
        if (input) {
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('dashboard.pdf');
        }
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
                <Header title="DASHBOARD" subtitle="Welcome Admin" />
                <Button 
                    onClick={handleDownload}
                    sx={{ 
                        backgroundColor: colors.blueAccent[700], 
                        color: colors.grey[100], 
                        fontSize: "14px", 
                        fontWeight: "bold", 
                        padding: "10px 20px",
                        '&:hover': {
                            backgroundColor: colors.blueAccent[800],
                        }
                    }}
                >
                    <FileDownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Report
                </Button>
            </Box>

            <Box 
                id="dashboard-content" 
                display="grid" 
                gridTemplateColumns="repeat(12, 1fr)" 
                gridAutoRows="140px" 
                gap="20px"
            >
                <Box 
                    gridColumn="span 8" 
                    gridRow="span 2" 
                    bgcolor={colors.primary[400]}
                    borderRadius="8px"
                    p="20px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Client With Kids Demographics
                    </Typography>
                    <Box height="250px">
                        <PieChart/>
                    </Box>
                </Box>

                <Box 
                    gridColumn="span 4" 
                    gridRow="span 2" 
                    bgcolor={colors.primary[400]} 
                    borderRadius="8px"
                    p="20px"
                >
                    <Typography variant="h6" fontWeight="600" mb="15px">
                        Audience's Age Groups
                    </Typography>
                    <Box height="250px">
                        <PieChartAge />
                    </Box>
                </Box>

                <Box 
                    gridColumn="span 12" 
                    gridRow="span 2" 
                    bgcolor={colors.primary[400]} 
                    borderRadius="8px"
                    p="20px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Monthly Sales Overview
                    </Typography>
                    <Box height="250px">
                        <LineChartSales isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
