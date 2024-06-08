import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTheme } from "@mui/material/styles";

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        marginTop: 3,
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        color: theme.palette.primary.text, // Use primary text color
        backgroundColor: theme.palette.primary.main, // Use primary background color
      }}
    >
      <Typography variant="body2" color="inherit">
        © {new Date().getFullYear()} OlsenAeron. All rights reserved.
      </Typography>
      <Typography variant="body2" color="inherit" mt={1}>
        Created with love by{" "}
        <Link href="https://example.com" color="inherit">
          Your Name
        </Link>
      </Typography>

      {/* Social media icons */}
      <Box mt={2}>
        <IconButton aria-label="Facebook" color="inherit">
          <FacebookIcon />
        </IconButton>
        <IconButton aria-label="Instagram" color="inherit">
          <InstagramIcon />
        </IconButton>
        <IconButton aria-label="Twitter" color="inherit">
          <TwitterIcon />
        </IconButton>
        <IconButton aria-label="YouTube" color="inherit">
          <YouTubeIcon />
        </IconButton>
      </Box>

      {/* Additional footer features */}
      <Typography variant="body2" color="inherit" mt={2}>
        Connect with us:
      </Typography>
      <Typography variant="body2" color="inherit">
        Email: info@example.com
      </Typography>
      <Typography variant="body2" color="inherit">
        Phone: +1234567890
      </Typography>
    </Box>
  );
}

export default Footer;
