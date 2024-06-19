import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import axiosInstance from "../Axios";
import { useTheme } from "@emotion/react";

// Function to fetch all technologies
const fetchTechnologies = async () => {
  try {
    const response = await axiosInstance.get("/technologies/");
    return response.data;
  } catch (error) {
    console.error("Error fetching technologies:", error);
    throw error;
  }
};

const TechnologiesList = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const getTechnologies = async () => {
      try {
        const techs = await fetchTechnologies();
        setTechnologies(techs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getTechnologies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading technologies: {error.message}</div>;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {technologies.map((tech) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#E0E0E5",
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            mx: "auto",
          }}
        >
          <img
            src={tech.logoUrl}
            alt={tech.name}
            width="24"
            style={{
              textAlign: "center",
              alignItems: "center",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TechnologiesList;
