import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
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
  const apps = useLoaderData() as Record<string, string>[];

  const navigation = useNavigation();
  console.log("apps: ", apps, navigation.state);

  if (navigation.state === "loading") return <Spinner />;

  return (
    <Box sx={styles.root}>
      <Header title="Apps portal" />

      <Container maxWidth="lg" sx={styles.content}>
        <Grid container spacing={3}>
          {apps.map((app, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardActionArea href={`/app/${app.name}`}>
                <Card sx={styles.card}>
                  <CardContent sx={styles.cardContent}>
                    <Typography variant="h5" component="h2">
                      {app.title}
                    </Typography>

                    <Typography variant="body2" component="p">
                      {app.content}
                    </Typography>
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
