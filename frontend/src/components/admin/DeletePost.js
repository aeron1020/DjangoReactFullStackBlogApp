import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const Delete = ({ postId }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/delete-post/${postId}/`);
      console.log("Deletion successful");
      setSnackbarMessage("Post deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // Redirect to admin page after successful deletion
      navigate("/admin");
    } catch (error) {
      console.error("Error deleting post:", error);
      setSnackbarMessage("Error deleting post.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    handleClose();
  };

  return (
    <Container maxWidth="sm" component="main">
      <Button
        variant="contained"
        onClick={handleOpen}
        endIcon={<DeleteIcon />}
        sx={{
          backgroundColor: theme.palette.primary.text,
          color: theme.palette.primary.main,
          fontFamily: theme.typography.fontFamily,
          textTransform: "none",
          mb: { xs: 1, md: 0 },
          mr: { xs: 0, md: 1 },

          "&:hover": {
            backgroundColor: theme.palette.primary.button,
          },
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.text,
          },
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.text,
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.primary.button,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.text,
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.primary.button,
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Delete;
