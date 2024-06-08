import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const SwitchTheme = ({ checked, onChange }) => {
  const handleThemeChange = () => {
    onChange(!checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
      }}
    >
      <IconButton
        aria-label={checked ? "Switch to Light Mode" : "Switch to Dark Mode"}
        onClick={handleThemeChange}
        size="small"
        sx={{
          padding: 0,
        }}
      >
        {/* {checked ? <Brightness7Icon /> : <Brightness4Icon />} */}
        {checked ? (
          <WbSunnyIcon fontSize="small" />
        ) : (
          <NightsStayIcon fontSize="small" />
        )}
      </IconButton>
      <Typography
        sx={{
          fontFamily:
            "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
          fontSize: 8,
          fontWeight: 400,
          letterSpacing: "-.01em",
          margin: 0,
        }}
      >
        {checked ? "Light Mode" : "Dark Mode"}
      </Typography>
    </Box>
  );
};

export default SwitchTheme;
