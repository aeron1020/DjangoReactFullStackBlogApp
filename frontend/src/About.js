import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function About() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: 4,
        px: 3,
        textAlign: "center",
        backgroundColor: theme.palette.background.paper, // Use background paper color
        color: theme.palette.text.primary, // Use primary text color
      }}
    >
      <Typography
        variant="h1"
        sx={{
          paddingTop: 3,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
        }}
      >
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to my personal platform! This website is more than just a
        showcase of my projects; it’s a reflection of my journey, passions, and
        ideas. As a dedicated web developer, I use this space to share my coding
        projects, explore new technologies, and document my learning
        experiences.
      </Typography>
      <Typography variant="body1" paragraph>
        This platform also serves as a creative outlet for my hobby of writing.
        Here, I share my thoughts on various topics, from technology and
        development to broader reflections on life and learning. By merging my
        coding skills with my love for writing, I aim to create a space where
        innovation and ideas come together.
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you’re interested in the technical aspects of my projects or
        looking to explore the articles and insights I share, I hope you find
        something that resonates with you. Thank you for visiting, and I invite
        you to explore my work and ideas!
      </Typography>
    </Box>
  );
}

export default About;
