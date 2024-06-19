import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Note = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: isDarkMode
          ? "linear-gradient(transparent 100%, rgba(200, 200, 200, 0.1) 100%), repeating-linear-gradient(#333, #333 28px, #444 30px)"
          : "linear-gradient(transparent 100%, rgba(55, 55, 55, 0.1) 100%), repeating-linear-gradient(white, white 28px, #e0e0e0 30px)",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        padding: 4,
        color: "black",
        fontFamily:
          "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{
            width: "100%",
            textAlign: "left",
            color: theme.palette.primary.text,
          }}
        >
          Evolve.
        </Typography>
        <Typography
          variant="h2"
          sx={{
            width: "100%",
            textAlign: "left",
            color: theme.palette.primary.text,
          }}
        >
          Excel.
        </Typography>
        <Typography
          variant="h2"
          sx={{
            width: "100%",
            textAlign: "left",
            color: theme.palette.primary.text,
          }}
        >
          Encourage.
        </Typography>
      </Box>
    </Box>
  );
};

export default Note;
