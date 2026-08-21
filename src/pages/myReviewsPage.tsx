import React, { useEffect, useState } from "react";
import MovieReviewTable from "../components/templateMovieTablePage";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, Review } from "../types/interfaces";

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};

const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
};

const ReviewsPage: React.FC = () => {

    const [loadedReviews, setLoadedReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/getreviews")
            .then((res) => res.json())
            .then((data) => setLoadedReviews(data));
    }, []);

    const movieIds = loadedReviews.length > 0
        ? [...new Set(loadedReviews.map((r) => r.movieId))]
        : [];

    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        titleFiltering,
        genreFiltering,
    ]);

    const reviewMovieQueries = useQueries(
        movieIds.map((movieId) => ({
            queryKey: ["movie", movieId],
            queryFn: () => getMovie(movieId.toString()),
        }))
    );

    if (movieIds.length === 0) return <Spinner />;
    const isLoading = reviewMovieQueries.find((q) => q.isLoading);

    if (isLoading) return <Spinner />;

    // Reference: https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
    type MovieWithReview = BaseMovieProps & { reviews: Review[] };

    const moviesWithReviews: MovieWithReview[] = reviewMovieQueries
        .filter((q) => q.data)
        .map((q) => {
            const movie = q.data!;
            const reviews = loadedReviews.filter((r) => r.movieId === movie.id);
            return { ...movie, reviews };
        });

    const displayedMovies = filterFunction(moviesWithReviews);

    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value };
        const updatedFilterSet =
            type === "title"
                ? [changedFilter, filterValues[1]]
                : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    return (
        <>
            <MovieReviewTable
                title="My Reviews"
                movies={displayedMovies}
            />

            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
            />
        </>
    );
};

export default ReviewsPage;

