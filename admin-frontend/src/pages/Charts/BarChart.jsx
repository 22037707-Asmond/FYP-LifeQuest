import { Box } from "@mui/material";
import BarChart from "../../Components/Charts/BarChart1";
import Header from "../../Components/PageFragment/Header";

const Bar = () => {
    return(
        <Box m="20px">
            <Header title="BarChart" subtitle="Agents Sales"/>
            <Box height="65vh">
                <BarChart/>
            </Box>
        </Box>
    )
}

export default Bar;