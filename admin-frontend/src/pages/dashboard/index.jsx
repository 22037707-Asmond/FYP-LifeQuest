import { Box } from '@mui/material';
import Header from '../../Components/PageFragment/Header';

const Dashboard = () => {
    return (
        <>
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome Admin"/>
            </Box>
        </Box>
        </>
    );
};

export default Dashboard;