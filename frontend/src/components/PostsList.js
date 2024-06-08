import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";

const useStyles = styled((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
    // objectFit: "cover",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  postTitle: {
    fontSize: "24px",
    textAlign: "left",
  },
  postText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "16px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
}));

const Posts = (props) => {
  const theme = useTheme();
  const { posts } = props;
  const classes = useStyles();
  if (!posts || posts.length === 0)
    return <p>Wait to find any posts, sorry.</p>;
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid
              item
              key={post.id}
              xs={12}
              sm={6}
              sx={{
                margin: 0,
                padding: 0,
              }}
            >
              <Link
                to={`/posts/${post.slug}`}
                className={classes.link}
                style={{ textDecoration: "none" }}
              >
                <Card
                  className={classes.card}
                  elevation={3}
                  sx={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <CardMedia
                          height="120"
                          className={classes.cardMedia}
                          component="img"
                          image={post.head_image}
                          title="Image title"
                          sx={{
                            border: `1px solid ${theme.palette.primary.border}`,
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          gutterBottom
                          component="text"
                          className={classes.postTitle}
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
                          className={classes.postTitle}
                          sx={{
                            textAlign: "left",
                            color: theme.palette.primary.text,
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
                          }}
                        >
                          {post.content.substr(0, 70)}...
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
      </Container>
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
