import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../hooks";
export const Sidebar = ({ drawerWith = 240 }) => {
  const {startLogout, auth} = useAuthStore();

  const onHandleLogout = () => {
    startLogout();
  }
  
  const menuItems = [
    { label: "Inicio", path: "dashboard", icon: <PeopleAltIcon /> },
    { label: "Restaurante", path: "restaurant", icon: <StorefrontIcon /> },
    { label: "Gastos", path: "expense", icon: <StorefrontIcon /> },
    { label: "Proveedores", path: "provider", icon: <StorefrontIcon /> },
  ];
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWith }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWith },
          }}
        >
          <Grid container direction="column" justifyContent="space-between" height={'100%'}>
            <Grid item>
              <Toolbar >
                <Typography variant="h6" noWrap component="div" sx={{height:"7vh"}}>
                  The Drink Code
                </Typography>
              </Toolbar>
              <Divider />

              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.label} component={Link} to={`/${item.path}`} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <Grid container>
                        <ListItemText primary={item.label} />
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <Grid container>
                      <ListItemText primary={auth.user_name} />
                    </Grid>
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={onHandleLogout}  disablePadding>
                  <ListItemButton>
                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                    <Grid container>
                      <ListItemText primary={'Salir'} />
                    </Grid>
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider/>
              <Typography variant="caption" noWrap component="div" m={2}>
                  Version 1.1.1
              </Typography>
            </Grid>
          </Grid>
          
        </Drawer>
      </Box>
    </>
  );
};
