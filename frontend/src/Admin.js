import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/admin/MyPosts";
import PostLoadingComponent from "./components/PostLoading";
import axiosInstance from "./Axios";

function Admin() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get("/user/posts/").then((response) => {
      const allPosts = response.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(response.data);
    });
  }, [setAppState]);

  return (
    <div className="App">
      <h1> Dashboard </h1>
      <PostLoading
        isloading={appState.loading}
        posts={appState.posts}
      ></PostLoading>
    </div>
  );
}

export default Admin;
