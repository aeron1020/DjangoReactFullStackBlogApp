import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import ProfilePhoto from "./aeron.jpg";

function About() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: 4,
        px: 3,
        backgroundColor: theme.palette.background.default, // Use background paper color
        color: theme.palette.text.primary, // Use primary text color
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Grid - About Me */}
        <Grid
          item
          xs={12}
          md={5}
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center the content horizontally
          }}
        >
          <Avatar
            alt="Profile Photo"
            src={ProfilePhoto} // Replace with your photo path
            sx={{
              width: { xs: 100, sm: 120, md: 160 },
              height: { xs: 100, sm: 120, md: 160 },
              mt: 2,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            }}
          >
            About Me
          </Typography>
        </Grid>

        {/* Right Grid - Content */}
        <Grid item xs={12} md={7} sx={{ textAlign: "start" }}>
          <Typography variant="body1" paragraph>
            Welcome to my personal platform! This website is more than just a
            showcase of my projects; it’s a reflection of my journey, passions,
            and ideas. I use this space to share my coding projects, explore new
            technologies, and document my learning experiences.
          </Typography>
          <Typography variant="body1" paragraph>
            This platform also serves as a creative outlet for my simple
            writing. Here, I share my thoughts on various topics, from
            technology and development to broader reflections on life and
            learning. I aim to create a space where innovation and ideas come
            together.
          </Typography>
          <Typography variant="body1" paragraph>
            Whether you’re interested in the technical aspects of my projects or
            looking to explore the articles and insights I share, I hope you
            find something that resonates with you. Thank you for visiting, and
            I invite you to explore my work and ideas!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
