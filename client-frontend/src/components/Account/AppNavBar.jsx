import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function AppNavBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ height: { xs: 56, sm: 64, md: 80, backgroundColor: "red" } }}>
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64, md: 80 }, px: { xs: 1, sm: 2, md: 3 } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: 24, sm: 28, md: 32 } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { sm: 20, md: 24 } }}
          onClick={() => navigate('/AccountPage')}
        >
          CoinGuid

        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: { xs: 1, sm: 2 } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={1} color="secondary">
              <MailIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&:focus': {
                backgroundColor: 'transparent',
              },
              '&:active': {
                backgroundColor: 'transparent',
              },
              '&:visited': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Link to='/Profile'>
              <AccountCircle sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: 'white' }} />
            </Link>
          </IconButton>

        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="primary-search-account-menu-mobile"
            aria-haspopup="true"
            color="inherit"
          >
            <MoreIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
