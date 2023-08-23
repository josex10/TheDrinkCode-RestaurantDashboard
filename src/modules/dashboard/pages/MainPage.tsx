import { IconButton } from "@mui/material";
import { DashboardLayout } from '../layout/DashboardLayout';
import { NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";

export const MainPage = () => {
  return (
    <DashboardLayout>
      <NothingSelectedView />

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 20 }} />
      </IconButton>
    </DashboardLayout>
  );
};
