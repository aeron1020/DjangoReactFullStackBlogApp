import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../../Axios";

const PasswordChange = () => {
  const initialFormData = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Simple validation
    if (formData.new_password !== formData.confirm_password) {
      setErrors({ confirm_password: "Passwords do not match." });
      setSnackbarMessage("Passwords do not match.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    axiosInstance
      .post(`password-change/`, {
        old_password: formData.old_password,
        new_password: formData.new_password,
      })
      .then((response) => {
        setSuccessMessage("Password changed successfully.");
        // setFormData(initialFormData);
        setSnackbarMessage("Password changed successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          window.location.href = `/`;
        }, 1000);
      })
      .catch((error) => {
        console.error("Password change failed:", error);
        if (error.response && error.response.data) {
          setErrors(error.response.data);
          setSnackbarMessage(
            "Password change failed. Please check your input."
          );
          setSnackbarSeverity("error");
        } else {
          setErrors({ non_field_errors: "Something went wrong." });
          setSnackbarMessage("Something went wrong.");
          setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Old Password"
              type="password"
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              required
              fullWidth
              error={Boolean(errors.old_password)}
              helperText={errors.old_password}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="New Password"
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              required
              fullWidth
              error={Boolean(errors.new_password)}
              helperText={errors.new_password}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Confirm New Password"
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              fullWidth
              error={Boolean(errors.confirm_password)}
              helperText={errors.confirm_password}
            />
          </Box>
          {errors.non_field_errors && (
            <Typography variant="body2" color="error" gutterBottom>
              {errors.non_field_errors}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained">
            Change Password
          </Button>
          {successMessage && (
            <Typography
              variant="body2"
              color="success.main"
              align="center"
              sx={{ marginTop: 2 }}
            >
              {successMessage}
            </Typography>
          )}
        </form>
      </Box>
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

export default PasswordChange;
