import React, { useEffect } from "react";
import { Container, Grid, Button, TextField, Typography } from "@mui/material";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useUser } from "host/context";

export default function SignIn() {
  const userData = useActionData();
  const navigate = useNavigate();

  const [user, setUser] = useUser();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        justifyContent="center"
        spacing={2}
        textAlign={"center"}
        py={12}
      >
        <Grid item xs={12}>
          <Typography variant="h5">Welcome to</Typography>
          <Typography variant="h2">Apps Portal</Typography>
        </Grid>

        <Form method="post">
          <Grid container item justifyContent="center" xs={12}>
            <Grid item xs={10} sm={12} mt={8}>
              <TextField
                required
                id="email"
                name="email"
                type="email"
                label="Email"
                defaultValue="richardo@cenas.com"
                fullWidth
              />
            </Grid>

            <Grid item xs={10} sm={12} mt={4}>
              <TextField
                required
                id="password"
                name="password"
                type="password"
                label="Password"
                defaultValue="123@321"
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container item justifyContent="center" xs={12}>
            <Grid item xs={8} sm={4} mt={4}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Form>

        <Grid container item justifyContent="center" xs={12}>
          <Grid item xs={12} sm={8} mt={4}>
            <Button variant="text" disabled>
              Recover password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
