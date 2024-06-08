import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axiosInstance from "../Axios";
import PostsList from "./PostsList";
import PostLoadingComponent from "./PostLoading";

function Blogs() {
  const theme = useTheme();
  const PostLoading = PostLoadingComponent(PostsList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories
    axiosInstance
      .get("/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    setAppState({ loading: true });
    let apiUrl = "/";
    if (selectedCategory) {
      apiUrl += `?category=${selectedCategory}`;
    }
    axiosInstance
      .get(apiUrl)
      .then((response) => {
        setAppState({ loading: false, posts: response.data });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setAppState({ loading: false, posts: [] });
      });
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          marginBottom: theme.spacing(4),
          color: theme.palette.primary.text,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        Posts
      </Typography>

      <FormControl
        fullWidth
        sx={{
          marginBottom: theme.spacing(4),
        }}
      >
        <InputLabel
          id="category-select-label"
          sx={{ color: theme.palette.primary.text }}
        >
          Category
        </InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>Select Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </Box>
  );
}

export default Blogs;
