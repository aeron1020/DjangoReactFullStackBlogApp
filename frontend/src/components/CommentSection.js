import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";

const CommentSection = ({ postId, userIsAuthenticated, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  console.log(userIsAuthenticated);
  console.log("userIsAuthenticated");

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
        postId: postId,
        content: newComment,
        author_name: "Anonymous",
      };

      if (userIsAuthenticated) {
        console.log("Authenticated!");
        // If the user is authenticated, include the user's ID in the comment data
        commentData.author_name = user.name;
      }
      // console.log("Comment Data:", user.name);
      console.log("Comment Data:", commentData);

      // Send a POST request to the CreateComment endpoint
      axiosInstance
        .post(`/posts/${postId}/comments/create/`, commentData)
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
            {/* Display author's name and comment content */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                {comment.author_name}:
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
