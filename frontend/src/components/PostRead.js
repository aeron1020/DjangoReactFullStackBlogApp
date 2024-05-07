// import {
//   Box,
//   CardMedia,
//   Container,
//   Grid,
//   Paper,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../Axios";

// const PostRead = () => {
//   const { slug } = useParams();
//   const [post, setPost] = useState({ posts: [] });

//   useEffect(() => {
//     axiosInstance.get(slug).then((response) => {
//       setPost({ posts: response.data });
//       console.log(response.data);
//     });
//   }, [slug, setPost]);

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
//           <Paper>
//             {/* Header Image */}

//             <CardMedia
//               component="img"
//               alt="Post Header Image"
//               height="200" // Adjust the height as needed
//               image="https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/429484447_18323433835190175_4356149990758817175_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGLaOQhUWGMBVlH78PcoKMP5N9R1aEmHr_k31HVoSYev26B1yV5LLsvIFp3y1CqmZSp3f7THjbF9DJs1TVTurZm&_nc_ohc=pNbZcLJUiakAX8GDI7K&_nc_ht=scontent.fcrk2-1.fna&cb_e2o_trans=t&oh=00_AfBAZzHA65UQ7JA7ukBZpMFxM-pffeVPvYx_rCiiFFw7eg&oe=65E1C232"
//             />

//             <Box p={2}>
//               {/* Title */}
//               <Typography variant="h2" gutterBottom>
//                 {post.title}
//               </Typography>

//               {/* Author */}
//               {post.author && (
//                 <Typography
//                   variant="subtitle2"
//                   color="textSecondary"
//                   gutterBottom
//                 >
//                   By {post.author.username}
//                 </Typography>
//               )}

//               {/* Content */}
//               <Typography
//                 variant="body1"
//                 component="div"
//                 gutterBottom
//                 sx={{ whiteSpace: "pre-line" }} // Preserve line breaks
//               >
//                 {post.content}
//               </Typography>
//             </Box>
//           </Paper>
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
