// // ProjectDetails.js
// import React, { useState, useEffect } from "react";
// import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
// import axiosInstance from "../../Axios";

// const ProjectDetails = ({ projectId }) => {
//   const theme = useTheme();
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [technologies, setTechnologies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get(
//           `/admin/project/${projectId}/`
//         );
//         setSelectedProject(response.data);
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchTechnologies = async () => {
//       try {
//         const response = await axiosInstance.get("/technologies/");
//         setTechnologies(response.data);
//       } catch (error) {
//         console.error("Error fetching technologies:", error);
//       }
//     };

//     fetchProjectDetails();
//     fetchTechnologies();
//   }, [projectId]);

//   const getTechStackNames = (techStackIds) => {
//     return techStackIds
//       .map((id) => {
//         const tech = technologies.find((tech) => tech.id === id);
//         return tech ? tech.name : "Unknown";
//       })
//       .join(", ");
//   };

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100%"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!selectedProject) {
//     return (
//       <Typography variant="body1" color={theme.palette.primary.text}>
//         Select a project to see details
//       </Typography>
//     );
//   }

//   return (
//     <div>
//       <Typography variant="h5" mb={2} color={theme.palette.primary.text}>
//         {selectedProject.project_title}
//       </Typography>
//       <Typography variant="body1" mb={2} color={theme.palette.primary.text}>
//         {selectedProject.description}
//       </Typography>
//       <Typography variant="body2" mb={2} color={theme.palette.primary.text}>
//         Tech Stack: {getTechStackNames(selectedProject.tech_stack)}
//       </Typography>
//     </div>
//   );
// };

// export default ProjectDetails;
import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import axiosInstance from "../../Axios";

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
          <img
            src={line}
            alt="Embedded content"
            key={index}
            style={{ maxWidth: "100%", margin: "10px 0" }}
          />
        );
      } else if (iframeRegex.test(line)) {
        return <div dangerouslySetInnerHTML={{ __html: line }} key={index} />;
      } else {
        return <p key={index}>{line}</p>;
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

  const getTechStackNames = (techStackIds) => {
    return techStackIds
      .map((id) => {
        const tech = technologies.find((tech) => tech.id === id);
        return tech ? tech.name : "Unknown";
      })
      .join(", ");
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
      <Typography variant="body1" color={theme.palette.primary.text}>
        Select a project to see details
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h5" mb={2} color={theme.palette.primary.text}>
        {selectedProject.project_title}
      </Typography>
      {/* Render the description using the renderContent function */}
      <Box component="div" sx={{ whiteSpace: "pre-line" }}>
        {renderContent(selectedProject.description)}
      </Box>
      <Typography variant="body2" mb={2} color={theme.palette.primary.text}>
        Tech Stack: {getTechStackNames(selectedProject.tech_stack)}
      </Typography>
    </div>
  );
};

export default ProjectDetails;
