// import React from "react";
// import {
//   Container,
//   List,
//   ListItemText,
//   Typography,
//   Card,
//   CardActionArea,
//   CardContent,
//   useTheme,
// } from "@mui/material";

// const ProjectList = ({ projects, handleProjectClick, selectedProjectId }) => {
//   const theme = useTheme();

//   return (
//     <Container>
//       <Typography
//         variant="h2"
//         mb={2}
//         color={theme.palette.primary.text}
//         sx={{ textAlign: "left", paddingLeft: 2, paddingTop: 2 }}
//       >
//         Projects List
//       </Typography>

//       <List sx={{ padding: 1 }}>
//         {projects.map((project) => (
//           <Card
//             key={project.id}
//             variant="outlined"
//             sx={{
//               marginBottom: theme.spacing(1),
//               backgroundColor:
//                 project.id === selectedProjectId
//                   ? theme.palette.action.selected
//                   : "inherit",
//               transition: "background-color 0.3s",
//             }}
//           >
//             <CardActionArea onClick={() => handleProjectClick(project.id)}>
//               <CardContent>
//                 <ListItemText
//                   primary={project.project_title}
//                   style={{ color: theme.palette.primary.text }}
//                 />
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ProjectList;

import React from "react";
import {
  Container,
  List,
  ListItemText,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  useTheme,
} from "@mui/material";

const ProjectList = ({ projects, handleProjectClick, selectedProjectId }) => {
  const theme = useTheme();

  // Sort projects by date in descending order (newest first)
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <Container>
      <Typography
        variant="h2"
        mb={2}
        color={theme.palette.primary.text}
        sx={{ textAlign: "left", paddingLeft: 2, paddingTop: 2 }}
      >
        Projects List
      </Typography>

      <List sx={{ padding: 1 }}>
        {sortedProjects.map((project) => (
          <Card
            key={project.id}
            variant="outlined"
            sx={{
              marginBottom: theme.spacing(1),
              backgroundColor:
                project.id === selectedProjectId
                  ? theme.palette.action.selected
                  : "inherit",
              transition: "background-color 0.3s",
            }}
          >
            <CardActionArea onClick={() => handleProjectClick(project.id)}>
              <CardContent>
                <ListItemText
                  primary={project.project_title}
                  style={{ color: theme.palette.primary.text }}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default ProjectList;
