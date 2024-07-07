import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lightTheme, darkTheme } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import Header from "./components/Header";
import AuthCheck from "./AuthCheck";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Projects from "./components/projects/Projects";
import SinglePost from "./components/SinglePost";
import Admin from "./Admin";
import CreatePostForm from "./components/admin/CreatePostForm";
import EditPostForm from "./components/admin/EditPostForm";
import DeletePost from "./components/admin/DeletePost";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import Footer from "./components/Footer";
import SwitchTheme from "./components/SwitchTheme";
import CreateProjectForm from "./components/projects/CreateProject";
import PasswordChange from "./components/auth/PasswordChange";
import Settings from "./components/settings/Settings";

function App() {
  const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(storedDarkMode || false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleThemeChange = (isDarkMode) => {
    setDarkMode(isDarkMode);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <div>
          <AuthCheck />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/posts/*" element={<Blogs />} />
            <Route path="/projects/*" element={<Projects />} />
            <Route path="/posts/:slug" element={<SinglePost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<CreatePostForm />} />
            <Route path="/admin/edit-post/:id" element={<EditPostForm />} />
            <Route path="/admin/delete/:id" element={<DeletePost />} />
            <Route
              path="/admin/create_project"
              element={<CreateProjectForm />}
            />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Box sx={{ display: "none" }}>
          <SwitchTheme
            checked={darkMode}
            onChange={handleThemeChange}
            sx={{ color: theme.palette.primary.main }}
          />
        </Box>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
