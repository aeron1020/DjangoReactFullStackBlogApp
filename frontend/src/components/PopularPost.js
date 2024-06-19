import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Axios";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const PopularPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await axiosInstance.get("/popular-posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1" sx={{ textAlign: "left", marginBottom: 3 }}>
        Popular Posts
      </Typography>

      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            display: "flex",
            marginBottom: 2,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          {post.head_image && (
            <CardMedia
              component="img"
              sx={{ width: 50 }}
              image={post.head_image}
              alt={post.title}
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                to={`/posts/${post.slug}`}
                component={Link}
                variant="p"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.excerpt}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default PopularPost;
