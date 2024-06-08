import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Axios";
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CommentSection from "./CommentSection";
import LikePostButton from "./LikePostButton";
import NavigateBackButton from "./BackButton";

const PostRead = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current user information
    axiosInstance
      .get("user/")
      .then((response) => {
        setUser(response.data);
        setUserIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setUserIsAuthenticated(false);
        setUser("Guest User");
      });
  }, []);

  useEffect(() => {
    // Fetch post details
    axiosInstance
      .get(`/posts/${slug}/`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setPost(null);
      });
  }, [slug]);

  const renderContent = (content) => {
    const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    const iframeRegex = /<iframe.*<\/iframe>/i;

    return content.split("\n").map((line, index) => {
      if (imageUrlRegex.test(line)) {
        return (
          <img
            src={line}
            alt="Embedded content"
            key={index}
            style={{ maxWidth: "100%", margin: "10px 0" }}
          />
        );
      } else if (iframeRegex.test(line)) {
        return <div dangerouslySetInnerHTML={{ __html: line }} key={index} />;
      } else {
        return <p key={index}>{line}</p>;
      }
    });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Left Grid */}
        <Grid item xs={12} md={3}>
          <Paper>
            <NavigateBackButton />
            <Typography variant="h6"></Typography>
          </Paper>
        </Grid>

        {/* Center Grid */}
        <Grid item xs={12} md={6}>
          {post && (
            <Paper>
              {/* Header Image */}
              <CardMedia
                component="img"
                alt="Post Header Image"
                height="200"
                image={post.head_image}
                sx={{ objectFit: "cover" }} // Prevent image shrinkage
              />

              <Box p={2}>
                {/* Title */}
                <Typography variant="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="text" gutterBottom>
                  {post.category.name}
                </Typography>

                {/* Like button */}
                <LikePostButton
                  postId={post.id}
                  liked={post.liked_by_user}
                  initialLikeCount={post.likes_count}
                  isAuthenticated={userIsAuthenticated}
                />

                {/* Author */}
                {post.author && (
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {post.author.user_name}
                  </Typography>
                )}
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  {formatDate(post.published)}
                </Typography>

                {/* Content */}
                <Box component="div" sx={{ whiteSpace: "pre-line" }}>
                  {renderContent(post.content)}
                </Box>

                {/* Render comment section */}
                <CommentSection
                  postId={post.id}
                  userIsAuthenticated={userIsAuthenticated}
                  user={user}
                />
              </Box>
            </Paper>
          )}
        </Grid>

        {/* Right Grid */}
        <Grid item xs={12} md={3}>
          <Paper>
            <Typography variant="h6"></Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostRead;
