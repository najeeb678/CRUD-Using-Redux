import React from "react";
//containedimport Image from "../assets/background.jpg";
import { Button, Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "89.2vh",
        width: "100%",
        textAlign: "center",
        //backgroundImage: `url(${Image})`, // Set the background image
        objectFit: "cover",
        backgroundSize: "cover", // Ensure the image covers the entire container
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Your CRUD App
      </Typography>
      <Typography variant="body1" paragraph>
        Start managing your users with ease using our user-friendly CRUD
        application.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",

          width: "50%",
          border: "2px solid #96E9C6",
          borderRadius: "8px",
          margin: "20px 0",
        }}
      >
        <Button
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
        >
          Create
        </Button>
        <Button
          component={Link}
          to="/read"
          variant="contained"
          color="success"
          sx={{ marginRight: 2 }}
        >
          Read
        </Button>
        <Button
          component={Link}
          to="/read"
          variant="contained"
          color="warning"
          sx={{ marginRight: 2 }}
        >
          Update
        </Button>
        <Button
          component={Link}
          to="/read"
          variant="contained"
          color="error"
          sx={{ marginRight: 2 }}
        >
          Delete
        </Button>
      </Box>

      {/* <ImageWrapper src={Image} alt="Home" />
      <div>
        <Button
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
        >
          Add User
        </Button>
        <Button component={Link} to="/read" variant="outlined" color="primary">
          Show Users List
        </Button>
      </div> */}
    </Grid>
  );
};

export default HomePage;
