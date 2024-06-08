import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";

const NavigateBackButton = ({ to, label }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <IconButton onClick={handleClick}>
      <ArrowBackIcon
        style={{ color: theme.palette.primary.text, fontSize: 20 }}
      />
      {label}
    </IconButton>
  );
};

export default NavigateBackButton;
