import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const SwitchTheme = ({ checked, onChange }) => {
  const handleThemeChange = () => {
    onChange(!checked);
  };

  return (
    <IconButton
      aria-label={checked ? "Switch to Light Mode" : "Switch to Dark Mode"}
      onClick={handleThemeChange}
    >
      {checked ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default SwitchTheme;
