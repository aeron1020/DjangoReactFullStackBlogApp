import React, { useState, useEffect } from "react";
import { useMediaQuery, Box, Grid, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Technologies from "../components/Technologies";
import PopularPost from "./PopularPost";
import { useTheme } from "@emotion/react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Note from "./Notes";
import GitHubCard from "./GithubCard";
import aeron from "../aeron.jpg";

function HomeAvatar() {
  const theme = useTheme();

  const isMobile = useMediaQuery("(max-width: 610px)");
  const isTab = useMediaQuery("(max-width: 900px)");

  // State to hold current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        padding: isMobile ? 0 : 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container sx={{ height: "100%", marginBottom: 2 }} spacing={3}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          container
          spacing={2}
          direction="column"
        >
          <Grid
            item
            xs={6}
            display={"block"}
            sx={{
              transition: "width 0.3s ease-in-out",
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundImage: `url(${aeron})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 5,
                color: theme.palette.primary.button,
              }}
            >
              <Grid
                item
                xs={9}
                sm={9}
                md={8}
                lg={6}
                spacing={4}
                direction="column"
                padding={1}
              >
                {" "}
                <Grid item xs={2} sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      background: theme.palette.primary.transparent,
                      borderRadius: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      backdropFilter: "blur(5px)",
                      border: "1px solid green",
                    }}
                  >
                    <Typography
                      variant="h4"
                      padding={1}
                      sx={{
                        fontFamily:
                          "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                        color: theme.palette.primary.text,
                        textAlign: "center",
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      {currentTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily:
                          "SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif",
                        fontWeight: "normal",
                        color: theme.palette.primary.text,
                        textAlign: "center",
                        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        marginTop: "8px",
                      }}
                    >
                      {currentTime.toLocaleDateString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              transition: "width 0.3s ease-in-out",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: theme.palette.primary.transparent,
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                color: "black",
                fontWeight: "bold",
                padding: 2,
              }}
            >
              <Typography
                variant="h1"
                sx={{ textAlign: "left", marginBottom: 2 }}
              >
                Viola! I'm Olsen Aeron
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.text, textAlign: "left" }}
              >
                I'm a self-taught web developer with expertise in front-end and
                back-end technologies like HTML, CSS, JavaScript, React, Python,
                and Django.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={1}
            display={"flex"}
            sx={{
              transition: "width 0.3s ease-in-out",
              height: isMobile ? "100%" : "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                display: "block",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Technologies />
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          container
          spacing={1}
          direction="column"
          display={isMobile ? "none" : "flex"}
        >
          <Grid item xs={3} sx={{ width: "100%", textDecoration: "none" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: theme.palette.primary.transparent,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              <Typography variant="h2" sx={{ textAlign: "left" }}>
                {" "}
                <PopularPost />
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display={isTab ? "none" : "flex"}
            sx={{ width: "100%", textDecoration: "none" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: theme.palette.primary.transparent,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              <Note />
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          container
          spacing={3}
          direction="column"
          display={isTab ? "none" : "flex"}
        >
          {" "}
          <Grid item xs={3} sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.1)",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "1rem",
                overflow: "hidden",
              }}
            >
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/e9/04/57/e904573f-7af0-b8e7-11e3-8aad79eb207f/App_Icon-marketing.lsr/1200x630bb.png"
                alt="App Icon"
                style={{ width: "100%", height: "auto", borderRadius: "5px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: theme.palette.primary.transparent,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: 2,
                border: `1px solid ${theme.palette.primary.button}`,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                },
              }}
            >
              <Link
                to="/projects/admin/project"
                style={{
                  textAlign: "center",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LocationCityIcon
                  sx={{
                    fontSize: 50,
                    color: theme.palette.primary.text,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  My Projects
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: theme.palette.primary.transparent,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "1rem",
                border: `1px solid ${theme.palette.primary.button}`,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                },
              }}
            >
              <GitHubCard />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeAvatar;
