import React, { useContext } from "react"
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";

const MyFantasyMoviesPage: React.FC = () => {

  const styles = {
    root: {
      backgroundColor: "#bfbfbf",
    },
    fab: {
      marginTop: 8,
      position: "fixed",
      top: 20,
      left: 2,
    },
  };

  const navigate = useNavigate();

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => {
          navigate(
            '/myfantasymovies/form', {
            // state={
              // movieId,
              // type,
            // }
          });
        }}
      sx={styles.fab}
      >
      Create a Fantasy Movie
    </Fab >

    </>
  );
};

export default MyFantasyMoviesPage;