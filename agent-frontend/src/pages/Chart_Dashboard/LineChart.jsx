import { Box } from "@mui/material";
import LineChartSales from "../../components/Charts/LineChartSales";
import Header from "../../components/fragment/Header";

const Line = () => {
    return(
        <Box m="20px">
            <Header title="Sales" subtitle="Own Sales"/>
            <Box height="65vh">
                <LineChartSales/>
            </Box>
        </Box>
    )
}

export default Line;