import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import axiosInstance from "../../Axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProjectDetails = ({ projectId }) => {
  const theme = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderContent = (content) => {
    const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    const iframeRegex = /<iframe.*<\/iframe>/i;

    return content.split("\n").map((line, index) => {
      if (imageUrlRegex.test(line)) {
        return (
          <Box
            key={index}
            component="img"
            src={line}
            alt="Embedded content"
            sx={{
              maxWidth: "100%",
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        );
      } else if (iframeRegex.test(line)) {
        return (
          <Box
            key={index}
            dangerouslySetInnerHTML={{ __html: line }}
            sx={{
              padding: 0,
              maxWidth: "100%",
              width: "100%",
              height: {
                xs: "auto",
                sm: "auto",
                md: "500px",
              },
              margin: {
                xs: "0",
                sm: "10px 0",
              },

              display: "block",
              "& iframe": {
                width: "100%",
                height: {
                  xs: "300px",
                  sm: "300px",
                  md: "500px",
                },
              },
            }}
          />
        );
      } else {
        return (
          <Typography key={index} variant="body1" sx={{ margin: "10px 0" }}>
            {line}
          </Typography>
        );
      }
    });
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/admin/project/${projectId}/`
        );
        setSelectedProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTechnologies = async () => {
      try {
        const response = await axiosInstance.get("/technologies/");
        setTechnologies(response.data);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchProjectDetails();
    fetchTechnologies();
  }, [projectId]);

  const getTechStackLogos = (techStackIds) => {
    return techStackIds.map((id) => {
      const tech = technologies.find((tech) => tech.id === id);
      return tech ? (
        <Box
          key={id}
          component="img"
          src={tech.logoUrl}
          alt={tech.name}
          sx={{
            maxWidth: "40px",
            maxHeight: "40px",
            width: "100%",
            height: "auto",
            marginRight: "8px",
            flexShrink: 0,
          }}
        />
      ) : (
        "Unknown"
      );
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!selectedProject) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={3}
        borderRadius="8px"
        bgcolor={theme.palette.background.default}
        boxShadow={3}
      >
        <InfoOutlinedIcon
          color={theme.palette.primary.text}
          fontSize="large"
          sx={{ mb: 2 }}
        />
        <Box display="flex" alignItems="center">
          <ArrowBackIcon color={theme.palette.primary.text} sx={{ mr: 1 }} />
          <Typography variant="h6" color={theme.palette.primary.text}>
            Select a project to see details
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: theme.spacing(2), overflowY: "auto", height: "100%" }}>
      <Typography variant="h5" mb={2} color={theme.palette.primary.text}>
        <strong>{selectedProject.project_title}</strong>
      </Typography>
      <Box
        component="div"
        sx={{
          whiteSpace: "pre-line",
        }}
      >
        {renderContent(selectedProject.description)}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Typography variant="body2" color={theme.palette.primary.text}>
          Tech:
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          {getTechStackLogos(selectedProject.tech_stack)}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
