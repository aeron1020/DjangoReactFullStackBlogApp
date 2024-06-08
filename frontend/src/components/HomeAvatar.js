import React from "react";
import { useMediaQuery, Box, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function HomeAvatar() {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Box
      sx={{
        marginTop: 0.5,
        width: "100%",
        height: "90vh",
        background: `url(https://source.unsplash.com/random)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)", // Adding text shadow for better readability
        borderRadius: 3,
      }}
    >
      <Box mb={isMobile ? 2 : 4}>
        <Box
          sx={{
            fontSize: isMobile ? "2rem" : "4rem", // Adjusting font size for mobile and larger screens
            fontWeight: "bold",
            fontStyle: "italic",
            lineHeight: 1.2, // Adjusting line height for better spacing
          }}
        >
          evolve, excel, encourage
        </Box>
      </Box>
      {/* Adding arrow for scroll */}
      <IconButton color="inherit" aria-label="scroll">
        <ArrowDropDownIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default HomeAvatar;
