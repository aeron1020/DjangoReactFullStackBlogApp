import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({
  open,
  message,
  severity,
  handleClose,
  autoHideDuration,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
