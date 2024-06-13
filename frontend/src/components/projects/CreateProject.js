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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import slugify from "slugify";
import axiosInstance from "../../Axios";

const CreateProjectForm = () => {
  const theme = useTheme();

  const [projectData, setProjectData] = useState({
    project_title: "",
    description: "",
    slug: "",
    tech_stack: [],
    author: "", // Add author field here
  });
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuthenticated(true);
      fetchUserData(token); // Fetch user data after authentication
    } else {
      setAuthenticated(false);
    }

    // Fetch technologies from the backend
    const fetchTechnologies = async () => {
      try {
        const response = await axiosInstance.get("/technologies/");
        setTechnologies(response.data);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchTechnologies();
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axiosInstance.get("/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjectData((prevData) => ({
        ...prevData,
        author: response.data.id, // Assuming the user ID is returned in response.data.id
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "project_title") {
      const slug = slugify(e.target.value, { lower: true });
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
        slug: slug,
      });
    } else {
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleTechStackChange = (event) => {
    setProjectData({
      ...projectData,
      tech_stack: event.target.value,
    });
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

      console.log("Response:", response);

      if (response && response.data) {
        const newProjectData = response.data;
        console.log("New Project Data:", newProjectData);
        window.location.href = `/projects`;
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
                <FormControl fullWidth>
                  <InputLabel style={{ color: theme.palette.primary.text }}>
                    Tech Stack
                  </InputLabel>
                  <Select
                    label="Tech Stack"
                    multiple
                    name="tech_stack"
                    value={projectData.tech_stack}
                    onChange={handleTechStackChange}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (value) =>
                            technologies.find((tech) => tech.id === value).name
                        )
                        .join(", ")
                    }
                    style={{ color: theme.palette.primary.text }}
                  >
                    {technologies.map((tech) => (
                      <MenuItem key={tech.id} value={tech.id}>
                        <Checkbox
                          checked={projectData.tech_stack.indexOf(tech.id) > -1}
                        />
                        <ListItemText primary={tech.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
