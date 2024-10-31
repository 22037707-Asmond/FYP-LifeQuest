import { Box } from "@mui/material";
import BarChart from "../../components/Charts/BarChart";
import Header from "../../components/fragment/Header";

const Bar = () => {
    return(
        <Box m="20px">
            <Header title="Children demographics" subtitle="User's Kids"/>
            <Box height="65vh">
                <BarChart/>
            </Box>
        </Box>
    )
}

export default Bar;