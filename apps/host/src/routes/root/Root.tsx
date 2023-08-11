import React, { useEffect } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useUser } from "host/context";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "96vh",
  },
  content: {
    flexGrow: 1,
    padding: 3,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
};

export default function Root() {
  const navigate = useNavigate();

  const [user] = useUser();
  // const apps = useLoaderData() as Record<string, string>[];

  const navigation = useNavigation();
  console.log("user: ", user, navigation.state);

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user, navigate]);

  if (!user) return null;

  if (navigation.state === "loading") return <Spinner />;

  return (
    <Box sx={styles.root}>
      <Header title="Apps portal" />

      <Container maxWidth="lg" sx={styles.content}>
        <Grid container spacing={3}>
          {user.apps.map((app, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardActionArea onClick={() => navigate(`/app/${app.name}`)}>
                {/* <CardActionArea href={`/app/${app.name}`}> */}
                <Card sx={styles.card}>
                  <CardContent sx={styles.cardContent}>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <Typography variant="h5" component="h2" mb={4}>
                          {app.title}
                        </Typography>

                        <Typography variant="body2" component="p">
                          {app.description}
                        </Typography>

                        <Typography variant="body2" component="p">
                          version: {app.version}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} textAlign="end">
                        {app.permissions.includes("read") ? (
                          <RemoveRedEyeOutlinedIcon />
                        ) : (
                          <CreateOutlinedIcon />
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
