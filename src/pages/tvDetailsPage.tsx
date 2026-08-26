import React from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import { getTVSerie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import TVDetails from "../components/tvDetails";
import { TVDetailsProps } from "../types/interfaces.ts";

const TVDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data: tv, error, isLoading, isError } = useQuery<TVDetailsProps, Error>(
    ["tvDetails", id],
    () => getTVSerie(id!)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  if (!tv) return <Spinner />;

  return (
    <PageTemplate movie={tv} type="tv">
      <TVDetails {...tv} />
    </PageTemplate>
  );
};

export default TVDetailsPage;
