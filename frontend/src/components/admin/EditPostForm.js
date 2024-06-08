import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import slugify from "slugify";
import axiosInstance from "../../Axios";

export default function EditPostForm() {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/edit-post/${id}/`);
        const postData = response.data;
        setPostData(postData);
        if (postData.head_image) {
          setImagePreview(postData.head_image);
        }
      } catch (error) {
        console.error(
          "Error fetching post data:",
          error.response?.data || error.message
        );
      }
    };

    if (authenticated) {
      fetchPostData();
    }
  }, [id, authenticated]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });

    // Update slug only if the changed field is 'title'
    if (e.target.name === "title") {
      const slug = slugify(e.target.value);
      setPostData((prevData) => ({
        ...prevData,
        slug: slug,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("slug", postData.slug);
      formData.append("excerpt", postData.excerpt);
      formData.append("content", postData.content);
      formData.append("status", postData.status);
      if (imageFile) {
        formData.append("head_image", imageFile);
      }

      const response = await axiosInstance.put(
        `/admin/edit-post/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedPostData = response.data;
      setSnackbarMessage("Post updated successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setLoading(false);

      setTimeout(() => {
        window.location.href = `/posts/${updatedPostData.slug}`;
      }, 2000);
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
      setSnackbarMessage("Error updating post.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <img
        src="https://thumbs.dreamstime.com/b/rectangular-sign-board-text-access-denied-white-red-grunge-letters-respectively-white-background-access-denied-107177865.jpg"
        alt="Access Denied"
        style={{ display: "block", margin: "auto" }}
      />
    );
  }

  return (
    <Container>
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" mb={3}>
              Edit Post
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "block", marginBottom: "16px" }}
                />
                {imagePreview && (
                  <Box mt={2}>
                    <img
                      src={imagePreview}
                      alt="Selected file preview"
                      style={{ maxWidth: "100%" }}
                    />
                  </Box>
                )}
              </Box>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={postData.title}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
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
                sx={{ mb: 2 }}
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
                sx={{ mb: 2 }}
              />
              <TextField
                label="Slug"
                fullWidth
                name="slug"
                value={postData.slug}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
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
                sx={{ mb: 3 }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </TextField>
              <Box textAlign="right">
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? "Updating..." : "Update Post"}
                </Button>
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
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
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
}
