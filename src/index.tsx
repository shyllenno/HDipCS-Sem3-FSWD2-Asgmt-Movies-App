import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MoviewReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingPage from "./pages/upcomingPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import ReviewsPage from "./pages/myReviewsPage.tsx";
import TVSeriesPage from "./pages/tvSeriesPage.tsx";
import TVDetailsPage from "./pages/tvDetailsPage.tsx";
import MyFantasyMoviesPage from "./pages/myFantasyMoviesPage.tsx";
import MyFantasyMovieAddPage from "./pages/myFantasyMovieAddPage.tsx";
import MyFantasyMovieDetailsPage from "./pages/myFantasyMovieDetailsPage.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/myfantasymovie/:id" element={<MyFantasyMovieDetailsPage />} />
            <Route path="/myfantasymovies/form" element={<MyFantasyMovieAddPage />} />
            <Route path="/myfantasymovies" element={<MyFantasyMoviesPage />} />
            <Route path="/tv/:id" element={<TVDetailsPage />} />
            <Route path="/tvseries" element={<TVSeriesPage />} />
            <Route path="/myreviews" element={<ReviewsPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/reviews/:id" element={<MoviewReviewPage />} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
