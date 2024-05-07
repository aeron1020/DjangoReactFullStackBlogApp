// // FeaturedPost.js
// import React from "react";
// import { styled } from "@mui/system";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import { useTheme } from "@mui/material/styles";

// const useStyles = styled((theme) => ({
//   card: {
//     display: "flex",
//     flexDirection: "column",
//     height: "100%",
//   },
//   cardMedia: {
//     paddingTop: "100%", // 16:9
//   },
//   link: {
//     textDecoration: "none",
//     color: "inherit",
//   },
// }));

// const FeaturedPost = ({ post }) => {
//   const theme = useTheme();
//   const classes = useStyles();

//   if (!post) return null;

//   return (
//     <Link to={`/posts/${post.slug}`} className={classes.link}>
//       <Card className={classes.card}>
//         <CardMedia
//           className={classes.cardMedia}
//           image={post.header_image || "https://source.unsplash.com/random"}
//           title="Post Header Image"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             {post.title}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             {post.content.substr(0, 70)}...
//           </Typography>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default FeaturedPost;
