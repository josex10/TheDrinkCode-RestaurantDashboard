import { Button, Grid, TextField, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm, useAuthStore } from "../../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const { username, password, onInputChange } = useForm({
    username: "jose7937",
    password: "thedrinkcode",
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startLogin({ username, password });
  };

  useEffect(() => {
    if (errorMessage !== null) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Username"
              type="text"
              placeholder="myusername"
              fullWidth
              name="username"
              value={username}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Secret Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create New Account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
