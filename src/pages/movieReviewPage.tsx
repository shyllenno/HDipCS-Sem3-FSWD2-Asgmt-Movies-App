import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage: React.FC = () => {
  const { state: { movie, review } } = useLocation()

  const isMovie = location.pathname.includes("/movies/");

  return (
    <PageTemplate movie={movie} type={isMovie ? "movie" : "tv"}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
