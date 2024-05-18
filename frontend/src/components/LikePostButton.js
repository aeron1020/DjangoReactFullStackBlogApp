// import React, { useState, useEffect } from "react";
// import axiosInstance from "../Axios";
// import { IconButton, Typography } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// const LikePostButton = ({
//   postId,
//   liked,
//   initialLikeCount,
//   isAuthenticated,
// }) => {
//   const [isLiked, setIsLiked] = useState(liked); // Initialize with the 'liked' prop
//   const [likeCount, setLikeCount] = useState(initialLikeCount); // Initialize with 'initialLikeCount' prop

//   useEffect(() => {
//     // Set initial state based on props
//     setIsLiked(liked);
//     setLikeCount(initialLikeCount);
//   }, [liked, initialLikeCount]); // Update state if props change

//   const toggleLike = () => {
//     console.log(document.cookie);
//     axiosInstance
//       .post(`/posts/${postId}/like/`)

//       .then((response) => {
//         setIsLiked(response.data.is_liked);
//         setLikeCount(response.data.likes_count);
//         console.log("Post sk:", response.data.session_key);
//       })
//       .catch((error) => {
//         console.error("Error toggling like:", error);
//       });
//   };

//   return (
//     <div>
//       <IconButton onClick={toggleLike}>
//         {isLiked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
//       </IconButton>
//       <Typography variant="body2" color="textSecondary" component="span">
//         {likeCount}
//       </Typography>
//     </div>
//   );
// };

// export default LikePostButton;

import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios";
import { IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikePostButton = ({ postId, initialLikeCount, isAuthenticated }) => {
  // Initialize state with localStorage value if available, otherwise use prop value
  const [isLiked, setIsLiked] = useState(() => {
    const storedIsLiked = localStorage.getItem(`like_${postId}`);
    return storedIsLiked ? JSON.parse(storedIsLiked) : false;
  });
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    // Store isLiked state in localStorage
    localStorage.setItem(`like_${postId}`, JSON.stringify(isLiked));
  }, [postId, isLiked]);

  const toggleLike = () => {
    axiosInstance
      .post(`/posts/${postId}/like/`)
      .then((response) => {
        setIsLiked(response.data.is_liked);
        setLikeCount(response.data.likes_count);
      })
      .catch((error) => {
        console.error("Error toggling like:", error);
      });
  };

  return (
    <div>
      <IconButton onClick={toggleLike}>
        {isLiked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant="body2" color="textSecondary" component="span">
        {likeCount}
      </Typography>
    </div>
  );
};

export default LikePostButton;
