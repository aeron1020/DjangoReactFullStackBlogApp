import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E0E0E5", // Gray
      text: "#333", // Black
      button: "#007AFF", // Highlighter color for buttons (Blue)
      border: "#34C759", // Highlighter color for borders (Green)
      transparent: "rgba(255, 255, 255, 0.3)",
    },
    secondary: {
      main: "#FF9500", // Orange
    },
    background: {
      default: "#F2F2F7", // Light Gray Background
    },
  },
  typography: {
    fontFamily:
      "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif", //font
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#333",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#333",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 600px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0A0A0A", // Gray
      text: "#F2F2F7", // White
      button: "#007AFF", // Highlighter color for buttons (Blue)
      border: "#34C759", // Highlighter color for borders (Green)
      transparent: "rgba(0, 0, 0, .4)",
    },
    secondary: {
      main: "#FF9500", //Orange
    },
    background: {
      default: "#1C1C1E", // Dark Background
    },
  },
  typography: {
    fontFamily: "SF Pro, sans-serif", //font
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#F2F2F7",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#F2F2F7",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 600px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  },
});
