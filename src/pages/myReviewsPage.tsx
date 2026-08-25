import React, { useEffect, useState } from "react";
import MovieReviewTable from "../components/templateMovieTablePage";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseMovieProps, Review } from "../types/interfaces";

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

    const reviewsPerRows = moviesWithReviews ? moviesWithReviews.flatMap(movie =>
        movie.reviews.map(review => ({
            reviewId: review._id,
            movieId: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            rating: review.rating,
            content: review.content
        }))
    )
    : [];

    const deleteReview = async (reviewId: string) => {
        await fetch(`http://localhost:4000/deletereview/${reviewId}`, {
            method: "DELETE",
        });

        setLoadedReviews(prev => prev.filter( review => review._id !== reviewId));
    };

    return (
        <>
            <MovieReviewTable
                title="My Reviews"
                rows={reviewsPerRows}
                onDelete={deleteReview}
            />
        </>
    );
};

export default ReviewsPage;

