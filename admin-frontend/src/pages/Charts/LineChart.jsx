import { Box } from "@mui/material";
import LineChart from "../../Components/Charts/LineChart";
import Header from "../../Components/PageFragment/Header";

const Line = () => {
    return(
        <Box m="20px">
            <Header title="LineChart" subtitle="Profit Per Month"/>
            <Box height="65vh">
                <LineChart/>
            </Box>
        </Box>
    )
}

export default Line;