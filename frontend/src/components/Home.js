import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import PostLoadingComponent from "./PostLoading";
import HomeAvatar from "./HomeAvatar";
import { Box, Container, Divider, Typography } from "@mui/material";
import axiosInstance from "../Axios";
import { useTheme } from "@mui/material/styles";

function Home() {
  const theme = useTheme();
  const PostLoading = PostLoadingComponent(Posts);
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
            padding: 8,
          }}
        >
          {/* Latest post */}
          <Typography variant="h4">Latest Posts</Typography>
          <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </Box>
      </Container>
    </div>
  );
}

export default Home;
