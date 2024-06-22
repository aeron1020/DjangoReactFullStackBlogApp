import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Posts from "./components/admin/MyPosts";
import PostLoadingComponent from "./components/PostLoading";
import axiosInstance from "./Axios";

function Admin() {
  const history = useNavigate();
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
    error: null,
  });

  useEffect(() => {
    axiosInstance
      .get("/user/posts/")
      .then((response) => {
        const allPosts = response.data;
        setAppState({ loading: false, posts: allPosts, error: null });
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Redirect to login page if the user is not authenticated
          history("/");
        } else {
          // Handle other errors
          setAppState({
            loading: false,
            posts: null,
            error: "Failed to load posts",
          });
        }
      });
  }, [setAppState, history]);

  if (appState.error) {
    return (
      <div className="App">
        <h1>{appState.error}</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <PostLoading
        isLoading={appState.loading}
        posts={appState.posts}
      ></PostLoading>
    </div>
  );
}

export default Admin;
