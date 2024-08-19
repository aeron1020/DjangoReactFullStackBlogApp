import React, { useEffect, useState } from "react";
import PostsList from "./PostsList";
import PostLoadingComponent from "./PostLoading";
import HomeAvatar from "./HomeAvatar";
import { Box, Container, Divider, Typography, Grid } from "@mui/material";
import axiosInstance from "../Axios";
import { useTheme } from "@mui/material/styles";
import About from "../About";

function Home() {
  const theme = useTheme();
  const PostLoading = PostLoadingComponent(PostsList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: [],
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = "/";
    axiosInstance
      .get(apiUrl)
      .then((response) => {
        // Retrieve only the latest four posts
        const latestPosts = response.data.slice(0, 4);
        setAppState({ loading: false, posts: latestPosts });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setAppState({ loading: false, posts: [] });
      });
  }, []);

  return (
    <div className="App">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", p: { xs: 1, sm: 2, md: 3 } }}>
              <HomeAvatar
                sx={{
                  width: { xs: 100, sm: 150, md: 200 },
                  height: { xs: 100, sm: 150, md: 200 },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: theme.palette.primary.border }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: "center",
                padding: 0,
                paddingLeft: 0,
                background: theme.palette.primary.transparent,
              }}
            >
              {/* Latest post */}
              <Typography
                variant="h1"
                sx={{
                  padding: 3,
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                }}
              >
                Latest Posts
              </Typography>
              <PostLoading
                isLoading={appState.loading}
                posts={appState.posts}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: theme.palette.primary.border }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: "center",
                padding: 0,
                paddingLeft: 0,
                background: theme.palette.primary.transparent,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  paddingTop: 3,
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                }}
              >
                About Me
              </Typography>
              <About />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: theme.palette.primary.border }} />
      </Container>
    </div>
  );
}

export default Home;
