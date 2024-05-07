import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const Delete = ({ postId }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/delete-post/${postId}`);
      console.log("deletion sucdess");
      navigate("/admin"); // Redirect to admin page after successful deletion
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Container maxWidth="sm" component="main">
      <Button
        variant="contained"
        onClick={handleOpen}
        endIcon={<DeleteIcon />}
        // sx={{ backgroundColor: theme.palette.primary.button }}
      >
        Deletes
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
              color: theme.palette.primary.text,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            sx={{
              color: theme.palette.primary.text,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Delete;
