import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";

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

const CommentSection = ({ postId, userIsAuthenticated, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (postId) {
      // Fetch comments associated with the post
      axiosInstance
        .get(`/posts/${postId}/comments/`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setComments([]);
        });
    }
  }, [postId]);

  const handleCommentSubmit = () => {
    if (postId) {
      const commentData = {
        post: postId,
        content: newComment,
        author_name: userIsAuthenticated ? user.user_name : "Anonymous",
      };

      // Send a POST request to the appropriate endpoint based on user authentication
      const endpoint = userIsAuthenticated
        ? `/posts/${postId}/comments/create/`
        : `/posts/${postId}/comments/create/guest/`;

      // Send the comment data to the server
      axiosInstance
        .post(endpoint, commentData)
        .then((response) => {
          // Handle the response
          console.log("Comment created successfully:", response.data);
          // Update the comments state with the newly created comment
          setComments([...comments, response.data]);
          // Clear the newComment state
          setNewComment("");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error creating comment:", error);
        });
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      {/* Display existing comments */}
      {comments.map((comment) => (
        <Paper key={comment.id} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            {/* Display author's name, comment content, and time ago */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                {comment.author_name} •{" "}
                {formatTimeDifference(comment.created_at)}
              </Typography>
              <Typography variant="body1">{comment.content}</Typography>
            </Grid>
            {/* Reply button */}
            <Grid item xs={12}>
              <Button variant="outlined" color="primary">
                Reply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {/* Comment input field */}
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        multiline
        rows={4}
        margin="normal"
      />
      {/* Submit button */}
      <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
        Post Comment
      </Button>
    </Box>
  );
};

export default CommentSection;
