import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

import FantasyMovieDetails from "../components/fantasyMovieDetails";
import FantasyMoviePageTemplate from "../components/templateFantasyMoviePage";

import { MyFantasyMovieProps } from "../types/interfaces";
import { MoviesContext } from "../contexts/moviesContext.tsx";



const MyFantasyMovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { getFantasyMovieById } = useContext(MoviesContext);

  const { data: movie, error, isLoading, isError } = useQuery<MyFantasyMovieProps, Error>(
    ["fantasy-details", id],
    () => getFantasyMovieById(id!)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {movie ? (
        <FantasyMoviePageTemplate movie={movie}>
          <FantasyMovieDetails {...movie} />
        </FantasyMoviePageTemplate>
      ) : (
        <p>Waiting for details</p>
      )}
    </>
  );
};

export default MyFantasyMovieDetailsPage;
