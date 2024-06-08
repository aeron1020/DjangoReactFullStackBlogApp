// import React, { useState, useEffect } from "react";
// import axiosInstance from "../Axios";
// import { IconButton, Typography } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// const LikePostButton = ({ postId, initialLikeCount, isAuthenticated }) => {
//   // Initialize state with localStorage value if available, otherwise use prop value
//   const [isLiked, setIsLiked] = useState(() => {
//     const storedIsLiked = localStorage.getItem(`like_${postId}`);
//     return storedIsLiked ? JSON.parse(storedIsLiked) : false;
//   });
//   const [likeCount, setLikeCount] = useState(initialLikeCount);

//   useEffect(() => {
//     // Store isLiked state in localStorage
//     localStorage.setItem(`like_${postId}`, JSON.stringify(isLiked));
//   }, [postId, isLiked]);

//   const toggleLike = () => {
//     axiosInstance
//       .post(`/posts/${postId}/like/`)
//       .then((response) => {
//         setIsLiked(response.data.is_liked);
//         setLikeCount(response.data.likes_count);
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
import { useTheme } from "@mui/material/styles";

const LikePostButton = ({ postId, initialLikeCount, isAuthenticated }) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(() => {
    const storedIsLiked = localStorage.getItem(`like_${postId}`);
    return storedIsLiked ? JSON.parse(storedIsLiked) : false;
  });
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
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
        {isLiked ? (
          <FavoriteIcon sx={{ color: theme.palette.secondary.main }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: theme.palette.primary.main }} />
        )}
      </IconButton>
      <Typography variant="body2" color="textSecondary" component="span">
        {likeCount}
      </Typography>
    </div>
  );
};

export default LikePostButton;
