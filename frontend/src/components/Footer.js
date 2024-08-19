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
        Created by{" "}
        <Link href="https://olsenaeron.com" color="inherit">
          OlsenAeron
        </Link>
      </Typography>

      {/* Social media icons */}
      <Box mt={2}>
        <IconButton
          href="https://www.facebook.com/iam.aeronman/"
          aria-label="Facebook"
          color="inherit"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/aeronpadvjt/"
          aria-label="Instagram"
          color="inherit"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href="https://x.com/Kamalaya96"
          aria-label="Twitter"
          color="inherit"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          href="https://www.youtube.com/@aeronp8831"
          aria-label="YouTube"
          color="inherit"
        >
          <YouTubeIcon />
        </IconButton>
      </Box>

      {/* Additional footer features */}
      <Typography variant="body2" color="inherit" mt={2}>
        Connect with me:
      </Typography>
      <Typography variant="body2" color="inherit">
        Email: admin@olsenaeron.com
      </Typography>
    </Box>
  );
}

export default Footer;
