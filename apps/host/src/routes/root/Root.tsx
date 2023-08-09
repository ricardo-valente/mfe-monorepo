import React from "react";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

// const apps = [
//   { name: "app-1", title: "App 1", content: "This is the content of App 1." },
//   { name: "app-2", title: "App 2", content: "This is the content of App 2." },
//   { name: "app-3", title: "App 3", content: "This is the content of App 3." },
// ];

export default function Root() {
  const apps = useLoaderData() as Record<string, string>[];

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
