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
//   Modal,
// } from "@mui/material";
// import CommentSection from "./CommentSection";
// import LikePostButton from "./LikePostButton";
// import NavigateBackButton from "./BackButton";
// import { useTheme } from "@emotion/react";

// const PostRead = () => {
//   const { slug } = useParams();
//   const [post, setPost] = useState(null);
//   const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(false);

//   const theme = useTheme();

//   useEffect(() => {
//     // Fetch current user information
//     axiosInstance
//       .get("user/")
//       .then((response) => {
//         setUser(response.data);
//         setUserIsAuthenticated(true);
//       })
//       .catch((error) => {
//         console.error("Error fetching current user:", error);
//         setUserIsAuthenticated(false);
//         setUser("Guest User");
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch post details
//     axiosInstance
//       .get(`/posts/${slug}/`)
//       .then((response) => {
//         setPost(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching post:", error);
//         setPost(null);
//       });
//   }, [slug]);

//   const renderContent = (content) => {
//     const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
//     const iframeRegex = /<iframe.*<\/iframe>/i;

//     return content.split("\n").map((line, index) => {
//       if (imageUrlRegex.test(line)) {
//         return (
//           <img
//             src={line}
//             alt="Embedded content"
//             key={index}
//             style={{ maxWidth: "100%", margin: "10px 0" }}
//           />
//         );
//       } else if (iframeRegex.test(line)) {
//         return <div dangerouslySetInnerHTML={{ __html: line }} key={index} />;
//       } else {
//         return <p key={index}>{line}</p>;
//       }
//     });
//   };

//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     };
//     return new Date(dateString).toLocaleString(undefined, options);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <Container sx={{ padding: 0.8 }}>
//       <Grid container spacing={3}>
//         {/* Left Grid */}
//         <Grid item xs={12} md={3}>
//           <Paper>
//             <NavigateBackButton />
//             <Typography variant="h6"></Typography>
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
//                 // height="33vh"
//                 image={post.head_image}
//                 sx={{ objectFit: "cover", cursor: "pointer", height: "50vh" }} // Prevent image shrinkage and add pointer cursor
//                 onClick={handleOpen}
//               />

//               <Box p={2}>
//                 {/* Title */}
//                 <Typography variant="h2" gutterBottom>
//                   {post.title}
//                 </Typography>
//                 <Typography variant="text" gutterBottom>
//                   {post.category.name}
//                 </Typography>

//                 {/* Like button */}
//                 <LikePostButton
//                   postId={post.id}
//                   liked={post.liked_by_user}
//                   initialLikeCount={post.likes_count}
//                   isAuthenticated={userIsAuthenticated}
//                 />

//                 {/* Author */}
//                 {post.author && (
//                   <Typography
//                     variant="subtitle2"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     {post.author.user_name}
//                   </Typography>
//                 )}
//                 <Typography
//                   variant="subtitle2"
//                   color="textSecondary"
//                   gutterBottom
//                 >
//                   {formatDate(post.published)}
//                 </Typography>

//                 {/* Content */}
//                 <Box component="div" sx={{ whiteSpace: "pre-line" }}>
//                   {renderContent(post.content)}
//                 </Box>

//                 {/* Render comment section */}
//                 <CommentSection
//                   postId={post.id}
//                   userIsAuthenticated={userIsAuthenticated}
//                   user={user}
//                 />
//               </Box>

//               {/* Modal for viewing image */}
//               <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-title"
//                 aria-describedby="modal-description"
//               >
//                 <Box
//                   sx={{
//                     position: "fixed",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     width: "72%",
//                     // height: "100%",
//                     bgcolor: theme.palette.primary.transparent,
//                     padding: 1,
//                     outline: "none",
//                   }}
//                 >
//                   <img
//                     src={post.head_image}
//                     alt={post.title}
//                     style={{ width: "100%", height: "auto" }}
//                   />
//                 </Box>
//               </Modal>
//             </Paper>
//           )}
//         </Grid>

//         {/* Right Grid */}
//         <Grid item xs={12} md={3}>
//           <Paper>
//             <Typography variant="h6"></Typography>
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
  Modal,
} from "@mui/material";
import CommentSection from "./CommentSection";
import LikePostButton from "./LikePostButton";
import NavigateBackButton from "./BackButton";
import { useTheme } from "@emotion/react";

