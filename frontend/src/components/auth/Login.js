import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import axiosInstance from "../../Axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Login failed. Please check your email and password.");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            {/* Display email error message */}
            {error && (
              <Typography variant="body2" color="error" gutterBottom>
                {error}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
