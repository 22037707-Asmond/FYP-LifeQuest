import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import BarChart from '../../Components/Charts/BarChart1';
import { getProfitOrLossByMonth } from '../../Components/Charts/lifequestDataAPI'; // Update with correct path
import LineChart from '../../Components/Charts/LineChart';
import PieChart from '../../Components/Charts/PieChart';
import Header from '../../Components/PageFragment/Header';
import { mockTransactions } from '../../Mockdata';
import { tokens } from '../../theme';

const getCurrentMonthTotal = (data) => {
    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return 0;
    }

    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
    return data
        .filter(item => item.month === currentMonth)
        .reduce((total, item) => total + item.amount, 0);
};

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [profitOrLossByMonth, setProfitOrLossByMonth] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfitOrLossByMonth();
                console.log('Fetched data:', data); // Log data for debugging
                if (Array.isArray(data)) {
                    setProfitOrLossByMonth(data);
                } else {
                    console.error('Data is not an array:', data);
                    setProfitOrLossByMonth([]);
                }
            } catch (error) {
                console.error('Error fetching profit or loss data:', error);
                setProfitOrLossByMonth([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalThisMonth = getCurrentMonthTotal(profitOrLossByMonth);

    const lineChartData = profitOrLossByMonth.length > 0
        ? [
            {
                id: 'Profit/Loss',
                data: profitOrLossByMonth.map(month => ({
                    x: month.month,
                    y: month.amount,
                })),
            },
        ]
        : [{ id: 'Profit/Loss', data: [] }]; // Default empty data for the chart

    console.log('lineChartData:', lineChartData); // Log lineChartData for debugging

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

    if (loading) return <div>Loading...</div>;

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
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb="15px">
                        <Box>
                            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                Profits by Month
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                                Total this month: ${totalThisMonth > 0 ? totalThisMonth.toFixed(2) : '0.00'}
                            </Typography>
                        </Box>
                        <IconButton>
                            <FileDownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                        </IconButton>
                    </Box>
                    <Box height="250px">
                        <LineChart isDashboard={true} data={lineChartData} />
                    </Box>
                </Box>

                <Box 
                    gridColumn="span 4" 
                    gridRow="span 2" 
                    bgcolor={colors.primary[400]} 
                    borderRadius="8px"
                    overflow="auto"
                >
                    <Box 
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        borderBottom={`4px solid ${colors.primary[500]}`} 
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Transactions
                        </Typography>
                    </Box>
                    {mockTransactions.map((transaction) => (
                        <Box 
                            key={transaction.id} 
                            display='flex' 
                            justifyContent="space-between" 
                            alignItems="center" 
                            borderBottom={`4px solid ${colors.primary[500]}`} 
                            p="15px"
                        >
                            <Box>
                                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                                    {transaction.id}
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    {transaction.user}
                                </Typography>
                            </Box>
                            <Typography color={colors.grey[100]}>{transaction.date}</Typography>
                            <Box 
                                bgcolor={transaction.amount < 0 ? colors.redAccent[500] : colors.greenAccent[500]} 
                                p="5px 10px" 
                                borderRadius="4px"
                            >
                                ${transaction.amount}
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box 
                    gridColumn="span 8" 
                    gridRow="span 2" 
                    bgcolor={colors.primary[400]} 
                    borderRadius="8px"
                    p="20px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Sales by Agents
                    </Typography>
                    <Box height="250px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>

                <Box 
                    gridColumn="span 4" 
                    gridRow="span 2" 
                    bgcolor={colors.primary[400]} 
                    borderRadius="8px"
                    p="20px"
                >
                    <Typography variant="h5" fontWeight="600" mb="15px">
                        Audience's Age Groups
                    </Typography>
                    <Box height="250px">
                        <PieChart />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
