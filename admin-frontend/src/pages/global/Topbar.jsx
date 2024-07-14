import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from '../../theme';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        if (location.pathname.includes("/agent")) {
            navigate("/add_agents");
        } else if (location.pathname.includes("/article")) {
            navigate("/add_articles");
        } else if (location.pathname.includes("/admin")) {
            navigate("/add_admins");
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius='3px'>
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search" />
                <IconButton type='button' sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton onClick={handleAddButtonClick}>
                    <AddCircleOutlineOutlinedIcon />
                </IconButton>
                <IconButton>
                    <NotificationsNoneOutlinedIcon />
                </IconButton>
                <IconButton>
                    <AccountCircleOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
