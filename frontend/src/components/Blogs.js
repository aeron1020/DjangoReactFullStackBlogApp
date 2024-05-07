import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import axiosInstance from "../Axios";
import PostLoadingComponent from "./PostLoading";
// import Header from "./Header";

function Blogs() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = ``;
    axiosInstance
      .get(apiUrl)
      .then((response) => {
        setAppState({ loading: false, posts: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setAppState({ loading: false, posts: [] });
      });
  }, []);
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Blog Posts
      </Typography>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
}

export default Blogs;
