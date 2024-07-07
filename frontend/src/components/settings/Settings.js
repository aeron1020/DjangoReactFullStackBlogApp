import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handlePasswordChangeClick = () => {
    navigate("/password-change");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Change Username" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handlePasswordChangeClick}>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Settings;
