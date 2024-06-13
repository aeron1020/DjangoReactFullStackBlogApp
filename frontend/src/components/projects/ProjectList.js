// ProjectList.js
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

const ProjectList = ({ projects, handleProjectClick }) => {
  const theme = useTheme();

  return (
    <div>
      <Typography variant="h5" mb={2} color={theme.palette.primary.text}>
        Projects List
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem
            button
            key={project.id}
            onClick={() => handleProjectClick(project.id)} // Pass project id here
          >
            <ListItemText
              primary={project.project_title}
              style={{ color: theme.palette.primary.text }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProjectList;
