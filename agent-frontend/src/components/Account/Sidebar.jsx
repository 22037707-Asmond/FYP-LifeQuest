import React, { useState } from 'react';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { LocalStorage } from '../../services/LocalStorage'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        setSelected(title);
        if (onClick) onClick(); // Call onClick if provided
      }}
      icon={icon}
      href={to}
      style={{ marginBottom: '20px' }} // Add margin-bottom for spacing
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('account');
    window.location.href = '/';
};

  return (
    <>
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 40px 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography>AGENT</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/Dashboard"
              icon={<DashboardCustomizeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Profile"
              to="/Profile"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messages"
              to="/Chat"
              icon={<NewspaperOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Apply"
              to="/RequestForm"
              icon={<PeopleAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/CalendarAgent"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Logout'
              to='/'
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={handleLogout} // Attach the logout handler here
            />
          </Box>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
