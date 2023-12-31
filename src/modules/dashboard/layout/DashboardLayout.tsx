import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from '../components';
import { IChildrenProps } from "../../../commons/models";

const drawerWith = 240;

export const DashboardLayout = (props: IChildrenProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar drawerWith={drawerWith} />
      <Sidebar drawerWith={drawerWith} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {props.children}
      </Box>
    </Box>
  );
};
