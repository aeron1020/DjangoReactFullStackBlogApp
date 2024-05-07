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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeletePost from "./DeletePost";
import { useTheme } from "@mui/material/styles";

const Posts = ({ posts }) => {
  const theme = useTheme();

  if (!posts || posts.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="body1">No posts found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.category.name}</TableCell>
                  <TableCell>
                    <Link
                      to={`/posts/${post.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {post.title} by {post.author.user_name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      flexDirection={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "start", md: "center" }}
                    >
                      <Button
                        component={Link}
                        to={`/admin/edit-post/${post.id}`}
                        endIcon={<EditIcon />}
                        variant="contained"
                        color="primary"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          mr: { xs: 0, md: 1 },
                          mb: { xs: 1, md: 0 },
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
