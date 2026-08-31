import React from "react";
import Box from "@mui/material/Box";
import FantasyMovieDetails from "../myFantasyMovieDetails";
import { MyFantasyMovieProps } from "../../types/interfaces";

interface FantasyMoviePageProps {
  myFantasyMovie: MyFantasyMovieProps;
}

const  MyFantasyMoviePage: React.FC<FantasyMoviePageProps> = ({ myFantasyMovie }) => {
  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      <Box sx={{ width: "50%" }}>
        <img
          src={myFantasyMovie.image_path}
          alt={myFantasyMovie.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Box sx={{ width: "50%" }}>
        <FantasyMovieDetails {...myFantasyMovie} />
      </Box>
    </Box>
  );
};

export default MyFantasyMoviePage;
