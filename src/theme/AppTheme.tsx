import { CssBaseline, ThemeProvider } from "@mui/material";
import { purpleTheme } from "./purpleTheme";
import { IChildrenProps } from '../commons/models';

export const AppTheme = (props: IChildrenProps ) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
