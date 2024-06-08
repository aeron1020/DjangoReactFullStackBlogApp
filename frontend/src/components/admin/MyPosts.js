import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeletePost from "./DeletePost";
import { useTheme } from "@mui/material/styles";

const Posts = ({ posts }) => {
  const theme = useTheme();

  if (!posts || posts.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.text }}>
          No posts found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: theme.spacing(2),
            color: theme.palette.primary.text,
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.h5.fontWeight,
          }}
        >
          Manage Posts
        </Typography>
        <Link to={`/admin/create/`}>
          <Button>
            <Typography
              style={{
                color: theme.palette.primary.border,
              }}
            >
              Add Post
            </Typography>
          </Button>
        </Link>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Avatar
                      src={post.head_image}
                      alt={post.title}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell>{post.category.name}</TableCell>
                  <TableCell>
                    <Link
                      to={`/posts/${post.slug}`}
                      style={{
                        textDecoration: "none",
                        color: theme.palette.primary.main,
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.primary.text,
                          fontFamily: theme.typography.fontFamily,
                          textTransform: "none",
                          mb: { xs: 1, md: 0 },
                          mr: { xs: 0, md: 1 },
                        }}
                      >
                        {post.title}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      flexDirection={{ xs: "column", md: "row" }}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Button
                        component={Link}
                        to={`/admin/edit-post/${post.id}`}
                        endIcon={<EditIcon />}
                        variant="contained"
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
                        Edit
                      </Button>

                      <DeletePost postId={post.id} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Posts;
