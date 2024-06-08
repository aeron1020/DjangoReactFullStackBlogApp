import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import slugify from "slugify";
import axiosInstance from "../../Axios";

const CreateProjectForm = () => {
  const theme = useTheme();

  const [projectData, setProjectData] = useState({
    project_title: "",
    description: "",
    status: "draft",
    slug: "", // Added slug field
  });
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "project_title") {
      const slug = slugify(e.target.value, { lower: true });
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
        slug: slug, // Set the slug based on the project title
      });
    } else {
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axiosInstance.post(
        "/admin/create_project/",
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response); // Log the response object

      if (response && response.data) {
        // Check if response and data are defined
        const newProjectData = response.data;
        console.log("New Project Data:", newProjectData);
        window.location.href = `/projects/${newProjectData.slug}/`;
        console.log("Project created successfully");
      } else {
        console.error("Error creating project: Response or data is undefined");
      }
    } catch (error) {
      console.error(
        "Error creating project:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="https://thumbs.dreamstime.com/b/rectangular-sign-board-text-access-denied-white-red-grunge-letters-respectively-white-background-access-denied-107177865.jpg"
          alt="Access Denied"
        />
      </div>
    );
  }

  return (
    <Container>
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mt: 4,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Typography variant="h5" mb={2} color={theme.palette.primary.text}>
              Create a New Project
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  label="Project Title"
                  fullWidth
                  name="project_title"
                  value={projectData.project_title}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Slug"
                  fullWidth
                  name="slug"
                  value={projectData.slug}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  select
                  label="Status"
                  fullWidth
                  name="status"
                  value={projectData.status}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </TextField>
              </Box>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: theme.palette.primary.button,
                    color: "#FFF",
                  }}
                >
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProjectForm;
