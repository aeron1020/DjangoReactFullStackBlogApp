import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import slugify from "slugify";
import axiosInstance from "../../Axios";

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    excerpt: "",
    slug: "",
    content: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if JWT token exists in local storage
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "title") {
      const slug = slugify(e.target.value);
      setPostData({
        ...postData,
        [e.target.name]: e.target.value,
        slug: slug,
      });
    } else {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post("/admin/create/", postData);

      const newPostData = response.data;
      // Example: Redirect to the post details page
      window.location.href = `/posts/${newPostData.slug}`;
      console.log("Post created successfully");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="https://thumbs.dreamstime.com/b/rectangular-sign-board-text-access-denied-white-red-grunge-letters-respectively-white-background-access-denied-107177865.jpg"
          alt="Access Denied"
        />
      </div>
    );
  }

  return (
    <Container>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={6} mx="auto">
          <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h5" mb={2}>
              Create a New Post
            </Typography>
            <form>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={postData.title}
                onChange={handleChange}
                required
                mb={2}
              />
              <TextField
                label="Excerpt"
                fullWidth
                multiline
                rows={3}
                name="excerpt"
                value={postData.excerpt}
                onChange={handleChange}
                required
                mb={2}
              />
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={6}
                name="content"
                value={postData.content}
                onChange={handleChange}
                required
                mb={2}
              />
              <TextField
                label="Slug"
                fullWidth
                rows={1}
                name="slug"
                value={postData.slug}
                onChange={handleChange}
                required
                mb={2}
              />
              <TextField
                select
                label="Status"
                fullWidth
                name="status"
                value={postData.status}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                mb={2}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </TextField>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Post"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatePostForm;
