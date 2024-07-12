import React, { useState } from "react";
import axiosInstance from "../../Axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

export default function SignUp() {
  const history = useNavigate();
  const initialFormData = {
    email: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Perform real-time validation as the user types
    if (name === "email") {
      validateEmail(value);
    } else if (name === "username") {
      validateUsername(value);
    } else if (name === "password") {
      validatePassword(value);
    }
  };

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validateUsername = (username) => {
    // Username validation regex pattern
    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username must contain at least 4 alphanumeric characters"
      );
    } else {
      setUsernameError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`users/register/`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        history("/login");
        console.log("response:", response);
        console.log("res.data:", response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const responseData = error.response.data;
          if (responseData.password) {
            setPasswordError(responseData.password[0]);
          } else if (responseData.user_name) {
            setUsernameError(responseData.user_name[0]);
          } else if (responseData.email) {
            setEmailError(responseData.email[0]);
          }
        } else {
          console.error("Error:", error);
        }
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginBottom: "1rem", marginTop: "1rem" }}
    >
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
              required
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              onChange={handleChange}
              required
              error={!!usernameError}
              helperText={usernameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              required
              error={!!passwordError}
              helperText={passwordError}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem", marginButtom: "1rem" }}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
}
