import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import axiosInstance from "../../Axios";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProjectsList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/admin/projects/");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = async (projectId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/project/${projectId}/`);
      setSelectedProject(response.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  if (isMobile) {
    return (
      <Container sx={{ padding: 0 }}>
        <CssBaseline />
        {selectedProject ? (
          <Button
            onClick={handleBackClick}
            sx={{
              borderRadius: 20,
            }}
          >
            <ArrowBackIcon
              style={{ color: theme.palette.primary.text, fontSize: 20 }}
            />
          </Button>
        ) : null}
        <Paper
          elevation={1}
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {selectedProject ? (
            <ProjectDetails projectId={selectedProject.id} />
          ) : (
            <ProjectList
              projects={projects}
              handleProjectClick={handleProjectClick}
            />
          )}
        </Paper>
      </Container>
    );
  }

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={1} sx={{ padding: 0.8 }}>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: "100vh",
              overflowY: "auto",
              backgroundColor: theme.palette.background.main,
            }}
          >
            <ProjectList
              projects={projects}
              handleProjectClick={handleProjectClick}
              selectedProjectId={selectedProject ? selectedProject.id : null}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={3}>
            <ProjectDetails
              projectId={selectedProject ? selectedProject.id : null}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectsList;
