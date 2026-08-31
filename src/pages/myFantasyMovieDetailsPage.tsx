import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import FantasyMoviePageTemplate from "../components/templateFantasyMoviePage";

const MyFantasyMovieDetailsPage = () => {
  const { id } = useParams();
  const { myFantasyMovies } = useContext(MoviesContext);

  const myFantasyMovie = myFantasyMovies.find((m) => m._id === id);

  if (!myFantasyMovie) {
    return <h3>Loading...</h3>;
  }

  return <FantasyMoviePageTemplate myFantasyMovie={myFantasyMovie} />;
};

export default MyFantasyMovieDetailsPage;
