// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../Axios";
// import {
//   Box,
//   CardMedia,
//   Container,
//   Grid,
//   Paper,
//   Typography,
// } from "@mui/material";
// import CommentSection from "./CommentSection";

// const PostRead = () => {
//   const { slug } = useParams();
//   const [post, setPost] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Fetch post details
//     axiosInstance
//       .get(`/posts/${slug}`)
//       .then((response) => {
//         setPost(response.data);
//         // Fetch current user information
//         axiosInstance
//           .get("/current_user/")
//           .then((response) => {
//             setCurrentUser(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching current user:", error);
//             setCurrentUser(null);
//           });
//         console.log("Post:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching post:", error);
//         setPost(null);
//       });
//   }, [slug]);

//   return (
//     <Container>
//       <Grid container>
//         {/* Left Grid */}
//         <Grid item xs={12} md={3}>
//           <Paper>
//             <Typography variant="h6">Left Content</Typography>
//             {/* Add your left content here */}
//           </Paper>
//         </Grid>

//         {/* Center Grid */}
//         <Grid item xs={12} md={6}>
//           {post && (
//             <Paper>
//               {/* Header Image */}
//               <CardMedia
//                 component="img"
//                 alt="Post Header Image"
//                 height="200"
//                 image="https://source.unsplash.com/random"
//                 // image={post.header_image} // Assuming 'header_image' is the key for the image URL in the post data
//               />

//               <Box p={2}>
//                 {/* Title */}
//                 <Typography variant="h2" gutterBottom>
//                   {post.title}
//                 </Typography>

//                 {/* Author */}
//                 {post.author && (
//                   <Typography
//                     variant="subtitle2"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     By {post.author.user_name}
//                   </Typography>
//                 )}

//                 {/* Content */}
//                 <Typography
//                   variant="body1"
//                   component="div"
//                   gutterBottom
//                   sx={{ whiteSpace: "pre-line" }}
//                 >
//                   {post.content.includes("<iframe") ? (
//                     <div dangerouslySetInnerHTML={{ __html: post.content }} />
//                   ) : (
//                     post.content
//                   )}
//                 </Typography>
//                 {/* Render comment section */}

//                 <CommentSection postId={post.id} user={currentUser} />
//               </Box>
//             </Paper>
//           )}
//         </Grid>

//         {/* Right Grid */}
//         <Grid item xs={12} md={3}>
//           <Paper>
//             <Typography variant="h6">Right Content</Typography>
//             {/* Add your right content here */}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default PostRead;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Axios";
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CommentSection from "./CommentSection";

import LikePostButton from "./LikePostButton";

const PostRead = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current user information
    axiosInstance
      .get("user/")
      .then((response) => {
        setUser(response.data);
        setUserIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setUserIsAuthenticated(false);
        setUser("Guest User");
      });
  }, []);

  useEffect(() => {
    // Fetch post details
    axiosInstance
      .get(`/posts/${slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setPost(null);
      });
  }, [slug]);
  console.log(userIsAuthenticated, user);
  return (
    <Container>
      <Grid container>
        {/* Left Grid */}
        <Grid item xs={12} md={3}>
          <Paper>
            <Typography variant="h6">Left Content</Typography>
            {/* Add your left content here */}
          </Paper>
        </Grid>

        {/* Center Grid */}
        <Grid item xs={12} md={6}>
          {post && (
            <Paper>
              {/* Header Image */}
              <CardMedia
                component="img"
                alt="Post Header Image"
                height="200"
                image="https://source.unsplash.com/random"
                // image={post.header_image} // Assuming 'header_image' is the key for the image URL in the post data
              />

              <Box p={2}>
                {/* Title */}
                <Typography variant="h2" gutterBottom>
                  {post.title}
                </Typography>
                <LikePostButton
                  postId={post.id}
                  liked={post.liked_by_user} // Add a field in your backend response to indicate if the user has liked the post
                  initialLikeCount={post.likes_count}
                  isAuthenticated={post.userisAuthenticated}
                />

                {/* Author */}
                {post.author && (
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    By {post.author.user_name}
                  </Typography>
                )}

                {/* Content */}
                <Typography
                  variant="body1"
                  component="div"
                  gutterBottom
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {post.content.includes("<iframe") ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    post.content
                  )}
                </Typography>

                {/* Render comment section */}
                <CommentSection
                  postId={post.id}
                  userIsAuthenticated={userIsAuthenticated}
                  user={user}
                />
              </Box>
            </Paper>
          )}
        </Grid>

        {/* Right Grid */}
        <Grid item xs={12} md={3}>
          <Paper>
            <Typography variant="h6">Right Content</Typography>
            {/* Add your right content here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostRead;
