import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";

import isMobile from "./HomeAvatar";

const Posts = (props) => {
  const theme = useTheme();
  const { posts } = props;

  if (!posts || posts.length === 0)
    return <p>Wait to find any posts, sorry.</p>;
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress />
  </Box>;

  return (
    <React.Fragment>
      {/* <Container
        maxWidth="lg"
        component="main"
        sx={{
          backgroundColor: theme.palette.primary.border,
        }}
      > */}
      <Grid
        container
        item
        sx={{
          background: theme.palette.primary.transparent,
          width: "100%",
        }}
      >
        {posts.map((post) => (
          <Grid
            key={post.id}
            xs={12}
            sm={6}
            sx={{
              background: theme.palette.primary.transparent,
              padding: 1,
              width: "100%",
            }}
          >
            <Link to={`/posts/${post.slug}`} style={{ textDecoration: "none" }}>
              <Card
                elevation={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: theme.palette.primary.default,
                  minHeight: "12rem",
                  maxHeight: "15rem",
                  borderRadius: 5,
                }}
              >
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        image={post.head_image}
                        title="Image title"
                        sx={{
                          border: `1px solid ${theme.palette.primary.button}`,
                          height: "100%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        gutterBottom
                        sx={{
                          textAlign: "left",
                          color: theme.palette.primary.text,
                        }}
                      >
                        {post.category.name}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{
                          textAlign: "left",
                          color: theme.palette.primary.text,
                          overflow: "hidden",
                          textOverflow: "ellipsis", // Adds an ellipsis (...) when the text overflows
                          maxWidth: "100%",
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          textAlign: "left",
                          color: theme.palette.primary.text,
                          whiteSpace: "nowrap", // Prevents the text from wrapping
                          overflow: "hidden", // Ensures the overflow text is hidden
                          textOverflow: "ellipsis", // Adds an ellipsis (...) when the text overflows
                          maxWidth: "100%",
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{ textAlign: "left" }}
                      >
                        {formatTimeDifference(post.published)}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* </Container> */}
    </React.Fragment>
  );
};

export default Posts;

const formatTimeDifference = (publishedDate) => {
  const currentDate = new Date();
  const dateDifference = currentDate - new Date(publishedDate);
  const seconds = Math.floor(dateDifference / 1000);
  if (seconds < 60) {
    return "just now";
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};
