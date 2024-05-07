import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";

function Header() {
  const theme = useTheme(); // Access the current theme
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const isAuthenticated = localStorage.getItem("access_token");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      {" "}
      {/* Apply background color based on theme */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />

          {/* Desktop or larger view */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: theme.palette.primary.text, // Use primary text color
            }}
          >
            OlsenAeron
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: theme.palette.primary.text }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                to="/posts"
              >
                Posts
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                to="/projects"
              >
                Projects
              </MenuItem>
              {isAuthenticated && (
                <>
                  <MenuItem onClick={handleOpenProfileMenu}>
                    Profile <ArrowDropDownIcon />
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: theme.palette.primary.text,
              textDecoration: "none",
            }}
          >
            OlsenAeron
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleCloseNavMenu}
              component={Link}
              to="/posts"
              sx={{ color: theme.palette.primary.text }}
            >
              <Typography>Posts</Typography>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              component={Link}
              to="/projects"
              sx={{ color: theme.palette.primary.text }}
            >
              Projects
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  onClick={handleOpenProfileMenu}
                  sx={{ color: theme.palette.primary.text }}
                >
                  Profile <ArrowDropDownIcon />
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={handleCloseProfileMenu}
      >
        <MenuItem
          onClick={handleCloseProfileMenu}
          component={Link}
          to="/admin/"
        >
          My Posts
        </MenuItem>
        <MenuItem
          onClick={handleCloseProfileMenu}
          component={Link}
          to="/settings"
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={handleCloseProfileMenu}
          component={Link}
          to="/logout"
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Header;
