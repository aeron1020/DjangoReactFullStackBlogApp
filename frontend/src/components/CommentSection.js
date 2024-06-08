import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { formatDistanceToNow } from "date-fns";

const CommentSection = ({ postId, userIsAuthenticated, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [hiddenReplies, setHiddenReplies] = useState({});
  const theme = useTheme();

  useEffect(() => {
    if (postId) {
      axiosInstance
        .get(`/posts/${postId}/comments/`)
        .then((response) => {
          setComments(response.data);
          // Initialize hiddenReplies state
          const hiddenRepliesInit = response.data.reduce((acc, comment) => {
            acc[comment.id] = true;
            return acc;
          }, {});
          setHiddenReplies(hiddenRepliesInit);
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

  const toggleReplies = (commentId) => {
    setHiddenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComments = (comments, parentId = null, level = 0) => {
    return comments
      .filter((comment) => comment.parent === parentId)
      .map((comment) => {
        const childComments = comments.filter((c) => c.parent === comment.id);
        const formattedDate = formatDistanceToNow(
          new Date(comment.created_at),
          {
            addSuffix: true,
          }
        );

        return (
          <Box key={comment.id} ml={level * 2} mt={2}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {comment.author_name}
                  </Typography>
                  <Typography variant="body1">{comment.content}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {formattedDate}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {level < 2 && (
                    <Button
                      sx={{
                        color: theme.palette.primary.text,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                      onClick={() => handleReplyClick(comment)}
                    >
                      Reply
                    </Button>
                  )}
                  {childComments.length > 0 && (
                    <Button
                      sx={{
                        color: theme.palette.primary.text,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                      onClick={() => toggleReplies(comment.id)}
                    >
                      {hiddenReplies[comment.id]
                        ? `Show Replies (${childComments.length})`
                        : `Hide Replies (${childComments.length})`}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
            {replyingTo && replyingTo.id === comment.id && (
              <Box mt={2} ml={4}>
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
                  sx={{
                    backgroundColor: theme.palette.primary.text,
                    color: theme.palette.primary.main,
                    fontFamily: theme.typography.fontFamily,
                    textTransform: "none",
                    mb: { xs: 1, md: 0 },
                    mr: { xs: 0, md: 1 },

                    "&:hover": {
                      backgroundColor: theme.palette.primary.button,
                    },
                  }}
                >
                  Post Reply
                </Button>
              </Box>
            )}
            {!hiddenReplies[comment.id] && (
              <Box ml={4}>
                {renderComments(comments, comment.id, level + 1)}
              </Box>
            )}
          </Box>
        );
      });
  };

  return (
    <Box mt={2}>
      <Divider sx={{ mt: 8, borderColor: theme.palette.primary.border }} />
      <Typography variant="h5" gutterBottom sx={{ marginTop: "1rem" }}>
        Comments:
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        sx={{
          backgroundColor: theme.palette.primary.text,
          color: theme.palette.primary.main,
          fontFamily: theme.typography.fontFamily,
          textTransform: "none",
          mb: { xs: 1, md: 0 },
          mr: { xs: 0, md: 1 },

          "&:hover": {
            backgroundColor: theme.palette.primary.button,
          },
        }}
      >
        Post Comment
      </Button>
    </Box>
  );
};

export default CommentSection;
