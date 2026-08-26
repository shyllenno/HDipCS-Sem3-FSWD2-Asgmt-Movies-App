import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getTVSerie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const { type = "movie" } = location.state || {};

  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["details", id, type ? "movie" : "tv"],
    () => (type === "movie" ? getMovie(id!) : getTVSerie(id!))
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie} type={type}>
          <MovieDetails {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;