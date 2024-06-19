import React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const GitHubCard = () => {
  const theme = useTheme();

  return (
    <Link to="https://github.com/aeron1020" style={{ textDecoration: "none" }}>
      <GitHubIcon
        sx={{
          fontSize: 50,
          color: theme.palette.primary.text,
        }}
      />
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Visit My GitHub
      </Typography>
    </Link>
  );
};

export default GitHubCard;
