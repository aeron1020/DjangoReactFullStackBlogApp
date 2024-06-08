import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import axiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history("/");
        console.log(response);
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
      <Box sx={{ margin: 40 }}></Box>
    </Container>
  );
};

export default LoginForm;
