import { CssBaseline, ThemeProvider } from "@mui/material";
import { IChildrenProps } from '../commons/models';
import { orangeTheme } from "./orangeTheme";

export const AppTheme = (props: IChildrenProps ) => {
  return (
    <ThemeProvider theme={orangeTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