const PostRead = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const theme = useTheme();

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
      .get(`/posts/${slug}/`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setPost(null);
      });
  }, [slug]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const processContent = (content) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(content, "text/html");

  //   // Handle <oembed> tags
  //   const oembedTags = doc.querySelectorAll("oembed");
  //   oembedTags.forEach((oembed) => {
  //     const url = oembed.getAttribute("url");
  //     if (url.includes("youtu.be") || url.includes("youtube.com")) {
  //       const iframe = document.createElement("iframe");
  //       iframe.setAttribute(
  //         "src",
  //         url
  //           .replace("youtu.be", "www.youtube.com/embed")
  //           .replace("/watch?v=", "/embed/")
  //       );
  //       iframe.setAttribute("width", "100%");
  //       iframe.setAttribute("height", "315");
  //       iframe.setAttribute("frameborder", "0");
  //       iframe.setAttribute("allowfullscreen", "true");
  //       oembed.parentNode.replaceChild(iframe, oembed);
  //     }
  //   });

  //   // Handle image URLs inside <figure class="media">
  //   const imageUrls = doc.querySelectorAll("figure.media img");
  //   imageUrls.forEach((img) => {
  //     const imgUrl = img.src;
  //     const imgTag = document.createElement("img");
  //     imgTag.setAttribute("src", imgUrl);
  //     imgTag.setAttribute("alt", "Embedded content");
  //     imgTag.style.maxWidth = "100%";
  //     imgTag.style.margin = "10px 0";
  //     img.parentNode.replaceChild(imgTag, img);
  //   });

  //   // Handle plain image URLs in content
  //   const plainUrls = doc.body.innerHTML.match(
  //     /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi
  //   );
  //   if (plainUrls) {
  //     plainUrls.forEach((url) => {
  //       const imgTag = `<img src="${url}" alt="Embedded content" style="max-width: 100%; max-height: 50vh; margin: 10px 0;">`;
  //       doc.body.innerHTML = doc.body.innerHTML.replace(url, imgTag);
  //     });
  //   }

  //   return doc.body.innerHTML;
  // };
  const processContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Helper function to handle <oembed> tags
    const handleOembedTags = (doc) => {
      const oembedTags = doc.querySelectorAll("oembed");
      oembedTags.forEach((oembed) => {
        const url = oembed.getAttribute("url");
        if (url.includes("youtu.be") || url.includes("youtube.com")) {
          const iframe = document.createElement("iframe");
          iframe.setAttribute(
            "src",
            url
              .replace("youtu.be", "www.youtube.com/embed")
              .replace("/watch?v=", "/embed/")
          );
          iframe.setAttribute("width", "100%");
          iframe.setAttribute("height", "315");
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allowfullscreen", "true");
          oembed.parentNode.replaceChild(iframe, oembed);
        }
      });
    };

    // Helper function to handle image URLs inside <figure class="media">
    const handleFigureMediaImages = (doc) => {
      const imageUrls = doc.querySelectorAll("figure.media img");
      imageUrls.forEach((img) => {
        const imgUrl = img.src;
        const imgTag = document.createElement("img");
        imgTag.setAttribute("src", imgUrl);
        imgTag.setAttribute("alt", "Embedded content");
        imgTag.style.maxWidth = "100%";
        imgTag.style.margin = "10px 0";
        img.parentNode.replaceChild(imgTag, img);
      });
    };

    // Helper function to handle plain image URLs in content
    const handlePlainImageUrls = (doc) => {
      const textNodes = [];
      const walker = document.createTreeWalker(
        doc.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }

      textNodes.forEach((node) => {
        const regex =
          /this is image url:\s*(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi;
        const matches = node.textContent.match(regex);

        if (matches) {
          const parent = node.parentNode;
          matches.forEach((match) => {
            const url = match.replace("this is image url:", "").trim();
            const figureTag = document.createElement("figure");
            figureTag.className = "media";
            const imgTag = document.createElement("img");
            imgTag.setAttribute("src", url);
            imgTag.setAttribute("alt", "Embedded content");
            imgTag.style.maxWidth = "100%";
            imgTag.style.maxHeight = "50vh";
            imgTag.style.margin = "10px 0";
            figureTag.appendChild(imgTag);

            const textParts = node.textContent.split(match);
            const newNodes = [];

            textParts.forEach((part, index) => {
              if (index > 0) {
                newNodes.push(figureTag.cloneNode(true));
              }
              if (part.trim() !== "") {
                newNodes.push(document.createTextNode(part));
              }
            });

            newNodes.forEach((newNode) => parent.insertBefore(newNode, node));
            parent.removeChild(node);
          });
        }
      });
    };

    // Process the content
    handleOembedTags(doc);
    handleFigureMediaImages(doc);
    handlePlainImageUrls(doc);

    return doc.body.innerHTML;
  };

  return (
    <Container sx={{ padding: 0.8 }}>
      <Grid container spacing={3}>
        {/* Left Grid */}
        <Grid item xs={12} md={3}>
          <Paper>
            <NavigateBackButton />
            <Typography variant="h6"></Typography>
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
                image={post.head_image}
                sx={{ objectFit: "cover", cursor: "pointer", height: "50vh" }} // Prevent image shrinkage and add pointer cursor
                onClick={handleOpen}
              />

              <Box p={2}>
                {/* Like button */}
                <LikePostButton
                  postId={post.id}
                  liked={post.liked_by_user}
                  initialLikeCount={post.likes_count}
                  isAuthenticated={userIsAuthenticated}
                />

                {/* Author */}
                {post.author && (
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {post.author.user_name}
                  </Typography>
                )}
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  {formatDate(post.published)}
                </Typography>

                {/* Title */}
                <Typography variant="text" gutterBottom>
                  {post.category.name}
                </Typography>

                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontFamily:
                      "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                    color: theme.palette.primary.text,
                  }}
                >
                  {post.title}
                </Typography>

                {/* Content */}
                <Box
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: processContent(post.content),
                  }}
                  sx={{
                    whiteSpace: "pre-line",
                    fontFamily:
                      "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                    color: theme.palette.primary.text,
                  }}
                />

                {/* Render comment section */}
                <CommentSection
                  postId={post.id}
                  userIsAuthenticated={userIsAuthenticated}
                  user={user}
                />
              </Box>

              {/* Modal for viewing image */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box
                  sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "72%",
                    bgcolor: theme.palette.primary.transparent,
                    padding: 1,
                    outline: "none",
                  }}
                >
                  <img
                    src={post.head_image}
                    alt={post.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Modal>
            </Paper>
          )}
        </Grid>

        {/* Right Grid */}
        <Grid item xs={12} md={3}>
          <Paper>
            <Typography variant="h6"></Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostRead;
