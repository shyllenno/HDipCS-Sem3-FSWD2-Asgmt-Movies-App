import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie, getTVSerie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseMovieProps, MovieDetailsProps } from "../types/interfaces";

const AddMovieReviewPage: React.FC = () => {
    const location = useLocation()
    const { movieId, type } = location.state;
    const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
        ["movie", movieId, type, ],
        () => (type === "movie" ? getMovie(movieId) : getTVSerie(movieId))
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {movie ? (
                    <PageTemplate movie={movie} type={type}>
                        <ReviewForm {...movie} />
                    </PageTemplate>
            ) : (
                <p>Waiting for movie review details</p>
            )}
        </>
    );
};

export default AddMovieReviewPage;
