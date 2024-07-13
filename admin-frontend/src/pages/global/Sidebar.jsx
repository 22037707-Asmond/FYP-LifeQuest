import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { tokens } from "../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
        href={to}
      >
        <Typography>{title}</Typography>
      </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <>
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{ backgroundColor: `${colors.primary[400]}`}}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography>ADMIN</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/Home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m:"15px 0 15px 20px" }}>
              Data
            </Typography>

            <Item
              title="Article"
              to="/article"
              icon={<NewspaperOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Agents"
              to="/Agents"
              icon={<PeopleAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Customers"
              to="/Customers"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Admin"
              to="/Admins"
              icon={<AdminPanelSettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoice"
              to="/Invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m:"15px 0 15px 20px" }}>
              Charts
            </Typography>

            <Item
              title="BarChart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="LineChart"
              to="/LineChart"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="PieChart"
              to="/pie"
              icon={<PieChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
