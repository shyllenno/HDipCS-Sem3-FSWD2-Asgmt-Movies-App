import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps } from "../types/interfaces.ts";
import { Review } from "../types/interfaces";


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
    const { myReviews, addReview } = useContext(MoviesContext);

    useEffect(() => {
        if (myReviews.length === 0) {
            fetch("http://localhost:4000/reviews")
                .then((res) => res.json())
                .then((data) => {
                    data.forEach((review) => addReview({ id: review.movieId } as any, review));
                });
        }
    }, []);

    const movieIds = myReviews.map((r) => r.movieId);

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

    const isLoading = reviewMovieQueries.find((q) => q.isLoading);

    if (isLoading) return <Spinner />;

    // Reference: https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
    type MovieWithReview = BaseMovieProps & { review: Review };

    const moviesWithReviews: MovieWithReview[] = reviewMovieQueries.map((q) => {
        const movie = q.data;
        const review = myReviews.find((r) => r.movieId === movie.id);
        return { ...movie, review };
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
            <PageTemplate
                title="My Reviews"
                movies={displayedMovies}
                action={(movie) => (
                    <div style={{ padding: "8px" }}>
                        <strong>Rating:</strong> {movie.review.rating}/5 <br />
                        <strong>Author:</strong> {movie.review.author}
                    </div>
                )}
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
