import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
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
          </Box>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
