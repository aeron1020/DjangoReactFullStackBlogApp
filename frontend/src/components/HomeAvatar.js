import { useMediaQuery, Box, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

function HomeAvatar() {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div>
      <Grid
        container
        sx={{
          height: "100%",
          marginBottom: isMobile ? "16px" : 0,
        }}
      >
        {/* Left Box (for xs and sm screens) */}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          order={{ xs: 2, sm: 2, md: 2 }}
          sx={{
            height: isMobile ? "100%" : "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <Box
            elevation={3}
            sx={{
              maxWidth: "100%",
              paddingLeft: isMobile ? 3 : 8,
              paddingRight: isMobile ? 3 : 1,
              textAlign: isMobile ? "left" : "left",
            }}
          >
            <Typography variant="h1" component="div">
              <strong>Juan Luan</strong>
            </Typography>

            <Typography variant="subtitle1" component="div">
              <strong>Web Developer</strong>
            </Typography>
            <Typography variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages...
            </Typography>
          </Box>
        </Grid>

        {/* Right Box (for xs and sm screens) */}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          order={{ xs: 1, sm: 1, md: 1 }}
          sx={{
            width: "100%",
            height: isMobile ? "100%" : "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              paddingRight: isMobile ? 0 : 8,
            }}
          >
            <CardMedia
              component="img"
              image="https://source.unsplash.com/random"
              title="Image title"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeAvatar;
