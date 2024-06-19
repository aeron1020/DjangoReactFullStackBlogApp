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
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import SwitchTheme from "./SwitchTheme";
import Logo from "./Logo";

function Header({ darkMode, handleThemeChange }) {
  const theme = useTheme(); // Access the current theme
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [showHeader, setShowHeader] = React.useState(true);
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

  React.useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        height: 36,
        justifyContent: "center",
        backgroundColor: `${theme.palette.primary.main}cc`,
        backdropFilter: "blur(5px)",
        transition: "transform 0.3s ease-in-out",
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        paddingRight: 5,
        paddingLeft: 5,
        borderRadius: 2,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            to="/"
            component={Link}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              background: "linear-gradient(to right, #AEAEAE, #777777)",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Logo sx={{ height: 32 }} />
          </Box>

          {/* Desktop or larger view */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily:
                "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
              fontSize: 16,
              fontWeight: 400,
              letterSpacing: "-.01em",
              textDecoration: "none",
              color: theme.palette.primary.text,
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
                <Typography
                  sx={{
                    fontFamily:
                      "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "-.01em",
                  }}
                >
                  Posts
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                to="/projects"
              >
                <Typography
                  sx={{
                    fontFamily:
                      "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "-.01em",
                  }}
                >
                  Projects
                </Typography>
              </MenuItem>
              {isAuthenticated && (
                <>
                  <MenuItem onClick={handleOpenProfileMenu}>
                    <Typography
                      sx={{
                        fontFamily:
                          "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                        fontSize: 12,
                        fontWeight: 400,
                        letterSpacing: "-.01em",
                      }}
                    >
                      Profile
                    </Typography>{" "}
                    <ArrowDropDownIcon />
                  </MenuItem>
                </>
              )}
              <MenuItem>
                <SwitchTheme
                  checked={darkMode}
                  onChange={handleThemeChange}
                  sx={{ color: theme.palette.primary.main }}
                />
              </MenuItem>
            </Menu>
          </Box>
          <Box
            to="/"
            component={Link}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              background: "linear-gradient(to right, #AEAEAE, #777777)",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Logo sx={{ height: 32 }} />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily:
                "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
              fontWeight: 400,
              letterSpacing: "-.01em",
              fontSize: 16,
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
              <Typography
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily:
                    "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "-.01em",
                  textDecoration: "none",
                  color: theme.palette.primary.text,
                }}
              >
                Posts
              </Typography>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              component={Link}
              to="/projects"
              sx={{ color: theme.palette.primary.text }}
            >
              <Typography
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily:
                    "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "-.01em",
                  textDecoration: "none",
                  color: theme.palette.primary.text,
                }}
              >
                Project
              </Typography>
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  onClick={handleOpenProfileMenu}
                  sx={{ color: theme.palette.primary.text }}
                >
                  <Typography
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily:
                        "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      letterSpacing: "-.01em",
                      textDecoration: "none",
                      color: theme.palette.primary.text,
                    }}
                  >
                    Profile
                  </Typography>{" "}
                  <ArrowDropDownIcon />
                </Button>
              </>
            )}
            <SwitchTheme
              checked={darkMode}
              onChange={handleThemeChange}
              sx={{ color: theme.palette.primary.main }}
            />
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
          <Typography
            sx={{
              fontFamily:
                "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "-.01em",
            }}
          >
            My Posts
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleCloseProfileMenu}
          component={Link}
          to="/settings"
        >
          <Typography
            sx={{
              fontFamily:
                "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "-.01em",
            }}
          >
            Settings
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleCloseProfileMenu}
          component={Link}
          to="/logout"
        >
          <Typography
            sx={{
              fontFamily:
                "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "-.01em",
            }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Header;
