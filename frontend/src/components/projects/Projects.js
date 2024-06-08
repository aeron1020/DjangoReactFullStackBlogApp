import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectList from "./ProjectsList";
import axiosInstance from "../../Axios";
import ProjectLoadingComponent from "./ProjectLoading";
import { useTheme } from "@mui/material/styles";

function Projects() {
  const theme = useTheme();
  const ProjectLoading = ProjectLoadingComponent(ProjectList);
  const [appState, setAppState] = useState({
    loading: false,
    projects: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `admin/projects/`;
    axiosInstance
      .get(apiUrl)
      .then((response) => {
        setAppState({ loading: false, projects: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setAppState({ loading: false, projects: [] });
      });
  }, []);

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          marginBottom: theme.spacing(4),
          color: theme.palette.primary.text,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        Projects
      </Typography>
      <ProjectLoading
        isLoading={appState.loading}
        projects={appState.projects}
      />
    </Box>
  );
}

export default Projects;
