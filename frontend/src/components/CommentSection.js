import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CommentSection = ({ postId, userIsAuthenticated, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const theme = useTheme();

  useEffect(() => {
    if (postId) {
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
        author_name: userIsAuthenticated ? user.user_name : "Guest",
      };

      const endpoint = userIsAuthenticated
        ? `/posts/${postId}/comments/create/`
        : `/posts/${postId}/comments/create/guest/`;

      axiosInstance
        .post(endpoint, commentData)
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
        });
    }
  };

  const handleReplyClick = (comment) => {
    setReplyingTo(comment);
    setReplyContent("");
  };

  const handleReplySubmit = () => {
    if (postId && replyingTo) {
      const replyData = {
        post: postId,
        content: replyContent,
        author_name: userIsAuthenticated ? user.user_name : "Guest",
        parent: replyingTo.id,
      };

      const endpoint = userIsAuthenticated
        ? `/posts/${postId}/comments/create/`
        : `/posts/${postId}/comments/create/guest/`;

      axiosInstance
        .post(endpoint, replyData)
        .then((response) => {
          setComments([...comments, response.data]);
          setReplyingTo(null);
          setReplyContent("");
        })
        .catch((error) => {
          console.error("Error creating reply:", error);
        });
    }
  };

  const groupCommentsByParent = (comments) => {
    const groupedComments = {};
    comments.forEach((comment) => {
      if (comment.parent) {
        if (!groupedComments[comment.parent]) {
          groupedComments[comment.parent] = [];
        }
        groupedComments[comment.parent].push(comment);
      } else {
        if (!groupedComments[comment.id]) {
          groupedComments[comment.id] = [];
        }
      }
    });
    return groupedComments;
  };

  const renderComments = (comments, parentId = null, level = 0) => {
    return comments
      .filter((comment) => comment.parent === parentId)
      .map((comment) => {
        const formattedDate = new Date(comment.created_at).toLocaleDateString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" }
        );

        return (
          <Box key={comment.id} ml={level * 2}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {comment.author_name}:
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {formattedDate}
                  </Typography>
                  <Typography variant="body1">{comment.content}</Typography>
                </Grid>
                <Grid item xs={12}>
                  {!comment.parent && (
                    <Button
                      sx={{
                        color: theme.palette.primary.text,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main, // Change the background color on hover
                        },
                      }}
                      onClick={() => handleReplyClick(comment)}
                    >
                      Reply
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
            {replyingTo && replyingTo.id === comment.id && (
              <Box ml={2} mb={2}>
                <TextField
                  label="Add a reply"
                  variant="outlined"
                  fullWidth
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  multiline
                  rows={2}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReplySubmit}
                >
                  Post Reply
                </Button>
              </Box>
            )}
            {renderComments(comments, comment.id, level + 1)}
          </Box>
        );
      });
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      {renderComments(comments)}
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
      <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
        Post Comment
      </Button>
    </Box>
  );
};

export default CommentSection;
