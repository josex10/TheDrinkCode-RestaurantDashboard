// import { StarOutline } from "@mui/icons-material";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';

import { Grid, Typography } from "@mui/material";

export const RestaurantView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "88vh",
        backgroundColor: "secondary.main",
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <LocalDrinkIcon sx={{ fontSize: 100, color: "secondary.contrastText" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color="secondary.contrastText">
          Hello From Restaurant
        </Typography>
      </Grid>
    </Grid>
  );
};
