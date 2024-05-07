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
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.put(
        `/admin/edit-post/${id}/`,
        postData
      );

      const updatedPostData = response.data;
      window.location.href = `/posts/${updatedPostData.slug}`;
      console.log("Post updated successfully");
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <img
        src="https://thumbs.dreamstime.com/b/rectangular-sign-board-text-access-denied-white-red-grunge-letters-respectively-white-background-access-denied-107177865.jpg"
        alt="Access Denied"
      />
    );
  }

  return (
    <Container>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={6} mx="auto">
          <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h5" mb={2}>
              Edit Post
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
                  {loading ? "Updating..." : "Update Post"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
