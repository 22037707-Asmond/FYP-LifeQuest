import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArticleIcon from '@mui/icons-material/Article';
import CalculateIcon from '@mui/icons-material/Calculate';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AppNavBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ height: { xs: 64, sm: 72, md: 88 }, backgroundColor: "red" }}>
      <Toolbar sx={{ minHeight: { xs: 64, sm: 72, md: 88 }, px: { xs: 1, sm: 2, md: 3 }, display: 'flex', justifyContent: 'center' }}>
        <Link to='/AccountPage'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/images/lifequest.png" style={{ height: '110px', marginTop: '15px', marginLeft: '-25px' }} alt="Logo" />
          </Box>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 10, sm: 5 } }}>
          <Link to="/Chat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="show new messages"
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: 'inherit',
                  },
                }}
              >
                <Badge color="secondary">
                  <MailIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>Chat</Typography>
            </Box>
          </Link>
          <Link to="/Agents" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="show new notifications"
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: 'inherit',
                  },
                }}
              >
                <Badge color="secondary">
                  <SupportAgentIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>Agents</Typography>
            </Box>
          </Link>

          <Link to="/Insurance" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="show new notifications"
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: 'inherit',
                  },
                }}
              >
                <Badge color="secondary">
                  <LibraryBooksIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>Insurance</Typography>
            </Box>
          </Link>

          <Link to="/Calculator" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="show new notifications"
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: 'inherit',
                  },
                }}
              >
                <Badge color="secondary">
                  <CalculateIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>Calculator</Typography>
            </Box>
          </Link>

          <Link to="/CalendarClient" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
              >
                <Badge color="secondary">
                  <CalendarMonthIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>Calendar</Typography>
            </Box>
          </Link>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
            >
              <Badge color="secondary">
                <SmartToyIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
              </Badge>
            </IconButton>
            <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>ChatBot</Typography>
          </Box>

          <Link to="/Profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 0.3 }}>
              <IconButton
                size="large"
                aria-label="show new notifications"
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: 'inherit',
                  },
                }}
              >
                <Badge color="secondary">
                  <AccountCircle sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>Profile</Typography>
            </Box>
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="primary-search-account-menu-mobile"
            aria-haspopup="true"
            color="inherit"
          >
            <MoreIcon sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
