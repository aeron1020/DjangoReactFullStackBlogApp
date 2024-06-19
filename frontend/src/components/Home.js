import React, { useEffect, useState } from "react";
import PostsList from "./PostsList";
import PostLoadingComponent from "./PostLoading";
import HomeAvatar from "./HomeAvatar";
import { Box, Container, Divider, Typography } from "@mui/material";
import axiosInstance from "../Axios";
import { useTheme } from "@mui/material/styles";

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
        {/* Home avatar */}
        <HomeAvatar />

        <Divider sx={{ my: 4, borderColor: theme.palette.primary.border }} />

        <Box
          sx={{
            textAlign: "center",
            padding: 0,
            paddingLeft: 0,
          }}
        >
          {/* Latest post */}
          <Typography variant="h1" sx={{ marginBottom: 2 }}>
            Latest Posts
          </Typography>
          <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </Box>

        <Divider sx={{ my: 4, borderColor: theme.palette.primary.border }} />
      </Container>
    </div>
  );
}

export default Home;
