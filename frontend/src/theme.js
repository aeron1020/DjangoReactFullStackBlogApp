// themes.js
import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D5E7F2",
      text: "#223A59",
      button: "#AFBF36",
      border: "#223A59",
    },
    secondary: {
      main: "#91A672",
    },
    background: {
      default: "#D5E7F2",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#223A59",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#121212",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#223A59",
      text: "#D5E7F2",
      button: "#AFBF36",
      border: "#CDD977",
    },
    secondary: {
      main: "#AFBF36",
    },
    background: {
      default: "#223A59",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#CDD977",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#fff",
    },
  },
});
