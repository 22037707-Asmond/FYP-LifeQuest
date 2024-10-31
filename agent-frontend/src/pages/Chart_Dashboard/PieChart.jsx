import { Box } from "@mui/material";
import PieChartAge from "../../components/Charts/PieChartAge";
import Header from "../../components/fragment/Header";

const Pie = () => {
    return(
        <Box m="20px">
            <Header title="Age Demographics" subtitle="User's under Agent"/>
            <Box height="65vh">
                <PieChartAge/>
            </Box>
        </Box>
    )
}

export default Pie;