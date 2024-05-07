import {
  useMediaQuery,
  Box,
  CardMedia,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
// import { blue, red } from "@mui/material/colors";
import React from "react";

function HomeAvatar() {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div>
      <Grid
        container
        style={{
          height: "100%",
          marginBottom: isMobile ? "16px" : 0,
        }}
      >
        <Stack
          sx={{
            direction: isMobile ? "column" : "row",
          }}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          spacing={2}
        >
          <Box
            elevation={3}
            sx={{
              maxWidth: "100%",
              paddingLeft: isMobile ? 3 : 12,
              paddingTop: isMobile ? 3 : 6,
              marginRight: isMobile ? 2 : 0,
              textAlign: isMobile ? "left" : "left",
            }}
          >
            <Typography variant="h4" component="div">
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
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Box>

          <Box
            style={{
              display: "flex",
              padding: isMobile ? 2 : 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image="https://source.unsplash.com/random"
              title="Image title"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Stack>
      </Grid>
    </div>
  );
}

export default HomeAvatar;
