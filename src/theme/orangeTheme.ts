import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const orangeTheme = createTheme({
  palette: {
    primary: {
      main: "#FC6600",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#FC6600",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});
