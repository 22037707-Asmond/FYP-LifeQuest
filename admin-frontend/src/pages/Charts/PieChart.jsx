import { Box } from "@mui/material";
import PieChart from "../../Components/Charts/PieChart";
import Header from "../../Components/PageFragment/Header";

const Pie = () => {
    return(
        <Box m="20px">
            <Header title="PieChart" subtitle="User's Age on Platform"/>
            <Box height="65vh">
                <PieChart/>
            </Box>
        </Box>
    )
}

export default Pie;